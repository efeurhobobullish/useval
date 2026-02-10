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
} from "iconsax-reactjs";
import { useState } from "react";
import { toast } from "sonner";

export default function Wallet() {
  const walletBalance = 2500;
  const userName = "Jackson";

  const whatsappMessage = encodeURIComponent(
    `I just made payment, please confirm. My name is ${userName}.`,
  );

  const transactions = [
    {
      id: 1,
      type: "credit",
      title: "Wallet funding",
      amount: 3000,
      date: new Date().toLocaleDateString(),
    },
    {
      id: 2,
      type: "debit",
      title: "Airtime purchase",
      amount: 500,
      date: new Date().toLocaleDateString(),
    },
    {
      id: 3,
      type: "credit",
      title: "Wallet funding",
      amount: 1000,
      date: new Date().toLocaleDateString(),
    },
  ];

  const accountNumber = "8137411338";
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    toast.success("Account number copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Balance */}
        <div className="bg-white rounded-xl p-4 border border-line">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 center">
              <WalletIcon size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-muted text-xs">Wallet Balance</p>
              <h4 className="font-bold text-lg">
                ₦{formatNumber(walletBalance)}
              </h4>
            </div>
          </div>
        </div>

        {/* Fund Wallet */}
        <div className="bg-secondary p-4 rounded-2xl space-y-4 border border-line">
          <h3 className="font-semibold">Fund Wallet</h3>

          <div className="bg-white p-4 rounded-xl space-y-4 border border-line ">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src="https://cdn.brandfetch.io/id2zsUpkDc/w/400/h/400/theme/dark/icon.jpeg"
                  alt="opay"
                  className="h-10 w-10 rounded-lg"
                />
                <p className="text-sm font-semibold">OPay Account</p>
              </div>
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
            <div className="bg-secondary p-2 rounded text-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted"> Account Name:</span>
                <span className="font-semibold">Gift Uwem Jackson</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Account Number:</span>
                <span className="font-semibold">{accountNumber}</span>
              </div>
            </div>
          </div>

          {/* Info badge */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex gap-3">
            <InfoCircle
              size={16}
              className="text-amber-500 mt-0.5 flex-shrink-0"
            />
            <p className="text-xs font-medium text-amber-800 leading-relaxed">
              We are currently using a personal account to avoid VAT and tax
              fees from Paystack or other third-party platforms. After making
              payment, kindly click the button below to notify us. Your
              transaction will be confirmed and your wallet credited
              immediately.
            </p>
          </div>

          {/* WhatsApp Button */}
          <a
            href={`https://wa.me/2348137411338?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="btn bg-primary text-white w-full py-3 rounded-xl text-sm font-semibold text-center"
          >
            I have made payment
          </a>
        </div>

        {/* Transaction History */}
        <div className="space-y-3">
          <h3 className="font-semibold">Transaction History</h3>

          <div className="bg-white rounded-xl border border-line divide-y divide-line">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-4"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-9 w-9 rounded-full center ${
                      tx.type === "credit" ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    {tx.type === "credit" ? (
                      <ArrowDown size={18} className="text-green-600" />
                    ) : (
                      <ArrowUp size={18} className="text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium capitalize">{tx.title}</p>
                    <p className="text-xs text-muted">
                      {formatDate(tx.date as any)}
                    </p>
                  </div>
                </div>

                <p
                  className={`text-sm font-semibold ${
                    tx.type === "credit" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {tx.type === "credit" ? "+" : "-"}₦{formatNumber(tx.amount)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
