import { useState } from "react";
import api from "@/config/api";

type FundWalletResponse = {
  success: boolean;
  message: string;
  funding?: {
    id: string;
    amount: number;
    status: "pending" | "approved" | "rejected";
    reference: string;
  };
};

const useFundWallet = () => {
  const [loading, setLoading] = useState(false);

  const fundWallet = async (amount: number): Promise<FundWalletResponse> => {
    if (!amount || amount <= 0) {
      throw new Error("Valid amount is required");
    }

    setLoading(true);

    try {
      const res = await api.post("/v1/wallet/fund", { amount });
      return res.data;
    } catch (err: any) {
      throw err;
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