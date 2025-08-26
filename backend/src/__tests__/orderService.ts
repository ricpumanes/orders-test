import { summarizeOrders } from "../services/orderService";

test("summarizeOrders with multiple orders", () => {
  const orders = [
    { id: 1, product: "A", qty: 2, price: 100 },
    { id: 2, product: "B", qty: 1, price: 200 },
    { id: 3, product: "A", qty: 3, price: 50 },
  ];

  const summary = summarizeOrders(orders);
  expect(summary.totalRevenue).toBe(2 * 100 + 1 * 200 + 3 * 50); // TODO: enhance this one later xD
  expect(summary.uniqueProductCount).toBe(2);
  expect(summary.topProductByQty).toBe("A");
});

test("summarizeOrders with empty orders", () => {
  const summary = summarizeOrders([]);
  expect(summary.totalRevenue).toBe(0);
  expect(summary.uniqueProductCount).toBe(0);
});
