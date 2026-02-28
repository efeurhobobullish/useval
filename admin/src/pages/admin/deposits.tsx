import { AdminLayout } from "@/layouts";
import {
  useAdminDeposits,
  useApproveDeposit,
  useRejectDeposit,
} from "@/hooks";
import { Loader, CheckCircle, XCircle, Wallet } from "lucide-react";
import { toast } from "sonner";

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

export default function Deposits() {
  const { deposits, loading } = useAdminDeposits();
  const approve = useApproveDeposit();
  const reject = useRejectDeposit();

  const handleApprove = (id: string) => {
    if (!id) return;

    approve.mutate(id, {
      onSuccess: () => {
        toast.success("Deposit approved");
      },
      onError: (error) => {
        toast.error(
          error.response?.data?.message ?? "Failed to approve"
        );
      },
    });
  };

  const handleReject = (id: string) => {
    if (!id) return;

    reject.mutate(id, {
      onSuccess: () => {
        toast.success("Deposit rejected");
      },
      onError: (error) => {
        toast.error(
          error.response?.data?.message ?? "Failed to reject"
        );
      },
    });
  };

  return (
    <AdminLayout>
      <div className="page">
        <section className="section">
          <h1 className="section-title text-xl sm:text-2xl">Deposits</h1>
          <p className="section-desc">
            Confirm or reject wallet funding requests from users.
          </p>
        </section>

        {loading ? (
          <div className="card flex items-center justify-center py-12">
            <Loader className="size-8 animate-spin text-primary" aria-hidden />
            <span className="sr-only">Loading...</span>
          </div>
        ) : deposits.length === 0 ? (
          <div className="card text-center py-12">
            <div className="w-16 h-16 rounded-full bg-secondary center mx-auto mb-4">
              <Wallet className="size-8 text-muted" />
            </div>
            <h2 className="section-title text-base mb-1">
              No pending deposits
            </h2>
            <p className="section-desc">
              New funding requests will appear here for you to confirm or reject.
            </p>
          </div>
        ) : (
          <section className="section">
            <h2 className="section-title">Pending requests</h2>

            {/* Mobile View */}
            <div className="block md:hidden space-y-4">
              {deposits.map((d) => {
                const depositId = d.id ?? d._id ?? "";

                return (
                  <div key={depositId} className="card">
                    <div className="flex justify-between items-start gap-3 mb-4">
                      <div className="min-w-0">
                        <p className="font-semibold text-main">
                          {d.user?.fullName}
                        </p>
                        <p className="text-sm text-muted truncate">
                          {d.user?.email}
                        </p>
                        <p className="text-sm text-muted">
                          {d.user?.phone}
                        </p>
                      </div>

                      <span className="text-lg font-bold text-primary whitespace-nowrap">
                        {formatMoney(d.amount)}
                      </span>
                    </div>

                    <div className="text-sm text-muted space-y-1 mb-4 pb-4 border-b border-line">
                      <p>Ref: {d.reference}</p>
                      <p>Current: {formatMoney(d.user?.wallet ?? 0)}</p>
                      <p>
                        After approval:{" "}
                        {formatMoney((d.user?.wallet ?? 0) + d.amount)}
                      </p>
                      <p>{formatDate(d.createdAt)}</p>
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => handleApprove(depositId)}
                        disabled={
                          approve.isPending || reject.isPending
                        }
                        className="btn btn-primary flex-1 py-2.5 rounded-lg text-sm font-semibold"
                      >
                        {approve.isPending ? (
                          <Loader className="size-4 animate-spin" />
                        ) : (
                          <>
                            <CheckCircle size={18} /> Confirm
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleReject(depositId)}
                        disabled={
                          approve.isPending || reject.isPending
                        }
                        className="btn bg-red-100 text-red-700 flex-1 py-2.5 rounded-lg text-sm font-semibold hover:bg-red-200"
                      >
                        {reject.isPending ? (
                          <Loader className="size-4 animate-spin" />
                        ) : (
                          <>
                            <XCircle size={18} /> Reject
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop View */}
            <div className="hidden md:block overflow-x-auto rounded-xl border border-line bg-white">
              <table className="w-full min-w-[640px] text-left">
                <thead>
                  <tr className="border-b border-line bg-secondary">
                    <th className="px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wide">
                      User
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wide">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wide hidden lg:table-cell">
                      Current
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wide hidden lg:table-cell">
                      Reference
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wide">
                      Date
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wide text-right">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {deposits.map((d) => {
                    const depositId = d.id ?? d._id ?? "";

                    return (
                      <tr
                        key={depositId}
                        className="border-b border-line last:border-0 hover:bg-secondary/30 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <p className="font-medium text-main">
                            {d.user?.fullName}
                          </p>
                          <p className="text-sm text-muted">
                            {d.user?.email}
                          </p>
                        </td>

                        <td className="px-4 py-3 font-bold text-primary">
                          {formatMoney(d.amount)}
                        </td>

                        <td className="px-4 py-3 text-sm text-muted hidden lg:table-cell">
                          {formatMoney(d.user?.wallet ?? 0)}
                        </td>

                        <td className="px-4 py-3 text-sm text-muted hidden lg:table-cell font-mono">
                          {d.reference}
                        </td>

                        <td className="px-4 py-3 text-sm text-muted">
                          {formatDate(d.createdAt)}
                        </td>

                        <td className="px-4 py-3 text-right">
                          <div className="flex gap-2 justify-end">
                            <button
                              type="button"
                              onClick={() => handleApprove(depositId)}
                              disabled={
                                approve.isPending || reject.isPending
                              }
                              className="btn btn-primary py-2 px-3 rounded-lg text-xs font-semibold"
                            >
                              Confirm
                            </button>

                            <button
                              type="button"
                              onClick={() => handleReject(depositId)}
                              disabled={
                                approve.isPending || reject.isPending
                              }
                              className="btn bg-red-100 text-red-700 py-2 px-3 rounded-lg text-xs font-semibold hover:bg-red-200"
                            >
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </AdminLayout>
  );
}
