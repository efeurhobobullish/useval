import { Link } from "react-router-dom";
import { Copy, Heart, TickCircle, CloseCircle } from "iconsax-reactjs";
import { useState } from "react";
import { toast } from "sonner";

export default function History() {
  const cards = [
    {
      id: 1,
      name: "Amaka",
      status: "accepted",
      airtime: true,
      date: "2026-02-09",
    },
    {
      id: 2,
      name: "Sarah",
      status: "pending",
      airtime: false,
      date: "2026-02-08",
    },
  ];

  const [copied, setCopied] = useState(false);
  const [cardId, setCardId] = useState<number | null>(null);
  const handleCopy = (link: string, id: number) => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setCardId(id);
    toast.success("Card Link copied!");
    setTimeout(() => {
      setCopied(false);
      setCardId(null);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      {cards.length === 0 && (
        <div className="bg-secondary p-6 min-h-[260px] center rounded-xl border border-line">
          <div className="text-center space-y-2">
            <p className="text-muted text-sm">No cards found</p>
            <Link to="/create" className="text-primary text-sm font-semibold">
              Create your first Valentine →
            </Link>
          </div>
        </div>
      )}

      {cards.length > 0 &&
        cards.map((card) => (
          <div
            key={card.id}
            className="bg-white p-4 rounded-xl border border-line flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 center">
                <Heart size={18} className="text-primary" variant="Bulk" />
              </div>

              <div>
                <p className="text-sm font-semibold">To: {card.name}</p>
                <p className="text-xs text-muted">
                  {card.date} •{" "}
                  {card.airtime ? "Airtime included" : "No airtime"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Status */}
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

              {/* Copy link */}
              <button
                onClick={() => {
                  handleCopy(`https://useval.com/card/${card.id}`, card.id);
                }}
                className="h-9 w-9 rounded-full bg-secondary center hover:bg-primary/10"
              >
                {copied && cardId === card.id ? (
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
