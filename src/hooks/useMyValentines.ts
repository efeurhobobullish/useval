import { useEffect, useState } from "react";
import api from "@/config/api";

export type Valentine = {
  id: string;
  recipientName: string;
  status: "pending" | "accepted" | "rejected" | "failed";
  sendAirtime: boolean;
  createdAt: string;
  reference: string;
};

const useMyValentines = () => {
  const [valentines, setValentines] = useState<Valentine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchValentines = async () => {
    try {
      setLoading(true);
      const res = await api.get("/v1/valentine/me");
      setValentines(res.data.valentines);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to fetch cards");
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
    error,
    refetch: fetchValentines,
  };
};

export default useMyValentines;