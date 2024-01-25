import React, { useState, useEffect } from 'react';
import Content, { TileCard } from '../Content';
import styles from './CardClicked.module.scss';
import { useCart } from "@/app/context/CartContext";
import { useHearts } from "@/app/context/HeartContext";

interface CardProps {
  card: TileCard,
  isOneColumn: boolean,
  numColumns: number;
}

const Card: React.FC<CardProps> = ({card, numColumns}) => {
  const isOneColumn = numColumns === 1;
  const imageUrl = `/${card.cell_name}.jpg`;
  const portraitImageUrl = `P${card.cell_name}.png`;
  const [qty, setQty] = useState(1);
  const [qtyPrice, setQtyPrice] = useState(parseFloat(card.book_price).toFixed(2));
  const { addToCart, clearCart, cartId } = useCart();
  const [isConfirmAddToCart, setIsConfirmAddToCart] = useState(false);

  const { quoteHearts, bookHearts, toggleQuoteHeart, toggleBookHeart } = useHearts();
  const handleQuoteHeartClick = () => {
    toggleQuoteHeart(card.quote);
  };
  const handleBookHeartClick = () => {
    toggleBookHeart(card.book_title);
  };

  // Event handlers
  const incrementQty = () => {
    if (qty >= 10 ) {
      return;
    } else {
      const newQty = qty + 1;
      setQty(newQty);
      setQtyPrice((newQty * parseFloat(card.book_price)).toFixed(2)); // format qtyPrice
    }
  };

  const decrementQty = () => {
    if (qty > 1) {
      const newQty = qty - 1;
      setQty(newQty);
      setQtyPrice((newQty * parseFloat(card.book_price)).toFixed(2)); // format qtyPrice
    }
  };

  const handleAddToCart = () => {
    console.log("add to cart invoked")
    const newItem: any = {
      qty,
      imageUrl: `/${card.cell_name}.jpg`,
      qtyPrice: parseFloat((qty * parseFloat(card.book_price)).toFixed(2)), // format qtyPrice
      bookPrice: parseFloat(card.book_price).toFixed(2),
      bookTitle: card.book_title,
      bookAuthors: card.book_authors,
      bookType: card.book_type,
      bookDate: card.book_date
    };
    console.log("Item to be added: ", newItem);
    addToCart(newItem);
    setIsConfirmAddToCart(true);
    setTimeout(() => {
      setIsConfirmAddToCart(false);
    }, 2000);
  };

  const handleBuyNow = async () => {
    console.log("buy now invoked")
    const newItem: any = {
      qty,
      imageUrl: `/${card.cell_name}.jpg`,
      qtyPrice: parseFloat((qty * parseFloat(card.book_price)).toFixed(2)), // format qtyPrice
      bookPrice: parseFloat(card.book_price).toFixed(2),
      bookTitle: card.book_title,
      bookAuthors: card.book_authors,
      bookType: card.book_type,
      bookDate: card.book_date
    };
    console.log("Item to be added: ", newItem);
    try {
      const cartId = await addToCart(newItem);
      // @ts-ignore
      if (cartId) {
        window.location.href = `/checkout/${cartId}`;
      } else {
        throw new Error('Cart ID was not created.');
      }
    } catch (error) {
      console.error("Error in handleBuyNow:", error);
    }
  }

  const handleClearCart = () => {
    console.log("clear cart invoked")
    // @ts-ignore
    clearCart();
  };

  console.log("cycle rendered");
  console.log("image url: ", imageUrl);
  console.log("portrait url: ", portraitImageUrl);

  return (
    <div className={`${styles.cardContent} select-none`}>
      <div className={`${styles.contentWrapper}`}>
        <div className={`${styles.topContent}`}>
          <div>
            <p className={`${styles.cardTitle} select-text`}>{'"' + card.quote + '"'}</p>
          </div>
          <div className={`${styles.cardAuthor} cursor-pointer`}>
            <div className={`${styles.authorName}`}>
              {/*<Image*/}
              {/*  className={`${styles.dp}`}*/}
              {/*  src={yukioMishimaImage.src}*/}
              {/*  alt="yuko"*/}
              {/*  width="100"*/}
              {/*  height="100"*/}
              {/*/>*/}
              <img
                className={`${styles.dp} w-20 pt-1`}
                src={portraitImageUrl}
                alt="author-image"
              />
              <h3 className="font-bold pl-2">
                <div>{card.author}</div>
              </h3>
            </div>
            <div className={`${styles.cardUserClick}`}>
              <div className={`${styles.cardInfo} hidden`}>
                <svg
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="3em"
                  height="3em"
                  viewBox="0 0 752.000000 752.000000"
                  preserveAspectRatio="xMidYMid meet">
                  <g
                    transform="translate(0.000000,752.000000) scale(0.100000,-0.100000)"
                    fill="#d2cfcaba"
                    stroke="none">
                    <path
                      d="M3540 5643 c-104 -13 -290 -57 -395 -93 -675 -233 -1156 -817 -1261
                        -1532 -24 -168 -15 -469 20 -633 160 -754 727 -1320 1486 -1483 116 -25 142
                        -26 370 -26 228 0 253 1 370 26 175 38 294 79 448 153 218 105 384 226 547
                        396 252 264 414 574 493 939 25 116 26 142 26 370 0 228 -1 254 -26 370 -125
                        582 -488 1059 -1006 1319 -170 86 -301 131 -498 172 -78 16 -145 21 -319 24
                        -121 2 -236 1 -255 -2z m563 -212 c217 -47 416 -132 607 -258 160 -106 357
                        -303 463 -463 126 -190 211 -391 259 -614 20 -88 22 -131 22 -336 0 -259 -11
                        -338 -75 -531 -85 -258 -218 -469 -418 -670 -201 -200 -412 -333 -670 -418
                        -191 -64 -272 -75 -526 -76 -201 0 -243 3 -337 23 -222 47 -427 133 -618 259
                        -161 107 -358 304 -463 463 -127 192 -210 389 -259 613 -20 89 -22 131 -22
                        337 0 206 2 248 22 337 49 226 131 419 259 613 105 159 302 356 463 463 192
                        127 405 216 613 257 151 29 146 28 372 25 168 -2 230 -7 308 -24z"
                    />
                    <path
                      d="M3685 4586 c-66 -29 -105 -94 -105 -172 0 -51 11 -76 49 -117 38 -42
                        73 -57 131 -57 57 0 93 15 132 57 109 115 26 304 -134 303 -24 -1 -56 -7 -73
                        -14z"
                    />
                    <path
                      d="M3695 4078 c-49 -27 -84 -72 -95 -122 -8 -34 -10 -192 -8 -486 l3
                        -435 24 -38 c12 -21 40 -46 62 -57 78 -40 176 -15 220 57 l24 38 3 435 c2 294
                        0 452 -8 486 -11 51 -47 97 -97 123 -28 14 -102 14 -128 -1z"
                    />
                  </g>
                </svg>
              </div>
              <button
                id="quoteHeart"
                onClick={handleQuoteHeartClick}
                className={`${styles.cardHeart}`}>
                <svg
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="3em"
                  height="3em"
                  viewBox="0 0 752.000000 752.000000"
                  preserveAspectRatio="xMidYMid meet">
                  <g
                    transform="translate(100.000000,752.000000) scale(0.100000,-0.100000)"
                    className={`${quoteHearts[card.quote] ? 'fill-custom-red' : 'fill-greyed-out'}`}
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
              </button>
            </div>
          </div>
        </div>
        <div className={`${styles.middleBorder}`}></div>
        <div className={`${styles.bottomContent}`}>
          <div className={`${styles.cardIcons}`}>
            <div className="flex flex-col w-full">
              <div className="flex flex-row items-center xs:items-stretch h-fit">
                <div className={`${styles.cardIcon} h-fit`}>
                  <span>
                    <img
                      className="min-w-20 w-20 pt-1"
                      src={imageUrl}
                      alt="book-image"
                    />
                  </span>
                </div>
                <div className="flex flex-col justify-around w-full">
                  <div className="flex flex-col w-full">
                    <div className={`${styles.bookTitleOne}`}>
                      <span>
                        <div id="bookName1">
                          <p className={`${styles.bookName} font-bold`}>
                            {card.book_title}
                          </p>
                        </div>
                      </span>
                    </div>
                    <div className={`${styles.bookAuthor} hidden xs:block w-full text-gray-400`}>
                      <span>
                        <p className="flex flex-col xs:gap-0">
                          <span>{card.book_authors}</span>
                        </p>
                      </span>
                    </div>
                    <div className={`${styles.bookAuthor} xs:hidden w-full text-gray-400`}>
                      <span>
                        <p className="flex flex-col xs:gap-0">
                          <span>{card.book_authors}</span>
                          <span>{card.book_date}</span>
                          <span>{card.book_type}</span>
                        </p>
                      </span>
                    </div>
                  </div>
                  <div className={`${styles.itemPriceXs}`}>
                    <div className={`${styles.itemToggles} flex flex-row-reverse items-center justify-between select-none`}>
                      <div id="itemQtyContainer"
                           className="flex flex-start items-center w-fit border border-solid border-foreground rounded">
                        <div>
                          <button className="h-6" onClick={decrementQty}>
                            <svg className="h-3 px-2" focusable="false" data-icon="minus" role="img"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                              <path fill="currentColor"
                                    d="M424 318.2c13.3 0 24-10.7 24-24v-76.4c0-13.3-10.7-24-24-24H24c-13.3 0-24 10.7-24 24v76.4c0 13.3 10.7 24 24 24h400z"></path>
                            </svg>
                          </button>
                        </div>
                        <div
                          className="flex font-light border-x border-solid border-foreground px-4 py-0.5">{qty}</div>
                        <button id="qtyPlusButton" onClick={incrementQty} className="h-6"
                        >
                          <svg className="h-3 px-2" focusable="false" data-icon="plus" role="img"
                               xmlns="http://www.w3.org/2000/svg"
                               viewBox="0 0 448 512">
                            <path fill="rgb(210, 207, 202)"
                                  d="M448 294.2v-76.4c0-13.3-10.7-24-24-24H286.2V56c0-13.3-10.7-24-24-24h-76.4c-13.3 0-24 10.7-24 24v137.8H24c-13.3 0-24 10.7-24 24v76.4c0 13.3 10.7 24 24 24h137.8V456c0 13.3 10.7 24 24 24h76.4c13.3 0 24-10.7 24-24V318.2H424c13.3 0 24-10.7 24-24z">
                            </path>
                          </svg>
                        </button>
                      </div>
                      <div className={`flex flex-end items-end text-base`}>
                        <p className="">${card.book_price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                id="bookHeart"
                onClick={handleBookHeartClick}
                className={`${styles.cardHeartTwo}`}>
                <svg
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="3em"
                  height="3em"
                  viewBox="0 0 752.000000 752.000000"
                  preserveAspectRatio="xMidYMid meet">
                  <g
                    transform="translate(100.000000,752.000000) scale(0.100000,-0.100000)"
                    className={`${bookHearts[card.book_title] ? 'fill-custom-red' : 'fill-greyed-out'}`}
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
            </div>
          </div>
        </div>

        <div className={`${styles.checkoutContainer} xs:pt-2`}>
          <div className={`${styles.totalWrapper}`}>
            <div className={`${styles.itemTotal}`}>
              <span>Total:&nbsp;</span>
              <span>${qtyPrice}</span>
            </div>
          </div>

          <div className={`${styles.checkoutWrapper} gap-x-8`}>

            <div className="relative flex items-center justify-center p-3 w-100px h-50px border">
              <button
                onClick={!isConfirmAddToCart ? handleAddToCart : undefined}
                className={`absolute inset-0 flex items-center justify-center p-3 w-100px h-50px rounded bg-amazon-yellow border-foreground font-bold text-xs hover:bg-transparent hover:border-2 transition-opacity duration-500 ${isConfirmAddToCart ? 'hover:border-transparent border-transparent text-transparent bg-transparent opacity-0 select-none cursor-default' : 'opacity-100'}`}>
                Add To Cart
              </button>
              <span
                id="confirmTickButton"
                className={`absolute inset-0 flex items-center pointer-events-none cursor-default justify-center p-3 w-100px h-50px rounded bg-transparent font-bold text-xs transition-opacity duration-500 select-none ${isConfirmAddToCart ? 'opacity-100' : 'opacity-0'}`}>
                <svg id="confirmTickIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="40px"
                     height="40px">
                  <path
                    // fill="rgb(185, 161, 111)"
                    style={{ fill: !isConfirmAddToCart ? 'transparent' : 'rgba(185, 165, 111)' }}
                    d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 37.690466 12.309534 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 13.390466 46 4 36.609534 4 25 C 4 13.390466 13.390466 4 25 4 z M 34.988281 14.988281 A 1.0001 1.0001 0 0 0 34.171875 15.439453 L 23.970703 30.476562 L 16.679688 23.710938 A 1.0001 1.0001 0 1 0 15.320312 25.177734 L 24.316406 33.525391 L 35.828125 16.560547 A 1.0001 1.0001 0 0 0 34.988281 14.988281 z"/>
                  </svg>
              </span></div>
            <div >
              <button
                onClick={handleBuyNow}
                className={`flex rounded p-3 w-100px h-50px justify-center items-center cursor-pointer bg-custom-red border-solid border-foreground opacity-90 font-bold text-xs hover:bg-transparent hover:border-2`}>
                BUY NOW
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Card;