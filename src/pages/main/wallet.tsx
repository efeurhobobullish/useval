import { formatDate } from "@/helpers/formatDate";
import { formatNumber } from "@/helpers/formatNumber";
import { MainLayout } from "@/layouts";
import {
  Wallet as WalletIcon,
  InfoCircle,
  ArrowUp,
  ArrowDown,
  Copy,
  TickCircle,
  CardEdit,
} from "iconsax-reactjs";
import { useState } from "react";
import { toast } from "sonner";
import clsx from "clsx";
import useWallet from "@/hooks/useWallet";
import useFundWallet from "@/hooks/useFundWallet";
import useAuth from "@/hooks/useAuth";

export default function Wallet() {
  const { balance, transactions, refetch } = useWallet();
  const { fundWallet, loading: funding } = useFundWallet();
  const { user } = useAuth();

  const [amount, setAmount] = useState(500);
  const [copied, setCopied] = useState(false);

  const accountNumber = "8137411338";

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    toast.success("Account number copied");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFund = async () => {
    if (!user) {
      toast.error("User not loaded");
      return;
    }

    if (!amount || amount <= 0) {
      toast.error("Enter valid amount");
      return;
    }

    try {
      await fundWallet({
        fullName: user.fullName,
        phone: user.phone,
        amount,
      });

      toast.success("Funding request submitted");
      refetch();
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Funding failed"
      );
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">

        <div className="bg-white rounded-xl p-4 border border-line">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 center">
              <WalletIcon size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-muted text-xs">Wallet Balance</p>
              <h4 className="font-bold text-lg">
                ₦{formatNumber(balance)}
              </h4>
            </div>
          </div>
        </div>

        <div className="bg-secondary p-4 rounded-2xl space-y-4 border border-line">
          <h3 className="font-semibold">Fund Wallet</h3>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Select Amount
            </label>

            <div className="grid grid-cols-3 gap-2">
              {[500, 1000, 2000].map((amt) => (
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

            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) =>
                  setAmount(Number(e.target.value))
                }
                className="w-full bg-white border border-line rounded-xl px-4 py-3 text-sm outline-none focus:border-primary"
                placeholder="Custom amount"
              />
              <CardEdit
                size={18}
                className="absolute right-4 top-3 text-muted"
              />
            </div>
          </div>

          <button
            onClick={handleFund}
            disabled={funding}
            className="w-full bg-primary text-white py-3 rounded-xl text-sm font-semibold disabled:opacity-50"
          >
            {funding ? "Submitting..." : "I Have Made Payment"}
          </button>

          <div className="bg-white p-4 rounded-xl border border-line">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">
                OPay Account
              </p>

              <button
                onClick={handleCopy}
                className="h-9 w-9 rounded-full bg-secondary center"
              >
                {copied ? (
                  <TickCircle
                    size={18}
                    className="text-green-600"
                  />
                ) : (
                  <Copy
                    size={18}
                    className="text-primary"
                  />
                )}
              </button>
            </div>

            <div className="bg-secondary p-2 rounded text-xs space-y-2 mt-3">
              <div className="flex justify-between">
                <span>Account Name:</span>
                <span className="font-semibold">
                  Gift Uwem Jackson
                </span>
              </div>

              <div className="flex justify-between">
                <span>Account Number:</span>
                <span className="font-semibold">
                  {accountNumber}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex gap-3">
            <InfoCircle
              size={16}
              className="text-amber-500 mt-0.5"
            />
            <p className="text-xs text-amber-800">
              After making payment, click the button above to notify us.
              Your wallet will be credited after confirmation.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold">
            Transaction History
          </h3>

          <div className="bg-white rounded-xl border border-line divide-y divide-line">
            {transactions.map((tx) => (
              <div
                key={tx._id}
                className="flex items-center justify-between p-4"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={clsx(
                      "h-9 w-9 rounded-full center",
                      tx.type === "credit"
                        ? "bg-green-100"
                        : "bg-red-100"
                    )}
                  >
                    {tx.type === "credit" ? (
                      <ArrowDown
                        size={18}
                        className="text-green-600"
                      />
                    ) : (
                      <ArrowUp
                        size={18}
                        className="text-red-600"
                      />
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-medium">
                      {tx.description}
                    </p>
                    <p className="text-xs text-muted">
                      {formatDate(tx.createdAt)}
                    </p>
                  </div>
                </div>

                <p
                  className={clsx(
                    "text-sm font-semibold",
                    tx.type === "credit"
                      ? "text-green-600"
                      : "text-red-600"
                  )}
                >
                  {tx.type === "credit" ? "+" : "-"}₦
                  {formatNumber(tx.amount)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}