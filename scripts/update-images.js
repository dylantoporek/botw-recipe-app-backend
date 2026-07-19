// Syncs image URLs in an already-seeded database from db/data/*.json,
// matching rows by name. Run after changing image URLs in the data files:
//
//   DATABASE_URL=postgres://... node scripts/update-images.js

const path = require("path");
const pool = require("../server/db");

async function sync(table, file) {
  const rows = require(path.join(__dirname, "..", "db", "data", file));
  let updated = 0;
  for (const row of rows) {
    if (!row.image) continue;
    const result = await pool.query(
      `UPDATE ${table} SET image = $1, updated_at = now() WHERE name = $2 AND image IS DISTINCT FROM $1`,
      [row.image, row.name]
    );
    updated += result.rowCount;
  }
  console.log(`${table}: updated ${updated} of ${rows.length}`);
}

async function main() {
  await sync("ingredients", "ingredients.json");
  await sync("recipes", "recipes.json");
  await pool.end();
  console.log("Done");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
