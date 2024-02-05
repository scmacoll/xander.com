"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

const HeartContext = createContext<{
  quoteHearts: { [key: string]: boolean };
  bookHearts: { [key: string]: boolean };
  toggleQuoteHeart: (quote: string) => void;
  toggleBookHeart: (bookTitle: string) => void;
  clearAllHearts: () => void;  // Add this line
} | undefined>(undefined);

export const HeartsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isBrowser = typeof window !== 'undefined';

  // >>>>>>>> Old Code
  //
  // const [quoteHearts, setQuoteHearts] = useState<{ [key: string]: boolean }>(() => {
  //   if (isBrowser) {
  //     const storedHearts = localStorage.getItem('quoteHearts');
  //     return storedHearts ? JSON.parse(storedHearts) : {};
  //   }
  // });
  //
  // const [bookHearts, setBookHearts] = useState<{ [key: string]: boolean }>(() => {
  //   if (isBrowser) {
  //     const storedHearts = localStorage.getItem('bookHearts');
  //     return storedHearts ? JSON.parse(storedHearts) : {};
  //   }
  // });
  //
  // >>>>>>>> Old Code

  // >>>>>>>> New Code
  //
  const [quoteHearts, setQuoteHearts] = useState<{ [key: string]: boolean }>({});
  const [bookHearts, setBookHearts] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (isBrowser) {
      const storedQuoteHearts = localStorage.getItem('quoteHearts');
      const storedBookHearts = localStorage.getItem('bookHearts');
      if (storedQuoteHearts) {
        setQuoteHearts(JSON.parse(storedQuoteHearts));
      }
      if (storedBookHearts) {
        setBookHearts(JSON.parse(storedBookHearts));
      }
    }
  }, []);
  //
  // >>>>>>>> New Code

  const toggleQuoteHeart = (quote: string) => {
    setQuoteHearts(prevHearts => {
      const newHearts = { ...prevHearts, [quote]: !prevHearts[quote] };
      if (isBrowser) {
        localStorage.setItem('quoteHearts', JSON.stringify(newHearts));
      }
      return newHearts;
    });
  };

  const toggleBookHeart = (bookTitle: string) => {
    setBookHearts(prevHearts => {
      const newHearts = { ...prevHearts, [bookTitle]: !prevHearts[bookTitle] };
      if (isBrowser) {
        localStorage.setItem('bookHearts', JSON.stringify(newHearts));
      }
      return newHearts;
    });
  };


  const clearAllHearts = () => {
    setQuoteHearts({});
    setBookHearts({});
    if (isBrowser) {
      localStorage.removeItem('quoteHearts');
      localStorage.removeItem('bookHearts');
    }
  };

  return (
    <HeartContext.Provider value={{ quoteHearts, bookHearts, toggleQuoteHeart, toggleBookHeart, clearAllHearts }}>
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
