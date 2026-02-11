import { useEffect, useState } from "react";
import api from "@/config/api";

export type PublicValentine = {
  recipientName: string;
  pickupLine?: string;
  sendAirtime: boolean;
  reference: string;
};

const usePublicValentine = (reference?: string) => {
  const [valentine, setValentine] = useState<PublicValentine | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchValentine = async () => {
    if (!reference) return;

    try {
      setLoading(true);
      const res = await api.get(`/v1/valentine/view/${reference}`);
      setValentine(res.data.valentine);
      setError(null);
    } catch (err: any) {
      setValentine(null);
      setError(
        err?.response?.data?.message || "Valentine not found"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchValentine();
  }, [reference]);

  return {
    valentine,
    loading,
    error,
    refetch: fetchValentine,
  };
};

export default usePublicValentine;