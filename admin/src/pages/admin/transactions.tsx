import { useState } from "react";
import { AdminLayout } from "@/layouts";
import { useAdminTransactions } from "@/hooks";
import { Loader, Receipt } from "lucide-react";

function formatDate(s: string) {
  return new Date(s).toLocaleString(undefined, {
    dateStyle: "short",
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

export default function Transactions() {
  const [page, setPage] = useState(1);
  const { transactions, total, limit, loading } = useAdminTransactions(page, 20);
  const totalPages = Math.ceil(total / limit);

  const typeLabel = (type: string) => {
    if (type === "credit") return "Wallet funding";
    if (type === "debit") return "Debit";
    return type;
  };

  return (
    <AdminLayout>
      <div className="page">
        <section className="section">
          <h1 className="section-title text-xl sm:text-2xl">Transactions</h1>
          <p className="section-desc">
            All wallet and gift transactions. Total: {total}.
          </p>
        </section>

        {loading ? (
          <div className="card flex items-center justify-center py-12">
            <Loader className="size-8 animate-spin text-primary" aria-hidden />
          </div>
        ) : transactions.length === 0 ? (
          <div className="card text-center py-12">
            <div className="w-16 h-16 rounded-full bg-secondary center mx-auto mb-4">
              <Receipt className="size-8 text-muted" />
            </div>
            <h2 className="section-title text-base mb-1">No transactions yet</h2>
            <p className="section-desc">
              Transactions will appear here when users fund wallets or send gifts.
            </p>
          </div>
        ) : (
          <section className="section">
            <div className="overflow-x-auto rounded-xl border border-line bg-white">
              <table className="w-full min-w-[640px] text-left">
                <thead>
                  <tr className="border-b border-line bg-secondary">
                    <th className="px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wide">
                      User
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wide">
                      Type
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wide">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wide">
                      Status
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wide hidden md:table-cell">
                      Reference
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wide hidden lg:table-cell">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr
                      key={tx.id ?? tx._id ?? tx.reference}
                      className="border-b border-line last:border-0 hover:bg-secondary/30 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <p className="font-medium text-main">
                          {typeof tx.user === "object" && tx.user
                            ? tx.user.fullName
                            : "—"}
                        </p>
                        {typeof tx.user === "object" && tx.user?.email && (
                          <p className="text-xs text-muted">{tx.user.email}</p>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-muted">
                        {typeLabel(tx.type)}
                      </td>
                      <td className="px-4 py-3 font-semibold text-main">
                        {formatMoney(tx.amount)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded ${
                            tx.status === "success"
                              ? "bg-green-100 text-green-700"
                              : tx.status === "pending"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {tx.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted font-mono hidden md:table-cell">
                        {tx.reference}
                      </td>
                      <td className="px-4 py-3 text-sm text-muted hidden lg:table-cell">
                        {tx.createdAt ? formatDate(tx.createdAt) : "—"}
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
