import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CardLayout } from "@/layouts";
import { useValentines } from "@/hooks";

export default function Card() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    getByReference,
    acceptValentine,
    accepting,
  } = useValentines();

  const [valentine, setValentine] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [clickCount, setClickCount] = useState(0);
  const [position, setPosition] = useState({ x: 80, y: 0 });
  const [merged, setMerged] = useState(false);

  /* ================= LOAD CARD ================= */

  useEffect(() => {
    const load = async () => {
      if (!id) return;

      try {
        const data = await getByReference(id);
        setValentine(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  /* ================= NO BUTTON ================= */

  const jumpRandomly = () => {
    const randomX = Math.random() * 260 - 130;
    const randomY = Math.random() * 120 - 60;
    setPosition({ x: randomX, y: randomY });
  };

  const surrender = () => {
    setPosition({ x: -110, y: 0 });
    setMerged(true);
  };

  const handleNoClick = () => {
    if (merged) return;

    const next = clickCount + 1;
    setClickCount(next);

    if (next >= 7) {
      surrender();
    } else {
      jumpRandomly();
    }
  };

  /* ================= YES BUTTON ================= */

  const handleYes = async () => {
    if (!valentine || !id) return;

    try {
      if (!valentine.sendAirtime) {
        await acceptValentine(id);
        navigate(`/card/${id}/success`);
        return;
      }

      navigate(`/card/${id}/gift`);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <CardLayout>
        <p className="text-center text-muted">Loading...</p>
      </CardLayout>
    );
  }

  if (!valentine) {
    return (
      <CardLayout>
        <p className="text-center text-muted">
          Valentine not found
        </p>
      </CardLayout>
    );
  }

  return (
    <CardLayout>
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">
          <span className="text-primary">
            {valentine.loversName}
          </span>
          , will you be my Valentine?
        </h2>

        {valentine.pickupLine && (
          <p className="text-muted max-w-md mx-auto">
            {valentine.pickupLine}
          </p>
        )}
      </div>

      <div className="relative mt-10 h-32 flex items-center justify-center gap-6 overflow-hidden">
        <button
          onClick={handleYes}
          disabled={accepting}
          className="btn bg-primary -translate-x-20 text-white px-8 py-3 rounded-xl font-semibold relative z-20"
        >
          {accepting ? "Processing..." : "Yes ❤️"}
        </button>

        <button
          onClick={handleNoClick}
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
          }}
          className="btn bg-gray-200 text-gray-700 px-8 py-3 rounded-xl font-semibold transition-all duration-200 absolute z-10"
        >
          No 💔
        </button>
      </div>
    </CardLayout>
  );
}