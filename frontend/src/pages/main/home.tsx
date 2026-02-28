import CountUp from "react-countup";
import { History } from "@/components/main";
import { MainLayout } from "@/layouts";
import {
  BoxAdd,
  Wallet as WalletIcon,
  Heart,
  TickCircle,
  Clock,
  InfoCircle,
} from "iconsax-reactjs";
import { Link } from "react-router-dom";
import { useWallet, useValentines } from "@/hooks";

const AVATARS = [
  "Gift Jacksun",
  "Empire Tech",
  "Amaka Bello",
  "Tunde Ajayi",
  "Sarah Kim",
];

export default function Home() {
  const { balance = 0, fullName, loading: walletLoading } = useWallet();
  const { stats, valentines } = useValentines();
  const totalSenders = valentines.length;

  return (
    <MainLayout>
      <div className="page">
        {/* Greeting & social proof */}
        <section className="section">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="section-title text-xl sm:text-2xl">
              Hey{" "}
              <span className="text-muted font-medium">
                {fullName ? fullName.split(" ")[0] : "There"}
              </span>{" "}
              👋
            </h1>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {AVATARS.map((name, i) => (
                  <img
                    key={i}
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`}
                    alt=""
                    className="h-8 w-8 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <p className="text-sm text-muted">
                <CountUp
                  start={0}
                  end={totalSenders}
                  duration={2}
                  separator=","
                  preserveValue
                />
                {" "}+ cards created
              </p>
            </div>
          </div>
        </section>

        {/* Info banner */}
        <div className="card-tight bg-amber-50 border-amber-200 flex gap-3">
          <InfoCircle size={20} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm font-medium text-amber-800 leading-relaxed">
            The wallet is used only for airtime gifts. Creating and sharing
            Valentine cards is completely free.
          </p>
        </div>

        {/* Stats & wallet CTA */}
        <section className="section">
          <h2 className="section-title">Overview</h2>
          <div className="card p-4 sm:p-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="card-tight col-span-2 sm:col-span-1">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 center flex-shrink-0">
                    <WalletIcon size={20} className="text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted">Wallet</p>
                    <p className="text-lg font-bold text-main truncate">
                      ₦
                      {!walletLoading ? (
                        <CountUp start={0} end={balance} duration={1.8} separator="," />
                      ) : (
                        "0"
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div className="card-tight">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-amber-100 center flex-shrink-0">
                    <Heart size={20} className="text-amber-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted">Total</p>
                    <p className="text-lg font-bold text-main">
                      <CountUp start={0} end={stats.total} duration={1.5} />
                    </p>
                  </div>
                </div>
              </div>
              <div className="card-tight">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-100 center flex-shrink-0">
                    <TickCircle size={20} className="text-green-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted">Accepted</p>
                    <p className="text-lg font-bold text-main">
                      <CountUp start={0} end={stats.accepted} duration={1.5} />
                    </p>
                  </div>
                </div>
              </div>
              <div className="card-tight">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 center flex-shrink-0">
                    <Clock size={20} className="text-blue-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted">Pending</p>
                    <p className="text-lg font-bold text-main">
                      <CountUp start={0} end={stats.pending} duration={1.5} />
                    </p>
                  </div>
                </div>
              </div>
              <div className="card-tight">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-100 center flex-shrink-0">
                    <Clock size={20} className="text-gray-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted">Expired</p>
                    <p className="text-lg font-bold text-main">
                      <CountUp start={0} end={stats.expired} duration={1.5} />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Link
              to="/wallet"
              className="btn bg-primary/15 text-primary font-semibold text-sm h-10 rounded-lg gap-2 mt-4 w-full sm:w-auto"
            >
              <WalletIcon size={18} />
              Fund Wallet
            </Link>
          </div>
        </section>

        {/* Your cards */}
        <section className="section">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className="section-title">Your Valentine Cards</h2>
            <Link
              to="/create"
              className="btn bg-primary text-white font-semibold text-sm h-10 rounded-lg gap-2 px-4 w-full sm:w-auto justify-center"
            >
              <BoxAdd size={18} />
              Create Card
            </Link>
          </div>
          <History />
        </section>
      </div>
    </MainLayout>
  );
}
