// /app/context/SessionExpiredContext.tsx
"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define the shape of the context value
interface SessionExpiredContextType {
  isSessionExpired: boolean;
  expireSession: (b: boolean) => void;
  setSessionExpired: (b: boolean) => void;
}

// Create the context with the specified type
const SessionExpiredContext = createContext<SessionExpiredContextType | undefined>(undefined);

export const useSessionExpired = () => {
  const context = useContext(SessionExpiredContext);
  if (!context) {
    throw new Error('useSessionExpired must be used within a SessionExpiredProvider');
  }
  return context;
};

interface SessionExpiredProviderProps {
  children: ReactNode;
}

export const SessionExpiredProvider: React.FC<SessionExpiredProviderProps> = ({ children }) => {
  const isBrowser = typeof window !== 'undefined';

  // Initialize state with a default value
  const [isSessionExpired, setSessionExpired] = useState<boolean>(false);

  // Hydrate state from localStorage in useEffect
  useEffect(() => {
    if (isBrowser) {
      const storedValue = localStorage.getItem('sessionExpired');
      setSessionExpired(storedValue ? JSON.parse(storedValue) : false);
    }
  }, []);

  const expireSession = (sessionExpired: boolean) => {
    setSessionExpired(sessionExpired);
    if (isBrowser) {
      localStorage.setItem('sessionExpired', JSON.stringify(sessionExpired));
    }
  };

  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem('sessionExpired', JSON.stringify(isSessionExpired));
    }
  }, [isSessionExpired]);

  return (
    <SessionExpiredContext.Provider value={{ isSessionExpired, expireSession, setSessionExpired }}>
      {children}
    </SessionExpiredContext.Provider>
  );
};
