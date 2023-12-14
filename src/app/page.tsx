"use client"

import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Search from './components/Search/Search';
import Content from './components/Home-Content/Content';
import Footer from './components/Footer/Footer';
import { useRouter } from 'next/router';
import { useCart } from "@/app/context/CartContext";


export default function Home() {
  const [isCardButtonClicked, setCardButtonClicked] = useState(false);
  const [numColumns, setNumColumns] = useState(1);
  const [isCheckoutButtonClicked, setCheckoutButtonClicked] = useState(false);
  const [isEmptyCartWindowOpen, setEmptyCartWindowOpen] = useState(false);
  const { totalQty } = useCart();
  const router = useRouter();
  const { cartId } = useCart(); // Assuming this is how you get the cartId

  const handleCardButtonClick = () => {
    setCardButtonClicked((prevState) => !prevState);
  };
  const handleCheckoutButtonClick = () => {
    if (!isCheckoutButtonClicked && totalQty === 0) {
      setCheckoutButtonClicked(true);
      setEmptyCartWindowOpen(true);

      setTimeout(() => {
        setCheckoutButtonClicked(false);
        setEmptyCartWindowOpen(false);
      }, 2000);
    } else if (totalQty > 0) {
      // window.location.href = "/checkout";
      router.push(`/checkout/${cartId}`);
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
