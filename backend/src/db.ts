import sqlite3 from "sqlite3";
import { Database, open } from "sqlite";
import dotenv from "dotenv";

dotenv.config();

let db: Promise<Database<sqlite3.Database, sqlite3.Statement>>;

export default function getDb() {
  if (!db) {
    db = open({
      filename: process.env.DB_PATH || "./database.db",
      driver: sqlite3.Database,
    });
  }
  return db;
}
