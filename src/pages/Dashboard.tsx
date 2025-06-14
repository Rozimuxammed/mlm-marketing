import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Users, Coins, Gift } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import StatCard from "../components/StatCard";
import { toast } from "sonner";
import StatisticsChart from "../components/StatisticsChart";

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user, claimDailyBonus } = useAuth();
  const userData = JSON.parse(localStorage.getItem("user-data") || "{}");
  const [statistika, setStatistika] = useState([]);
  const [allCoin, setAllCoin] = useState([]);

  const getUser = async () => {
    try {
      const req = await fetch("https://mlm-backend.pixl.uz/statistika/user");
      if (req.status === 200) {
        const res = await req.json();
        setStatistika(res);
      } else {
        const errorText = await req.text();
        throw new Error(`Xatolik: ${req.status} - ${errorText}`);
      }
    } catch (error: any) {
      toast.error("So'rovda xatolik: " + error.message);
    }
  };

  const getTotal = async () => {
    try {
      const req = await fetch("https://mlm-backend.pixl.uz/statistika/statis-web");
      if (req.status === 200) {
        const res = await req.json();
        setAllCoin(res);
      } else {
        const errorText = await req.text();
        throw new Error(`Xatolik: ${req.status} - ${errorText}`);
      }
    } catch (error: any) {
      toast.error("So'rovda xatolik: " + error.message);
    }
  };

  useEffect(() => {
    getUser();
    getTotal();
  }, []);

  const quickActions = [
    {
      name: t("dashboard.browseProducts"),
      href: "/dashboard/products",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      name: t("dashboard.inviteFriends"),
      href: "/dashboard/referrals",
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      name: t("dashboard.withdrawFunds"),
      href: "/dashboard/withdraw",
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      name: t("dashboard.upgradePlan"),
      href: "/dashboard/plans",
      color: "bg-orange-500 hover:bg-orange-600",
    },
  ];

  const canClaimBonus =
    user && user.lastBonusDate !== new Date().toISOString().split("T")[0];

  const handleClaimBonus = () => {
    claimDailyBonus();
  };

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 capitalize">
              {t("dashboard.welcomeBack")}, {user?.name}! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t("dashboard.currentPlan")}: <span className="font-semibold text-blue-600 dark:text-blue-400">{user?.userTariff}</span>
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            {formatDate(user?.createdAt)}
          </div>
        </div>
      </div>

      {canClaimBonus && (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Gift className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  {t("dashboard.dailyBonusAvailable")}
                </h3>
                <p className="text-yellow-100">
                  {t("dashboard.claimYour")} {user?.dailyBonus} {t("dashboard.coinsToday")}
                </p>
              </div>
            </div>
            <button
              onClick={handleClaimBonus}
              className="px-6 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              {t("dashboard.claimNow")}
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <StatCard
          title={t("dashboard.yourCoin")}
          value={user?.coins?.toLocaleString() || "0"}
          icon={Coins}
          color="blue"
          subtitle={`+${user?.coin} ${t("dashboard.dailyBonus")}`}
        />
        <StatCard
          title={t("dashboard.totalReferrals")}
          value={userData?.totalReferrals || 0}
          icon={Users}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StatisticsChart />
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t("dashboard.quickActions")}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <a
                key={index}
                href={action.href}
                className={`${action.color} text-white p-4 rounded-lg text-center font-medium transition-colors`}
              >
                {action.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
