import { useQuery } from "@tanstack/react-query";
import api from "@/config/api";

export type TransactionUser = {
  id?: string;
  _id?: string;
  fullName: string;
  email: string;
  phone?: string;
};

export type AdminTransaction = {
  id?: string;
  _id?: string;
  user: TransactionUser;
  type: string;
  amount: number;
  oldBalance: number;
  newBalance: number;
  reference: string;
  status: string;
  createdAt: string;
};

type TransactionsResponse = {
  transactions: AdminTransaction[];
  total: number;
  page: number;
  limit: number;
};

export function useAdminTransactions(page = 1, limit = 20, filters?: { status?: string; type?: string }) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["admin", "transactions", page, limit, filters],
    queryFn: async () => {
      const res = await api.get<TransactionsResponse>("/v1/admin/transactions", {
        params: { page, limit, ...filters },
      });
      return res.data;
    },
  });
  return {
    transactions: data?.transactions ?? [],
    total: data?.total ?? 0,
    page: data?.page ?? 1,
    limit: data?.limit ?? limit,
    loading: isLoading,
    error,
    refetch,
  };
}
