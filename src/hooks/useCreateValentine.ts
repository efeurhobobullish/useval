import { useState } from "react";
import api from "@/config/api";

type Payload = {
  recipientName: string;
  pickupLine?: string;
  thankYouMessage?: string;
  amount?: number;
  sendAirtime: boolean;
};

const useCreateValentine = () => {
  const [loading, setLoading] = useState(false);

  const createValentine = async (payload: Payload) => {
    setLoading(true);
    try {
      const res = await api.post("/v1/valentine", payload);
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  return {
    createValentine,
    loading,
  };
};

export default useCreateValentine;