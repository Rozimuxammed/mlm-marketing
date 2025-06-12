import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Wallet,
  CreditCard,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  DollarSign,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import StatCard from "../components/StatCard";

const WithdrawPage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const withdrawHistory = [
    {
      id: 1,
      amount: 100.0,
      status: "completed",
      requestDate: "2024-01-10",
      processedDate: "2024-01-11",
    },
    {
      id: 2,
      amount: 250.0,
      status: "processing",
      requestDate: "2024-01-08",
      processedDate: null,
    },
    {
      id: 3,
      amount: 150.75,
      status: "completed",
      requestDate: "2024-01-05",
      processedDate: "2024-01-06",
    },
    {
      id: 4,
      amount: 75.5,
      status: "rejected",
      requestDate: "2024-01-03",
      processedDate: "2024-01-04",
    },
    {
      id: 5,
      amount: 200.0,
      status: "completed",
      requestDate: "2024-01-01",
      processedDate: "2024-01-02",
    },
  ];

  const totalWithdrawn = withdrawHistory
    .filter((w) => w.status === "completed")
    .reduce((sum, w) => sum + w.amount, 0);

  const pendingWithdrawals = withdrawHistory
    .filter((w) => w.status === "processing")
    .reduce((sum, w) => sum + w.amount, 0);

  const handleWithdrawSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.interkassa.com/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id,
          amount: parseFloat(withdrawAmount),
          cardNumber: cardNumber.replace(/\s/g, ""),
          cardHolder,
        }),
      });
      if (!response.ok) throw new Error("Withdrawal failed");
      setWithdrawAmount("");
      setCardNumber("");
      setCardHolder("");
      alert("Withdrawal request submitted successfully!");
    } catch (error) {
      console.error("Withdrawal error:", error);
      alert("Withdrawal request failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="text-green-500" size={16} />;
      case "processing":
        return <Clock className="text-orange-500" size={16} />;
      case "rejected":
        return <XCircle className="text-red-500" size={16} />;
      default:
        return <Clock className="text-gray-500" size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "processing":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    return parts.length ? parts.join(" ") : v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {t("withdraw.withdrawFunds")}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          {t("withdraw.trackHistory")}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title={t("withdraw.availableBalance")}
          value={`$${(user?.balance ?? 0).toFixed(2)}`}
          icon={Wallet}
          color="blue"
        />
        <StatCard
          title={t("withdraw.totalWithdrawn")}
          value={`$${totalWithdrawn.toFixed(2)}`}
          icon={DollarSign}
          color="green"
        />
        <StatCard
          title={t("withdraw.pendingWithdrawals")}
          value={`$${pendingWithdrawals.toFixed(2)}`}
          icon={Clock}
          color="orange"
        />
        <StatCard
          title={t("withdraw.thisMonth")}
          value={`$${(totalWithdrawn * 0.3).toFixed(2)}`}
          icon={Calendar}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Withdrawal Form */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            {t("withdraw.requestWithdrawal")}
          </h2>

          <form onSubmit={handleWithdrawSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t("withdraw.withdrawAmount")}
              </label>
              <div className="relative">
                <DollarSign
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                  size={20}
                />
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                  min="10"
                  max={user?.balance}
                  step="0.01"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {t("withdraw.minimumWithdrawal", { amount: 10 })} | {t("withdraw.available")}: $
                {(user?.balance ?? 0).toFixed(2)}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t("withdraw.cardNumber")}
              </label>
              <div className="relative">
                <CreditCard
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                  size={20}
                />
                <input
                  type="text"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t("withdraw.cardHolder")}
              </label>
              <input
                type="text"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="John Doe"
                required
              />
            </div>

            <button
              type="submit"
              disabled={
                isSubmitting || !withdrawAmount || !cardNumber || !cardHolder
              }
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isSubmitting
                ? t("common.loading")
                : t("withdraw.requestWithdraw")}
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-medium text-blue-900 dark:text-blue-200 mb-2">
              {t("withdraw.notes")}
            </h4>
            <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
              <li>• {t("withdraw.notesList.processingTime")}</li>
              <li>• {t("withdraw.notesList.minimumAmount")}</li>
              <li>• {t("withdraw.notesList.fees")}</li>
              <li>• {t("withdraw.notesList.cardDetails")}</li>
            </ul>
          </div>
        </div>

        {/* Withdrawal History */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            {t("withdraw.withdrawHistory")}
          </h2>

          <div className="space-y-4">
            {withdrawHistory.map((withdrawal) => (
              <div
                key={withdrawal.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  {getStatusIcon(withdrawal.status)}
                  <div>
                    <p className <span class="font-medium text-gray-900 dark:text-white">${withdrawal.amount.toFixed(2)}</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(withdrawal.requestDate).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex-center text-right">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(
                        withdrawal.status
                      )}`}
                    >
                      {t(`withdraw.${withdrawal.status}`)}
                    </span>
                    {withdrawal.processedDate && (
                      <p className="text-red text-xs dark:text-gray-400 mt-1">
                        {t("withdraw.processed")}: {new Date(
                          withdrawal.processedDate
                        ).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WithdrawPage;