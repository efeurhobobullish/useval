import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Loader } from "lucide-react";
import { useAuth } from "@/hooks";
import { AnimatePresence, motion } from "framer-motion";

const Protect = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  const text = "Useval".split("");

  if (loading || user === undefined) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="auth-loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 min-h-[100dvh] w-screen 
                     bg-gradient-to-br from-primary to-amber-500 
                     flex flex-col items-center justify-center"
        >
          <div className="flex items-center gap-2">
            <motion.img
              src="/logo.png"
              alt="Useval Logo"
              className="w-12 h-12"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
            />

            <div className="flex items-center">
              {text.map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.2 + index * 0.05,
                    duration: 0.3,
                  }}
                  className="text-white text-2xl font-semibold"
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 mt-8">
            <Loader
              size={22}
              className="animate-spin text-white"
            />
            <p className="text-white/80 text-sm font-medium">
              Loading...
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default Protect;