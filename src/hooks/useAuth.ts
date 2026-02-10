import { useEffect, useState } from "react";
import api from "@/config/api";

export type User = {
  _id: string;
  fullName: string;
  phone: string;
  isVerified: boolean;
  isAdmin?: boolean;
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const register = async (payload: { fullName: string; phone: string }) => {
    setError(null);
    const res = await api.post("/auth/register", payload);
    return res.data;
  };

  const requestOtp = async (phone: string) => {
    setError(null);
    const res = await api.post("/auth/otp/request", { phone });
    return res.data;
  };

  const resendOtp = async (phone: string) => {
    setError(null);
    const res = await api.post("/auth/otp/resend", { phone });
    return res.data;
  };

  const verifyOtp = async (payload: { phone: string; code: string }) => {
    setError(null);
    const res = await api.post("/auth/otp/verify", payload);
    setUser(res.data.user);
    return res.data;
  };

  const checkAuth = async () => {
    try {
      const res = await api.get("/auth/check");
      setUser(res.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return {
    user,
    loading,
    error,
    register,
    requestOtp,
    resendOtp,
    verifyOtp,
    logout,
    refetchAuth: checkAuth,
  };
};