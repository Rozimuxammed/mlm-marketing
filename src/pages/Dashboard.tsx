import React from "react";
import { useTranslation } from "react-i18next";
import {
  DollarSign,
  Users,
  CreditCard,
  Wallet,
  TrendingUp,
  Calendar,
  Coins,
  Gift,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import StatCard from "../components/StatCard";

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user, claimDailyBonus } = useAuth();

  const recentActivities = [
    {
      id: 1,
      type: "referral",
      description: "New referral joined",
      amount: "+$25.00",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "earning",
      description: "Daily coin bonus claimed",
      amount: `+${user?.dailyBonus} coins`,
      time: "5 hours ago",
    },
    {
      id: 3,
      type: "withdrawal",
      description: "Withdrawal processed",
      amount: "-$100.00",
      time: "1 day ago",
    },
    {
      id: 4,
      type: "purchase",
      description: "Product purchased with coins",
      amount: `-${500} coins`,
      time: "2 days ago",
    },
  ];

  // const quickActions = [
  //   { name: 'Browse Products', href: '/dashboard/products', color: 'bg-blue-500 hover:bg-blue-600' },
  //   { name: 'Invite Friends', href: '/dashboard/referrals', color: 'bg-green-500 hover:bg-green-600' },
  //   { name: 'Withdraw Funds', href: '/dashboard/withdraw', color: 'bg-purple-500 hover:bg-purple-600' },
  //   { name: 'Upgrade Plan', href: '/dashboard/plans', color: 'bg-orange-500 hover:bg-orange-600' },
  // ];

  const planExpiryDate = new Date(user?.planExpiry || "");
  const daysRemaining = Math.ceil(
    (planExpiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const canClaimBonus =
    user && user.lastBonusDate !== new Date().toISOString().split("T")[0];

  const handleClaimBonus = () => {
    claimDailyBonus();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t("dashboard.welcomeBack")}, {user?.name}! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t("dashboard.currentPlan")}:{" "}
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {user?.currentPlan}
              </span>
              {daysRemaining > 0 && (
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  ({daysRemaining} {t("dashboard.daysRemaining")})
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <Calendar size={16} />
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Daily Bonus */}
      {canClaimBonus && (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 dark:from-yellow-500 dark:to-orange-400 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Gift className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  Daily Bonus Available!
                </h3>
                <p className="text-yellow-100">
                  Claim your {user?.dailyBonus} coins today
                </p>
              </div>
            </div>
            <button
              onClick={handleClaimBonus}
              className="px-6 py-3 bg-white dark:bg-gray-100 text-orange-600 font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-200 transition-colors"
            >
              Claim Now
            </button>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Your Coins"
          value={user?.coins.toLocaleString() || "0"}
          icon={Coins}
          color="blue"
          subtitle={`+${user?.dailyBonus} daily bonus`}
        />
        <StatCard
          title={t("dashboard.totalEarnings")}
          value={`$${user?.totalEarnings.toFixed(2)}`}
          icon={DollarSign}
          color="green"
        />
        <StatCard
          title={t("dashboard.totalReferrals")}
          value={user?.totalReferrals || 0}
          icon={Users}
          color="purple"
        />
        <StatCard
          title={t("dashboard.currentBalance")}
          value={`$${user?.balance.toFixed(2)}`}
          icon={Wallet}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t("dashboard.recentActivity")}
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {activity.time}
                  </p>
                </div>
                <span
                  className={`text-sm font-semibold ${
                    activity.amount.startsWith("+")
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {activity.amount}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        {/* <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('dashboard.quickActions')}
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
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
