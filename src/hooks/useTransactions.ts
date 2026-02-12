import { useEffect, useState } from "react";
import api from "@/config/api";

export type TransactionType = "credit" | "debit";
export type TransactionStatus = "pending" | "success" | "failed";

export type Transaction = {
  id: string;
  reference: string;
  type: TransactionType;
  amount: number;
  oldBalance: number;
  newBalance: number;
  description: string;
  source: string;
  status: TransactionStatus;
  createdAt: string;
};

export type TransactionStats = {
  credit: {
    totalAmount: number;
    count: number;
  };
  debit: {
    totalAmount: number;
    count: number;
  };
};

const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState<TransactionStats>({
    credit: { totalAmount: 0, count: 0 },
    debit: { totalAmount: 0, count: 0 },
  });

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);

  /* ================= FETCH TRANSACTIONS ================= */

  const fetchTransactions = async ({
    page = 1,
    limit = 20,
    type,
    status,
  }: {
    page?: number;
    limit?: number;
    type?: TransactionType;
    status?: TransactionStatus;
  } = {}) => {
    setFetching(true);

    try {
      const res = await api.get("/v1/transactions/me", {
        params: { page, limit, type, status },
      });

      setTransactions(res.data.transactions || []);
      setTotal(res.data.total || 0);
      setPage(res.data.page || 1);
    } finally {
      setFetching(false);
    }
  };

  /* ================= FETCH STATS ================= */

  const fetchStats = async () => {
    const res = await api.get("/v1/transactions/me/stats");
    setStats(res.data.stats);
  };

  /* ================= GET SINGLE ================= */

  const getTransactionById = async (id: string) => {
    const res = await api.get(`/v1/transactions/me/${id}`);
    return res.data.transaction;
  };

  /* ================= INIT ================= */

  useEffect(() => {
    Promise.all([fetchTransactions(), fetchStats()]).finally(() =>
      setLoading(false)
    );
  }, []);

  return {
    transactions,
    stats,
    total,
    page,
    loading,
    fetching,
    refetch: fetchTransactions,
    refetchStats: fetchStats,
    getTransactionById,
  };
};

export default useTransactions;
