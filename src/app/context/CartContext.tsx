"use client";

import React, { createContext, useState, useContext } from 'react';

export type CartItem = {
  bookTitle: string;
  bookAuthors: string;
  bookType: string;
  bookDate: string;
  imageUrl: string;
  qty: number;
  totalPrice: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  clearCart: (item: CartItem) => void;
};

type CartProviderProps = {
  children: React.ReactNode;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCartItems(currentItems => [...currentItems, item]);
    console.log("Adding to cart: ", item);
    // Implementation of adding to cart
  };

  const removeFromCart = (item: CartItem) => {
    console.log("Removing from cart: ", item);
    // Implementation of removing from cart
  };

  const clearCart = (item: CartItem) => {
    setCartItems([]);
    console.log("Cart cleared");
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
