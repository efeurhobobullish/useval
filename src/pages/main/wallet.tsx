import { useState } from "react";
import clsx from "clsx";
import { formatDate } from "@/helpers/formatDate";
import { formatNumber } from "@/helpers/formatNumber";
import { MainLayout } from "@/layouts";
import {
  Wallet as WalletIcon,
  ArrowUp,
  ArrowDown,
  Copy,
  TickCircle,
  CardEdit,
} from "iconsax-reactjs";
import { toast } from "sonner";
import { InputWithIcon } from "@/components/ui";
import { useWallet } from "@/hooks";

export default function Wallet() {
  const { balance, transactions } = useWallet();

  const accountNumber = "8137411338";
  const accountName = "Gift Uwem Jackson";
  const bankName = "OPay";

  const [copied, setCopied] = useState(false);
  const [amount, setAmount] = useState(500);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopied(true);
      toast.success("Account number copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Copy failed");
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello, I have made a payment of ₦${amount}. Please confirm and credit my wallet.`
  );

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
            <label className="text-sm font-medium">Select Amount</label>

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
              placeholder="Custom amount e.g 250"
              className="bg-white"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>

          <div className="bg-white p-4 rounded-xl space-y-4 border border-line">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">{bankName} Account</p>

              <button
                onClick={handleCopy}
                className="h-9 w-9 rounded-full bg-secondary center hover:bg-primary/10 transition"
              >
                {copied ? (
                  <TickCircle size={18} className="text-green-600" />
                ) : (
                  <Copy size={18} className="text-primary" />
                )}
              </button>
            </div>

            <div className="bg-secondary p-3 rounded text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-muted">Account Name</span>
                <span className="font-semibold">{accountName}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted">Account Number</span>
                <span className="font-semibold">{accountNumber}</span>
              </div>
            </div>
          </div>

          <a
            href={`https://wa.me/2348137411338?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="btn bg-primary text-white w-full py-3 rounded-xl text-sm font-semibold text-center"
          >
            I have made payment
          </a>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold">Transaction History</h3>

          <div className="bg-white rounded-xl border border-line divide-y divide-line">
            {transactions.map((tx) => (
              <div
                key={tx._id}
                className="flex items-center justify-between p-4"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-9 w-9 rounded-full center ${
                      tx.type === "credit"
                        ? "bg-green-100"
                        : "bg-red-100"
                    }`}
                  >
                    {tx.type === "credit" ? (
                      <ArrowDown size={18} className="text-green-600" />
                    ) : (
                      <ArrowUp size={18} className="text-red-600" />
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-medium capitalize">
                      {tx.type}
                    </p>
                    <p className="text-xs text-muted">
                      {formatDate(new Date(tx.createdAt))}
                    </p>
                  </div>
                </div>

                <p
                  className={`text-sm font-semibold ${
                    tx.type === "credit"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
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