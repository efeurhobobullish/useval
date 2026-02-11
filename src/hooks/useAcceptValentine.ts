import { useState } from "react";
import api from "@/config/api";

type Payload = {
  network: string;
  phone: string;
};

const useAcceptValentine = () => {
  const [loading, setLoading] = useState(false);

  const acceptValentine = async (
    reference: string,
    payload: Payload
  ) => {
    setLoading(true);
    try {
      const res = await api.post(
        `/v1/valentine/accept/${reference}`,
        payload
      );
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  return {
    acceptValentine,
    loading,
  };
};

export default useAcceptValentine;