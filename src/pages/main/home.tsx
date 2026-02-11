import CountUp from "react-countup";
import { History } from "@/components/main";
import { MainLayout } from "@/layouts";
import {
  BoxAdd,
  Wallet,
  Heart,
  TickCircle,
  CloseCircle,
  Clock,
  InfoCircle,
} from "iconsax-reactjs";
import { Link } from "react-router-dom";
import { useWalletDashboard } from "@/hooks";

export default function Home() {
  const { balance, firstName, transactions, loading } =
    useWalletDashboard();

  const totalCards = 0;
  const acceptedCards = 0;
  const pendingCards = 0;
  const rejectedCards = 0;

  const totalSenders = transactions.length;

  const avatars = [
    "Gift Jacksun",
    "Empire Tech",
    "Amaka Bello",
    "Tunde Ajayi",
    "Sarah Kim",
    "John Doe",
  ];

  return (
    <MainLayout>
      <div className="space-y-1 flex md:items-center justify-between md:flex-row flex-col">
        <h3 className="text-xl font-bold">
          Hey, <span className="text-muted">{firstName || "There"}</span> 👋
        </h3>

        <div className="flex md:flex-row flex-col md:items-center md:gap-3 gap-2 mt-3 flex-wrap">
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
            <CountUp
              start={0}
              end={totalSenders}
              duration={2}
              separator=","
              preserveValue
            />
            + people already sent Valentine gifts
          </p>
        </div>
      </div>

      <div className="bg-amber-50 rounded-xl p-3 flex gap-3">
        <InfoCircle
          size={16}
          className="text-amber-500 mt-0.5 flex-shrink-0"
        />
        <p className="text-xs font-medium text-amber-800 leading-relaxed">
          The wallet is used only for airtime gifts. Creating and sharing
          Valentine cards is free.
        </p>
      </div>

      <div className="bg-secondary p-2 rounded-2xl space-y-3">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {/* Wallet */}
          <div className="bg-white col-span-2 md:col-span-1 rounded-xl p-4 border border-line">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 center">
                <Wallet size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-muted text-xs">Wallet Balance</p>
                <h4 className="font-bold text-lg">
                  ₦
                  {!loading && (
                    <CountUp
                      start={0}
                      end={balance}
                      duration={1.8}
                      separator=","
                      preserveValue
                    />
                  )}
                </h4>
              </div>
            </div>
          </div>

          {/* Total Cards */}
          <div className="bg-white rounded-xl p-4 border border-line">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-amber-100 center">
                <Heart size={20} className="text-amber-500" />
              </div>
              <div>
                <p className="text-muted text-xs">Total Cards</p>
                <h4 className="font-bold text-lg">
                  <CountUp start={0} end={totalCards} duration={1.5} />
                </h4>
              </div>
            </div>
          </div>

          {/* Accepted */}
          <div className="bg-white rounded-xl p-4 border border-line">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-100 center">
                <TickCircle size={20} className="text-green-500" />
              </div>
              <div>
                <p className="text-muted text-xs">Accepted</p>
                <h4 className="font-bold text-lg">
                  <CountUp start={0} end={acceptedCards} duration={1.5} />
                </h4>
              </div>
            </div>
          </div>

          {/* Pending */}
          <div className="bg-white rounded-xl p-4 border border-line">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 center">
                <Clock size={20} className="text-blue-500" />
              </div>
              <div>
                <p className="text-muted text-xs">Pending</p>
                <h4 className="font-bold text-lg">
                  <CountUp start={0} end={pendingCards} duration={1.5} />
                </h4>
              </div>
            </div>
          </div>

          {/* Rejected */}
          <div className="bg-white rounded-xl p-4 border border-line">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-red-100 center">
                <CloseCircle size={20} className="text-red-500" />
              </div>
              <div>
                <p className="text-muted text-xs">Rejected</p>
                <h4 className="font-bold text-lg">
                  <CountUp start={0} end={rejectedCards} duration={1.5} />
                </h4>
              </div>
            </div>
          </div>
        </div>

        {/* Neat Wallet Button Same Style As Create Card */}
        <Link
          to="/wallet"
          className="btn bg-primary/20 text-primary font-semibold text-sm px-4 h-10 rounded-lg flex items-center gap-2 w-fit"
        >
          <Wallet size={18} />
          Fund Wallet
        </Link>
      </div>

      <div className="mt-10 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Valentine Cards</h3>
          <Link
            to="/create"
            className="btn bg-primary/20 text-primary font-semibold text-sm px-4 h-10 rounded-lg flex items-center gap-2"
          >
            <BoxAdd size={18} />
            Create Card
          </Link>
        </div>

        <History />
      </div>
    </MainLayout>
  );
}
