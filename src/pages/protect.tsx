import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks";
import { motion } from "framer-motion";

const Protect = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Loading state
  if (loading) {
    return (
      <div className="min-h-[100dvh] bg-gradient-to-br from-primary to-amber-500 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="bg-background rounded-[32px] px-10 py-12 flex flex-col items-center gap-6 shadow-xl"
        >
          {/* Logo */}
          <img
            src="/logo.png"
            alt="Useval Logo"
            className="w-14 h-14"
          />

          {/* Brand Name */}
          <h2 className="text-main text-2xl font-semibold">
            Useval
          </h2>

          {/* Loader */}
          <div className="flex items-center gap-3">
            <Loader2 className="animate-spin text-primary" size={20} />
            <span className="text-muted text-sm">
              Securing your session...
            </span>
          </div>
        </motion.div>
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Authenticated
  return <Outlet />;
};

export default Protect;