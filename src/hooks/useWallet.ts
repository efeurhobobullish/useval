import { useEffect, useState } from "react";
import api from "@/config/api";

export type WalletTransaction = {
  _id: string;
  type: "credit" | "debit";
  description: string;
  amount: number;
  createdAt: string;
};

const useWallet = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWallet = async () => {
    try {
      const [walletRes, txRes] = await Promise.all([
        api.get("/v1/users/wallet"),
        api.get("/v1/transactions/me"),
      ]);

      setBalance(walletRes.data.wallet || 0);
      setTransactions(txRes.data.transactions || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  return {
    balance,
    transactions,
    loading,
    refetch: fetchWallet,
  };
};

export default useWallet;