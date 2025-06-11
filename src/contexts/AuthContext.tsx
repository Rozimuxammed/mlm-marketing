import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  currentPlan: string;
  planExpiry: string;
  referralCode: string;
  totalEarnings: number;
  todayEarnings: number;
  totalReferrals: number;
  balance: number;
  coins: number;
  dailyBonus: number;
  lastBonusDate?: string;
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
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      email: email,
      currentPlan: 'Premium',
      planExpiry: '2024-06-15',
      referralCode: 'REF123456',
      totalEarnings: 2850.50,
      todayEarnings: 125.30,
      totalReferrals: 15,
      balance: 1420.75,
      coins: 5000,
      dailyBonus: 100,
      lastBonusDate: new Date().toISOString().split('T')[0]
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '1',
      name: name,
      email: email,
      currentPlan: 'Basic',
      planExpiry: '2024-05-15',
      referralCode: 'REF' + Math.random().toString(36).substr(2, 6).toUpperCase(),
      totalEarnings: 0,
      todayEarnings: 0,
      totalReferrals: 0,
      balance: 0,
      coins: 1000, // Welcome bonus
      dailyBonus: 50,
      lastBonusDate: ''
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '2',
      name: 'Google User',
      email: 'user@gmail.com',
      currentPlan: 'Basic',
      planExpiry: '2024-05-20',
      referralCode: 'REF789012',
      totalEarnings: 1250.75,
      todayEarnings: 85.20,
      totalReferrals: 8,
      balance: 620.30,
      coins: 3200,
      dailyBonus: 50,
      lastBonusDate: new Date().toISOString().split('T')[0]
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const loginWithFacebook = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '3',
      name: 'Facebook User',
      email: 'user@facebook.com',
      currentPlan: 'Premium',
      planExpiry: '2024-07-10',
      referralCode: 'REF345678',
      totalEarnings: 3200.00,
      todayEarnings: 150.80,
      totalReferrals: 22,
      balance: 1800.45,
      coins: 7500,
      dailyBonus: 100,
      lastBonusDate: new Date().toISOString().split('T')[0]
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const claimDailyBonus = () => {
    if (user) {
      const today = new Date().toISOString().split('T')[0];
      if (user.lastBonusDate !== today) {
        const updatedUser = {
          ...user,
          coins: user.coins + user.dailyBonus,
          lastBonusDate: today
        };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    register,
    loginWithGoogle,
    loginWithFacebook,
    logout,
    isLoading,
    claimDailyBonus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};