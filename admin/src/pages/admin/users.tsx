import { useState } from "react";
import { AdminLayout } from "@/layouts";
import { useAdminUsers } from "@/hooks";
import { Loader, User } from "lucide-react";

function formatDate(s: string) {
  return new Date(s).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function formatMoney(n: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(n);
}

export default function Users() {
  const [page, setPage] = useState(1);
  const { users, total, limit, loading } = useAdminUsers(page, 20);
  const totalPages = Math.ceil(total / limit);

  return (
    <AdminLayout>
      <div className="page">
        <section className="section">
          <h1 className="section-title text-xl sm:text-2xl">Users</h1>
          <p className="section-desc">
            All registered users. Total: {total}.
          </p>
        </section>

        {loading ? (
          <div className="card flex items-center justify-center py-12">
            <Loader className="size-8 animate-spin text-primary" aria-hidden />
          </div>
        ) : users.length === 0 ? (
          <div className="card text-center py-12">
            <div className="w-16 h-16 rounded-full bg-secondary center mx-auto mb-4">
              <User className="size-8 text-muted" />
            </div>
            <h2 className="section-title text-base mb-1">No users yet</h2>
            <p className="section-desc">Users will appear here once they register.</p>
          </div>
        ) : (
          <section className="section">
            <div className="overflow-x-auto rounded-xl border border-line bg-white">
              <table className="w-full min-w-[600px] text-left">
                <thead>
                  <tr className="border-b border-line bg-secondary">
                    <th className="px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wide">
                      User
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wide">
                      Contact
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wide hidden sm:table-cell">
                      Wallet
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wide hidden md:table-cell">
                      Status
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wide hidden lg:table-cell">
                      Joined
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr
                      key={u.id ?? u._id ?? u.email}
                      className="border-b border-line last:border-0 hover:bg-secondary/30 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <p className="font-medium text-main">{u.fullName}</p>
                        <p className="text-sm text-muted">{u.email}</p>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted">{u.phone}</td>
                      <td className="px-4 py-3 text-sm font-medium text-main hidden sm:table-cell">
                        {formatMoney(u.wallet ?? 0)}
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="text-xs font-medium text-muted bg-secondary px-2 py-1 rounded">
                          {u.isVerified ? "Verified" : "Unverified"}
                          {u.isAdmin ? " · Admin" : ""}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted hidden lg:table-cell">
                        {u.createdAt ? formatDate(u.createdAt) : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between gap-4 mt-4">
                <p className="text-sm text-muted">
                  Page {page} of {totalPages} · {total} total
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    className="btn bg-secondary text-main px-3 py-1.5 rounded-lg text-sm font-medium disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                    className="btn bg-secondary text-main px-3 py-1.5 rounded-lg text-sm font-medium disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </AdminLayout>
  );
}
