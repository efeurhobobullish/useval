import { InputWithIcon } from "@/components/ui";
import { MainLayout } from "@/layouts";
import clsx from "clsx";
import { CardEdit, User } from "iconsax-reactjs";
import { useState } from "react";

export default function CreateCard() {
  const [sendAirtime, setSendAirtime] = useState(false);
  const [amount, setAmount] = useState(500);

  return (
    <MainLayout>
      {/* Header */}
      <div className=" space-y-1">
        <h2 className="text-xl font-bold">Create a Valentine Card</h2>
        <p className="text-sm text-muted">
          Write something sweet and make someone smile today 💖
        </p>
      </div>

      {/* Form */}
      <form className="space-y-4">
        <InputWithIcon
          type="text"
          label="Lover's Name"
          placeholder="e.g. Amaka"
          icon={<User size={20} />}
          className="bg-secondary"
        />

        {/* Pickup line */}
        <div className="space-y-1 flex flex-col">
          <label className="text-sm text-muted font-medium">
            Pickup Line -{" "}
            <span className="text-xs text-muted italic">Optional</span>
          </label>
          <textarea
            rows={3}
            placeholder="e.g You are the water in my well..."
            className="input resize-none bg-secondary p-4 w-full rounded-lg text-sm border border-line focus:border-primary focus:ring-4 focus:ring-primary/10 read-only:opacity-60 read-only:focus:ring-0 read-only:focus:border-line"
          />
        </div>

        {/* Thank you message */}
        <div className="space-y-1 flex flex-col">
          <label className="text-sm text-muted font-medium">
            Thank you message (after yes) -{" "}
            <span className="text-xs text-muted italic">Optional</span>
          </label>
          <textarea
            rows={3}
            placeholder="e.g I am so grateful for bla bla bla..."
            className="input resize-none bg-secondary p-4 w-full rounded-lg text-sm border border-line focus:border-primary focus:ring-4 focus:ring-primary/10 read-only:opacity-60 read-only:focus:ring-0 read-only:focus:border-line"
          />
        </div>

        {/* Airtime Toggle */}
        <div className="bg-white p-3 rounded-xl border border-line flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">Send Airtime Gift</p>
            <p className="text-xs text-muted">
              Surprise them with a small reward
            </p>
          </div>

          <div
            onClick={() => setSendAirtime(!sendAirtime)}
            className={clsx(
              "p-1 rounded-full transition-colors min-w-12 cursor-pointer",
              sendAirtime ? "bg-primary" : "bg-[#f1f1f1]",
            )}
          >
            <div
              className={clsx(
                "h-5 w-5 rounded-full transition-all duration-400 shadow-lg",
                sendAirtime
                  ? "bg-white translate-x-full"
                  : "bg-white translate-x-0",
              )}
            ></div>
          </div>
        </div>

        {/* Airtime Amount */}
        {sendAirtime && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Amount</label>
            <div className="grid grid-cols-3 gap-2">
              {[200, 500, 1000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setAmount(amt)}
                  className={`p-3 rounded-xl text-sm font-semibold border ${
                    amount === amt
                      ? "bg-primary/10 text-primary border-primary"
                      : "bg-white border-line"
                  }`}
                >
                  ₦{amt}
                </button>
              ))}
            </div>
            <InputWithIcon
              type="number"
              icon={<CardEdit size={20} />}
              placeholder="Custom amount e.g 250"
              className="bg-secondary"
            />
          </div>
        )}

        {/* Submit */}
        <button className="btn bg-primary text-white w-full py-3 rounded-xl font-semibold">
          Create Valentine Card 💌
        </button>
      </form>
    </MainLayout>
  );
}
