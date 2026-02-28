import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { formatNumber } from "@/helpers/formatNumber";
import { MainLayout } from "@/layouts";
import {
  Wallet as WalletIcon,
  InfoCircle,
  Copy,
  TickCircle,
  CardEdit,
  ArrowDown,
  ArrowUp,
} from "iconsax-reactjs";
import { InputWithIcon, ButtonWithLoader } from "@/components/ui";
import { toast } from "sonner";
import { useWallet, useTransactions } from "@/hooks";

const ACCOUNT_NUMBER = "6118443686";
const ACCOUNT_NAME = "BULLISH EFEURHOBO";

export default function Wallet() {
  const {
    balance,
    loading,
    fundWallet,
    fundingLoading,
    refetch: refetchWallet,
  } = useWallet();
  const { transactions, loading: txLoading, refetch } = useTransactions();
  const [amount, setAmount] = useState<number>(200);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleCopy = () => {
    navigator.clipboard.writeText(ACCOUNT_NUMBER);
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
      refetchWallet();
      refetch();
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      toast.error(message || "Unable to submit request");
    }
  };

  return (
    <MainLayout>
      <div className="page">
        {/* Balance */}
        <section className="section">
          <h2 className="section-title">Wallet Balance</h2>
          <div className="card">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 center flex-shrink-0">
                <WalletIcon size={24} className="text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted">Available balance</p>
                <p className="text-2xl font-bold text-main">
                  ₦
                  {!loading && (
                    <CountUp start={0} end={balance} duration={1.5} separator="," />
                  )}
                  {loading && "0"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Fund wallet */}
        <section className="section">
          <h2 className="section-title">Fund Wallet</h2>
          <p className="section-desc mb-4">
            Transfer to the account below, then submit the amount for confirmation.
          </p>
          <div className="card space-y-5">
            <div>
              <p className="text-xs font-medium text-muted uppercase tracking-wide mb-2">
                Bank details
              </p>
              <div className="card-tight bg-secondary/50">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://cdn.brandfetch.io/id2zsUpkDc/w/400/h/400/theme/dark/icon.jpeg"
                      alt="OPay"
                      className="h-10 w-10 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-semibold text-main">OPay</p>
                      <p className="text-sm text-muted">{ACCOUNT_NAME}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="h-10 w-10 rounded-full bg-white border border-line center hover:bg-primary/10 hover:border-primary/30 transition-colors"
                    aria-label="Copy account number"
                  >
                    {copied ? (
                      <TickCircle size={20} className="text-green-600" />
                    ) : (
                      <Copy size={20} className="text-primary" />
                    )}
                  </button>
                </div>
                <p className="text-xl font-bold text-main mt-3 tracking-wide">
                  {ACCOUNT_NUMBER}
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-main mb-2">
                Amount paid (₦)
              </label>
              <InputWithIcon
                type="number"
                icon={<CardEdit size={20} />}
                placeholder="e.g. 1000"
                className="bg-white"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>

            <div className="card-tight bg-amber-50 border-amber-200 flex gap-3">
              <InfoCircle size={20} className="text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm font-medium text-amber-800 leading-relaxed">
                After payment, click the button below. Your wallet will be
                credited after admin confirmation.
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
        </section>

        {/* Transaction history */}
        <section className="section">
          <h2 className="section-title">Transaction History</h2>
          <div className="card p-0 overflow-hidden">
            {txLoading && (
              <div className="p-8 text-center">
                <p className="text-sm text-muted">Loading transactions...</p>
              </div>
            )}
            {!txLoading && transactions.length === 0 && (
              <div className="p-8 text-center">
                <p className="text-sm text-muted">No transactions yet.</p>
                <p className="text-xs text-muted mt-1">
                  Fund your wallet to see history here.
                </p>
              </div>
            )}
            {!txLoading && transactions.length > 0 && (
              <ul className="divide-y divide-line">
                {transactions.map((tx) => {
                  const title =
                    tx.description ||
                    (tx.type === "credit" ? "Wallet funding" : "Airtime purchase");
                  return (
                    <li
                      key={tx.id}
                      className="flex items-center justify-between gap-4 p-4 hover:bg-secondary/30 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`h-10 w-10 rounded-full center flex-shrink-0 ${
                            tx.type === "credit" ? "bg-green-100" : "bg-red-100"
                          }`}
                        >
                          {tx.type === "credit" ? (
                            <ArrowDown size={20} className="text-green-600" />
                          ) : (
                            <ArrowUp size={20} className="text-red-600" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-main truncate">
                            {title}
                          </p>
                          <p className="text-xs text-muted">
                            {new Date(tx.createdAt).toLocaleString("en-NG", {
                              dateStyle: "medium",
                              timeStyle: "short",
                            })}
                          </p>
                        </div>
                      </div>
                      <p
                        className={`text-sm font-semibold flex-shrink-0 ${
                          tx.type === "credit"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {tx.type === "credit" ? "+" : "−"}₦
                        {formatNumber(tx.amount)}
                      </p>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
