import getDb from "../db";
import { initDb } from "../dbInit";

// Available products for random selection
const PRODUCTS = [
  "Apple",
  "Banana",
  "Orange",
  "Mango",
  "Grapes",
  "Strawberry",
  "Pineapple",
  "Watermelon",
  "Peach",
  "Pear",
  "Cherry",
  "Blueberry",
  "Kiwi",
  "Papaya",
  "Coconut",
  "Avocado",
  "Lemon",
  "Lime",
];

function getRandomProduct(): string {
  return PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
}

function getRandomQty(): number {
  return Math.floor(Math.random() * 10) + 1; // 1 to 10
}

function getRandomPrice(): number {
  return Math.floor(Math.random() * 200) + 10; // 10 to 209
}

async function seedOrder(N: number = 5) {
  const db = await getDb();
  await initDb();
  await db.exec("DELETE FROM orders");

  console.log(`Seeding ${N} orders...`);

  for (let i = 0; i < N; i++) {
    const product = getRandomProduct();
    const qty = getRandomQty();
    const price = getRandomPrice();

    await db.run("INSERT INTO orders (product, qty, price) VALUES (?, ?, ?)", [
      product,
      qty,
      price,
    ]);

    console.log(
      `Inserted order ${i + 1}: ${product}, qty: ${qty}, price: ${price}`
    );
  }

  console.log(`Seed Orders complete - ${N} records inserted`);
}

seedOrder(50);
