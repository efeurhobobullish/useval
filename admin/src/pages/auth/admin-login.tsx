import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/hooks";
import { Heart, Loader } from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login, error } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setLoading(true);
    try {
      await login({ email, password });
      navigate("/admin");
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setLocalError(msg ?? "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen min-h-[100dvh] bg-gradient-to-br from-primary to-amber-500 flex flex-col items-center pt-24 sm:pt-32 md:pt-40">
      <div className="bg-white relative rounded-t-[32px] sm:rounded-t-[40px] px-4 w-full max-w-[480px] flex-1">
        <div className="center h-32 w-32 sm:h-40 sm:w-40 rounded-full bg-white absolute z-50 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg">
          <Heart size={80} className="text-primary fill-primary sm:w-[100px] sm:h-[100px] w-20 h-20" />
        </div>

        <div className="pt-16 sm:pt-20 space-y-4 sm:space-y-6 pb-8">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-main">Useval Admin</h1>
            <p className="text-muted text-sm">Sign in with your admin account</p>
          </div>

          {(error || localError) && (
            <div className="p-3 rounded-xl bg-red-50 text-red-700 text-sm border border-red-100">
              {localError ?? error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 border border-line rounded-2xl p-4">
            <div>
              <label className="block text-sm font-medium text-main mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 border border-line rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
                placeholder="admin@useval.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-main mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 border border-line rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full py-2.5 rounded-lg"
            >
              {loading ? <Loader size={20} className="animate-spin" /> : "Sign in"}
            </button>
          </form>

          <p className="text-center text-muted text-xs">
            Default: admin@useval.com / Admin123! (after running backend seed)
          </p>
        </div>
      </div>
    </div>
  );
}
