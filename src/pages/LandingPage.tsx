import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Star,
  Users,
  TrendingUp,
  Shield,
  Globe,
  Coins,
  Gift,
  Zap,
  CheckCircle,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import Navbar from "../components/Navbar";

const LandingPage = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();

  const features = [
    {
      icon: Coins,
      title: t("landing.features.earn_coins.title"),
      description: t("landing.features.earn_coins.description"),
    },
    {
      icon: Users,
      title: t("landing.features.referral.title"),
      description: t("landing.features.referral.description"),
    },
    {
      icon: TrendingUp,
      title: t("landing.features.track_earnings.title"),
      description: t("landing.features.track_earnings.description"),
    },
    {
      icon: Shield,
      title: t("landing.features.secure_platform.title"),
      description: t("landing.features.secure_platform.description"),
    },
    {
      icon: Globe,
      title: t("landing.features.multi_language.title"),
      description: t("landing.features.multi_language.description"),
    },
    {
      icon: Gift,
      title: t("landing.features.premium_products.title"),
      description: t("landing.features.premium_products.description"),
    },
  ];

  const plans = [
    {
      name: t("landing.plans.basic.name"),
      price: 29,
      coinBonus: 50,
      features: [
        t("landing.plans.basic.features.0"),
        t("landing.plans.basic.features.1"),
        t("landing.plans.basic.features.2"),
      ],
    },
    {
      name: t("landing.plans.premium.name"),
      price: 59,
      coinBonus: 100,
      features: [
        t("landing.plans.premium.features.0"),
        t("landing.plans.premium.features.1"),
        t("landing.plans.premium.features.2"),
        t("landing.plans.premium.features.3"),
      ],
      popular: true,
    },
    {
      name: t("landing.plans.enterprise.name"),
      price: 99,
      coinBonus: 200,
      features: [
        t("landing.plans.enterprise.features.0"),
        t("landing.plans.enterprise.features.1"),
        t("landing.plans.enterprise.features.2"),
        t("landing.plans.enterprise.features.3"),
      ],
    },
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        <Navbar />

        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                {t("landing.hero.title")}{" "}
                <span className="text-yellow-400">MLM PLATFORM</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                {t("landing.hero.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded-lg transition-colors text-sm sm:text-base"
                >
                  {t("landing.hero.get_started")}
                  <ArrowRight className="ml-2" size={20} />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg backdrop-blur-sm transition-colors text-sm sm:text-base"
                >
                  {t("landing.hero.sign_in")}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {t("landing.features.title")}
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {t("landing.features.description")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
                      <Icon
                        className="text-blue-600 dark:text-blue-400"
                        size={24}
                      />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 sm:py-24 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {t("landing.pricing.title")}
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {t("landing.pricing.description")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`relative bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-sm border-2 transition-all hover:shadow-md ${
                    plan.popular
                      ? "border-blue-500 ring-2 ring-blue-100 dark:ring-blue-900/20"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                        {t("landing.pricing.popular")}
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {plan.name}
                    </h3>
                    <div className="mb-4">
                      <span className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                        ${plan.price}
                      </span>
                      <span className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
                        /month
                      </span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-yellow-600 dark:text-yellow-400">
                      <Coins size={20} />
                      <span className="font-semibold text-sm sm:text-base">
                        {plan.coinBonus} {t("landing.pricing.coins_daily")}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6 sm:mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center space-x-3"
                      >
                        <CheckCircle
                          className="text-green-500 flex-shrink-0"
                          size={16}
                        />
                        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/register"
                    className={`w-full py-3 px-4 rounded-lg font-semibold text-center block transition-colors text-sm sm:text-base ${
                      plan.popular
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
                    }`}
                  >
                    {t("landing.pricing.get_started")}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              {t("landing.cta.title")}
            </h2>
            <p className="text-base sm:text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              {t("landing.cta.description")}
            </p>
            <Link
              to="/register"
              className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded-lg transition-colors text-sm sm:text-base"
            >
              {t("landing.cta.start_earning")}
              <Zap className="ml-2" size={20} />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white dark:bg-black text-gray-900 dark:text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                    <Globe className="text-white" size={20} />
                  </div>
                  <span className="text-lg sm:text-xl font-bold">
                    MLM PLATFORM
                  </span>
                </div>
                <p className="text-sm sm:text-base text-gray-400 dark:text-gray-400">
                  {t("landing.footer.description")}
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-4 text-base sm:text-lg">
                  {t("landing.footer.platform.title")}
                </h3>
                <ul className="space-y-2 text-gray-400 dark:text-gray-400 text-sm sm:text-base">
                  <li>
                    <Link
                      to="/dashboard"
                      className="hover:text-black dark:hover:text-white transition-colors"
                    >
                      {t("landing.footer.platform.dashboard")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/products"
                      className="hover:text-black dark:hover:text-white transition-colors"
                    >
                      {t("landing.footer.platform.products")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/plans"
                      className="hover:text-black dark:hover:text-white transition-colors"
                    >
                      {t("landing.footer.platform.plans")}
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4 text-base sm:text-lg">
                  {t("landing.footer.support.title")}
                </h3>
                <ul className="space-y-2 text-gray-400 dark:text-gray-400 text-sm sm:text-base">
                  <li>
                    <a
                      href="#"
                      className="hover:text-black dark:hover:text-white transition-colors"
                    >
                      {t("landing.footer.support.help_center")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-black dark:hover:text-white transition-colors"
                    >
                      {t("landing.footer.support.contact_us")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-black dark:hover:text-white transition-colors"
                    >
                      {t("landing.footer.support.faq")}
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4 text-base sm:text-lg">
                  {t("landing.footer.legal.title")}
                </h3>
                <ul className="space-y-2 text-gray-400 dark:text-gray-400 text-sm sm:text-base">
                  <li>
                    <a
                      href="#"
                      className="hover:text-black dark:hover:text-white transition-colors"
                    >
                      {t("landing.footer.legal.privacy_policy")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-black dark:hover:text-white transition-colors"
                    >
                      {t("landing.footer.legal.terms_of_service")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-black dark:hover:text-white transition-colors"
                    >
                      {t("landing.footer.legal.cookie_policy")}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 dark:border-gray-700 mt-8 pt-8 text-center text-gray-400 dark:text-gray-400 text-sm sm:text-base">
              <p>
                {t("landing.footer.copyright", {
                  year: new Date().getFullYear(),
                })}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
