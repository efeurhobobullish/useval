import { useEffect, useState } from "react";
import api from "@/config/api";

/* ================= TYPES ================= */

export type ValentineStatus = "pending" | "accepted" | "expired";

export type Valentine = {
  _id: string;
  reference: string;
  loversName: string;
  pickupLine?: string | null;
  thankYouMessage?: string | null;
  sendAirtime: boolean;
  airtimeAmount: number;
  status: ValentineStatus;
  createdAt: string;
  expiresAt: string;
};

export type ValentineStats = {
  total: number;
  pending: number;
  accepted: number;
  expired: number;
};

/* ================= HOOK ================= */

const useValentines = () => {
  const [valentines, setValentines] = useState<Valentine[]>([]);
  const [stats, setStats] = useState<ValentineStats>({
    total: 0,
    pending: 0,
    accepted: 0,
    expired: 0,
  });
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [accepting, setAccepting] = useState(false);

  /* FETCH MY VALENTINES */
  const fetchValentines = async () => {
    try {
      const res = await api.get("/v1/valentine/me");
      setValentines(res.data.valentines || []);
    } finally {
      setLoading(false);
    }
  };

  /* FETCH STATS */
  const fetchStats = async () => {
    const res = await api.get("/v1/valentine/me/stats");
    setStats(res.data.stats);
  };

  /* CREATE */
  const createValentine = async (payload: {
    recipientName: string;
    pickupLine?: string;
    thankYouMessage?: string;
    sendAirtime: boolean;
    amount?: number;
  }) => {
    setCreating(true);
    try {
      const res = await api.post("/v1/valentine", payload);
      await fetchValentines();
      await fetchStats();
      return res.data;
    } finally {
      setCreating(false);
    }
  };

  /* GET BY ID */
  const getMyValentineById = async (id: string) => {
    const res = await api.get(`/v1/valentine/me/${id}`);
    return res.data.valentine;
  };

  /* PUBLIC VIEW */
  const getByReference = async (reference: string) => {
    const res = await api.get(`/v1/valentine/view/${reference}`);
    return res.data.valentine;
  };

  /* ACCEPT */
  const acceptValentine = async (
    reference: string,
    payload?: { phone?: string; network?: string }
  ) => {
    setAccepting(true);
    try {
      const res = await api.post(
        `/v1/valentine/accept/${reference}`,
        payload || {}
      );
      return res.data;
    } finally {
      setAccepting(false);
    }
  };

  /* INIT */
  useEffect(() => {
    Promise.all([fetchValentines(), fetchStats()]).finally(() =>
      setLoading(false)
    );
  }, []);

  return {
    valentines,
    stats,
    loading,
    creating,
    accepting,
    refetch: fetchValentines,
    refetchStats: fetchStats,
    createValentine,
    getMyValentineById,
    getByReference,
    acceptValentine,
  };
};

export default useValentines;