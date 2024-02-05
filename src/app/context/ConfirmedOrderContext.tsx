// /app/context/ConfirmedOrderContext.tsx
"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define the shape of the context value
interface ConfirmedOrderContextType {
  orderCompleted: boolean;
  completeOrder: (b: boolean) => void;
  setOrderCompleted: (b: boolean) => void;
}

// Create the context with the specified type
const ConfirmedOrderContext = createContext<ConfirmedOrderContextType | undefined>(undefined);

export const useConfirmedOrder = () => {
  const context = useContext(ConfirmedOrderContext);
  if (!context) {
    throw new Error('useConfirmedOrder must be used within a ConfirmedOrderProvider');
  }
  return context;
};

interface ConfirmedOrderProviderProps {
  children: ReactNode;
}

export const ConfirmedOrderProvider: React.FC<ConfirmedOrderProviderProps> = ({ children }) => {
  const isBrowser = typeof window !== 'undefined';

  // Initialize state with a default value
  const [orderCompleted, setOrderCompleted] = useState<boolean>(false);

  // Hydrate state from localStorage in useEffect
  useEffect(() => {
    if (isBrowser) {
      const storedValue = localStorage.getItem('orderCompleted');
      setOrderCompleted(storedValue ? JSON.parse(storedValue) : false);
    }
  }, []);

  const completeOrder = (isOrderCompleted: boolean) => {
    setOrderCompleted(isOrderCompleted);
    if (isBrowser) {
      localStorage.setItem('orderCompleted', JSON.stringify(isOrderCompleted));
    }
  };

  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem('orderCompleted', JSON.stringify(orderCompleted));
    }
  }, [orderCompleted]);

  return (
    <ConfirmedOrderContext.Provider value={{ orderCompleted, completeOrder, setOrderCompleted }}>
      {children}
    </ConfirmedOrderContext.Provider>
  );
};
