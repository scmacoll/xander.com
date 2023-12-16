// /app/context/ConfirmedOrderContext.tsx
"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

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
  const [orderCompleted, setOrderCompleted] = useState<boolean>(false);

  const completeOrder = () => {
    setOrderCompleted(true);
  };

  return (
    <ConfirmedOrderContext.Provider value={{ orderCompleted, completeOrder }}>
      {children}
    </ConfirmedOrderContext.Provider>
  );
};
