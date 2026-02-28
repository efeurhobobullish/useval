import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { AdminLogin } from "./pages/auth";
import { AdminProtect } from "./pages";
import { Dashboard, Users, Valentines, Transactions, Deposits } from "./pages/admin";
import { useEffect } from "react";
import { useAdminAuth } from "@/hooks";

export default function App() {
  const { checkAuth } = useAdminAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route element={<AdminProtect />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/deposits" element={<Deposits />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/valentines" element={<Valentines />} />
          <Route path="/admin/transactions" element={<Transactions />} />
        </Route>
      </Routes>
    </>
  );
}
