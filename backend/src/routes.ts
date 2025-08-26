import express from "express";
import getDb from "./db";
import { summarizeOrders } from "./services/orderService";

const router = express.Router();

router.get("/summary", async (req, res) => {
  try {
    const db = await getDb();
    const summary = await db.all("SELECT * FROM orders");
    res.json(summarizeOrders(summary));
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/orders", async (req, res) => {
  try {
    const { page, limit, searchTerm } = req.query;

    const offset = Number(page) * Number(limit);
    const lim = limit ? Number(limit) : 10;

    let whereClause = "";
    let params = [];

    if (searchTerm) {
      whereClause += "WHERE product LIKE ?";
      params.push(`%${searchTerm}%`);
    }

    const db = await getDb();
    const orders = await db.all(
      `SELECT * FROM orders ${whereClause} LIMIT ? OFFSET ?`,
      [...params, lim, offset]
    );
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/orders", async (req, res) => {
  try {
    const { product, qty, price } = req.body;

    // simple nput validaton
    if (
      typeof product !== "string" ||
      !product.trim() ||
      typeof qty !== "number" ||
      !Number.isInteger(qty) ||
      qty <= 0 ||
      typeof price !== "number" ||
      price <= 0
    ) {
      return res.status(400).json({ error: "Invalid input" });
    }

    const db = await getDb();
    const result = await db.run(
      "INSERT INTO orders (product, qty, price) VALUES (?, ?, ?)",
      [product, qty, price]
    );
    const newOrder = await db.get(
      "SELECT * FROM orders WHERE id = ?",
      result.lastID
    );
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
