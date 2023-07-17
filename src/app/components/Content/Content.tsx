//src/app/components/Content/Content.tsx
"use client";

import styles from './Content.module.scss';
import classNames from 'classnames';
import yukioMishimaImage from '../../assets/Yukio_Mishima,_1955_(cropped)-modified(1).png';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image'


interface ContentProps {
  isCardButtonClicked: boolean;
}

const getNumColumns = (): number => {
  if (typeof window !== 'undefined') {
    if (window.innerWidth >= 1100) {
      return 3;
    } else if (window.innerWidth >= 750) {
      return 2;
    }
  }
  return 1;
};


type TileCard = {
  cell_name: string;
  quote: string;
  author: string;
};

const Content: React.FC<ContentProps> = ({ isCardButtonClicked }) => {
  const apiURI = '/api/getCards';
  const [tileCards, setTileCards] = useState<TileCard[]>([]);
  const [numColumns, setNumColumns] = useState(getNumColumns());
  const [middleColumnChangedState, setMiddleColumnChangedState] =
    useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll(
      `.${styles.leftCard}, .${styles.rightCard}, .${styles.middleCard}`
    );

    const toggleChangedState = () => {
      if (numColumns === 1) {
        elements.forEach((element) => {
          element.classList.add(styles.changedState);
        });
        setMiddleColumnChangedState(true);
        return;
      }

      elements.forEach((element) => {
        element.classList.toggle(styles.changedState);
      });
      setMiddleColumnChangedState(!middleColumnChangedState);
    };

    if (middleColumnChangedState !== isCardButtonClicked) {
      if (isCardButtonClicked) {
        console.log('Focus Mode OFF!');
        toggleChangedState();
      } else {
        toggleChangedState();
        console.log('Focus Mode ON!');
      }
    }
    const handleResize = () => {
      const newNumColumns = getNumColumns();
      if (newNumColumns !== numColumns && newNumColumns === 1) {
        toggleChangedState();
      }
      setNumColumns(newNumColumns);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isCardButtonClicked, middleColumnChangedState, numColumns]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiURI);
        const filteredData = response.data.filter((card: TileCard) => {
          const cellNumber = parseInt(card.cell_name.slice(0, -1));
          const cellLetter = card.cell_name.slice(-1);

          return (
            cellNumber >= 1 &&
            cellNumber <= 8 &&
            ['D', 'E', 'F'].includes(cellLetter)
          );
        });
        // Sort the filtered data
        filteredData.sort((a: TileCard, b: TileCard) => {
          if (a.cell_name < b.cell_name) {
            return -1;
          }
          if (a.cell_name > b.cell_name) {
            return 1;
          }
          return 0;
        });

        setTileCards(filteredData);
      } catch (error) {
        console.error('Error fetching tile cards:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className={styles.contentLayout}>
      {tileCards.map((card, index) => {
        const cellNumber = parseInt(card.cell_name.slice(0, -1));
        const cellLetter = card.cell_name.slice(-1);

        const isFirstColumn =
          cellNumber >= 1 && cellNumber <= 8 && cellLetter === 'D';
        const isSecondColumn =
          cellNumber >= 1 && cellNumber <= 8 && cellLetter === 'E';
        const isThirdColumn =
          cellNumber >= 1 && cellNumber <= 8 && cellLetter === 'F';

        // If 1 column, render middle only
        if (numColumns === 1 && !isSecondColumn) {
          return null;
        }
        // If 2 columns, render middle & last only
        if (numColumns === 2 && isFirstColumn) {
          return null;
        }

        return (
          <article
            key={index}
            className={classNames(styles.card, {
              [styles.leftCard]: isFirstColumn,
              [styles.middleCard]: isSecondColumn,
              [styles.rightCard]: isThirdColumn,
              [styles.changedState]:
                (isFirstColumn || isThirdColumn) && middleColumnChangedState,
            })}>
            {
              <div className={`${styles.cardContent}`}>
                <div className={`${styles.topContent}`}>
                  <div>
                    <p className={`${styles.cardTitle}`}>{card.quote}</p>
                  </div>
                  <div className={`${styles.cardAuthor}`}>
                    <div className={`${styles.authorName} flex items-center`}>
                      <a href="#">
                        <Image
                          className={`${styles.dp}`}
                          src={yukioMishimaImage.src}
                          alt="yuko"
                          width="100"
                          height="100"
                        />
                      </a>
                      <h3 className="font-bold">
                        <a href="#">{card.author}</a>
                      </h3>
                    </div>
                    <div className={`${styles.cardUserClick}`}>
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
                      <div className={`${styles.cardInfo}`}>
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
                    </div>
                  </div>
                </div>
                <div className={`${styles.bottomContent}`}>
                  <div className={`${styles.cardIcons}`}>
                    <svg
                      className={`${styles.cardIcon}`}
                      version="1.0"
                      xmlns="http://www.w3.org/2000/svg"
                      width="3em"
                      height="3em"
                      // transform="translate(0, -12)"
                      viewBox="0 0 752.000000 752.000000"
                      preserveAspectRatio="xMidYMid meet">
                      <g
                        transform="translate(0.000000,752.000000) scale(0.100000,-0.100000)"
                        fill="#868478"
                        stroke="none">
                        <path
                          d="M2091 5205 l-31 -27 0 -1014 0 -1015 25 -24 c30 -31 92 -34 126 -6
                        l24 19 5 949 5 948 480 0 c527 0 525 0 655 -62 91 -44 220 -168 263 -253 l27
                        -55 0 -988 c0 -543 -2 -987 -5 -987 -3 0 -31 21 -62 46 -74 60 -214 128 -311
                        151 -69 16 -132 18 -628 18 -538 0 -552 -1 -574 -20 -33 -30 -42 -62 -30 -101
                        22 -66 1 -64 570 -64 308 0 541 -4 579 -11 197 -32 353 -142 441 -311 34 -64
                        49 -83 76 -94 29 -12 39 -12 68 0 27 11 42 30 76 96 88 168 243 277 441 309
                        38 7 271 11 580 11 l516 0 27 26 26 27 0 1202 0 1202 -26 24 -26 24 -516 3
                        c-332 2 -542 -1 -586 -8 -97 -15 -206 -54 -288 -101 -67 -39 -207 -166 -242
                        -219 l-16 -24 -17 24 c-30 43 -113 128 -167 169 -66 51 -173 104 -267 132 -72
                        23 -86 23 -630 27 l-556 3 -32 -26z m3187 -1232 l2 -1062 -497 -3 c-471 -4
                        -502 -5 -574 -25 -98 -28 -222 -90 -293 -148 -31 -25 -58 -45 -61 -45 -3 0 -5
                        444 -5 987 l0 988 27 54 c34 66 136 178 201 220 64 41 159 79 225 90 28 5 259
                        8 512 7 l460 -1 3 -1062z"
                        />
                      </g>
                    </svg>
                    <svg
                      className={`${styles.cardIcon}`}
                      version="1.0"
                      xmlns="http://www.w3.org/2000/svg"
                      width="3em"
                      height="3em"
                      viewBox="0 0 752.000000 752.000000"
                      preserveAspectRatio="xMidYMid meet">
                      <g
                        transform="translate(0.000000,752.000000) scale(0.100000,-0.100000)"
                        fill="#868478"
                        stroke="none">
                        <path
                          d="M3500 5684 c-460 -63 -889 -293 -1198 -644 -204 -233 -363 -539 -431
                          -833 -229 -979 323 -1969 1275 -2287 713 -238 1509 -40 2019 502 656 698 716
                          1748 141 2511 -266 354 -684 623 -1119 721 -199 46 -481 58 -687 30z m210
                          -509 l0 -425 -348 0 c-192 0 -351 3 -355 6 -9 9 56 183 113 302 96 202 214
                          353 349 450 66 47 167 91 214 91 l27 1 0 -425z m206 405 c178 -62 355 -252
                          484 -522 57 -119 122 -293 113 -302 -4 -3 -163 -6 -355 -6 l-348 0 0 425 0
                          425 23 0 c13 0 50 -9 83 -20z m-605 -90 c-145 -145 -265 -347 -361 -610 l-46
                          -125 -347 -3 c-220 -1 -347 1 -347 7 0 14 119 170 192 252 217 244 560 450
                          899 538 41 11 78 20 82 20 5 1 -28 -35 -72 -79z m962 44 c310 -86 644 -293
                          850 -528 71 -81 187 -233 187 -247 0 -6 -127 -8 -347 -7 l-347 3 -46 125 c-93
                          256 -218 467 -362 610 -90 91 -94 88 65 44z m-1403 -905 c-44 -151 -88 -457
                          -97 -661 l-6 -158 -426 0 -427 0 8 101 c17 228 71 430 175 652 l46 97 368 0
                          368 0 -9 -31z m840 -394 l0 -425 -425 0 -425 0 0 33 c0 162 43 511 86 700 l27
                          117 369 0 368 0 0 -425z m864 308 c43 -189 86 -538 86 -700 l0 -33 -425 0
                          -425 0 0 425 0 425 368 0 369 0 27 -117z m851 15 c100 -212 157 -424 173 -647
                          l8 -101 -427 0 -426 0 -6 158 c-9 204 -53 510 -97 661 l-9 31 368 0 368 0 48
                          -102z m-2655 -940 c0 -195 52 -557 106 -740 5 -17 -17 -18 -364 -18 l-369 0
                          -46 98 c-104 221 -158 423 -175 651 l-8 101 428 0 428 0 0 -92z m940 -333 l0
                          -425 -368 0 -369 0 -27 118 c-43 188 -86 537 -86 700 l0 32 425 0 425 0 0
                          -425z m950 398 c-1 -170 -43 -516 -86 -705 l-27 -118 -369 0 -368 0 0 425 0
                          425 425 0 425 0 0 -27z m938 -80 c-16 -206 -77 -436 -171 -635 l-50 -108 -369
                          0 c-347 0 -369 1 -364 18 54 183 106 545 106 740 l0 92 428 0 428 0 -8 -107z
                          m-2652 -953 c89 -252 222 -477 367 -621 45 -45 73 -79 62 -76 -11 3 -48 13
                          -82 22 -344 87 -670 287 -916 564 -62 70 -167 211 -167 225 0 4 156 5 347 4
                          l348 -3 41 -115z m764 -306 l0 -427 -42 7 c-24 3 -80 24 -124 46 -156 76 -301
                          243 -415 475 -63 129 -132 309 -122 319 4 3 163 6 355 6 l348 0 0 -426z m803
                          420 c10 -10 -59 -190 -122 -319 -114 -232 -259 -399 -415 -475 -44 -22 -100
                          -43 -123 -46 l-43 -7 0 427 0 426 348 0 c192 0 351 -3 355 -6z m797 0 c0 -14
                          -105 -155 -167 -224 -134 -150 -263 -258 -424 -356 -150 -92 -331 -169 -492
                          -209 -34 -9 -71 -19 -81 -22 -11 -3 17 31 62 76 140 140 269 356 356 596 20
                          55 41 110 46 123 l10 22 345 0 c190 0 345 -3 345 -6z"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            }
          </article>
        );
      })}
    </section>
  );
};


export default Content;