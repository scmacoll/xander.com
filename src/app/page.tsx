"use client"

import Header from './components/Header/Header';
import Search from './components/Search/Search';
import Content from './components/Home-Content/Content';
import Footer from './components/Footer/Footer';
import React, { useState } from 'react';


export default function Home() {
  const [isCardButtonClicked, setCardButtonClicked] = useState(false);
  const [numColumns, setNumColumns] = useState(1);

    const handleCardButtonClick = () => {
      setCardButtonClicked((prevState) => !prevState);
    };
  return (
    <main>
      <Header
        onFocusModeToggle={handleCardButtonClick}
        isFocusMode={false}
        showSearch={false}
        shortenTitle={false}
        isBookPage={false}
      />
      <Search />
      <Content
        isCardButtonClicked={isCardButtonClicked}
        numColumns={numColumns}
      />
      <Footer />
    </main>
  );
}
