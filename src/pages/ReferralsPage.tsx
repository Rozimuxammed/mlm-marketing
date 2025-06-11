import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Users, Copy, Share, MessageCircle, Phone, CheckCircle, Clock, DollarSign } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import StatCard from '../components/StatCard';

const ReferralsPage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [copiedLink, setCopiedLink] = useState(false);

  const referralLink = `https://tarmoqli.com/ref/${user?.referralCode}`;

  const referralFriends = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', joinDate: '2024-01-10', status: 'paid', bonus: 50.00 },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', joinDate: '2024-01-08', status: 'paid', bonus: 50.00 },
    { id: 3, name: 'Carol Williams', email: 'carol@example.com', joinDate: '2024-01-05', status: 'pending', bonus: 50.00 },
    { id: 4, name: 'David Brown', email: 'david@example.com', joinDate: '2024-01-03', status: 'paid', bonus: 50.00 },
    { id: 5, name: 'Emma Davis', email: 'emma@example.com', joinDate: '2024-01-01', status: 'paid', bonus: 50.00 },
    { id: 6, name: 'Frank Miller', email: 'frank@example.com', joinDate: '2023-12-28', status: 'pending', bonus: 50.00 },
  ];

  const totalBonuses = referralFriends.reduce((sum, friend) => sum + friend.bonus, 0);
  const paidReferrals = referralFriends.filter(friend => friend.status === 'paid').length;
  const pendingReferrals = referralFriends.filter(friend => friend.status === 'pending').length;

  const copyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const shareOnTelegram = () => {
    const message = encodeURIComponent(`Join MLM PLATFORM Marketing Platform using my referral link: ${referralLink}`);
    window.open(`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${message}`, '_blank');
  };

  const shareOnWhatsApp = () => {
    const message = encodeURIComponent(`Join MLM PLATFORM Marketing Platform using my referral link: ${referralLink}`);
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('common.referrals')}</h1>
        <p className="text-gray-600">Invite friends and earn bonuses for each successful referral</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title={t('referrals.totalReferrals')}
          value={user?.totalReferrals || 0}
          icon={Users}
          color="blue"
        />
        <StatCard
          title={t('referrals.paidReferrals')}
          value={paidReferrals}
          icon={CheckCircle}
          color="green"
        />
        <StatCard
          title={t('referrals.pendingPayments')}
          value={pendingReferrals}
          icon={Clock}
          color="orange"
        />
        <StatCard
          title={t('referrals.bonusEarned')}
          value={`$${totalBonuses.toFixed(2)}`}
          icon={DollarSign}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Referral Link */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('referrals.referralLink')}</h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg border">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="flex-1 bg-transparent text-sm text-gray-700 focus:outline-none"
              />
              <button
                onClick={copyReferralLink}
                className="flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
              >
                {copiedLink ? (
                  <>
                    <CheckCircle className="mr-1" size={16} />
                    {t('common.copied')}
                  </>
                ) : (
                  <>
                    <Copy className="mr-1" size={16} />
                    {t('common.copy')}
                  </>
                )}
              </button>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={shareOnTelegram}
                className="flex-1 flex items-center justify-center px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
              >
                <MessageCircle className="mr-2" size={18} />
                {t('referrals.shareOnTelegram')}
              </button>
              <button
                onClick={shareOnWhatsApp}
                className="flex-1 flex items-center justify-center px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
              >
                <Phone className="mr-2" size={18} />
                {t('referrals.shareOnWhatsApp')}
              </button>
            </div>
          </div>
        </div>

        {/* Referral Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Referral Performance</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="text-white" size={16} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Paid Referrals</p>
                  <p className="text-sm text-gray-600">{paidReferrals} friends</p>
                </div>
              </div>
              <span className="text-lg font-bold text-green-600">
                ${(paidReferrals * 50).toFixed(2)}
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <Clock className="text-white" size={16} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Pending Referrals</p>
                  <p className="text-sm text-gray-600">{pendingReferrals} friends</p>
                </div>
              </div>
              <span className="text-lg font-bold text-orange-600">
                ${(pendingReferrals * 50).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Referral Friends List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">{t('referrals.invitedFriends')}</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-500">{t('referrals.friendName')}</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">{t('referrals.joinDate')}</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">{t('referrals.paymentStatus')}</th>
                <th className="text-right py-3 px-4 font-medium text-gray-500">{t('referrals.bonus')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {referralFriends.map((friend) => (
                <tr key={friend.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{friend.name}</p>
                      <p className="text-sm text-gray-500">{friend.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-700">
                      {new Date(friend.joinDate).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      friend.status === 'paid' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {friend.status === 'paid' ? (
                        <>
                          <CheckCircle className="mr-1" size={12} />
                          {t('referrals.paid')}
                        </>
                      ) : (
                        <>
                          <Clock className="mr-1" size={12} />
                          {t('referrals.pending')}
                        </>
                      )}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className={`text-sm font-semibold ${
                      friend.status === 'paid' ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      ${friend.bonus.toFixed(2)}
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

export default ReferralsPage;