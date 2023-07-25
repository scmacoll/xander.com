'use client';

import Header from '../components/Header/Header';
import Search from '../components/Search/Search';
import Footer from '../components/Footer/Footer';
import React, { useState } from 'react';

export default function Home() {
  const [isCardButtonClicked, setCardButtonClicked] = useState(false);

  const handleCardButtonClick = () => {
    setCardButtonClicked((prevState) => !prevState);
  };
  return (
    <main>
      <Header onFocusModeToggle={ handleCardButtonClick } isFocusMode={ false } showFocusButton={ false } />
      <Search />
      <Footer />
    </main>
  );
}
