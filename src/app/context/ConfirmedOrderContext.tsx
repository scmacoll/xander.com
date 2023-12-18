// /app/context/ConfirmedOrderContext.tsx
"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define the shape of the context value
interface ConfirmedOrderContextType {
  orderCompleted: boolean;
  completeOrder: () => void;
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
  const [orderCompleted, setOrderCompleted] = useState<boolean>(() => {
    const storedValue = localStorage.getItem('orderCompleted');
    return storedValue ? JSON.parse(storedValue) : false;
  });

  const completeOrder = () => {
    setOrderCompleted(true);
    localStorage.setItem('orderCompleted', JSON.stringify(true));
  };

  useEffect(() => {
    localStorage.setItem('orderCompleted', JSON.stringify(orderCompleted));
  }, [orderCompleted]);

  return (
    <ConfirmedOrderContext.Provider value={{ orderCompleted, completeOrder }}>
      {children}
    </ConfirmedOrderContext.Provider>
  );
};
