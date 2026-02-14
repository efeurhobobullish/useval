import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { ScrollToTop } from "@/components/ui";
import { Auth, Verify } from "./pages/auth";
import {
  Card,
  CreateCard,
  Gift,
  Home,
  Success,
  Wallet,
} from "./pages/main";
import { Protect } from "./pages";
import { useEffect } from "react";
import { useAuth } from "@/hooks";

export default function App() {
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <ScrollToTop />
      <Toaster position="top-center" richColors />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Auth />} />
        <Route path="/verify" element={<Verify />} />

        {/* Public Card Routes */}
        <Route path="/card/:id" element={<Card />} />
        <Route path="/card/:id/gift" element={<Gift />} />
        <Route path="/card/:id/success" element={<Success />} />

        {/* Protected Routes */}
        <Route element={<Protect />}>
          <Route path="/home" element={<Home />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/create" element={<CreateCard />} />
        </Route>
      </Routes>
    </>
  );
}
