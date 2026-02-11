import { Link } from "react-router-dom";
import { Copy, Heart, TickCircle, CloseCircle } from "iconsax-reactjs";
import { useState } from "react";
import { toast } from "sonner";
import { useMyValentines } from "@/hooks";

export default function History() {
  const { valentines, loading } = useMyValentines();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (reference: string, id: string) => {
    const link = `${window.location.origin}/card/${reference}`;
    navigator.clipboard.writeText(link);

    setCopiedId(id);
    toast.success("Card link copied");

    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="bg-secondary p-6 min-h-[200px] center rounded-xl border border-line">
        <p className="text-muted text-sm">Loading cards...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {valentines.length === 0 && (
        <div className="bg-secondary p-6 min-h-[260px] center rounded-xl border border-line">
          <div className="text-center space-y-2">
            <p className="text-muted text-sm">No cards found</p>
            <Link to="/create" className="text-primary text-sm font-semibold">
              Create your first Valentine →
            </Link>
          </div>
        </div>
      )}

      {valentines.map((card) => (
        <div
          key={card.id}
          className="bg-white p-4 rounded-xl border border-line flex items-center justify-between"
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

            {card.status === "rejected" && (
              <span className="flex items-center gap-1 text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">
                <CloseCircle size={14} />
                Rejected
              </span>
            )}

            {card.status === "failed" && (
              <span className="flex items-center gap-1 text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">
                <CloseCircle size={14} />
                Failed
              </span>
            )}

            <button
              onClick={() => handleCopy(card.reference, card.id)}
              className="h-9 w-9 rounded-full bg-secondary center hover:bg-primary/10"
            >
              {copiedId === card.id ? (
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