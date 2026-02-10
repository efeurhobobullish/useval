import { useEffect, useState } from "react";
import api from "@/config/api";
import { getFirstName } from "@/helpers/getFirstName";

export type Transaction = {
  _id: string;
  type: "credit" | "debit";
  title: string;
  amount: number;
  createdAt: string;
};

const useWalletDashboard = () => {
  const [balance, setBalance] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const userRes = await api.get("/v1/users/me");
        const walletRes = await api.get("/v1/wallet");

        if (userRes.data?.user?.fullName) {
          setFirstName(getFirstName(userRes.data.user.fullName));
        }

        if (walletRes.data?.success) {
          setBalance(walletRes.data.balance || 0);
          setTransactions(walletRes.data.transactions || []);
        }
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  return {
    balance,
    firstName,
    transactions,
    loading,
  };
};

export default useWalletDashboard;
