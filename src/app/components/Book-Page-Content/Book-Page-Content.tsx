import React, { useState, useEffect } from 'react';
import styles from './Book-Page-Content.module.scss';
import BookPageFeatures from './Book-Page-Features/Book-Page-Features';
import Image from 'next/image';
import masterandemissarry from '../../../../public/master_and_emissarry.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

const BookPageContent: React.FC = () => {
    const [width, setWidth] = useState(window.innerWidth);
    
    useEffect(() => {
      const handleResize = () => {
        setWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
  
  
  return (
    <div className={`${styles.contentLayout}`}>
      <div className={`${styles.contentWrapper}`}>
        <div className={`${styles.imageContent}`}>
          <div className={`${styles.bookImage} pb-3`}>
            <a href="/book">
              <Image
                src={masterandemissarry.src}
                alt="yuko"
                width="10000"
                height="10000"
              />
            </a>
          </div>
          <div className={`${styles.firstReviewContainer} 
          ${width >= 750 ? styles.enabled : styles.disabled}`}>
            <div className={`${styles.bookStars}`}>
              <FontAwesomeIcon
                className={`${styles.faStar}`} 
                icon={faStar}
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                className={`${styles.faStar}`}
                icon={faStar}
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                className={`${styles.faStar}`}
                icon={faStar}
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                className={`${styles.faStar}`}
                icon={faStar}
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                className={`${styles.faStar}`}
                icon={faStar}
              ></FontAwesomeIcon>
            </div>
            <div className={`${styles.bookReview}`}>
              <a href="/book">Write a review</a>
            </div>
          </div>
        </div>
        <div className={`${styles.mainContent}`}>
          <div className="block">
            <div className={`${styles.bookName}`}>
              <h2 className="text-2xl font-bold">
                The Master And His Emissary 2ED
              </h2>
            </div>
            <div className={`${styles.infoContainer}`}>
              <div className={`${styles.bookInfoWrapper}`}>
                <div className={`${styles.bookName}`}>By Iain McGilchrist</div>
                <div className={`${styles.bookInfo}`}>
                  <div>Paperback</div>
                  <div>1 February 2019</div>
                </div>
              </div>
              <div className={`${styles.cardHeart}`}>
                <svg
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="3em"
                  height="3em"
                  viewBox="0 0 752.000000 752.000000"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <g
                    transform="translate(100.000000,752.000000) scale(0.100000,-0.100000)"
                    fill="#d2cfca2b"
                    stroke="none"
                  >
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
            <div className={`${styles.bookCart}`}>
              <div className={`${styles.cartWrapper}`}>
                <div className={`${styles.cartContainer}`}>
                  <div className={`${styles.bookPrice}  font-extrabold`}>
                    $34.95
                  </div>

                  <div className={`${styles.paymentContainer}`}>
                    <div className={`${styles.cartPayments}`}>
                      or 4 payments of $8.74 with
                    </div>

                    <div className={`${styles.afterPayWrapper}`}>
                      <div className={`${styles.afterPay}`}>
                        <svg
                          className={`${styles.afterPaycsv}`}
                          version="1.0"
                          xmlns="http://www.w3.org/2000/svg"
                          width="6em"
                          height="6em"
                          viewBox="0 0 6328.000000 2204.000000"
                          preserveAspectRatio="xMidYMid meet"
                        >
                          <g
                            transform="translate(0.000000,0.000000) scale(0.100000,-0.100000)"
                            fill="#fff"
                            stroke="none"
                          >
                            <path
                              d="M50315 15440 c-329 -35 -625 -176 -861 -410 -204 -203 -330 -439
                            -385 -722 -18 -92 -23 -150 -23 -308 -1 -183 0 -198 22 -246 13 -28 40 -67 60
                            -86 42 -41 702 -422 769 -445 116 -40 253 20 318 139 l30 53 5 290 c5 275 6
                            292 27 331 70 131 222 183 355 121 29 -13 627 -354 1328 -756 1047 -600 1283
                            -739 1317 -777 98 -105 95 -264 -7 -364 -35 -34 -375 -233 -1354 -794 l-1307
                            -749 -70 -5 c-84 -6 -143 14 -201 66 -76 69 -81 88 -89 347 -8 258 -23 359
                            -74 512 -70 209 -168 366 -335 534 -264 265 -576 403 -945 416 -219 8 -423
                            -32 -619 -121 -90 -42 -2915 -1662 -3016 -1730 -96 -65 -281 -249 -347 -346
                            -112 -165 -196 -373 -228 -568 -21 -127 -16 -404 10 -519 81 -363 287 -667
                            590 -870 121 -81 2933 -1688 3020 -1726 252 -110 574 -141 835 -81 424 96 771
                            367 962 749 100 199 136 359 145 630 10 336 20 323 -480 609 -260 149 -370
                            207 -402 212 -144 21 -284 -75 -314 -216 -6 -29 -11 -157 -11 -294 0 -277 -6
                            -309 -72 -377 -78 -80 -201 -105 -299 -62 -81 37 -2614 1495 -2642 1521 -84
                            78 -105 213 -52 318 17 31 46 69 65 84 47 37 2606 1504 2649 1518 97 34 216 0
                            287 -81 55 -62 64 -100 64 -263 0 -183 15 -336 45 -462 133 -554 610 -975
                            1192 -1053 117 -15 342 -6 453 20 103 23 244 73 322 112 112 57 2904 1663
                            2978 1713 41 28 117 91 168 141 195 187 315 392 382 650 124 482 -12 988 -360
                            1335 -53 52 -131 120 -175 151 -92 64 -2913 1685 -3021 1735 -215 100 -486
                            147 -709 124z"
                            />
                            <path
                              d="M16010 15333 c-25 -2 -94 -10 -155 -19 -507 -70 -813 -298 -938 -699
                            -65 -206 -77 -339 -77 -826 l0 -389 -332 -2 -333 -3 0 -520 0 -520 333 -3 332
                            -2 0 -1860 0 -1860 603 2 602 3 3 1858 2 1857 765 0 765 0 0 -1242 c0 -791 4
                            -1285 11 -1358 62 -677 367 -1010 1003 -1097 95 -12 211 -16 536 -17 l415 -1
                            0 530 0 530 -205 6 c-113 3 -227 11 -254 18 -121 29 -207 95 -248 189 -48 112
                            -48 120 -48 1318 l0 1124 373 2 372 3 0 520 0 520 -372 3 -373 2 -2 578 -3
                            577 -602 3 -603 2 0 -580 0 -580 -765 0 -765 0 0 299 c0 227 4 317 15 370 28
                            132 92 226 187 274 99 50 157 59 398 66 l225 6 3 463 2 462 -412 -2 c-227 -1
                            -433 -3 -458 -5z"
                            />
                            <path
                              d="M10725 13468 c-1011 -114 -1827 -903 -2020 -1952 -120 -656 3 -1357
                            330 -1886 184 -297 447 -562 728 -737 568 -352 1304 -432 1902 -208 262 98
                            490 249 692 458 l93 96 2 -302 3 -302 588 -3 587 -2 0 2385 0 2385 -587 -2
                            -588 -3 -3 -293 -2 -294 -70 75 c-304 325 -724 535 -1175 587 -107 12 -367 11
                            -480 -2z m622 -1114 c272 -40 510 -160 704 -353 184 -184 300 -402 361 -679
                            18 -81 22 -130 22 -302 1 -179 -2 -218 -22 -308 -90 -403 -301 -701 -627 -887
                            -105 -60 -215 -101 -350 -133 -141 -33 -379 -37 -517 -9 -551 111 -943 532
                            -1035 1112 -23 147 -13 412 20 555 62 261 176 469 357 651 283 284 682 414
                            1087 353z"
                            />
                            <path
                              d="M22210 13474 c-164 -19 -221 -28 -330 -50 -278 -57 -616 -197 -845
                            -350 -536 -358 -895 -900 -1019 -1540 -37 -193 -48 -318 -48 -539 0 -318 40
                            -569 134 -854 57 -172 164 -396 255 -536 214 -326 526 -605 873 -780 548 -276
                            1265 -341 1920 -175 707 179 1272 651 1544 1288 36 83 96 255 96 273 0 5 -236
                            9 -614 9 l-614 0 -57 -80 c-195 -279 -476 -456 -820 -515 -132 -23 -357 -23
                            -485 -1 -503 89 -855 439 -960 956 -11 54 -20 103 -20 109 0 8 510 11 1819 11
                            l1819 0 6 23 c17 64 28 256 22 392 -36 839 -419 1547 -1066 1971 -295 192
                            -608 309 -990 369 -101 16 -534 29 -620 19z m454 -1070 c453 -84 785 -384 901
                            -815 14 -52 25 -104 25 -116 l0 -23 -1180 0 c-649 0 -1180 1 -1180 3 0 1 11
                            43 24 93 106 395 391 700 762 817 83 26 213 53 294 61 75 7 268 -4 354 -20z"
                            />
                            <path
                              d="M27431 13465 c-161 -29 -331 -98 -476 -194 -84 -56 -238 -205 -288
                            -281 l-37 -55 0 233 0 232 -585 0 -585 0 0 -2385 0 -2385 605 0 604 0 4 1498
                            c3 1358 5 1504 20 1572 68 300 208 502 422 605 105 51 190 68 330 68 188 0
                            372 -48 594 -154 68 -32 125 -59 127 -59 2 0 4 274 4 609 l0 609 -72 27 c-135
                            50 -230 66 -413 70 -121 3 -194 0 -254 -10z"
                            />
                            <path
                              d="M31135 13464 c-305 -41 -567 -139 -820 -308 -90 -60 -156 -116 -262
                            -221 l-143 -141 0 303 0 303 -587 -2 -588 -3 0 -3350 0 -3350 605 0 605 0 3
                            1244 2 1244 118 -114 c345 -335 792 -509 1308 -509 603 0 1144 219 1578 640
                            392 380 634 860 721 1430 23 146 31 486 16 646 -111 1182 -942 2074 -2043
                            2193 -130 15 -390 12 -513 -5z m232 -1105 c498 -68 900 -409 1057 -897 19 -59
                            41 -149 50 -201 21 -124 21 -367 0 -492 -18 -109 -79 -299 -124 -390 -122
                            -243 -332 -457 -568 -577 -414 -212 -900 -182 -1292 81 -96 64 -263 231 -327
                            327 -148 222 -228 470 -240 746 -18 403 122 778 388 1044 274 274 676 411
                            1056 359z"
                            />
                            <path
                              d="M36230 13473 c-1029 -104 -1843 -867 -2054 -1923 -14 -69 -30 -170
                            -37 -225 -16 -128 -16 -500 0 -630 107 -868 572 -1558 1286 -1910 326 -161
                            680 -234 1065 -222 302 9 527 63 787 187 207 99 369 215 535 384 l98 99 2
                            -299 3 -299 588 -3 587 -2 0 2385 0 2385 -587 -2 -588 -3 -3 -289 -2 -289
                            -118 114 c-167 163 -295 255 -490 353 -269 134 -552 198 -875 194 -89 0 -178
                            -3 -197 -5z m638 -1128 c581 -114 989 -595 1031 -1215 31 -457 -118 -857 -428
                            -1144 -158 -148 -402 -266 -631 -307 -108 -20 -354 -17 -463 4 -516 102 -902
                            496 -1019 1040 -30 140 -32 415 -4 562 108 579 533 997 1092 1074 96 13 322 6
                            422 -14z"
                            />
                            <path
                              d="M39562 13383 c3 -10 431 -955 952 -2101 l946 -2082 -605 -1250 c-333
                            -687 -605 -1252 -605 -1255 0 -3 304 -4 676 -3 l677 3 1618 3340 c890 1837
                            1619 3346 1619 3353 0 10 -137 12 -671 10 l-671 -3 -666 -1399 c-649 -1363
                            -666 -1398 -680 -1370 -7 16 -282 646 -610 1399 l-598 1370 -693 3 c-657 2
                            -693 1 -689 -15z"
                            />
                          </g>
                        </svg>
                      </div>
                      <div className={`${styles.learnMore}`}>
                        <a href="/book">Learn more</a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`${styles.rewardsContainer}`}>
                  <div className={`${styles.cartButtons}`}>
                    <div className={`${styles.addToCart}`}>
                      <button>Add To Cart</button>
                    </div>
                    <div className={`${styles.checkoutBuyNow}`}>
                      <button>BUY NOW</button>
                    </div>
                  </div>

                  <div className={`${styles.bookRewards}`}>
                    Booklovers earn $1.70 in rewards
                  </div>
                </div>
              </div>
            </div>
            <div className={`${styles.shippingContainer}`}>
              <div className={`${styles.stockVerify}`}>
                <span className={`${styles.iconBlock}`}>
                  <FontAwesomeIcon
                    className={`${styles.iconTick}`}
                    icon={faCheck}
                  ></FontAwesomeIcon>
                </span>
                <div className={`${styles.stockText}`}>
                  IN STOCK - SHIPS NEXT DAY
                </div>
              </div>

              <div className={`${styles.deliveryDate}`}>
                <a href="/book">
                  <p>Get estimated delivery dates</p>
                </a>
              </div>
            </div>

            <div className={`${styles.bookAbout}`}>
              <div className={`${styles.aboutHeading} font-bold py-5`}>
                <p>
                  A new edition of the bestselling classic – published with a
                  special introduction to mark its 10th anniversary
                </p>
              </div>
              <div>
                <p className="pb-5">
                  This pioneering account sets out to understand the structure
                  of the human brain – the place where mind meets matter. Until
                  recently, the left hemisphere of our brain has been seen as
                  the ‘rational’ side, the superior partner to the right. But is
                  this distinction true?
                </p>
                <p className="pb-10">
                  Drawing on a vast body of experimental research, Iain
                  McGilchrist argues while our left brain makes for a wonderful
                  servant, it is a very poor master. As he shows, it is the
                  right side which is the more reliable and insightful. Without
                  it, our world would be mechanistic – stripped of depth colour
                  and value.
                </p>
              </div>
              <div className={`${styles.secondReviewContainer}
              ${width <= 749 ? styles.enabled : styles.disabled}`}>
                <div className={`${styles.bookStars}`}>
                  <FontAwesomeIcon
                    className={`${styles.faStar}`}
                    icon={faStar}
                  ></FontAwesomeIcon>
                  <FontAwesomeIcon
                    className={`${styles.faStar}`}
                    icon={faStar}
                  ></FontAwesomeIcon>
                  <FontAwesomeIcon
                    className={`${styles.faStar}`}
                    icon={faStar}
                  ></FontAwesomeIcon>
                  <FontAwesomeIcon
                    className={`${styles.faStar}`}
                    icon={faStar}
                  ></FontAwesomeIcon>
                  <FontAwesomeIcon
                    className={`${styles.faStar}`}
                    icon={faStar}
                  ></FontAwesomeIcon>
                </div>
                <div className={`${styles.bookReview} pb-3`}>
                  <a href="/book">Write a review</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BookPageFeatures />
    </div>
  );
};

export default BookPageContent;
