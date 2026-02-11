import { useEffect, useState } from "react";
import api from "@/config/api";

export type Valentine = {
  _id: string;
  recipientName: string;
  status: "pending" | "accepted" | "rejected" | "failed";
  sendAirtime: boolean;
  createdAt: string;
  reference: string;
};

const useValentines = () => {
  const [valentines, setValentines] = useState<Valentine[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchValentines = async () => {
    try {
      const res = await api.get("/v1/valentine/me");
      setValentines(res.data.valentines || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchValentines();
  }, []);

  return {
    valentines,
    loading,
    refetch: fetchValentines,
  };
};

export default useValentines;