"use client";
import React, { createContext, useState, useContext } from "react";

const HeartContext = createContext<{
  quoteHearts: { [key: string]: boolean };
  bookHearts: { [key: string]: boolean };
  toggleQuoteHeart: (quote: string) => void;
  toggleBookHeart: (bookTitle: string) => void;
} | undefined>(undefined);

export const HeartsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quoteHearts, setQuoteHearts] = useState<{ [key: string]: boolean }>(() => {
    const storedHearts = localStorage.getItem('quoteHearts');
    return storedHearts ? JSON.parse(storedHearts) : {};
  });

  const [bookHearts, setBookHearts] = useState<{ [key: string]: boolean }>(() => {
    const storedHearts = localStorage.getItem('bookHearts');
    return storedHearts ? JSON.parse(storedHearts) : {};
  });

  const toggleQuoteHeart = (quote: string) => {
    setQuoteHearts(prevHearts => {
      const newHearts = { ...prevHearts, [quote]: !prevHearts[quote] };
      localStorage.setItem('quoteHearts', JSON.stringify(newHearts));
      return newHearts;
    });
  };

  const toggleBookHeart = (bookTitle: string) => {
    setBookHearts(prevHearts => {
      const newHearts = { ...prevHearts, [bookTitle]: !prevHearts[bookTitle] };
      localStorage.setItem('bookHearts', JSON.stringify(newHearts));
      return newHearts;
    });
  };

  return (
    <HeartContext.Provider value={{ quoteHearts, bookHearts, toggleQuoteHeart, toggleBookHeart }}>
      {children}
    </HeartContext.Provider>
  );
};

export const useHearts = () => {
  const context = useContext(HeartContext);
  if (!context) {
    throw new Error('useHearts must be used within a HeartProvider');
  }
  return context;
};
