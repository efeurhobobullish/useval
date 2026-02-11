import { Link } from "react-router-dom";
import { Copy, Heart, TickCircle, CloseCircle } from "iconsax-reactjs";
import { useState } from "react";
import { toast } from "sonner";
import { useValentines } from "@/hooks";

export default function History() {
  const { valentines, loading } = useValentines();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (reference: string) => {
    const link = `${window.location.origin}/card/${reference}`;
    navigator.clipboard.writeText(link);
    setCopiedId(reference);
    toast.success("Card link copied");
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) {
    return (
      <div className="p-6 rounded-xl border border-line text-center">
        <p className="text-sm text-muted">Loading cards...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {valentines.length === 0 && (
        <div className="p-12 text-center space-y-6">
          <div className="h-20 w-20 rounded-full bg-primary/10 center mx-auto">
            <Heart size={36} variant="Bulk" className="text-primary" />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">
              No Valentine Cards Yet
            </h3>
            <p className="text-sm text-muted max-w-sm mx-auto">
              You have not created any Valentine cards. Start now and make someone smile today.
            </p>
          </div>

          <Link
            to="/create"
            className="btn bg-primary/20 text-primary font-semibold text-sm px-6 h-11 rounded-lg inline-flex"
          >
            Create Your First Card
          </Link>
        </div>
      )}

      {valentines.length > 0 &&
        valentines.map((card) => (
          <div
            key={card._id}
            className="p-4 rounded-xl border border-line flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 center">
                <Heart size={18} variant="Bulk" className="text-primary" />
              </div>

              <div>
                <p className="text-sm font-semibold">
                  To: {card.recipientName}
                </p>
                <p className="text-xs text-muted">
                  {new Date(card.createdAt).toLocaleDateString()} •{" "}
                  {card.sendAirtime ? "Airtime included" : "No airtime"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {card.status === "accepted" && (
                <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  <TickCircle size={14} />
                  Accepted
                </span>
              )}

              {card.status === "pending" && (
                <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                  Pending
                </span>
              )}

              {(card.status === "rejected" ||
                card.status === "failed") && (
                <span className="flex items-center gap-1 text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">
                  <CloseCircle size={14} />
                  Failed
                </span>
              )}

              <button
                onClick={() => handleCopy(card.reference)}
                className="h-9 w-9 rounded-full bg-secondary center hover:bg-primary/10"
              >
                {copiedId === card.reference ? (
                  <TickCircle size={16} className="text-green-600" />
                ) : (
                  <Copy size={16} className="text-primary" />
                )}
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}