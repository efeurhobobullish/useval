import { useParams, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { CardLayout } from "@/layouts";

export default function Card() {
  const { id } = useParams();
  const navigate = useNavigate();

  const yesRef = useRef<HTMLButtonElement | null>(null);

  const card = {
    recipient: "Amaka",
    pickupLine: "Are you WiFi? Because I'm feeling the connection 😌",
    hasAirtime: true,
  };

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [activated, setActivated] = useState(false);
  const [escapeCount, setEscapeCount] = useState(0);
  const [merged, setMerged] = useState(false);

  const randomMove = () => {
    const maxX = window.innerWidth - 200;
    const maxY = window.innerHeight - 300;

    const randomX = Math.random() * maxX - maxX / 2;
    const randomY = Math.random() * maxY - maxY / 2;

    setPosition({ x: randomX, y: randomY });
  };

  const mergeWithYes = () => {
    if (!yesRef.current) return;

    const rect = yesRef.current.getBoundingClientRect();

    setPosition({
      x: rect.left - window.innerWidth / 2 + rect.width / 2 - 30,
      y: rect.top - window.innerHeight / 2 + rect.height / 2 - 20,
    });

    setMerged(true);
  };

  const handleNoClick = () => {
    if (!activated) {
      setActivated(true);
      randomMove();
      setEscapeCount(1);
      return;
    }

    if (escapeCount >= 5) {
      mergeWithYes();
      return;
    }

    setEscapeCount((prev) => prev + 1);
    randomMove();
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

      <div className="relative mt-12 h-40 flex items-center justify-center gap-6">
        {/* YES */}
        <button
          ref={yesRef}
          onClick={handleYes}
          className="btn bg-primary text-white px-8 py-3 rounded-xl font-semibold z-20 relative"
        >
          Yes ❤️
        </button>

        {/* NO */}
        <button
          onClick={handleNoClick}
          onMouseEnter={activated && !merged ? randomMove : undefined}
          style={{
            transform: activated
              ? `translate(${position.x}px, ${position.y}px)`
              : "translate(0px, 0px)",
          }}
          className="btn bg-secondary border border-line text-main px-8 py-3 rounded-xl font-semibold transition-all duration-300 ease-in-out absolute z-10"
        >
          No 💔
        </button>
      </div>

      <p className="text-xs text-muted mt-6 text-center">
        Resistance is temporary 😌
      </p>

      <p className="text-xs text-muted mt-8 text-center leading-relaxed">
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
