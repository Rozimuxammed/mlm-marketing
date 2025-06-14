import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: number;
  coin: number;
  userTariff: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    referal?: string
  ) => Promise<void>;
  loginWithGoogle: () => void;
  loginWithFacebook: () => void;
  logout: () => void;
  isLoading: boolean;
  claimDailyBonus: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsLoading(false);
          return;
        }

        const response = await fetch(
          `${import.meta.env.VITE_API_KEY}/users/token`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setUser(data);
        } else {
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        localStorage.removeItem("token");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_KEY}/authorization/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      setUser(data.data.user);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user-data", JSON.stringify(data.data.user));
      toast.success(data.message);
    } catch (error: any) {
      toast.error(error?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    referal?: string
  ) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://mlm-backend.pixl.uz/authorization/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password, referal }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      toast.success(
        data.message ||
          "Registration successful! Please check your email to verify your account."
      );
      setUser(data);
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = () => {
    window.location.href = "https://mlm-backend.pixl.uz/authorization/google";
  };

  const loginWithFacebook = () => {
    window.location.href = "https://mlm-backend.pixl.uz/authorization/facebook";
  };

  const claimDailyBonus = () => {
    if (user) {
      // Bonus olish logikasi shu yerga yoziladi
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user-data");
    localStorage.removeItem("token");
    // navigate("/login"); // Agar react-router ishlatilsa
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    loginWithGoogle,
    loginWithFacebook,
    logout,
    isLoading,
    claimDailyBonus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
