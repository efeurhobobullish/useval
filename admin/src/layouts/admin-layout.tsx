import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Heart,
  Receipt,
  Wallet,
  LogOut,
  Menu,
  X,
  Shield,
  Bell,
} from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { useAdminAuth } from "@/hooks";
import { clsx } from "clsx";
import Modal from "@/components/ui/Modal";

const nav = [
  { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { path: "/admin/deposits", label: "Deposits", icon: Wallet },
  { path: "/admin/users", label: "Users", icon: Users },
  { path: "/admin/valentines", label: "Valentines", icon: Heart },
  { path: "/admin/transactions", label: "Transactions", icon: Receipt },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const { admin, logout } = useAdminAuth();
  const [menuOpen, setMenuOpen] = useState(false);
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
    navigate("/");
    setLogoutModalOpen(false);
  };

  const adminAvatarUrl = admin?.fullName
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(admin.fullName)}&background=eb2fde&color=fff&size=96`
    : "";

  return (
    <div className="min-h-screen min-h-[100dvh] bg-gradient-to-br from-primary to-amber-500 flex flex-col items-center pt-24 sm:pt-32 md:pt-40 pb-0">
      <div className="bg-white relative rounded-t-[32px] sm:rounded-t-[40px] px-4 sm:px-6 md:px-16 w-full max-w-[900px] flex-1 min-h-0 shadow-lg">
        <div className="center h-32 w-32 sm:h-40 sm:w-40 rounded-full bg-white absolute z-50 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg border-4 border-white">
          <Shield size={64} className="text-primary sm:w-20 sm:h-20 w-16 h-16" />
        </div>

        <div className="pt-16 sm:pt-20 pb-6 sm:pb-10 space-y-4 sm:space-y-6 min-h-[400px]">
          {/* Top row: hamburger (mobile/tablet only) + title | notifications + avatar + logout */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMenuOpen((o) => !o)}
                className="lg:hidden p-2 rounded-lg hover:bg-secondary text-main"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
              <h2 className="text-xl font-bold text-main">Useval Admin</h2>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 relative" ref={notificationRef}>
              <button
                type="button"
                onClick={() => setNotificationOpen((o) => !o)}
                className="p-2 rounded-full hover:bg-secondary text-muted hover:text-main transition-colors"
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
              {admin && (
                <>
                  <img
                    src={adminAvatarUrl}
                    alt={admin.fullName}
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
                </>
              )}
            </div>
          </div>

          {/* Nav: visible by default on desktop (lg+), toggled on small screens */}
          <div
            className={clsx(
              "border border-line rounded-2xl p-2 bg-secondary",
              menuOpen ? "block" : "hidden lg:block"
            )}
          >
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {nav.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className={clsx(
                    "flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold flex-1 min-w-0 sm:flex-initial justify-center",
                    location.pathname === path
                      ? "bg-primary text-white"
                      : "bg-white text-muted hover:bg-primary/10 hover:text-primary border border-line"
                  )}
                >
                  <Icon size={18} />
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Page content */}
          <div className="space-y-6 pt-4">
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
