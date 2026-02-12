import { VerifyAccount } from "@/components/auth";
import { Heart } from "iconsax-reactjs";
import { useEffect, useState } from "react";

const avatars = [
  "Gift Jacksun",
  "Empire Tech",
  "Amaka Bello",
  "Tunde Ajayi",
  "Sarah Kim",
];

export default function Auth() {
  const [count, setCount] = useState(0);
  const target = 21;

  useEffect(() => {
    if (count >= target) return;

    const timer = setTimeout(() => {
      setCount((prev) => prev + 1);
    }, 60);

    return () => clearTimeout(timer);
  }, [count]);

  return (
    <div className="min-h-[100dvh] inset-0 bg-gradient-to-br from-primary to-amber-500 flex items-end pt-40">
      <div className="bg-white relative rounded-t-[40px] px-4 w-full md:w-[480px] mx-auto">
        <div className="center h-40 w-40 rounded-full bg-white absolute z-50 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Heart variant="Bulk" size={100} className="text-primary" />
        </div>

        <div className="pt-20 space-y-6">
          <div className="space-y-4">
            <p className="text-center border border-line/70 px-4 text-sm w-fit bg-secondary mx-auto p-1 rounded-lg text-gray-500 mt-2">
              The best way to find love a valentine
            </p>

            <h1 className="text-4xl font-bold text-center">
              Welcome to Useval
            </h1>

            <p className="text-muted text-sm text-center">
              Build and share Valentine cards, send real airtime gifts, and track
              responses in one place
            </p>
          </div>

          <div className="flex flex-col items-center gap-2 mt-3">
            <div className="flex -space-x-3">
              {avatars.map((name, i) => (
                <img
                  key={i}
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    name
                  )}&background=random`}
                  alt={name}
                  className="h-9 w-9 rounded-full border-4 border-white"
                />
              ))}
            </div>

            <p className="text-xs text-muted">
              {count}+ people already sent Valentine gifts
            </p>
          </div>

          <div className="min-h-[500px]">
            <div className="border border-line rounded-2xl p-4 space-y-6 mb-10">
              <VerifyAccount />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
