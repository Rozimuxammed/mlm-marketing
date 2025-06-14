import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Search, Star, Coins, ShoppingCart, Eye } from "lucide-react";
import { useCart } from "../contexts/CartContext";

interface PhotoUrl {
  photo_url: string;
}

interface Translation {
  language: string;
  name: string;
  description: string;
  longDescription: string;
  features: string;
  usage: string;
}

interface Product {
  id: number;
  rating: number;
  rewiev: number;
  count: number;
  coin: number;
  photo_url: PhotoUrl[];
  translations: Translation[];
}

const ProductsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);
  const { addToCart } = useCart();
  const lang = i18n.language;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://mlm-backend.pixl.uz/products");
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Mahsulotlarni olishda xatolik:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getTranslation = (product: Product) => {
    return (
      product.translations.find((t) => t.language === lang) ||
      product.translations[0]
    );
  };

  if (loading) {
    return <div className="text-center p-8">{t("loading")}</div>;
  }

  return (
    <div className="p-4 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">{t("products.title")}</h1>
        <p className="text-gray-600">{t("products.subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => {
          const translation = getTranslation(product);
          return (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden border"
            >
              <img
                src={
                  product.photo_url?.[0]?.photo_url ||
                  "https://via.placeholder.com/400x200"
                }
                alt={translation?.name || "Product image"}
                className="w-full h-52 object-cover"
              />
              <div className="p-4 space-y-2">
                <h2 className="text-xl font-semibold">
                  {translation?.name || "No name"}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {translation?.description || "No description"}
                </p>
                <div className="flex items-center gap-2 text-sm text-yellow-500">
                  <Star className="w-4 h-4" />
                  {product.rating}
                  <span className="text-gray-400 ml-2">
                    ({product.rewiev} {t("products.reviews")})
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1 text-green-600 font-bold">
                    <Coins className="w-4 h-4" />
                    {product.coin}
                  </span>
                  <button
                    onClick={() =>
                      addToCart({
                        id: product.id,
                        name: translation?.name || "",
                        description: translation?.description || "",
                        coin: product.coin,
                        image: product.photo_url?.[0]?.photo_url || null,
                      })
                    }
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                  >
                    <ShoppingCart className="w-4 h-4 inline mr-1" />
                    {t("products.addToCart")}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsPage;
