import { useEffect, useState } from "react";
import api from "@/config/api";
import { getFirstName } from "@/helpers/getFirstName";

export type Transaction = {
  _id: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  createdAt: string;
};

export type ValentineStats = {
  total: number;
  accepted: number;
  pending: number;
  rejected: number;
  failed: number;
};

const useWalletDashboard = () => {
  const [balance, setBalance] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState<ValentineStats>({
    total: 0,
    accepted: 0,
    pending: 0,
    rejected: 0,
    failed: 0,
  });
  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    try {
      const [userRes, walletRes, transactionRes, statsRes] =
        await Promise.all([
          api.get("/v1/users/me"),
          api.get("/v1/users/wallet"),
          api.get("/v1/transactions/me"),
          api.get("/v1/valentine/me/stats"),
        ]);

      if (userRes.data?.user?.fullName) {
        setFirstName(getFirstName(userRes.data.user.fullName));
      }

      if (walletRes.data?.wallet !== undefined) {
        setBalance(walletRes.data.wallet);
      }

      if (transactionRes.data?.transactions) {
        setTransactions(transactionRes.data.transactions);
      }

      if (statsRes.data?.stats) {
        setStats(statsRes.data.stats);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return {
    balance,
    firstName,
    transactions,
    stats,
    loading,
    refetch: loadDashboard,
  };
};

export default useWalletDashboard;