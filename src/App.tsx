import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { ScrollToTop } from "@/components/ui";
import { Auth, Verify } from "./pages/auth";
import { Card, CreateCard, Gift, Home, Success, Wallet } from "./pages/main";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/home" element={<Home />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/create" element={<CreateCard />} />
        <Route path="/card/:id" element={<Card />} />
        <Route path="/card/:id/gift" element={<Gift />} />
        <Route path="/card/:id/success" element={<Success />} />
      </Routes>
    </>
  );
}
