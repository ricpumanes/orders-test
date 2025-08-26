import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { apiFetchOrders, apiGetSummary } from "../api/orders";

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

  const { data, error, isLoading } = useQuery({
    queryKey: ["orders", page, PAGE_SIZE, searchTerm],
    queryFn: () => apiFetchOrders(page, PAGE_SIZE, searchTerm),
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    setPage(DEFAULT_PAGE);
  };

  return { data, error, isLoading, page, handlePageChange, handleSearchChange };
}
