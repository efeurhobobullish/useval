import { NewAccount, ExistingAccount } from "@/components/auth";
import { Heart } from "iconsax-reactjs";
import { useState } from "react";

  const avatars = [
    "Gift Jacksun",
    "Amaka Bello",
    "Tunde Ajayi",
    "Sarah Kim",
    "John Doe",
  ];

export default function Auth() {
  const [activeTab, setActiveTab] = useState("new");
  const tabs = [
    {
      id: "new",
      label: "New",
    },
    {
      id: "existing",
      label: "Existing",
    },
  ];
  return (
    <div className="min-h-[100dvh] inset-0 bg-gradient-to-br from-primary to-amber-500 flex items-end pt-40">
        <div className="bg-white relative rounded-t-[40px] px-4 w-full md:w-[480px] mx-auto">
          <div className="center h-40 w-40 rounded-full bg-white absolute z-50 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Heart variant="Bulk" size={100} className="text-primary" />
          </div>

          <div className="pt-20 space-y-6">
            <div className="space-y-4">
               <p className="text-center border border-line/70 px-4 text-sm w-fit bg-secondary mx-auto p-1 rounded-lg text-gray-500 mt-2">
                The best way to find love... a valentine.
              </p>
              <h1 className="text-4xl font-bold text-center">
                Welcome to Useval
              </h1>
             
               <p className="text-muted text-sm text-center">
          Build and share Valentine cards, send real airtime gifts, and track
          responses in one place.
        </p>
            </div>

             <div className="flex flex-col items-center md:gap-3 gap-2 mt-3 flex-wrap">
        <div className="flex -space-x-3">
          {avatars.map((name, i) => (
            <img
              key={i}
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`}
              alt={name}
              className="h-9 w-9 rounded-full border-4 border-white"
            />
          ))}
        </div>

        <p className="text-xs text-muted">
          20+ people already sent Valentine gifts
        </p>
      </div>

            <div className="min-h-[500px]">
              <div className="border border-line rounded-2xl p-4 h-fit space-y-6 mb-10">
                <div className="flex gap-2 bg-secondary rounded-xl p-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold flex-1 ${
                        activeTab === tab.id
                          ? "bg-primary text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                {activeTab === "new" ? <NewAccount /> : <ExistingAccount />}
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
