import { useEffect, useState } from "react";
import api from "@/config/api";

const useWallet = () => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fundingLoading, setFundingLoading] = useState(false);

  const fetchWallet = async () => {
    try {
      setLoading(true);

      const res = await api.get("/v1/users/me");

      const walletBalance = res.data?.user?.wallet || 0;

      setBalance(walletBalance);
    } catch (error) {
      setBalance(0);
    } finally {
      setLoading(false);
    }
  };

  const fundWallet = async (amount: number) => {
    if (!amount || amount <= 0) {
      throw new Error("Invalid amount");
    }

    try {
      setFundingLoading(true);

      const res = await api.post("/v1/wallet/fund", { amount });

      return res.data;
    } finally {
      setFundingLoading(false);
    }
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  return {
    balance,
    loading,
    fundingLoading,
    fundWallet,
    refetch: fetchWallet,
  };
};

export default useWallet;