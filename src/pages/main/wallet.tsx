import { useState } from "react";
import { formatNumber } from "@/helpers/formatNumber";
import { MainLayout } from "@/layouts";
import {
  Wallet as WalletIcon,
  InfoCircle,
  Copy,
  TickCircle,
  CardEdit,
} from "iconsax-reactjs";
import { InputWithIcon, ButtonWithLoader } from "@/components/ui";
import { toast } from "sonner";
import { useWallet } from "@/hooks";

export default function Wallet() {
  const {
    balance,
    loading,
    fundWallet,
    fundingLoading,
    refetch,
  } = useWallet();

  const [amount, setAmount] = useState(200);
  const [copied, setCopied] = useState(false);

  const accountNumber = "8137411338";
  const accountName = "Gift Uwem Jackson";

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    toast.success("Account number copied");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFund = async () => {
    if (!amount || amount <= 0) {
      toast.error("Enter valid amount");
      return;
    }

    try {
      await fundWallet(amount);
      toast.success("Funding request submitted");
      setAmount(0);
      refetch();
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Unable to submit request"
      );
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Wallet Balance */}
        <div className="bg-white rounded-xl p-4 border border-line">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 center">
              <WalletIcon size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-muted text-xs">Wallet Balance</p>
              <h4 className="font-bold text-lg">
                {loading ? "Loading..." : `₦${formatNumber(balance)}`}
              </h4>
            </div>
          </div>
        </div>

        {/* Fund Wallet */}
        <div className="bg-secondary p-4 rounded-2xl space-y-6 border border-line">
          <h3 className="font-semibold">Fund Wallet</h3>

          <div className="bg-white p-4 rounded-xl space-y-4 border border-line">
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

          {/* Amount Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Input Amount</label>

            <InputWithIcon
              type="number"
              icon={<CardEdit size={20} />}
              placeholder="Enter amount e.g 1000"
              className="bg-white"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>

          {/* Info Box */}
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

          <ButtonWithLoader
            initialText="I have made payment"
            loadingText="Submitting..."
            loading={fundingLoading}
            onClick={handleFund}
            className="w-full btn-primary h-11 rounded-xl text-sm font-semibold"
          />
        </div>
      </div>
    </MainLayout>
  );
}