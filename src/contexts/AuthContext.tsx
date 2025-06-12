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
  register: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
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
    const savedUser = localStorage.getItem("user-data");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    setIsLoading(false);
  }, []);
  1;
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
      console.log(data.data.user);

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // const loggedInUser: User = {
      //   id: data.data.user.id,
      //   name: data.data.user.name,
      //   email: data.data.user.email,
      //   createdAt: data.data.user.createdAt,
      //   coin: data.data.user.coin,
      //   userTariff: data.data.user.userTariff || "Basic",
      //   avatar: localStorage.getItem("avatar") || "",
      // };

      setUser(data.data.user);
      // console.log(loggedInUser);

      localStorage.setItem("token", data.token); // tokenni oddiy string sifatida saqlaymiz
      localStorage.setItem("user-data", JSON.stringify(data.data.user));
      toast.success(data.message);

      // window.location.href = "/dashboard";
    } catch (error: any) {
      toast.error(error?.message || "Login failed");
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // rester
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockUser: User = {
      id: "12345",
      name: "qwerty",
      email: "qwert@gmail.com",
    };

    setUser(mockUser);
    localStorage.setItem("user-data", JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockUser: User = {
      id: "2",
      name: "Google User",
      email: "user@gmail.com",
    };

    setUser(mockUser);
    localStorage.setItem("user-data", JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const loginWithFacebook = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockUser: User = {
      id: "3",
      name: "Facebook User",
      email: "user@facebook.com",
    };

    setUser(mockUser);
    localStorage.setItem("user-data", JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const claimDailyBonus = () => {
    if (user) {
      // Custom bonus logic goes here
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user-data");
    localStorage.removeItem("token");
    // navigate("/login");
  };

  const value = {
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
