"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

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
  orderNumber: number;
  cartId: string;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  clearCart: () => Promise<boolean>;
  generateOrderNumber: (item: CartItem) => void;
  clearOrderNumber: (item: CartItem) => void;
  totalPrice: number;
  totalQty: number;
  orderNumber: number | null;
  cartId: string | null;
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
  const isBrowser = typeof window !== 'undefined';

  // >>>>>>>>>>> ! Old Code
  //
  // const [cartItems, setCartItems] = useState<CartItem[]>(() => {
  //   // instead of simply parsing the data, we need to also set it to an array for .map
  //   // Use conditional (ternary) operator to access localStorage only if isBrowser is true
  //   const localData = isBrowser ? localStorage.getItem('cart') : null
  //   const parsedData = localData ? JSON.parse(localData) : null;
  //   return parsedData ? parsedData.items : [];
  // });
  //
  // const [orderNumber, setOrderNumber] = useState<number | null>(() => {
  //   const localData = isBrowser ? localStorage.getItem('cart') : null
  //   if (localData) {
  //     const parsedData = JSON.parse(localData);
  //     return parsedData.orderNumber ?? null;  // Use null coalescing to default to null if orderNumber is not present
  //   }
  //   return null;
  // });
  //
  // const [cartId, setCartId] = useState<string | null>(() => {
  //   const localData = isBrowser ? localStorage.getItem('cart') : null
  //   return localData ? JSON.parse(localData).cartId : null;
  // });
  //
  // >>>>>>>>>>> ! Old Code


  // >>>>>>>>>>> ! New Code

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderNumber, setOrderNumber] = useState<number | null>(null);
  const [cartId, setCartId] = useState<string | null>(null);

  useEffect(() => {
    if (isBrowser) {
      const localData = localStorage.getItem('cart');
      const parsedData = localData ? JSON.parse(localData) : {};
      setCartItems(parsedData.items || []);
      setOrderNumber(parsedData.orderNumber || null);
      setCartId(parsedData.cartId || null);
    }
  }, []);

  // >>>>>>>>>>> ! New Code


  const [totalPrice, setTotalPrice] = useState(0);
  const initialTotalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const [totalQty, setTotalQty] = useState(initialTotalQty);

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
      totalQty: newTotalQty,
      orderNumber: orderNumber,
      cartId: cartId,
    };
    if (isBrowser) {
      localStorage.setItem('cart', JSON.stringify(cartData));
    }
  }, [cartItems, orderNumber, cartId]);


  const addToCart = (newItem: CartItem) => {
    return new Promise<boolean>((resolve, reject) => {

      setCartItems(currentItems => {
        let newCartId = cartId;
        if (currentItems.length === 0 && !cartId) {
          newCartId = uuidv4();
          setCartId(newCartId);
        }

        const currentTotalQty = currentItems.reduce((acc, item) => acc + item.qty, 0);
        if (currentTotalQty + newItem.qty > 30) {
          console.warn("Cannot add more items to the cart. Total quantity limit reached.");
          reject("Total quantity limit reached.");
          return currentItems;
        }

        const existingItemIndex = currentItems.findIndex(item => item.bookTitle === newItem.bookTitle);
        let updatedItems;
        if (existingItemIndex !== -1) {
          updatedItems = currentItems.map((item, index) => {
            if (index === existingItemIndex) {
              return {
                ...item,
                qty: item.qty + newItem.qty,
                qtyPrice: parseFloat(((item.qty + newItem.qty) * item.bookPrice).toFixed(2))
              };
            }
            return item;
          });
        } else {
          updatedItems = [...currentItems, newItem];
        }

        const cartData = {
          items: updatedItems,
          totalPrice: totalPrice, // Ensure these values are correctly calculated or updated
          totalQty: totalQty,
          orderNumber: orderNumber,
          cartId: newCartId,
        };

        if (isBrowser) {
          localStorage.setItem('cart', JSON.stringify(cartData));
        }

        console.log("context cart id is:", newCartId); // Use newCartId here.

        // @ts-ignore
        resolve(newCartId);
        return updatedItems;
      });

    });
  };



  const removeFromCart = (itemTitle: any) => {
    setCartItems(currentItems => currentItems.filter(item => item.bookTitle !== itemTitle));
    // You might also want to update totalPrice and totalQty here, similar to how it's done in useEffect
  };

  const clearCart = () => {
    return new Promise<boolean>((resolve) => {
      try {
        setCartItems([]);
        setTotalQty(0);
        setTotalPrice(0);
        setCartId(null);
        if (isBrowser) {
          localStorage.setItem('cart', JSON.stringify({ items: [], totalPrice: 0, totalQty: 0, cartId: null }));
        }
        console.log("Cart cleared");
        resolve(true); // Resolve the promise with true
      } catch (error) {
        console.error("Error clearing the cart:", error);
        resolve(false); // Resolve the promise with false in case of error
      }
    });
  };


  const generateOrderNumber = () => {
    console.log("random number is being generated via context");
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    setOrderNumber(randomNumber);
  };
  const clearOrderNumber = () => {
    console.log("order number is being cleared via context");
    setOrderNumber(null);
  };


  return (
    <CartContext.Provider value={{ cartItems, totalQty, totalPrice, orderNumber, cartId, addToCart, removeFromCart, clearCart, generateOrderNumber, clearOrderNumber }}>
      {children}
    </CartContext.Provider>
  );
};
