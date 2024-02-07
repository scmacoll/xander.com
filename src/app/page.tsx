"use client"

import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Search from './components/Search/Search';
import Content from './components/Home-Content/Content';
import Footer from './components/Footer/Footer';
import { useCart } from "@/app/context/CartContext";
import { useSessionExpired } from "@/app/context/SessionExpiryContent";
import { usePathname, useRouter } from 'next/navigation';


export default function Home() {
  const router = useRouter();
  const [isCardButtonClicked, setCardButtonClicked] = useState(false);
  const [numColumns, setNumColumns] = useState(1);
  const [isCheckoutButtonClicked, setCheckoutButtonClicked] = useState(false);
  const [isEmptyCartWindowOpen, setEmptyCartWindowOpen] = useState(false);
  const { totalQty, cartId } = useCart();
  const { isSessionExpired, expireSession } = useSessionExpired();

  const handleCardButtonClick = () => {
    setCardButtonClicked((prevState) => !prevState);
  };
  const handleCheckoutButtonClick = () => {
    if (totalQty === 0) {
      // Handle the empty cart case
      setCheckoutButtonClicked(true);
      setEmptyCartWindowOpen(true);

      setTimeout(() => {
        setCheckoutButtonClicked(false);
        setEmptyCartWindowOpen(false);
      }, 2000);
    } else if (totalQty > 0) {
      // Handle the case where the cart is not empty
      if (isSessionExpired) {
        // If the session is expired, reset the session and navigate
        expireSession(false);
        // Navigate to checkout page
        router.push(`/checkout/${cartId}`);
      } else {
        // If the session is not expired, just navigate
        router.push(`/checkout/${cartId}`);
      }
    }
  };


  useEffect(() => {
    if (totalQty > 0) {
      setEmptyCartWindowOpen(false);
      setCheckoutButtonClicked(false);
    }
  }, [totalQty]);



  return (
    <main>
      <Header
        onFocusModeToggle={handleCardButtonClick}
        isFocusMode={false}
        showSearch={false}
        shortenTitle={false}
        isBookPage={false}
        handleCheckoutButtonClick={handleCheckoutButtonClick}
        isCheckoutButtonClicked={isCheckoutButtonClicked}
        isEmptyCartWindowOpen={isEmptyCartWindowOpen}
      />
      <Search
        isCheckoutButtonClicked={isCheckoutButtonClicked}
        isEmptyCartWindowOpen={isEmptyCartWindowOpen}
      />
      <Content
        isCardButtonClicked={isCardButtonClicked}
        numColumns={numColumns}
      />
      <Footer/>
    </main>
  );
}
