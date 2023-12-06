"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';

export type CartItem = {
  bookTitle: string;
  bookAuthors: string;
  bookType: string;
  bookDate: string;
  imageUrl: string;
  bookPrice: number;
  qty: number;
  qtyPrice: number;
  totalPrice: number;
  totalQty: number;
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
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const localData = localStorage.getItem('cart');
    return localData ? JSON.parse(localData) : [];
  });


  const addToCart = (newItem: any) => {
    setCartItems(currentItems => {
      const existingItemIndex = currentItems.findIndex(item => item.bookTitle === newItem.bookTitle);

      let updatedItems;
      if (existingItemIndex !== -1) {
        // Update the item if it already exists
        updatedItems = currentItems.map((item, index) => {
          if (index === existingItemIndex) {
            return {
              ...item,
              qty: item.qty + newItem.qty, // Increment quantity
              qtyPrice: (item.qty + newItem.qty) * item.bookPrice // Update total price
            };
          }
          return item;
        });
      } else {
        // Add the new item if it doesn't exist in the cart
        updatedItems = [...currentItems, newItem];
      }

      // Calculate totals
      const totalPrice = updatedItems.reduce((acc, item) => acc + item.qtyPrice, 0);
      const totalQty = updatedItems.reduce((acc, item) => acc + item.qty, 0);

      // Save the updated cart with totals to local storage
      const cartData = {
        items: updatedItems,
        totalPrice: totalPrice,
        totalQty: totalQty
      };
      localStorage.setItem('cart', JSON.stringify(cartData));

      return updatedItems;
    });
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
