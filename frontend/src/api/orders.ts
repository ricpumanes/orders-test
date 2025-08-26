import axiosClient from "../axiosClient";
import type { Order } from "../types";

export const apiCreateOrder = async (orderData: Omit<Order, "id">) => {
  const response = await axiosClient.post("/orders", orderData);
  return response.data;
};

export const apiFetchOrders = async (
  page: number,
  limit: number,
  searchTerm: string
) => {
  const response = await axiosClient.get("/orders", {
    params: { page, limit, searchTerm },
  });
  return response.data as Order[];
};

export const apiGetSummary = async () => {
  const response = await axiosClient.get("/summary");
  return response.data;
};
