import { InputWithIcon, ButtonWithLoader } from "@/components/ui";
import { MainLayout } from "@/layouts";
import clsx from "clsx";
import { CardEdit, User } from "iconsax-reactjs";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useValentines } from "@/hooks";

export default function CreateCard() {
  const navigate = useNavigate();
  const { createValentine, loading } = useValentines();

  const [loversName, setLoversName] = useState("");
  const [pickupLine, setPickupLine] = useState("");
  const [thankYouMessage, setThankYouMessage] = useState("");
  const [sendAirtime, setSendAirtime] = useState(false);
  const [amount, setAmount] = useState(500);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!loversName.trim()) {
      toast.error("Lover name is required");
      return;
    }

    if (sendAirtime && (!amount || amount <= 0)) {
      toast.error("Enter valid airtime amount");
      return;
    }

    try {
      await createValentine({
        loversName,
        pickupLine,
        thankYouMessage,
        sendAirtime,
        amount: sendAirtime ? amount : 0,
      });

      toast.success("Valentine card created");

      navigate("/home");
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Unable to create card"
      );
    }
  };

  return (
    <MainLayout>
      <div className="space-y-1">
        <h2 className="text-xl font-bold">Create a Valentine Card</h2>
        <p className="text-sm text-muted">
          Write something sweet and make someone smile.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <InputWithIcon
          type="text"
          label="Lover's Name"
          placeholder="e.g. Amaka"
          icon={<User size={20} />}
          className="bg-secondary"
          value={loversName}
          onChange={(e) => setLoversName(e.target.value)}
        />

        <div className="space-y-1 flex flex-col">
          <label className="text-sm text-muted font-medium">
            Pickup Line
          </label>
          <textarea
            rows={3}
            value={pickupLine}
            onChange={(e) => setPickupLine(e.target.value)}
            placeholder="Optional"
            className="input resize-none bg-secondary p-4 w-full rounded-lg text-sm border border-line focus:border-primary focus:ring-4 focus:ring-primary/10"
          />
        </div>

        <div className="space-y-1 flex flex-col">
          <label className="text-sm text-muted font-medium">
            Thank You Message
          </label>
          <textarea
            rows={3}
            value={thankYouMessage}
            onChange={(e) => setThankYouMessage(e.target.value)}
            placeholder="Optional"
            className="input resize-none bg-secondary p-4 w-full rounded-lg text-sm border border-line focus:border-primary focus:ring-4 focus:ring-primary/10"
          />
        </div>

        <div className="bg-white p-3 rounded-xl border border-line flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">Send Airtime Gift</p>
            <p className="text-xs text-muted">
              Deduct from wallet
            </p>
          </div>

          <div
            onClick={() => setSendAirtime(!sendAirtime)}
            className={clsx(
              "p-1 rounded-full transition-colors min-w-12 cursor-pointer",
              sendAirtime ? "bg-primary" : "bg-[#f1f1f1]"
            )}
          >
            <div
              className={clsx(
                "h-5 w-5 rounded-full transition-all duration-300 shadow-lg",
                sendAirtime
                  ? "bg-white translate-x-full"
                  : "bg-white translate-x-0"
              )}
            />
          </div>
        </div>

        {sendAirtime && (
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Select Amount
            </label>

            <div className="grid grid-cols-3 gap-2">
              {[200, 500, 1000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setAmount(amt)}
                  className={clsx(
                    "p-3 rounded-xl text-sm font-semibold border",
                    amount === amt
                      ? "bg-primary/10 text-primary border-primary"
                      : "bg-white border-line"
                  )}
                >
                  ₦{amt}
                </button>
              ))}
            </div>

            <InputWithIcon
              type="number"
              icon={<CardEdit size={20} />}
              placeholder="Custom amount"
              className="bg-secondary"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>
        )}

        <ButtonWithLoader
          initialText="Create Valentine Card"
          loadingText="Creating..."
          loading={loading}
          className="w-full btn-primary h-11 rounded-xl text-sm font-semibold"
        />
      </form>
    </MainLayout>
  );
}