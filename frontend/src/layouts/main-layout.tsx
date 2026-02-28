import { useState, useRef, useEffect } from "react";
import { ArrowLeft2, Heart } from "iconsax-reactjs";
import { useLocation, useNavigate } from "react-router-dom";
import { Bell, LogOut } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks";
import { Modal } from "@/components/ui";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const isHome = location.pathname === "/home";
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setNotificationOpen(false);
      }
    }
    if (notificationOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [notificationOpen]);

  const handleLogoutConfirm = () => {
    logout();
    setLogoutModalOpen(false);
  };

  const avatarUrl = user?.fullName
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=eb2fde&color=fff&size=96`
    : "";

  return (
    <div className="min-h-screen min-h-[100dvh] bg-gradient-to-br from-primary to-amber-500 flex flex-col items-center pt-24 sm:pt-32 md:pt-40 pb-0">
      <div className="bg-white relative rounded-t-[32px] sm:rounded-t-[40px] px-4 sm:px-6 md:px-16 w-full max-w-[900px] flex-1 min-h-0 shadow-lg">
        <div className="center h-32 w-32 sm:h-40 sm:w-40 rounded-full bg-white absolute z-50 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg border-4 border-white">
          <Heart variant="Bulk" size={80} className="text-primary sm:w-[100px] sm:h-[100px] w-20 h-20" />
        </div>

        <div className="pt-16 sm:pt-20 pb-8 sm:pb-10 space-y-6 min-h-[400px]">
          {/* Top bar */}
          <div className="flex items-center justify-between gap-2 flex-wrap pb-2 border-b border-line">
            <div className="flex items-center gap-2">
              {!isHome && (
                <button
                  type="button"
                  className="font-semibold text-sm sm:text-base flex items-center gap-1 text-main hover:text-primary transition-colors"
                  onClick={() => navigate(-1)}
                >
                  <ArrowLeft2 size={20} variant="Bulk" className="text-primary" />
                  Back
                </button>
              )}
              {isHome && <span className="text-muted text-sm">Useval</span>}
            </div>

            <div className="flex items-center gap-1 sm:gap-2 relative" ref={notificationRef}>
              <button
                type="button"
                onClick={() => setNotificationOpen((o) => !o)}
                className="p-2 rounded-full hover:bg-secondary text-muted hover:text-main transition-colors relative"
                aria-label="Notifications"
              >
                <Bell size={22} />
              </button>
              {notificationOpen && (
                <div className="absolute top-full right-0 mt-1 mr-2 w-72 sm:w-80 bg-white border border-line rounded-xl shadow-lg py-4 px-4 z-50">
                  <p className="text-sm font-semibold text-main mb-2">Notifications</p>
                  <p className="text-muted text-sm">No notifications yet.</p>
                </div>
              )}
              {user && (
                <div className="flex items-center gap-2">
                  <img
                    src={avatarUrl}
                    alt={user.fullName}
                    className="h-8 w-8 sm:h-9 sm:w-9 rounded-full border-2 border-line object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setLogoutModalOpen(true)}
                    className="p-2 rounded-full hover:bg-red-50 text-muted hover:text-red-600 transition-colors"
                    aria-label="Log out"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4">
            {children}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {logoutModalOpen && (
          <Modal
            isOpen={logoutModalOpen}
            onClose={() => setLogoutModalOpen(false)}
            title="Log out"
          >
            <p className="text-muted text-sm mb-4">
              Are you sure you want to log out?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setLogoutModalOpen(false)}
                className="btn bg-secondary text-main px-4 py-2 rounded-lg font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogoutConfirm}
                className="btn btn-primary px-4 py-2 rounded-lg font-semibold"
              >
                Log out
              </button>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
