import getDb from "./db";

export async function initDb() {
  const db = await getDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product TEXT NOT NULL,
      qty INTEGER NOT NULL,
      price REAL NOT NULL
    );
  `);
}
