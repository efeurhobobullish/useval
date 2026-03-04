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
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message ?? "Failed to approve"
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
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message ?? "Failed to reject"
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
            <Loader className="size-8 animate-spin text-primary" />
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
              New funding requests will appear here.
            </p>
          </div>
        ) : (
          <section className="section">
            <h2 className="section-title">Pending requests</h2>

            <div className="space-y-4">
              {deposits.map((d) => {
                const depositId = d.id ?? d._id ?? "";

                return (
                  <div key={depositId} className="card">
                    <div className="flex justify-between mb-4">
                      <div>
                        <p className="font-semibold">
                          {d.user.fullName}
                        </p>
                        <p className="text-sm text-muted">
                          {d.user.email}
                        </p>

                        {/* DATE ADDED HERE */}
                        {d.createdAt && (
                          <p className="text-xs text-muted mt-1">
                            {formatDate(d.createdAt)}
                          </p>
                        )}
                      </div>

                      <span className="font-bold text-primary">
                        {formatMoney(d.amount)}
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleApprove(depositId)}
                        disabled={
                          approve.isPending || reject.isPending
                        }
                        className="btn btn-primary flex-1"
                      >
                        {approve.isPending ? (
                          <Loader className="size-4 animate-spin" />
                        ) : (
                          <>
                            <CheckCircle size={16} /> Confirm
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleReject(depositId)}
                        disabled={
                          approve.isPending || reject.isPending
                        }
                        className="btn bg-red-100 text-red-700 flex-1"
                      >
                        {reject.isPending ? (
                          <Loader className="size-4 animate-spin" />
                        ) : (
                          <>
                            <XCircle size={16} /> Reject
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </AdminLayout>
  );
}
