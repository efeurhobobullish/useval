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


export default function Wallet() {
  const {
    balance,
    loading,
    fundWallet,
    fundingLoading,
    refetch,
  } = useWallet();

  const {
    transactions,
    loading: txLoading,
    fetchTransactions,
  } = useTransactions();

  const [amount, setAmount] = useState<number>(200);
  const [copied, setCopied] = useState(false);

  const accountNumber = "8137411338";
  const accountName = "Gift Uwem Jackson";

  useEffect(() => {
    fetchTransactions();
  }, []);

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
      fetchTransactions();
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
                ₦
                {!loading && (
                  <CountUp
                    start={0}
                    end={balance}
                    duration={1.5}
                    separator=","
                  />
                )}
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
                className="h-9 w-9 rounded-full bg-secondary center"
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

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex gap-3">
            <InfoCircle size={16} className="text-amber-500 mt-0.5" />
            <p className="text-xs font-medium text-amber-800 leading-relaxed">
              After making payment click the button below. Your wallet will be credited after confirmation.
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

        {/* Transaction History */}
        <div className="space-y-3">
          <h3 className="font-semibold">Transaction History</h3>

          <div className="bg-white rounded-xl border border-line divide-y divide-line">
            {txLoading && (
              <div className="p-4 text-sm text-muted text-center">
                Loading transactions...
              </div>
            )}

            {!txLoading && transactions.length === 0 && (
              <div className="p-4 text-sm text-muted text-center">
                No transactions yet
              </div>
            )}

            {!txLoading &&
              transactions.map((tx) => {
                const title =
                  tx.description ||
                  (tx.type === "credit"
                    ? "Wallet funding"
                    : "Airtime purchase");

                return (
                  <div
                    key={tx.id}
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
                        <p className="text-sm font-medium">
                          {title}
                        </p>

                        <p className="text-xs text-muted">
                          {new Date(tx.createdAt).toLocaleString("en-NG", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
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
                );
              })}
          </div>
        </div>

      </div>
    </MainLayout>
  );
}