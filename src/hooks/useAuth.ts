import { useEffect, useState, useCallback } from "react";
import api from "@/config/api";

export type User = {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  isVerified: boolean;
  isAdmin?: boolean;
};

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* REGISTER */
  const register = async (payload: {
    fullName: string;
    phone: string;
    email: string;
  }) => {
    setError(null);
    const res = await api.post("/v1/auth/register", payload);
    return res.data;
  };

  /* REQUEST OTP */
  const requestOtp = async (email: string) => {
    setError(null);
    const res = await api.post("/v1/auth/otp/request", { email });
    return res.data;
  };

  /* RESEND OTP */
  const resendOtp = async (email: string) => {
    setError(null);
    const res = await api.post("/v1/auth/otp/resend", { email });
    return res.data;
  };

  /* VERIFY OTP + LOGIN */
  const verifyOtp = async (payload: {
    email: string;
    code: string;
  }) => {
    setError(null);

    const res = await api.post("/v1/auth/otp/verify", payload);

    const { token, user } = res.data;

    if (token) {
      localStorage.setItem("token", token);
    }

    setUser(user);

    return res.data;
  };

  /* CHECK AUTH */
  const checkAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setUser(null);
        return;
      }

      const res = await api.get("/v1/auth/check");
      setUser(res.data.user);
    } catch {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  /* LOGOUT */
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    user,
    loading,
    error,
    register,
    requestOtp,
    resendOtp,
    verifyOtp,
    logout,
    checkAuth, // ✅ FIXED
  };
};

export default useAuth;
