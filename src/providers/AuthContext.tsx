import { createUser } from '@/api/user/user';
import { getStorageItem, removeStorageItem, setStorageItem } from '@/utils';
import React, { createContext, useEffect, useState } from 'react';

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
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

const TOKEN_KEY = '@auth_token';
const USER_KEY = '@auth_user';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated,setIsAuthenticated] = useState(false);
 


  useEffect(() => {
    const loadSession = async () => {
      try {
        // const storedToken = await getStorageItem(TOKEN_KEY);
        const storedUser = await getStorageItem(USER_KEY);

        if ( storedUser) {
        //   setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.log('Error restoring auth session:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, []);


  const login = async (email: string, password: string) => {
    try {

      const data = {email,password}
      const response = await createUser(data);

      const { token, user } = response;

      setToken(token);
      setUser(data);

      //   await setStorageItem("@User", JSON.stringify(data))
      await setStorageItem(USER_KEY, JSON.stringify(user));
    
    } catch (error) {
      console.log('Login failed:', error);
      throw error;
    }
  };


  const logout = async () => {
    setToken(null);
    setUser(null);

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

