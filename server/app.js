const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const pool = require("./db");
const { readSession, setSession, clearSession } = require("./session");

const app = express();
app.use(express.json());

// Same-origin deployments need no CORS; set FRONTEND_ORIGIN (comma-separated)
// if the frontend is hosted elsewhere.
if (process.env.FRONTEND_ORIGIN) {
  app.use(
    cors({
      origin: process.env.FRONTEND_ORIGIN.split(",").map((o) => o.trim()),
      credentials: true,
    })
  );
}

// ---------- serializers (match the old ActiveModel::Serializer output) ----------

const serializeUser = (u) => ({ id: u.id, username: u.username, bank: u.bank });
const serializeIngredient = (i) => ({
  id: i.id,
  name: i.name,
  description: i.description,
  price: i.price,
  image: i.image,
  category: i.category,
});
const serializeRecipe = (r) => ({
  id: r.id,
  name: r.name,
  category: r.category,
  price: r.price,
  ingredient1: r.ingredient1,
  ingredient2: r.ingredient2,
  ingredient3: r.ingredient3,
  ingredient4: r.ingredient4,
  ingredient5: r.ingredient5,
  description: r.description,
  image: r.image,
});
const serializeStore = (s) => ({ id: s.id, name: s.name, description: s.description });
const serializePantry = (p) => ({
  id: p.id,
  quantity: p.quantity,
  kitchen: { id: p.kitchen_id },
  ingredient: serializeIngredient({
    id: p.ingredient_id,
    name: p.ingredient_name,
    description: p.ingredient_description,
    price: p.ingredient_price,
    image: p.ingredient_image,
    category: p.ingredient_category,
  }),
});
const serializeDish = (d) => ({
  id: d.id,
  quantity: d.quantity,
  kitchen: { id: d.kitchen_id },
  recipe: serializeRecipe({
    id: d.recipe_id,
    name: d.recipe_name,
    category: d.recipe_category,
    price: d.recipe_price,
    ingredient1: d.ingredient1,
    ingredient2: d.ingredient2,
    ingredient3: d.ingredient3,
    ingredient4: d.ingredient4,
    ingredient5: d.ingredient5,
    description: d.recipe_description,
    image: d.recipe_image,
  }),
});

const PANTRY_SELECT = `
  SELECT p.id, p.quantity, p.kitchen_id, p.ingredient_id,
         i.name AS ingredient_name, i.description AS ingredient_description,
         i.price AS ingredient_price, i.image AS ingredient_image,
         i.category AS ingredient_category
  FROM pantries p JOIN ingredients i ON i.id = p.ingredient_id`;

const DISH_SELECT = `
  SELECT d.id, d.quantity, d.kitchen_id, d.recipe_id,
         r.name AS recipe_name, r.category AS recipe_category, r.price AS recipe_price,
         r.ingredient1, r.ingredient2, r.ingredient3, r.ingredient4, r.ingredient5,
         r.description AS recipe_description, r.image AS recipe_image
  FROM dishes d JOIN recipes r ON r.id = d.recipe_id`;

// ---------- helpers ----------

const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

async function authorize(req, res, next) {
  const session = readSession(req);
  if (session) {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [session.user_id]);
    if (rows[0]) {
      req.currentUser = rows[0];
      return next();
    }
  }
  res.status(401).json({ errors: ["Not authorized"] });
}

const auth = wrap(authorize);

async function currentKitchenId(userId) {
  const { rows } = await pool.query("SELECT id FROM kitchens WHERE user_id = $1", [userId]);
  return rows[0] ? rows[0].id : null;
}

const api = express.Router();
app.use("/api/v1", api);

// ---------- auth ----------

api.post(
  "/signup",
  wrap(async (req, res) => {
    const { username, password, password_confirmation, bank } = req.body || {};
    const errors = [];
    if (!username) errors.push("Username can't be blank");
    if (!password) errors.push("Password can't be blank");
    if (password_confirmation !== undefined && password !== password_confirmation)
      errors.push("Password confirmation doesn't match Password");
    if (username) {
      const { rows } = await pool.query("SELECT id FROM users WHERE username = $1", [username]);
      if (rows[0]) errors.push("Username has already been taken");
    }
    if (errors.length) return res.status(422).json({ errors });

    const digest = await bcrypt.hash(password, 10);
    const { rows } = await pool.query(
      "INSERT INTO users (username, password_digest, bank) VALUES ($1, $2, $3) RETURNING *",
      [username, digest, bank ?? 0]
    );
    const user = rows[0];
    await pool.query("INSERT INTO kitchens (user_id) VALUES ($1)", [user.id]);
    setSession(res, user.id);
    res.status(201).json(serializeUser(user));
  })
);

