import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Loader } from "lucide-react";
import { useAdminAuth } from "@/hooks";

export default function AdminProtect() {
  const { admin, loading } = useAdminAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen min-h-[100dvh] bg-gradient-to-br from-primary to-amber-500 flex flex-col items-center justify-center gap-4">
        <Loader size={32} className="animate-spin text-white" />
        <p className="text-white/90 text-sm font-medium">Loading...</p>
      </div>
    );
  }

  return admin ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}
