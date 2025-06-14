import React, { useEffect, useRef, useState } from "react";
import { Upload } from "lucide-react";
import { io } from "socket.io-client";

const EarningsPage: React.FC = () => {
  const socketRef = useRef<any>(null);
  const [balance, setBalance] = useState(0);
  const [coinAmount, setCoinAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [coinData, setCoinData] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [isDepositDisabled, setIsDepositDisabled] = useState(false);
  const [depositTimer, setDepositTimer] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    fetch("https://mlm-backend.pixl.uz/payments/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error("Xatolik:", err.message));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const socket = io("https://mlm-backend.pixl.uz/", {
      auth: { token },
    });

    socketRef.current = socket;

    socket.on("connect", () => console.log("🔌 Socket ulandi:", socket.id));
    socket.on("roomAssigned", (data) =>
      console.log(`✅ Roomga qo‘shildingiz: ${data.roomName}`)
    );

    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("https://mlm-backend.pixl.uz/coin", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setCoinData(data);
      } catch (err) {
        console.error("Coin ma'lumotlarini olishda xatolik:", err);
      }
    };
    fetchCoinData();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isDepositDisabled && depositTimer > 0) {
      timer = setInterval(() => {
        setDepositTimer((prev) => {
          if (prev <= 1) {
            setIsDepositDisabled(false);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isDepositDisabled, depositTimer]);

  const handleDeposit = () => {
    if (isDepositDisabled || !socketRef.current) return;

    const amount = parseFloat(coinAmount || "0");
    if (amount > 0) {
      socketRef.current.emit("paymentRequest", {
        currency,
        how_much: amount,
      });
      setBalance((prev) => prev + amount);
      setCoinAmount("");
      setIsDepositDisabled(true);
      setDepositTimer(120);
    }
  };

  const getCalculatedValue = () => {
    const selected = coinData.find((c) => c.currency === currency);
    const amount = parseFloat(coinAmount || "0");
    return selected && !isNaN(amount)
      ? (amount * selected.count).toLocaleString()
      : "";
  };

  const statusStyles = {
    SENDING:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200",
    SUCCESS:
      "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200",
    CANCELLED: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200",
  };

  return (
    <div className="min-h-screen dark:text-white p-6 space-y-6">
      {/* Balans */}
      <div className="dark:bg-gray-800 rounded-xl shadow-md p-6 border dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">
              Narxi:{" "}
              <span className="text-yellow-400">{getCalculatedValue()}</span>
            </h1>
            <p className="dark:text-gray-400 text-sm">
              Coin to‘ldirish uchun miqdor va valyutani tanlang
            </p>
          </div>
          <button
            onClick={handleDeposit}
            className={`bg-green-500 hover:bg-green-600 dark:text-white px-6 py-2 rounded-lg flex items-center transition-opacity ${
              isDepositDisabled ? "opacity-60 cursor-not-allowed" : ""
            }`}
            disabled={isDepositDisabled}
          >
            <Upload className="mr-2" size={16} />
            {isDepositDisabled
              ? `Qayta yuborish (${depositTimer}s)`
              : "So'rov yuborish"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="number"
            value={coinAmount}
            onChange={(e) => setCoinAmount(e.target.value)}
            placeholder="Coin miqdori"
            className="w-full dark:bg-gray-700 dark:text-white border dark:border-gray-600 rounded-lg px-4 py-2"
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full dark:bg-gray-700 dark:text-white border dark:border-gray-600 rounded-lg px-4 py-2"
          >
            {coinData.map((curr: any) => (
              <option key={curr.id} value={curr.currency}>
                {curr.currency}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4">
          <span className="font-semibold">
            {coinAmount && currency && getCalculatedValue()
              ? `${coinAmount} × ${currency} = ${getCalculatedValue()}`
              : ""}
          </span>
        </div>
      </div>

      {/* Tarix */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-200 dark:border-gray-700 max-w-full mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          💳 Yechish Tarixi
        </h2>

        {!data?.length ? (
          <p className="text-gray-500 dark:text-gray-400">
            Ma’lumotlar hozircha yo‘q...
          </p>
        ) : (
          <div className="space-y-4 mt-6">
            {data.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 rounded-lg shadow-sm flex justify-between items-start"
              >
                <div>
                  <p className="text-xl font-semibold text-gray-800 dark:text-white">
                    {item.how_much} Coin
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(item.to_send_date).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    statusStyles[item.status]
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EarningsPage;
