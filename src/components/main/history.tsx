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
    toast.success("Card Link copied!");
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="bg-secondary p-6 min-h-[260px] center rounded-xl border border-line">
        <p className="text-muted text-sm">Loading cards...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {valentines.length === 0 && (
        <div className="bg-secondary p-8 min-h-[260px] center rounded-xl border border-line">
          <div className="text-center space-y-4 max-w-sm">
            <div className="h-16 w-16 rounded-full bg-primary/10 center mx-auto">
              <Heart size={28} variant="Bulk" className="text-primary" />
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">No Valentine Cards Yet</h4>
              <p className="text-sm text-muted leading-relaxed">
                Surprise someone special today. Write something sweet, add a
                little airtime gift, and make them smile.
              </p>
            </div>
          </div>
        </div>
      )}

      {valentines.length > 0 &&
        valentines.map((card) => (
          <div
            key={card._id}
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