api.post(
  "/login",
  wrap(async (req, res) => {
    const { username, password } = req.body || {};
    const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    const user = rows[0];
    if (user && password && (await bcrypt.compare(password, user.password_digest))) {
      setSession(res, user.id);
      res.status(201).json(serializeUser(user));
    } else {
      res.status(401).json({ errors: ["Invalid username or password"] });
    }
  })
);

api.delete("/logout", auth, (req, res) => {
  clearSession(res);
  res.status(204).end();
});

api.get("/me", auth, (req, res) => {
  res.json(serializeUser(req.currentUser));
});

async function updateUser(req, res) {
  const { rows } = await pool.query(
    "UPDATE users SET bank = $1, updated_at = now() WHERE id = $2 RETURNING *",
    [req.body.bank, req.currentUser.id]
  );
  res.json(serializeUser(rows[0]));
}
api.patch("/users/:id", auth, wrap(updateUser));
api.put("/users/:id", auth, wrap(updateUser));

// ---------- reference data (public: the frontend loads these before login) ----------

api.get(
  "/recipes",
  wrap(async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM recipes ORDER BY id");
    res.json(rows.map(serializeRecipe));
  })
);

api.get(
  "/recipes/:id",
  wrap(async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM recipes WHERE id = $1", [req.params.id]);
    if (!rows[0]) return res.status(404).json({ errors: ["Recipe not found"] });
    res.json(serializeRecipe(rows[0]));
  })
);

api.get(
  "/ingredients",
  wrap(async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM ingredients ORDER BY id");
    res.json(rows.map(serializeIngredient));
  })
);

api.get(
  "/ingredients/:id",
  wrap(async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM ingredients WHERE id = $1", [req.params.id]);
    if (!rows[0]) return res.status(404).json({ errors: ["Ingredient not found"] });
    res.json(serializeIngredient(rows[0]));
  })
);

api.get(
  "/stores",
  wrap(async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM stores ORDER BY id");
    res.json(rows.map(serializeStore));
  })
);

api.get(
  "/stores/:id",
  wrap(async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM stores WHERE id = $1", [req.params.id]);
    if (!rows[0]) return res.status(404).json({ errors: ["Store not found"] });
    res.json(serializeStore(rows[0]));
  })
);

// ---------- kitchens ----------

api.get(
  "/kitchens",
  auth,
  wrap(async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM kitchens WHERE user_id = $1", [
      req.currentUser.id,
    ]);
    const kitchen = rows[0];
    if (!kitchen) return res.status(404).json({ errors: ["Kitchen not found"] });
    res.json({ id: kitchen.id, user: serializeUser(req.currentUser) });
  })
);

api.post(
  "/kitchens",
  wrap(async (req, res) => {
    const userId = (req.body || {}).user_id;
    const { rows } = await pool.query(
      "INSERT INTO kitchens (user_id) VALUES ($1) RETURNING *",
      [userId]
    );
    res.json({ id: rows[0].id });
  })
);

// ---------- pantries ----------

api.get(
  "/pantries",
  auth,
  wrap(async (req, res) => {
    const kitchenId = await currentKitchenId(req.currentUser.id);
    const { rows } = await pool.query(`${PANTRY_SELECT} WHERE p.kitchen_id = $1 ORDER BY p.id`, [
      kitchenId,
    ]);
    res.json(rows.map(serializePantry));
  })
);

api.get(
  "/pantries/:id",
  auth,
  wrap(async (req, res) => {
    const kitchenId = await currentKitchenId(req.currentUser.id);
    const { rows } = await pool.query(
      `${PANTRY_SELECT} WHERE p.kitchen_id = $1 AND p.id = $2`,
      [kitchenId, req.params.id]
    );
    if (!rows[0]) return res.status(404).json({ errors: ["Pantry not found"] });
    res.json(serializePantry(rows[0]));
  })
);

