import { useEffect, useState } from "react";
import api from "@/config/api";

const useWallet = () => {
  const [balance, setBalance] = useState(0);
  const [fullName, setFullName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [fundingLoading, setFundingLoading] = useState(false);

  const fetchWallet = async () => {
    try {
      setLoading(true);

      const res = await api.get("/v1/users/me");

      const user = res.data?.user;

      setBalance(user?.wallet || 0);
      setFullName(user?.fullName || "");
    } catch (error) {
      setBalance(0);
      setFullName("");
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
    fullName,
    loading,
    fundingLoading,
    fundWallet,
    refetch: fetchWallet,
  };
};

export default useWallet;