import { AdminLayout } from "@/layouts";
import { Users, Heart, Receipt, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { useAdminStats } from "@/hooks";
import { clsx } from "clsx";

const STAT_CARDS = [
  { label: "Users", path: "/admin/users", icon: Users, key: "users" as const },
  { label: "Valentines", path: "/admin/valentines", icon: Heart, key: "valentines" as const },
  { label: "Transactions", path: "/admin/transactions", icon: Receipt, key: "transactions" as const },
  { label: "Pending deposits", path: "/admin/deposits", icon: Wallet, key: "pendingDeposits" as const },
];

export default function Dashboard() {
  const { stats, loading } = useAdminStats();

  return (
    <AdminLayout>
      <div className="page">
        <section className="section">
          <h1 className="section-title text-xl sm:text-2xl">Dashboard</h1>
          <p className="section-desc">Overview of the Useval platform.</p>
        </section>

        <section className="section">
          <h2 className="section-title">Overview</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STAT_CARDS.map(({ label, path, icon: Icon, key }) => (
              <Link
                key={key}
                to={path}
                className="card hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-muted uppercase tracking-wide">
                      {label}
                    </p>
                    <p className="text-xl font-bold text-main mt-1 truncate">
                      {loading ? "—" : (stats?.[key] ?? 0)}
                    </p>
                  </div>
                  <div
                    className={clsx(
                      "h-10 w-10 rounded-xl center flex-shrink-0",
                      key === "pendingDeposits" && (stats?.pendingDeposits ?? 0) > 0
                        ? "bg-amber-500"
                        : "bg-primary"
                    )}
                  >
                    <Icon size={20} className="text-white" />
                  </div>
                </div>
                <span className="text-primary text-sm font-medium mt-3 inline-block">
                  View →
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">Quick actions</h2>
          <div className="card">
            <p className="text-sm text-muted leading-relaxed">
              Use{" "}
              <Link to="/admin/deposits" className="text-primary font-semibold hover:underline">
                Deposits
              </Link>{" "}
              to confirm or reject wallet funding requests. Manage users,
              valentines, and transactions from the menu above.
            </p>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
