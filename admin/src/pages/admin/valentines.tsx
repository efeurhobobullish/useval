import { useState } from "react";
import { AdminLayout } from "@/layouts";
import { useAdminValentines } from "@/hooks";
import { Loader, Heart } from "lucide-react";

function formatDate(s: string) {
  return new Date(s).toLocaleString(undefined, {
    dateStyle: "short",
    timeStyle: "short",
  });
}

export default function Valentines() {
  const [page, setPage] = useState(1);
  const { valentines, total, limit, loading } = useAdminValentines(page, 20);
  const totalPages = Math.ceil(total / limit);

  return (
    <AdminLayout>
      <div className="page">
        <section className="section">
          <h1 className="section-title text-xl sm:text-2xl">Valentines</h1>
          <p className="section-desc">
            All cards created by users. Total: {total}.
          </p>
        </section>

        {loading ? (
          <div className="card flex items-center justify-center py-12">
            <Loader className="size-8 animate-spin text-primary" aria-hidden />
          </div>
        ) : valentines.length === 0 ? (
          <div className="card text-center py-12">
            <div className="w-16 h-16 rounded-full bg-secondary center mx-auto mb-4">
              <Heart className="size-8 text-muted" />
            </div>
            <h2 className="section-title text-base mb-1">No valentine cards yet</h2>
            <p className="section-desc">Cards will appear here once users create them.</p>
          </div>
        ) : (
          <section className="section">
            <div className="overflow-x-auto rounded-xl border border-line bg-white">
              <table className="w-full min-w-[640px] text-left">
                <thead>
                  <tr className="border-b border-line bg-secondary">
                    <th className="px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wide">
                      To / Reference
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wide">
                      From
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wide hidden sm:table-cell">
                      Airtime
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wide">
                      Status
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wide hidden md:table-cell">
                      Created
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {valentines.map((v) => (
                    <tr
                      key={v.id ?? v._id ?? v.reference}
                      className="border-b border-line last:border-0 hover:bg-secondary/30 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <p className="font-medium text-main">{v.loversName}</p>
                        <p className="text-xs text-muted font-mono">{v.reference}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm text-main">
                          {typeof v.sender === "object" && v.sender
                            ? v.sender.fullName
                            : "—"}
                        </p>
                        {typeof v.sender === "object" && v.sender?.email && (
                          <p className="text-xs text-muted">{v.sender.email}</p>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm hidden sm:table-cell">
                        {v.sendAirtime ? `₦${v.airtimeAmount}` : "—"}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded ${
                            v.status === "accepted"
                              ? "bg-green-100 text-green-700"
                              : v.status === "pending"
                                ? "bg-amber-100 text-amber-700"
                                : v.status === "expired"
                                  ? "bg-gray-100 text-muted"
                                  : "bg-red-100 text-red-700"
                          }`}
                        >
                          {v.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted hidden md:table-cell">
                        {v.createdAt ? formatDate(v.createdAt) : "—"}
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
