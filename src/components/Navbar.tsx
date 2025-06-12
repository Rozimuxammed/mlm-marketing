import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Globe,
  User,
  ShoppingCart,
  Menu,
  X,
  Sun,
  Moon,
  LogOut,
  Coins,
  LayoutDashboard,
  Package,
  DollarSign,
  Users,
  CreditCard,
  Wallet,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { useCart } from "../contexts/CartContext";
import LanguageSelector from "./LanguageSelector";

const Navbar = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const { getItemCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navigationItems = [
    { name: t("common.dashboard"), href: "/dashboard", icon: LayoutDashboard },
    { name: t("common.products"), href: "/dashboard/products", icon: Package },
    { name: t("common.referrals"), href: "/dashboard/referrals", icon: Users },
    { name: t("common.plans"), href: "/dashboard/plans", icon: CreditCard },
    {
      name: t("common.earnings"),
      href: "/dashboard/earnings",
      icon: DollarSign,
    },
    { name: t("common.withdraw"), href: "/dashboard/withdraw", icon: Wallet },
  ];

  const isActive = (href) => location.pathname === href;

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 w-full">
      <div className="w-full mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link
              to={user ? "/dashboard" : "/"}
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Globe className="text-white" size={20} />
              </div>
              <span className="hidden sm:block text-lg font-bold text-gray-900 dark:text-white">
                MLM PLATFORM
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          {user && (
            <div className="hidden md:flex items-center space-x-2 md:space-x-3 lg:space-x-4 flex-grow justify-center">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-2 py-2 rounded-md text-xs md:text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                        : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    <Icon className="mr-1 md:mr-2" size={14} />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          )}

          {/* Right side */}
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 flex-shrink-0">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Language selector */}
            <div className="hidden sm:block relative">
              <LanguageSelector />
            </div>

            {user ? (
              <>
                {/* Coins display */}
                <div className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 bg-yellow-50 dark:bg-gray-900/20 rounded-lg">
                  <Coins
                    className="text-yellow-600 dark:text-yellow-400"
                    size={14}
                  />
                  <span className="text-xs font-medium text-yellow-700 dark:text-yellow-300">
                    {user?.coin?.toLocaleString()}
                  </span>
                </div>

                {/* Cart */}
                <Link
                  to="/dashboard/checkout"
                  className="relative p-1.5 sm:p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <ShoppingCart className="dark:text-slate-200" size={18} />
                  {getItemCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {getItemCount()}
                    </span>
                  )}
                </Link>

                {/* User menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-1 p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white transition-colors"
                  >
                    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-semibold">
                        {user.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <ChevronDown
                      className={`transform transition-transform dark:text-slate-200 ${
                        isUserMenuOpen ? "rotate-180" : ""
                      }`}
                      size={14}
                    />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-[100]">
                      <Link
                        to="/dashboard/profile"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center px-4 py-2 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <User className="mr-2" size={14} />
                        {t("common.profile")}
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-xs text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <LogOut className="mr-2" size={14} />
                        {t("common.logout")}
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-2 py-2 rounded-md text-xs font-medium transition-colors"
                >
                  {t("common.login")}
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs font-medium transition-colors"
                >
                  {t("auth.signUp")}
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 sm:p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 w-full">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {user &&
              navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                        : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    <Icon className="mr-3" size={18} />
                    {item.name}
                  </Link>
                );
              })}

            {/* Mobile language selector */}
            <div className="px-3 py-2 relative">
              <LanguageSelector />
            </div>

            {/* Mobile user menu */}
            {user && (
              <div className="px-3 py-2 border-t border-gray-200 dark:border-gray-700">
                <Link
                  to="/dashboard/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                >
                  <User className="mr-3" size={18} />
                  {t("common.profile")}
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md w-full"
                >
                  <LogOut className="mr-3" size={18} />
                  {t("common.logout")}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;