import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { apiCreateOrder, apiFetchOrders, apiGetSummary } from "../api/orders";

export function useSummary() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["summary"],
    queryFn: apiGetSummary,
  });

  return { data, error, isLoading };
}

const PAGE_SIZE = 10;
const DEFAULT_PAGE = 0;

export function useOrders() {
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [searchTerm, setSearchTerm] = useState("");

  const queryKeyDeps = ["orders", page, PAGE_SIZE, searchTerm];

  const { data, error, isLoading } = useQuery({
    queryKey: queryKeyDeps,
    queryFn: () => apiFetchOrders(page, PAGE_SIZE, searchTerm),
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    setPage(DEFAULT_PAGE);
  };

  return {
    queryKeyDeps,
    data,
    error,
    isLoading,
    page,
    handlePageChange,
    handleSearchChange,
  };
}

export function useCreateOrder() {
  const mutation = useMutation({
    mutationFn: apiCreateOrder,
  });

  return mutation;
}
