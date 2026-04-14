import { createUser } from '@/api/user/user';
import { getStorageItem, removeStorageItem, setStorageItem } from '@/utils';
import React, { createContext, useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';

type User = {
  email: string;
  id?: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateActivity: () => void; // 👈 added
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

const TOKEN_KEY = '@auth_token';
const USER_KEY = '@auth_user';

// 🔥 15 minutes inactivity
const INACTIVITY_LIMIT = 15 * 60 * 1000;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 🔥 activity tracking refs
  const lastActivityRef = useRef(Date.now());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 🔥 update activity
  const updateActivity = () => {
    lastActivityRef.current = Date.now();
  };

  // 🔥 check inactivity
  const checkInactivity = () => {
    const now = Date.now();
    const diff = now - lastActivityRef.current;

    if (diff >= INACTIVITY_LIMIT) {
      logout(); // auto logout
    }
  };

  useEffect(() => {
    const loadSession = async () => {
      try {
        const storedUser = await getStorageItem(USER_KEY);

        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
          updateActivity(); // reset timer on restore
        }
      } catch (error) {
        setIsAuthenticated(false);
        console.log('Error restoring auth session:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, []);

  // 🔥 start inactivity timer
  useEffect(() => {
    intervalRef.current = setInterval(checkInactivity, 60 * 1000); // every 1 min

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // 🔥 reset when app becomes active
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        updateActivity();
      }
    });

    return () => subscription.remove();
  }, []);

  const login = async (email: string, password: string) => {
    try {

      const data = {
        email,
        password,
        firstName: 'idris',
        lastName: 'elba',
        phone: "+234 803 123 4567",
        account: {
          accountNumber: "983572462",
          balance: 200000,
          currency: "$"
        }
      };
      const response = await createUser(data);

      const { token, user } = response;

      setToken(token);
      setUser(data);

      setIsAuthenticated(true);
      await setStorageItem(USER_KEY, JSON.stringify(data));

      updateActivity(); // reset timer on login
    } catch (error) {
      console.log('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);

    await removeStorageItem(TOKEN_KEY);
    await removeStorageItem(USER_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        login,
        logout,
        updateActivity, // 👈 expose for UI tracking
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};