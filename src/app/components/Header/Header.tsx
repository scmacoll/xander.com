import React, { useRef } from 'react';
import styles from './Header.module.scss';
import SearchForm from '../Search/SearchForm';

interface HeaderProps {
  onFocusModeToggle: () => void;
  isFocusMode: boolean;
  showFocusButton: boolean;
  showSearch: boolean;
  hideSvg?: boolean;
  shortenTitle: boolean;
  isBookPage: boolean;
}

const Header: React.FC<HeaderProps> = ({
  onFocusModeToggle,
  isFocusMode = true,
  showFocusButton,
  showSearch,
  hideSvg,
  shortenTitle = false,
  isBookPage = false,
}) => {
  const handleFocusModeToggle = () => {
    onFocusModeToggle();
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const svgClass = hideSvg ? styles['hide-svg'] : '';
  
  return (
    <header
      className={`
      ${styles.header}
      ${shortenTitle ? styles.shortenTitle : ''} 
      ${showSearch ? 'pb-4' : ''} 
      flex justify-between items-center mx-auto p-1
      `}>
      {showFocusButton && (
        <div
          id="focusButton"
          className="text-3xl flex flex-1 justify-start"
          style={{ transform: 'translateX(4px)' }}>
          <svg id="dropdownIcon"
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
            <span className="cursor-pointer text-sm pr-2" onClick={handleClick}>
              Focus
            </span>
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
      )}
      
      <div className={`${styles.xandria} `}>
        <a href="/">
          <h1>Xandria</h1>
        </a>
      </div>
      {showSearch && <SearchForm isBookPage={isBookPage} />}
      <div className={`${styles.userHeader}`}>
        <svg id="checkoutBag"
          className={svgClass}
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="3.2rem"
          height="3.2rem"
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
        <svg id="userIcon"
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="3.2rem"
          height="3.2rem"
          viewBox="0 0 752.000000 752.000000"
          preserveAspectRatio="xMidYMid meet">
          <g
            transform="translate(0.000000,752.000000) scale(0.100000,-0.100000)"
            fill="#ffffff"
            stroke="none">
            <path
              d="M3491 5764 c-656 -89 -1232 -499 -1534 -1092 -247 -484 -285 -1065
              -105 -1582 67 -192 206 -439 338 -600 794 -971 2243 -1004 3077 -71 333 373
              513 843 513 1341 0 317 -65 597 -205 885 -301 620 -904 1046 -1590 1125 -124
              14 -369 11 -494 -6z m499 -95 c326 -40 613 -152 893 -349 120 -84 353 -317
              437 -437 135 -192 227 -381 285 -584 61 -211 70 -278 69 -544 0 -223 -2 -249
              -27 -368 -70 -327 -210 -617 -419 -865 -38 -45 -72 -82 -76 -82 -4 0 -20 39
              -35 88 -113 354 -379 662 -720 833 -81 41 -270 109 -303 109 -10 0 16 19 57
              43 222 126 360 302 419 532 73 283 -2 570 -203 782 -335 352 -879 352 -1214 0
              -343 -361 -296 -939 98 -1237 43 -32 103 -70 134 -85 l57 -28 -79 -23 c-453
              -131 -819 -484 -960 -926 -15 -49 -31 -88 -35 -88 -4 0 -38 37 -76 83 -209
              248 -349 537 -419 864 -25 119 -27 145 -27 368 -1 266 8 333 69 543 161 559
              579 1021 1128 1247 113 46 308 99 422 115 50 6 97 13 105 15 40 8 345 4 420
              -6z m-54 -699 c226 -57 423 -226 508 -436 78 -192 72 -411 -18 -599 -84 -177
              -240 -317 -426 -380 -158 -54 -321 -54 -480 0 -400 136 -604 585 -444 979 84
              208 281 378 504 436 103 26 252 26 356 0z m48 -1575 c270 -47 516 -175 712
              -370 109 -109 210 -251 268 -376 36 -79 96 -258 96 -287 0 -10 -21 -36 -47
              -57 -267 -225 -541 -360 -880 -432 -120 -25 -144 -27 -373 -27 -228 0 -254 2
              -371 27 -345 73 -628 214 -899 446 l-35 30 17 63 c134 509 543 890 1056 982
              106 19 348 20 456 1z"
            />
          </g>
        </svg>
      </div>
    </header>
  );
};

export default Header;