api.post(
  "/pantries",
  auth,
  wrap(async (req, res) => {
    const params = (req.body || {}).pantry || req.body || {};
    const kitchenId = await currentKitchenId(req.currentUser.id);
    const inserted = await pool.query(
      "INSERT INTO pantries (kitchen_id, ingredient_id, quantity) VALUES ($1, $2, $3) RETURNING id",
      [kitchenId, params.ingredient_id, params.quantity]
    );
    const { rows } = await pool.query(`${PANTRY_SELECT} WHERE p.id = $1`, [inserted.rows[0].id]);
    res.json(serializePantry(rows[0]));
  })
);

api.patch("/pantries/:id", auth, wrap(updatePantry));
api.put("/pantries/:id", auth, wrap(updatePantry));
async function updatePantry(req, res) {
  const kitchenId = await currentKitchenId(req.currentUser.id);
  const updated = await pool.query(
    "UPDATE pantries SET quantity = $1, updated_at = now() WHERE id = $2 AND kitchen_id = $3 RETURNING id",
    [req.body.quantity, req.params.id, kitchenId]
  );
  if (!updated.rows[0]) return res.status(404).json({ errors: ["Pantry not found"] });
  const { rows } = await pool.query(`${PANTRY_SELECT} WHERE p.id = $1`, [updated.rows[0].id]);
  res.json(serializePantry(rows[0]));
}

api.delete(
  "/pantries/:id",
  auth,
  wrap(async (req, res) => {
    const kitchenId = await currentKitchenId(req.currentUser.id);
    await pool.query("DELETE FROM pantries WHERE id = $1 AND kitchen_id = $2", [
      req.params.id,
      kitchenId,
    ]);
    res.status(204).end();
  })
);

// ---------- dishes ----------

api.get(
  "/dishes",
  auth,
  wrap(async (req, res) => {
    const kitchenId = await currentKitchenId(req.currentUser.id);
    const { rows } = await pool.query(`${DISH_SELECT} WHERE d.kitchen_id = $1 ORDER BY d.id`, [
      kitchenId,
    ]);
    res.json(rows.map(serializeDish));
  })
);

api.get(
  "/dishes/:id",
  auth,
  wrap(async (req, res) => {
    const kitchenId = await currentKitchenId(req.currentUser.id);
    const { rows } = await pool.query(`${DISH_SELECT} WHERE d.kitchen_id = $1 AND d.id = $2`, [
      kitchenId,
      req.params.id,
    ]);
    if (!rows[0]) return res.status(404).json({ errors: ["Dish not found"] });
    res.json(serializeDish(rows[0]));
  })
);

api.post(
  "/dishes",
  auth,
  wrap(async (req, res) => {
    const params = (req.body || {}).dish || req.body || {};
    const kitchenId = await currentKitchenId(req.currentUser.id);
    const inserted = await pool.query(
      "INSERT INTO dishes (kitchen_id, recipe_id, quantity) VALUES ($1, $2, $3) RETURNING id",
      [kitchenId, params.recipe_id, params.quantity]
    );
    const { rows } = await pool.query(`${DISH_SELECT} WHERE d.id = $1`, [inserted.rows[0].id]);
    res.json(serializeDish(rows[0]));
  })
);

api.patch("/dishes/:id", auth, wrap(updateDish));
api.put("/dishes/:id", auth, wrap(updateDish));
async function updateDish(req, res) {
  const kitchenId = await currentKitchenId(req.currentUser.id);
  const updated = await pool.query(
    "UPDATE dishes SET quantity = $1, updated_at = now() WHERE id = $2 AND kitchen_id = $3 RETURNING id",
    [req.body.quantity, req.params.id, kitchenId]
  );
  if (!updated.rows[0]) return res.status(404).json({ errors: ["Dish not found"] });
  const { rows } = await pool.query(`${DISH_SELECT} WHERE d.id = $1`, [updated.rows[0].id]);
  res.json(serializeDish(rows[0]));
}

api.delete(
  "/dishes/:id",
  auth,
  wrap(async (req, res) => {
    const kitchenId = await currentKitchenId(req.currentUser.id);
    await pool.query("DELETE FROM dishes WHERE id = $1 AND kitchen_id = $2", [
      req.params.id,
      kitchenId,
    ]);
    res.status(204).end();
  })
);

// ---------- errors ----------

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ errors: ["Internal server error"] });
});

module.exports = app;
