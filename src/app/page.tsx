"use client"

import Header from './components/Header/Header';
import Search from './components/Search/Search';
import Content from './components/Home-Content/Content';
import Footer from './components/Footer/Footer';
import React, { useEffect, useState } from 'react';
import { useCart } from "@/app/context/CartContext";


export default function Home() {
  const [isCardButtonClicked, setCardButtonClicked] = useState(false);
  const [numColumns, setNumColumns] = useState(1);
  const [isCheckoutButtonClicked, setCheckoutButtonClicked] = useState(false);
  const [isEmptyCartWindowOpen, setEmptyCartWindowOpen] = useState(false);
  const { totalQty } = useCart();

  const handleCardButtonClick = () => {
    setCardButtonClicked((prevState) => !prevState);
  };
  const handleCheckoutButtonClick = () => {
    if (!isCheckoutButtonClicked) {
      setCheckoutButtonClicked(true);
      setEmptyCartWindowOpen(true);

      setTimeout(() => {
        setCheckoutButtonClicked(false);
        setEmptyCartWindowOpen(false);
      }, 2000);
    }
  };

  useEffect(() => {
    if (totalQty > 0) {
      setEmptyCartWindowOpen(false);
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
        handleCheckoutButtonClick={handleCheckoutButtonClick} // Pass the handler here
        isCheckoutButtonClicked={isCheckoutButtonClicked}
      />
      <Search
        isCheckoutButtonClicked={isCheckoutButtonClicked}
      />
      <Content
        isCardButtonClicked={isCardButtonClicked}
        numColumns={numColumns}
      />
      <Footer/>
    </main>
  );
}
