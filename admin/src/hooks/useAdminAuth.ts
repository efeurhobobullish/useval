import { useEffect, useState, useCallback } from "react";
import api from "@/config/api";

export type AdminUser = {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  isVerified: boolean;
  isAdmin: boolean;
};

const useAdminAuth = () => {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const login = async (payload: { email: string; password: string }) => {
    setError(null);
    const res = await api.post("/v1/auth/admin/login", payload);
    setAdmin(res.data.admin ?? res.data.user);
    return res.data;
  };

  const checkAuth = useCallback(async () => {
    try {
      const res = await api.get("/v1/auth/admin/check");
      setAdmin(res.data.admin ?? res.data.user);
    } catch {
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = async () => {
    try {
      await api.post("/v1/auth/admin/logout");
    } finally {
      setAdmin(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return { admin, loading, error, login, logout, checkAuth };
};

export default useAdminAuth;
