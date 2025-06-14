import { useTranslation } from "react-i18next";
import {
  Star,
  CoinsIcon,
  Coins,
  Calendar,
  Pen,
  LanguagesIcon,
  User,
  PointerOffIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

const PlansPage: React.FC = () => {
  const { t } = useTranslation();
  const [plans, setPlans] = useState([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getPlans = async () => {
      const req = await fetch("https://mlm-backend.pixl.uz/tariff");
      if (req.ok) {
        const res = await req.json();
        setPlans(res);
      } else {
        console.error("Failed to fetch plans");
      }
    };

    const getUser = async () => {
      const token = localStorage.getItem("token");
      const req = await fetch("https://mlm-backend.pixl.uz/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (req.ok) {
        const res = await req.json();
        setUser(res);
      }
    };

    getPlans();
    getUser();
  }, []);

  const buyPlan = async (id: number) => {
    const token = localStorage.getItem("token");
    const order = {
      tariff_id: id,
    };

    try {
      const req = await fetch("https://mlm-backend.pixl.uz/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(order),
      });

      if (req.ok) {
        const res = await req.json();
        alert("Sotib olindi!");
      } else {
        const errorText = await req.text();
        console.error("Xatolik:", errorText);
        alert("Xatolik: " + errorText);
      }
    } catch (error) {
      console.error("Buy plan error:", error);
      alert("Serverda xatolik yuz berdi.");
    }
  };

  return (
    <div className="space-y-6 p-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">{t("plans.choosePlan")}</h1>
        <p className="text-gray-600">{t("plans.choosePlanDescription")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="w-full overflow-hidden min-h-[500px] border-2 border-blue-700 rounded-lg bg-white"
          >
            <img
              className="w-full h-60 object-cover mb-3"
              src={plan.photo_url}
              alt="Plan"
            />
            <div className="p-4 flex flex-col gap-2">
              <p className="flex items-center gap-2 text-2xl mb-2">
                <b>DailyProfit:</b> {plan.dailyProfit}
                <CoinsIcon className="text-yellow-400" />
              </p>
              <p className="flex items-center gap-2">
                <b>Coin:</b> {plan.coin}
                <Coins className="text-yellow-400" />
              </p>
              <p className="flex items-center gap-2">
                <b>Referral bonus:</b> {plan.referral_bonus}
                <Coins className="text-yellow-400" />
              </p>
              <p className="flex items-center gap-2">
                <b>Term:</b> {plan.term} days
                <Calendar className="text-red-700 w-4 h-4" />
              </p>
              <p className="flex items-center gap-2">
                <b>Created:</b>{" "}
                {new Date(plan.createdAt).toLocaleDateString("uz-UZ")}
              </p>

              {plan.translations?.map((t) => (
                <div key={t.language} className="text-sm border-t pt-2 mt-2">
                  <p className="flex items-center gap-1">
                    <b>{t.language.toUpperCase()}:</b>
                    <LanguagesIcon className="w-4 h-4" />
                  </p>
                  <p><b>Name:</b> {t.name}</p>
                  <p><b>Description:</b> {t.description}</p>
                  <p><b>Features:</b> {t.features}</p>
                  <p><b>Long Description:</b> {t.longDescription}</p>
                  <p><b>Usage:</b> {t.usage}</p>
                </div>
              ))}

              <button
                onClick={() => buyPlan(plan.id)}
                className="w-full hover:bg-blue-700 hover:text-white border py-2 rounded-xl mt-4"
              >
                {t("plans.selectPlan")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlansPage;
