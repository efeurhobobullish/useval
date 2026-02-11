import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { CardLayout } from "@/layouts";
import { usePublicValentine } from "@/hooks";

export default function Card() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { valentine, loading, error } = usePublicValentine(id);

  const [clickCount, setClickCount] = useState(0);
  const [position, setPosition] = useState({ x: 80, y: 0 });
  const [merged, setMerged] = useState(false);

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

  const handleYes = () => {
    if (!valentine) return;

    if (valentine.sendAirtime) {
      navigate(`/card/${id}/gift`);
    } else {
      navigate(`/card/${id}/success`);
    }
  };

  if (loading) {
    return (
      <CardLayout>
        <p className="text-center text-muted">Loading...</p>
      </CardLayout>
    );
  }

  if (error || !valentine) {
    return (
      <CardLayout>
        <p className="text-center text-muted">
          {error || "Valentine not found"}
        </p>
      </CardLayout>
    );
  }

  return (
    <CardLayout>
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">
          <span className="text-primary">
            {valentine.recipientName}
          </span>
          , will you
          <br /> be my Valentine?
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
          className="btn bg-primary -translate-x-20 text-white px-8 py-3 rounded-xl font-semibold relative z-20"
        >
          Yes ❤️
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

      <p className="text-xs text-muted mt-6 text-center">
        Try if you dare 😏
      </p>

      <p className="text-xs text-muted mt-6 text-center">
        Built by{" "}
        <a
          href="https://github.com/efeurhobobullish"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline font-semibold"
        >
          Empire Tech
        </a>{" "}
        &{" "}
        <a
          href="https://github.com/learnwithjacksun"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline font-semibold"
        >
          Gift Jacksun
        </a>
      </p>
    </CardLayout>
  );
}