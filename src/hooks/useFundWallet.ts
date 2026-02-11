import { useState } from "react";
import api from "@/config/api";

type FundPayload = {
  fullName: string;
  phone: string;
  amount: number;
};

const useFundWallet = () => {
  const [loading, setLoading] = useState(false);

  const fundWallet = async (payload: FundPayload) => {
    setLoading(true);
    try {
      const res = await api.post("/v1/wallet/fund", payload);
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  return {
    fundWallet,
    loading,
  };
};

export default useFundWallet;