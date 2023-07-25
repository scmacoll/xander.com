import React, { useRef } from 'react';
import styles from './Header.module.scss';
import SearchForm from '../Search/SearchForm'

interface HeaderProps {
  onFocusModeToggle: () => void;
  isFocusMode: boolean;
  showFocusButton: boolean;
  showSearch: boolean;
}

const Header: React.FC<HeaderProps> = ({
   onFocusModeToggle, 
   isFocusMode = true, 
   showFocusButton, 
   showSearch 
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

  return (
    <header
      className={`${styles.header} flex justify-between items-center mx-auto p-1`}>
      {showFocusButton && (
        <div
          id="focusButton"
          className="p-2 text-3xl flex flex-1 justify-start">
          <svg
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
        <h1 className="text-3xl">Xandria</h1>
      </div>
      {showSearch && <SearchForm />}
      <div className={`${styles.userHeader}`}>
        <svg
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
              d="M1415 5815 l-25 -24 0 -1518 c0 -835 3 -1528 6 -1541 15 -54 -28 -52
              1179 -52 l1115 0 0 -430 0 -430 -339 0 -340 0 -20 -26 c-26 -34 -26 -54 0 -88
              l20 -26 749 0 749 0 20 26 c26 34 26 54 0 88 l-20 26 -340 0 -339 0 0 430 0
              430 1115 0 c1207 0 1164 -2 1179 52 3 13 6 706 6 1541 l0 1518 -25 24 -24 25
              -2321 0 -2321 0 -24 -25z m4565 -1550 l0 -1435 -2220 0 -2220 0 0 1435 0 1435
              2220 0 2220 0 0 -1435z"
            />
            <path
              d="M3712 4957 c-22 -23 -22 -27 -22 -418 l0 -394 -129 129 c-113 112
              -134 129 -162 129 -21 0 -38 -7 -51 -22 -39 -49 -31 -62 181 -275 176 -176
              203 -199 231 -199 28 0 55 23 231 199 212 213 220 226 181 275 -13 15 -30 22
              -51 22 -28 0 -49 -17 -162 -129 l-129 -129 0 396 0 396 -23 21 c-30 28 -68 28
              -95 -1z"
            />
            <path
              d="M3061 3514 c-27 -35 -26 -59 4 -89 l24 -25 669 0 c623 0 671 1 690
              18 32 26 37 63 12 95 l-21 27 -679 0 -679 0 -20 -26z"
            />
          </g>
        </svg>
        <svg
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
