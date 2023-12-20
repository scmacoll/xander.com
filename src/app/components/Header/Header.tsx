import React, { useEffect, useRef, useState } from 'react';
import styles from './Header.module.scss';
import Link from 'next/link';
import { useCart } from "@/app/context/CartContext";

interface HeaderProps {
  onFocusModeToggle: () => void,
  isFocusMode: boolean,
  showSearch: boolean,
  shortenTitle: boolean,
  isBookPage: boolean,
  isCheckoutButtonClicked: boolean,
  handleCheckoutButtonClick: () => void,
  isEmptyCartWindowOpen: boolean
}

const Header: React.FC<HeaderProps> = ({
                                         onFocusModeToggle,
                                         isFocusMode = true,
                                         showSearch,
                                         shortenTitle = false,
                                         isBookPage = false,
                                         isCheckoutButtonClicked,
                                         handleCheckoutButtonClick,
                                         isEmptyCartWindowOpen,
                                       }) => {


  // @ts-ignore
  const { totalQty, cartId } = useCart();
  console.log("Cart ID in Header:", cartId);
  const [hasPageLoaded, setHasPageLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setHasPageLoaded(true);
    }, 10)
  }, []);

  const handleFocusModeToggle = () => {
    onFocusModeToggle();
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  if (!hasPageLoaded) {
    return null;
  }

  return (
    <header className={`
      ${styles.header}
      ${shortenTitle ? styles.shortenTitle : ''} 
      ${showSearch ? 'pb-4' : ''} 
      relative flex justify-between items-center mx-auto p-1
      `}>

      <div
        id="focusButton"
        className="text-3xl xs:hidden"
        style={{transform: 'translateX(4px)'}}
      >
        <svg id="dropdownIcon" className="hidden"
             version="1.0"
             xmlns="http://www.w3.org/2000/svg"
             width="2.2rem"
             height="2.2rem"
             viewBox="0 0 752.000000 752.000000"
             preserveAspectRatio="xMidYMid meet">
          <g
            transform="translate(0.000000,752.000000) scale(0.100000,-0.100000)"
            fill="rgba(210, 207, 202, 0.8)"
            stroke="none">
            <path
              d="M1510 5415 l0 -175 2250 0 2250 0 0 175 0 175 -2250 0 -2250 0 0
            -175z"
            />
            <path
              d="M1517 3933 c-4 -3 -7 -84 -7 -180 l0 -173 2250 0 2250 0 -2 178 -3
            177 -2241 3 c-1232 1 -2244 -1 -2247 -5z"
            />
            <path
              d="M1510 2105 l0 -175 2250 0 2250 0 0 175 0 175 -2250 0 -2250 0 0
            -175z"
            />
          </g>
        </svg>
        <div
          className={`pl-5 text-xs flex justify-center items-center text-align ${styles.hideOnSmallScreen}`}>
          <span className="cursor-pointer text-sm pr-2" onClick={handleClick}>Focus</span>
          <label
            className={`${styles.switch} ${
              isFocusMode ? styles.active : ''
            }`}>
            <input
              type="checkbox"
              onClick={handleFocusModeToggle}
              defaultChecked={true}
              ref={inputRef}
            />
            <span className={styles.slider}></span>
          </label>
        </div>
      </div>

      <div className={`${styles.heartIcon} hidden xs:flex`}>
        <svg
          id="headerHeartIcon"
          // className={svgClass}
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="3em"
          height="3em"
          viewBox="0 0 752.000000 752.000000"
          preserveAspectRatio="xMidYMid meet">
          <g
            transform="translate(000.000000,752.000000) scale(0.100000,-0.100000)"
            stroke="none">
            <path
              d="M2496 5665 c-595 -113 -1011 -636 -982 -1235 13 -273 103 -511 274
                    -728 34 -44 454 -470 933 -946 959 -956 913 -916 1039 -916 127 0 78 -43 1059
                    937 489 488 909 915 934 948 368 493 334 1168 -79 1590 -237 241 -530 365
                    -868 365 -135 0 -258 -18 -370 -55 -207 -67 -332 -149 -528 -343 l-148 -146
                    -147 146 c-214 210 -365 302 -601 364 -125 33 -390 42 -516 19z m399 -190
                    c112 -20 243 -69 347 -131 64 -38 126 -91 273 -236 115 -112 202 -189 218
                    -193 54 -14 80 4 262 185 193 190 278 254 410 309 117 49 218 72 346 78 299
                    15 567 -87 773 -293 300 -300 378 -759 196 -1151 -83 -178 -87 -182 -1029
                    -1121 -487 -485 -896 -885 -908 -888 -13 -3 -33 -3 -45 0 -30 8 -1762 1732
                    -1823 1814 -308 414 -277 985 73 1339 238 240 572 346 907 288z"
            />
          </g>
        </svg>
      </div>
      <div className={`${styles.xandria}`}>
        <h1>
          <a href="/">Xandria</a>
        </h1>
      </div>
      <div id="headerIcons"
           className="flex cursor-pointer mx-auto justify-end align-center h-fit">
        <div className={`${styles.heartIcon} xs:hidden`}>
          <svg
            id="headerHeartIcon"
            // className={svgClass}
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="3em"
            height="3em"
            viewBox="0 0 752.000000 752.000000"
            preserveAspectRatio="xMidYMid meet">
            <g
              transform="translate(000.000000,752.000000) scale(0.100000,-0.100000)"
              stroke="none">
              <path
                d="M2496 5665 c-595 -113 -1011 -636 -982 -1235 13 -273 103 -511 274
                    -728 34 -44 454 -470 933 -946 959 -956 913 -916 1039 -916 127 0 78 -43 1059
                    937 489 488 909 915 934 948 368 493 334 1168 -79 1590 -237 241 -530 365
                    -868 365 -135 0 -258 -18 -370 -55 -207 -67 -332 -149 -528 -343 l-148 -146
                    -147 146 c-214 210 -365 302 -601 364 -125 33 -390 42 -516 19z m399 -190
                    c112 -20 243 -69 347 -131 64 -38 126 -91 273 -236 115 -112 202 -189 218
                    -193 54 -14 80 4 262 185 193 190 278 254 410 309 117 49 218 72 346 78 299
                    15 567 -87 773 -293 300 -300 378 -759 196 -1151 -83 -178 -87 -182 -1029
                    -1121 -487 -485 -896 -885 -908 -888 -13 -3 -33 -3 -45 0 -30 8 -1762 1732
                    -1823 1814 -308 414 -277 985 73 1339 238 240 572 346 907 288z"
              />
            </g>
          </svg>
        </div>

        <div id="cartShoppingBag" className={`${styles.shoppingBagIcon} relative`}>
          <Link href={totalQty > 0 ? `/checkout/${cartId}` : '#'} passHref>
          {/*<Link href={`/checkout/${cartId}`}>*/}
            <button
              onClick={handleCheckoutButtonClick}
              className={`${isEmptyCartWindowOpen ? 'cursor-default select-none' : ''}`}
            >
              <svg id="checkoutBagIcon"
                // className={svgClass}
                   version="1.0"
                   xmlns="http://www.w3.org/2000/svg"
                   width="3.2em"
                   height="3.2em"
                   viewBox="0 0 752.000000 752.000000"
                   preserveAspectRatio="xMidYMid meet">
                <g
                  transform="translate(0.000000,752.000000) scale(0.100000,-0.100000)"
                  fill="rgb(210, 207, 202)"
                  stroke="none">
                  <path
                    d="M3664 5870 c-248 -36 -468 -221 -548 -461 -23 -66 -30 -109 -34 -201
                l-5 -118 -347 0 -347 0 -21 -23 c-21 -22 -23 -49 -88 -1422 -65 -1358 -67
                -1402 -51 -1480 46 -226 216 -402 442 -460 89 -23 2098 -22 2194 0 95 23 187
                72 260 140 128 119 191 259 191 428 1 171 -121 2742 -131 2768 -18 47 -37 49
                -393 49 l-333 0 -6 104 c-7 124 -27 207 -72 301 -126 262 -421 417 -711 375z
                m215 -155 c142 -34 284 -140 348 -261 45 -85 64 -161 66 -266 l2 -93 -535 0
                -535 0 2 93 c3 158 53 280 154 382 131 130 322 186 498 145z m-799 -938 c0
                -152 2 -165 20 -182 26 -23 74 -23 100 0 18 17 20 30 20 182 l0 163 540 0 540
                0 0 -163 c0 -152 2 -165 20 -182 26 -23 74 -23 100 0 18 17 20 30 20 182 l0
                163 300 0 c165 0 300 -1 300 -2 1 -2 29 -604 64 -1338 43 -904 61 -1353 55
                -1389 -21 -136 -119 -265 -248 -329 l-75 -37 -1076 0 -1076 0 -76 38 c-126 62
                -211 172 -241 312 -9 47 -2 271 46 1338 32 705 60 1310 64 1345 l5 62 299 0
                299 0 0 -163z"
                  />
                </g>
              </svg>
              <div>
                {totalQty > 0 && (
                  <div className={styles.wholeBubble}>
                    <div className={styles.cartNotificationBubble}>
                      {totalQty}
                      <span className={styles.bubbleTail}></span>
                    </div>
                  </div>
                )}
              </div>
            </button>
          </Link>
        </div>

      </div>

    </header>
  );
};

export default Header;
