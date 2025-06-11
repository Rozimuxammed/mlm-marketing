import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DollarSign, TrendingUp, Calendar, Filter } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import StatCard from '../components/StatCard';

const EarningsPage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  const earningsHistory = [
    { id: 1, date: '2024-01-15', amount: 125.30, source: 'Referral Bonus', type: 'referral' },
    { id: 2, date: '2024-01-14', amount: 85.50, source: 'Daily Activity', type: 'activity' },
    { id: 3, date: '2024-01-13', amount: 200.00, source: 'Plan Commission', type: 'commission' },
    { id: 4, date: '2024-01-12', amount: 95.25, source: 'Referral Bonus', type: 'referral' },
    { id: 5, date: '2024-01-11', amount: 150.75, source: 'Performance Bonus', type: 'bonus' },
    { id: 6, date: '2024-01-10', amount: 110.40, source: 'Daily Activity', type: 'activity' },
    { id: 7, date: '2024-01-09', amount: 75.80, source: 'Referral Bonus', type: 'referral' },
    { id: 8, date: '2024-01-08', amount: 190.25, source: 'Plan Commission', type: 'commission' },
  ];

  const monthlyEarnings = 1587.25;
  const dailyAverage = 52.91;

  const periods = [
    { value: 'all', label: 'All Time' },
    { value: '30', label: 'Last 30 Days' },
    { value: '7', label: 'Last 7 Days' },
    { value: 'today', label: 'Today' },
  ];

  const getSourceColor = (type: string) => {
    switch (type) {
      case 'referral': return 'text-blue-600 bg-blue-50';
      case 'activity': return 'text-green-600 bg-green-50';
      case 'commission': return 'text-purple-600 bg-purple-50';
      case 'bonus': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('common.earnings')}</h1>
            <p className="text-gray-600">Track your earnings and performance</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {periods.map((period) => (
                <option key={period.value} value={period.value}>
                  {period.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title={t('earnings.totalEarnings')}
          value={`$${user?.totalEarnings.toFixed(2)}`}
          icon={DollarSign}
          color="blue"
        />
        <StatCard
          title={t('earnings.monthlyEarnings')}
          value={`$${monthlyEarnings.toFixed(2)}`}
          icon={TrendingUp}
          color="green"
        />
        <StatCard
          title={t('earnings.dailyEarnings')}
          value={`$${user?.todayEarnings.toFixed(2)}`}
          icon={Calendar}
          color="purple"
        />
        <StatCard
          title="Daily Average"
          value={`$${dailyAverage.toFixed(2)}`}
          icon={TrendingUp}
          color="orange"
        />
      </div>

      {/* Earnings Chart Placeholder */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Earnings Trend</h2>
        <div className="h-64 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="mx-auto text-blue-600 mb-2" size={48} />
            <p className="text-gray-600">Chart visualization would be here</p>
            <p className="text-sm text-gray-500">Showing earnings trend over time</p>
          </div>
        </div>
      </div>

      {/* Earnings History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">{t('earnings.earningsHistory')}</h2>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            <Filter className="mr-2" size={16} />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-500">{t('earnings.date')}</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">{t('earnings.source')}</th>
                <th className="text-right py-3 px-4 font-medium text-gray-500">{t('earnings.amount')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {earningsHistory.map((earning) => (
                <tr key={earning.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="text-gray-400" size={16} />
                      <span className="text-sm text-gray-900">
                        {new Date(earning.date).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSourceColor(earning.type)}`}>
                      {earning.source}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="text-sm font-semibold text-green-600">
                      +${earning.amount.toFixed(2)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EarningsPage;