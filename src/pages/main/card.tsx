import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { CardLayout } from "@/layouts";

export default function Card() {
  const { id } = useParams();
  const navigate = useNavigate();

  const card = {
    recipient: "Blessing",
    pickupLine: "Are you WiFi? Because I'm feeling the connection 😌",
    hasAirtime: true,
  };

  const [clickCount, setClickCount] = useState(0);
  const [position, setPosition] = useState({ x: 80, y: 0 });
  const [merged, setMerged] = useState(false);

  const jumpRandomly = () => {
    const randomX = Math.random() * 260 - 130;
    const randomY = Math.random() * 120 - 60;

    setPosition({
      x: randomX,
      y: randomY,
    });
  };

  const surrender = () => {
    // Move close to YES but leave small visible edge
    setPosition({
      x: -110,
      y: 0,
    });

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
    if (card.hasAirtime) {
      navigate(`/card/${id}/gift`);
    } else {
      navigate(`/card/${id}/success`);
    }
  };

  return (
    <CardLayout>
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">
          <span className="text-primary">{card.recipient}</span>, will you
          <br /> be my Valentine?
        </h2>

        <p className="text-muted max-w-md mx-auto">
          {card.pickupLine}
        </p>
      </div>

      <div className="relative mt-10 h-32 flex items-center justify-center gap-6 overflow-hidden">
        {/* YES - fixed left */}
        <button
          onClick={handleYes}
          className="btn bg-primary -translate-x-20 text-white px-8 py-3 rounded-xl font-semibold relative z-20"
        >
          Yes ❤️
        </button>

        {/* NO - fixed right initially */}
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