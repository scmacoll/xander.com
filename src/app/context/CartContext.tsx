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
  totalPrice: number;
  totalQty: number;
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
    // instead of simply parsing the data, we need to also set it to an array for .map
    const localData = localStorage.getItem('cart');
    const parsedData = localData ? JSON.parse(localData) : null;
    return parsedData ? parsedData.items : [];
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);

  useEffect(() => {
    // Whenever cartItems changes, update totalPrice and totalQty
    const newTotalPrice = cartItems.reduce((acc, item) => acc + item.qtyPrice, 0);
    const newTotalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);

    setTotalPrice(parseFloat(newTotalPrice.toFixed(2)));
    setTotalQty(newTotalQty);

    // Update local storage
    const cartData = {
      items: cartItems,
      totalPrice: newTotalPrice,
      totalQty: newTotalQty
    };
    localStorage.setItem('cart', JSON.stringify(cartData));
  }, [cartItems]);

  const addToCart = (newItem: CartItem) => {
    setCartItems(currentItems => {
      const currentTotalQty = currentItems.reduce((acc, item) => acc + item.qty, 0);
      if (currentTotalQty + newItem.qty > 30) {
        console.warn("Cannot add more items to the cart. Total quantity limit reached.");
        return currentItems;
      }

      const existingItemIndex = currentItems.findIndex(item => item.bookTitle === newItem.bookTitle);
      let updatedItems;
      if (existingItemIndex !== -1) {
        // Update the item if it already exists
        updatedItems = currentItems.map((item, index) => {
          if (index === existingItemIndex) {
            return {
              ...item,
              qty: item.qty + newItem.qty, // Increment quantity
              qtyPrice: parseFloat(((item.qty + newItem.qty) * item.bookPrice).toFixed(2)) // Update total price
            };
          }
          return item;
        });
      } else {
        // Add the new item if it doesn't exist in the cart
        updatedItems = [...currentItems, newItem];
      }

      return updatedItems;
    });
  };

  const removeFromCart = (item: CartItem) => {
    console.log("Removing from cart: ", item);
    // Implementation of removing from cart
  };

  const clearCart = () => {
    setCartItems([]);
    setTotalQty(0);
    setTotalPrice(0);
    localStorage.setItem('cart', JSON.stringify({ items: [], totalPrice: 0, totalQty: 0 }));
    console.log("Cart cleared");
  }


  return (
    <CartContext.Provider value={{ cartItems, totalQty, totalPrice, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
