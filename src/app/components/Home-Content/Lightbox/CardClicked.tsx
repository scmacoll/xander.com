import React, { useState, useEffect } from 'react';
import Content, { TileCard } from '../Content';
import styles from './CardClicked.module.scss';
import Image from 'next/image';
import yukioMishimaImage from '../../../assets/Yukio_Mishima,_1955_(cropped)-modified(1).png';
import { useCart } from "@/app/context/CartContext";

interface CardProps {
  card: TileCard,
  isOneColumn: boolean,
  numColumns: number;
}

const Card: React.FC<CardProps> = ({card, numColumns}) => {
  const isOneColumn = numColumns === 1;
  const imageUrl = `/${card.cell_name}.jpg`;

  // Initialize state
  const [qty, setQty] = useState(1);
  const [totalPrice, setTotalPrice] = useState(parseFloat(card.book_price));

  // Event handlers
  const incrementQty = () => {
    const newQty = qty + 1;
    setQty(newQty);
    setTotalPrice(newQty * parseFloat(card.book_price));
  };

  const decrementQty = () => {
    if (qty > 1) {
      const newQty = qty - 1;
      setQty(newQty);
      setTotalPrice(newQty * parseFloat(card.book_price));
    }
  };

  const { cartItems, addToCart } = useCart();
  const { clearCart } = useCart();

  const handleAddToCart = () => {
    const newItem = {
      qty,
      imageUrl: `/${card.cell_name}.jpg`,
      totalPrice: totalPrice,
      bookPrice: parseFloat(card.book_price),
      bookTitle: card.book_title,
      bookAuthors: card.book_authors,
      bookType: card.book_type,
      bookDate: card.book_date
    };
    console.log("Item to be added: ", newItem);
    addToCart(newItem);
  };

  const handleClearCart = () => {
    // @ts-ignore
    clearCart();
  };

  const handleCheckCart = () => {
    console.log("cartItems: ", cartItems);
  };

  useEffect(() => {
    console.log("Cart items after update:", cartItems);
  }, [cartItems]);

  return (
    <div className={`${styles.cardContent} select-none`}>
      <div className={`${styles.contentWrapper}`}>
        <div className={`${styles.topContent}`}>
          <div>
            <p className={`${styles.cardTitle}`}>{'"' + card.quote + '"'}</p>
          </div>
          <div className={`${styles.cardAuthor} cursor-pointer`}>
            <div className={`${styles.authorName}`}>
              <Image
                className={`${styles.dp}`}
                src={yukioMishimaImage.src}
                alt="yuko"
                width="100"
                height="100"
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
              <div className={`${styles.cardHeart}`}>
                <svg
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="3em"
                  height="3em"
                  viewBox="0 0 752.000000 752.000000"
                  preserveAspectRatio="xMidYMid meet">
                  <g
                    transform="translate(100.000000,752.000000) scale(0.100000,-0.100000)"
                    fill="#d2cfca2b"
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
        <div className={`${styles.middleBorder}`}></div>
        <div className={`${styles.bottomContent}`}>
          <div className={`${styles.cardIcons}`}>
            <div className="flex">
              <div className={`${styles.cardIcon}`}>
                <a href="/book" target="_blank" rel="noopener noreferrer">
                  <img
                    className="w-20 pt-1"
                    src={imageUrl}
                    alt="book-image"
                  />
                </a>
              </div>

              {isOneColumn && (
                <div className={`${styles.bookTitleOne}`}>
                  <a href="/book" target="_blank" rel="noopener noreferrer">
                    <div id="bookName1">
                      <p className={`${styles.bookName} font-bold`}>
                        {card.book_title}
                      </p>
                    </div>
                  </a>
                </div>
              )}

              <div className={`${styles.cardHeartTwo}`}>
                <svg
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="3em"
                  height="3em"
                  viewBox="0 0 752.000000 752.000000"
                  preserveAspectRatio="xMidYMid meet">
                  <g
                    transform="translate(100.000000,752.000000) scale(0.100000,-0.100000)"
                    fill="#d2cfca2b"
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
            <div className={`${styles.itemButtons}`}>

              {!isOneColumn && (
                <div className={`${styles.bookTitleTwo}`}>
                  <a href="/book" target="_blank" rel="noopener noreferrer">
                    <div id="bookName2">
                      <p className={`${styles.bookName} font-bold`}>
                        {card.book_title}
                      </p>
                    </div>
                  </a>
                </div>
              )}

              <div className={`${styles.bookAuthor} w-full xs:pt-2 text-gray-400`}>
                <a href="/book" target="_blank" rel="noopener noreferrer">
                  <p className="flex gap-2 xs:flex-col xs:gap-0">
                    <span className="flex gap-2">
                      <span>By: {card.book_authors}</span>
                      <span className={`${styles.largerPipe}`}>|</span>
                      <span>{card.book_type}</span>
                      <span className={`${styles.largerPipe} xs:hidden`}>|</span>
                    </span>
                    <span>{card.book_date}</span>
                  </p>
                </a>
              </div>

              {!isOneColumn && (
                <div className={`${styles.itemToggles} select-none`}>
                  <div className={`${styles.itemPrice}`}>
                    <p className="font-bold">${card.book_price}</p>
                  </div>
                  <div className={`${styles.itemQty}`}>
                    <div className="flex">
                      <div className={`${styles.qtyMinus}`}>
                        <svg
                          onClick={decrementQty}
                          version="1.0"
                          xmlns="http://www.w3.org/2000/svg"
                          width="4em"
                          height="3em"
                          viewBox="0 0 752.000000 752.000000"
                          preserveAspectRatio="xMidYMid meet">
                          <g
                            transform="translate(0.000000,752.000000) scale(0.100000,-0.100000)"
                            fill="white"
                            stroke="none">
                            <path
                              d="M2016 3809 c-17 -13 -26 -30 -26 -49 0 -19 9 -36 26 -49 l27 -21
                                                        1717 0 1717 0 27 21 c35 28 35 70 0 98 l-27 21 -1717 0 -1717 0 -27 -21z"
                            />
                          </g>
                        </svg>
                      </div>
                      <div className={`${styles.qtyPlus}`}>
                        <svg
                          onClick={incrementQty}
                          version="1.0"
                          xmlns="http://www.w3.org/2000/svg"
                          width="4.25em"
                          height="3em"
                          viewBox="0 0 752.000000 752.000000"
                          preserveAspectRatio="xMidYMid meet">
                          <g
                            transform="translate(0.000000,752.000000) scale(0.100000,-0.100000)"
                            fill="white"
                            stroke="none">
                            <path
                              d="M3701 5584 l-31 -26 -2 -851 -3 -852 -852 -5 c-787 -5 -854 -6 -872
                                                        -22 -39 -33 -39 -103 0 -136 18 -16 85 -17 872 -22 l852 -5 3 -851 2 -851 26
                                                        -24 c35 -32 93 -32 128 0 l26 24 2 851 3 851 851 3 851 2 24 26 c32 35 32 93
                                                        0 128 l-24 26 -851 2 -851 3 -3 852 -2 851 -31 26 c-17 15 -43 26 -59 26 -16
                                                        0 -42 -11 -59 -26z"
                            />
                          </g>
                        </svg>
                      </div>
                      <div className={`${styles.itemQtyNumber}`}>
                        <p>Qty: {qty}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {isOneColumn && (
                <div className={`${styles.itemToggles}`}>
                  <div className={`${styles.itemQtyXs}`}>
                    <div className="flex">
                      <div className={`${styles.itemQtyNumberXs}`}>
                        <p>Qty: 1</p>
                      </div>
                      <div className={`${styles.qtyPlusXs}`}>
                        <svg
                          version="1.0"
                          xmlns="http://www.w3.org/2000/svg"
                          width="2.25em"
                          height="3em"
                          viewBox="0 0 752.000000 752.000000"
                          preserveAspectRatio="xMidYMid meet">
                          <g
                            transform="translate(0.000000,752.000000) scale(0.100000,-0.100000)"
                            fill="#d2cfcaba"
                            stroke="none">
                            <path
                              d="M3701 5584 l-31 -26 -2 -851 -3 -852 -852 -5 c-787 -5 -854 -6 -872
                              -22 -39 -33 -39 -103 0 -136 18 -16 85 -17 872 -22 l852 -5 3 -851 2 -851 26
                              -24 c35 -32 93 -32 128 0 l26 24 2 851 3 851 851 3 851 2 24 26 c32 35 32 93
                              0 128 l-24 26 -851 2 -851 3 -3 852 -2 851 -31 26 c-17 15 -43 26 -59 26 -16
                              0 -42 -11 -59 -26z"
                            />
                          </g>
                        </svg>
                      </div>
                      <div className={`${styles.qtyMinusXs}`}>
                        <svg
                          version="1.0"
                          xmlns="http://www.w3.org/2000/svg"
                          width="2.25em"
                          height="3em"
                          viewBox="0 0 752.000000 752.000000"
                          preserveAspectRatio="xMidYMid meet">
                          <g
                            transform="translate(0.000000,752.000000) scale(0.100000,-0.100000)"
                            fill="#d2cfca"
                            stroke="none">
                            <path
                              d="M2016 3809 c-17 -13 -26 -30 -26 -49 0 -19 9 -36 26 -49 l27 -21
                              1717 0 1717 0 27 21 c35 28 35 70 0 98 l-27 21 -1717 0 -1717 0 -27 -21z"
                            />
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.itemPriceXs}`}>
                    <p className="font-bold">{card.book_price}</p>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
        <div className={`${styles.checkoutContainer}`}>
          <div className={`${styles.totalWrapper}`}>
            <div className={`${styles.itemTotal}`}>
              <span>Total:&nbsp;</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <div className={`${styles.checkoutWrapper}`}>
            <div
              className={`${styles.checkoutAddToCart} cursor-pointer border-solid bg-amazon-yellow border-foreground font-bold text-xs hover:bg-transparent hover:border-2`}>
              <button onClick={handleAddToCart}>Add To Cart</button>
            </div>
            <div
              className={`${styles.checkoutBuyNow} cursor-pointer bg-custom-red border-solid border-foreground opacity-90 font-bold text-xs hover:bg-transparent hover:border-2`}>
              <button onClick={handleClearCart}>BUY NOW</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;