import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TickCircle } from "iconsax-reactjs";
import useValentines from "@/hooks/useValentines";
import type { Valentine } from "@/hooks/useValentines";

export default function Success() {
  const { id } = useParams();
  const { getByReference } = useValentines();

  const [valentine, setValentine] = useState<Valentine | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!id) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        const data = await getByReference(id);
        setValentine(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen center">
        <p className="text-muted text-sm">Loading...</p>
      </div>
    );
  }

  if (error || !valentine) {
    return (
      <div className="min-h-screen center">
        <p className="text-muted text-sm">
          Card not found or no longer available
        </p>
      </div>
    );
  }

  const message =
    valentine.thankYouMessage ||
    "Thank you for saying yes. I’m happy you accepted my valentine.";

  return (
    <div className="min-h-[100dvh] overflow-hidden hide-scrollbar inset-0 bg-gradient-to-br from-primary to-amber-500 flex items-end pt-40">
      <div className="bg-white relative rounded-t-[40px] px-4 md:px-16 w-full md:w-[900px] mx-auto">
        <div className="center h-40 w-40 rounded-full bg-white absolute z-50 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <TickCircle size={100} variant="Bold" className="text-green-500" />
        </div>

        <div className="pt-20 pb-10 space-y-6 min-h-[500px] text-center">
          <div className="max-w-md mx-auto bg-secondary p-8 rounded-xl border border-line text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">It’s a yes!</h2>
              <p className="text-muted text-sm">
                Valentine reference #{valentine.reference}
              </p>
            </div>

            <div className="bg-background border border-line rounded-lg p-4 italic text-sm">
              “{message}”
            </div>

            <p className="text-xs text-muted">
              This card was sent with love
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}