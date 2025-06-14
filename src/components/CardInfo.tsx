import { CheckCircle, Clock, Coins, XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
export default function CardInfo({
  cardNumber,
  fullName,
  how_much,
  requestDate,
  status,
}) {
  const { t } = useTranslation();
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return <CheckCircle className="text-green-500" size={16} />;
      case "PENDING":
        return <Clock className="text-orange-500" size={16} />;
      case "CANCELLED":
        return <XCircle className="text-red-500" size={16} />;
      default:
        return <Clock className="text-gray-500" size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-orange-100 text-orange-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <div className="flex items-center space-x-3">
        {getStatusIcon(status)}
        <div>
          <p className="font-medium flex items-center gap-1 text-gray-900 dark:text-white">
            {how_much}
            <Coins className="text-yellow-400" />
          </p>
        </div>
        <div>
          <p className="font-medium flex  flex-col gap-1 text-gray-900 dark:text-white">
            <span className="text-sm">{fullName}</span>
            <span className="text-xs">
              {cardNumber.slice(0, 4)} **** ****
              {cardNumber.slice(-4)}
            </span>
          </p>
        </div>
      </div>
      <div className="text-right flex items-center gap-3">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
            status
          )}`}
        >
          {status === "SUCCESS" && t("success")}
          {status === "PENDING" && t("pending")}
          {status === "CANCELLED" && t("cancelled")}
        </span>
        {requestDate && (
          <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">
            {new Date(requestDate).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
}
