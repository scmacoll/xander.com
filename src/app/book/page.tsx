'use client';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import React, { useState } from 'react';
import BookPageContent from '../components/Book-Page-Content/Book-Page-Content';

export default function Home() {
  const [isCardButtonClicked, setCardButtonClicked] = useState(false);

  const handleCardButtonClick = () => {
    setCardButtonClicked((prevState) => !prevState);
  };
  return (
    <main>
      <Header
        onFocusModeToggle={handleCardButtonClick}
        isFocusMode={false}
        showFocusButton={false}
        showSearch={true}
        hideSvg={true}
        shortenTitle={true}
        isBookPage={true}
      />
      <BookPageContent />
      <Footer />
    </main>
  );
}
