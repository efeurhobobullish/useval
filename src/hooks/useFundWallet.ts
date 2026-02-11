import { useState } from "react";
import api from "@/config/api";

const useFundWallet = () => {
  const [loading, setLoading] = useState(false);

  const fundWallet = async (amount: number) => {
    setLoading(true);
    try {
      const res = await api.post("/v1/wallet/fund", { amount });
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  return { fundWallet, loading };
};

export default useFundWallet;