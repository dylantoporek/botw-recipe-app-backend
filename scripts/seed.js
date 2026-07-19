// Creates the schema and seeds reference data (stores, recipes, ingredients)
// from the JSON files in db/data. Safe to re-run: reference tables are
// re-seeded only when empty, user data is never touched.
//
// Usage: DATABASE_URL=postgres://... node scripts/seed.js

const fs = require("fs");
const path = require("path");
const pool = require("../server/db");

async function seedTable(name, rows, insert) {
  const { rows: existing } = await pool.query(`SELECT count(*)::int AS n FROM ${name}`);
  if (existing[0].n > 0) {
    console.log(`${name}: already has ${existing[0].n} rows, skipping`);
    return;
  }
  for (const row of rows) await insert(row);
  console.log(`${name}: seeded ${rows.length} rows`);
}

async function main() {
  const dataDir = path.join(__dirname, "..", "db", "data");
  const read = (f) => JSON.parse(fs.readFileSync(path.join(dataDir, f), "utf8"));

  const schema = fs.readFileSync(path.join(__dirname, "..", "db", "schema.sql"), "utf8");
  await pool.query(schema);
  console.log("schema: ok");

  await seedTable("stores", read("stores.json"), (s) =>
    pool.query("INSERT INTO stores (name, description) VALUES ($1, $2)", [s.name, s.description])
  );

  await seedTable("recipes", read("recipes.json"), (r) =>
    pool.query(
      `INSERT INTO recipes (name, category, price, description, image,
                            ingredient1, ingredient2, ingredient3, ingredient4, ingredient5)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [
        r.name,
        r.category,
        r.price,
        r.description,
        r.image,
        r.ingredient1 || null,
        r.ingredient2 || null,
        r.ingredient3 || null,
        r.ingredient4 || null,
        r.ingredient5 || null,
      ]
    )
  );

  await seedTable("ingredients", read("ingredients.json"), (i) =>
    pool.query(
      "INSERT INTO ingredients (name, description, price, image, category) VALUES ($1, $2, $3, $4, $5)",
      [i.name, i.description, i.price, i.image, i.category]
    )
  );

  await pool.end();
  console.log("Done seeding");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
