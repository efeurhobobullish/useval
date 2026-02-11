import { useState } from "react";
import api from "@/config/api";
import { toast } from "sonner";

type Payload = {
  network?: string;
  phone?: string;
};

const useAcceptValentine = () => {
  const [loading, setLoading] = useState(false);

  const acceptValentine = async (
    reference: string,
    payload?: Payload
  ) => {
    setLoading(true);
    try {
      const res = await api.post(
        `/v1/valentine/accept/${reference}`,
        payload || {}
      );
      return res.data;
    } catch (err: any) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const copyLink = (reference: string) => {
    const link = `${window.location.origin}/card/${reference}`;
    navigator.clipboard.writeText(link);
    toast.success("Card link copied");
  };

  return {
    acceptValentine,
    copyLink,
    loading,
  };
};

export default useAcceptValentine;
