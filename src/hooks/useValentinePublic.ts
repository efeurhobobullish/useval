import { useEffect, useState } from "react";
import api from "@/config/api";

export type PublicValentine = {
  _id: string;
  recipientName: string;
  pickupLine?: string;
  thankYouMessage?: string;
  sendAirtime: boolean;
  amount: number;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
};

const useValentinePublic = (id?: string) => {
  const [valentine, setValentine] = useState<PublicValentine | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchValentine = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/v1/valentine/view/${id}`);
        setValentine(res.data.valentine);
      } catch (err: any) {
        setError(
          err?.response?.data?.message || "Unable to load card"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchValentine();
  }, [id]);

  return {
    valentine,
    loading,
    error,
  };
};

export default useValentinePublic;