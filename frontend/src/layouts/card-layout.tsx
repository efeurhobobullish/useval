import { ArrowLeft2, Heart } from "iconsax-reactjs";
import { useLocation, useNavigate } from "react-router-dom";

export default function CardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/card/:id";
  return (
    <div className="min-h-[100dvh] overflow-hidden hide-scrollbar inset-0 bg-gradient-to-br from-primary to-amber-500 flex items-end pt-40">
      <div className="bg-white  relative rounded-t-[40px] px-4 md:px-16 w-full md:w-[900px] mx-auto">
        <div className="center h-40 w-40 rounded-full bg-white absolute z-50 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Heart variant="Bulk" size={100} className="text-primary" />
        </div>

        <div className="pt-20 pb-10  space-y-6 min-h-[500px] text-center">
          {isHome && (
            <button className="font-semibold" onClick={() => navigate(-1)}>
              <ArrowLeft2 size={20} variant="Bulk" className="text-primary" />{" "}
              Back
            </button>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
