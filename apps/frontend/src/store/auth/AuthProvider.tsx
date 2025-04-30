"use client";
import { authToken } from "@/lib/token/AuthToken";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

type AuthStore = {
  user: any | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
};

type Actions = {
  setUser(user: any | null): void;
  clear(): void;
  setHydrated: (value: boolean) => void;
};

const defaultState: AuthStore & Actions = {
  user: null,
  isAuthenticated: false,
  isHydrated: false,
  clear: () => {},
  setUser: () => {},
  setHydrated: () => {},
};

const token = authToken.get();
if (token) {
  const user = authToken.decode();
  defaultState.user = user;
  defaultState.isAuthenticated = true;
  defaultState.isHydrated = true;
  console.log(defaultState);
}

const AuthContext = createContext<AuthStore & Actions>(defaultState);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<any | null>(defaultState.user);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    defaultState.isAuthenticated
  );
  const [isHydrated, setIsHydrated] = useState<boolean>(
    defaultState.isHydrated
  );

  const setUserHandler = (user: any) => {
    setUser(user);
    setIsAuthenticated(true);
    setIsHydrated(true);
  };
  const clear = () => {
    setUser(null);
    setIsAuthenticated(false);
  };
  const setHydrated = (value: boolean) => {
    setIsHydrated(value);
  };

  return (
    <AuthContext.Provider
      value={{
        clear,
        setUser: setUserHandler,
        user,
        isAuthenticated,
        setHydrated,
        isHydrated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
};
