import { History } from "@/components/main";
import { MainLayout } from "@/layouts";
import {
  BoxAdd,
  Wallet,
  Heart,
  TickCircle,
  ArrowCircleRight,
  InfoCircle,
} from "iconsax-reactjs";
import { Link } from "react-router-dom";

export default function Home() {
  const walletBalance = 2500; // later from API
  const totalCards = 0;
  const acceptedCards = 0;

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
      {/* Header */}
      <div className="space-y-1 flex md:items-center justify-between md:flex-row flex-col">
        <h3 className="text-xl font-bold">
          Hey, <span className="text-muted">Jackson</span> 👋
        </h3>
        {/* <p className="text-muted text-sm">
          Build and share Valentine cards, send real airtime gifts, and track
          responses in one place.
        </p> */}
        <div className="flex md:flex-row flex-col md:items-center md:gap-3 gap-2 mt-3 flex-wrap">
          <div className="flex -space-x-3">
            {avatars.map((name, i) => (
              <img
                key={i}
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`}
                alt={name}
                className="h-9 w-9 rounded-full border-4 border-white"
              />
            ))}
          </div>

          <p className="text-xs text-muted">
            20+ people already sent Valentine gifts
          </p>
        </div>
      </div>

      <div className="bg-amber-50 rounded-xl p-3 flex gap-3">
        <InfoCircle size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
        <p className="text-xs font-medium text-amber-800 leading-relaxed">
          The wallet is used only for airtime gifts. Creating and sharing
          Valentine cards is completely free; spread the love without limits 💖
        </p>
      </div>

      {/* Stats */}
      <div className="bg-secondary p-2 rounded-2xl space-y-2">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          <div className="bg-white col-span-2 md:col-span-1 rounded-xl p-4 border border-line">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 center">
                <Wallet size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-muted text-xs">Wallet Balance</p>
                <h4 className="font-bold text-lg">
                  ₦{walletBalance.toLocaleString()}
                </h4>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-line">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-amber-100 center">
                <Heart size={20} className="text-amber-500" />
              </div>
              <div>
                <p className="text-muted text-xs">Total Cards</p>
                <h4 className="font-bold text-lg">{totalCards}</h4>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-line">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-100 center">
                <TickCircle size={20} className="text-green-500" />
              </div>
              <div>
                <p className="text-muted text-xs">Accepted</p>
                <h4 className="font-bold text-lg">{acceptedCards}</h4>
              </div>
            </div>
          </div>
        </div>
        <Link
          to="/wallet"
          className="btn w-fit text-primary font-medium text-sm px-4 py-2"
        >
          Fund Wallet <ArrowCircleRight size={18} variant="Bulk" />
        </Link>
      </div>

      {/* Valentine Cards Section */}
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
