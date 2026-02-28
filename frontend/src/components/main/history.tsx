import { Copy, Heart, TickCircle, Clock } from "iconsax-reactjs";
import { useState } from "react";
import { toast } from "sonner";
import { useValentines } from "@/hooks";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

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
      <div className="card py-10 text-center">
        <p className="text-sm text-muted">Loading cards...</p>
      </div>
    );
  }

  if (valentines.length === 0) {
    return (
      <div className="card py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 center mx-auto mb-4">
          <Heart size={28} variant="Bulk" className="text-primary" />
        </div>
        <h3 className="section-title text-base mb-1">No Valentine cards yet</h3>
        <p className="section-desc max-w-sm mx-auto">
          Create a card and share the link to surprise someone.
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {valentines.map((card) => (
        <li
          key={card.id}
          className="card-tight flex items-center justify-between gap-4 hover:bg-secondary/30 transition-colors"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-10 w-10 rounded-full bg-primary/10 center flex-shrink-0">
              <Heart size={18} variant="Bulk" className="text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-main">To: {card.loversName}</p>
              <p className="text-xs text-muted">
                {formatDate(card.createdAt)}
                {card.sendAirtime ? ` · ₦${card.airtimeAmount} airtime` : " · No airtime"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            {card.status === "accepted" && (
              <span className="flex items-center gap-1.5 text-xs font-medium text-green-700 bg-green-100 px-2.5 py-1 rounded-full">
                <TickCircle size={14} /> Accepted
              </span>
            )}
            {card.status === "pending" && (
              <span className="flex items-center gap-1.5 text-xs font-medium text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">
                <Clock size={14} /> Pending
              </span>
            )}
            {card.status === "expired" && (
              <span className="text-xs font-medium text-muted bg-gray-100 px-2.5 py-1 rounded-full">
                Expired
              </span>
            )}
            <button
              type="button"
              onClick={() => handleCopy(card.reference)}
              className="h-9 w-9 rounded-full bg-secondary center hover:bg-primary/10 hover:text-primary transition-colors"
              aria-label="Copy card link"
            >
              {copiedId === card.reference ? (
                <TickCircle size={18} className="text-green-600" />
              ) : (
                <Copy size={18} className="text-primary" />
              )}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
