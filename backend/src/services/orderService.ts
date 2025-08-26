import { Order, Summary } from "../types";
import { calculateMedian } from "../utils/compute";

export const summarizeOrders = (orders: Order[]): Summary => {
  if (orders.length === 0) {
    return {
      totalRevenue: 0,
      medianOrderPrice: 0,
      topProductByQty: "",
      uniqueProductCount: 0,
    };
  }

  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.price * order.qty,
    0
  );
  const medianOrderPrice = calculateMedian(orders.map((order) => order.price));
  const topProductByQty =
    orders.reduce((top, order) => {
      if (!top || order.qty > top.qty) {
        return order;
      }
      return top;
    }, null as Order | null)?.product || null;

  const uniqueProductCount = Array.from(
    new Set(orders.map((order) => order.product))
  ).length;

  return {
    totalRevenue,
    medianOrderPrice,
    topProductByQty,
    uniqueProductCount,
  };
};
