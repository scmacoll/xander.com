import React from 'react';
import Content, { TileCard } from './Content';
import styles from './CardClicked.module.scss';
import Image from 'next/image';
import yukioMishimaImage from '../../assets/Yukio_Mishima,_1955_(cropped)-modified(1).png';
import social_capital_book from '../../assets/social_capital_book.jpg'

interface CardProps {
  card: TileCard;
}

const Card: React.FC<CardProps> = ({ card }) => {
  return (
    <div className={`${styles.cardContent}`}>
      <div className={`${styles.topContent}`}>
        <div>
          <p className={`${styles.cardTitle}`}>{'"' + card.quote + '"'}</p>
        </div>
        <div className={`${styles.cardAuthor}`}>
          <div className={`${styles.authorName}`}>
            <a href="#">
              <Image
                className={`${styles.dp}`}
                src={yukioMishimaImage.src}
                alt="yuko"
                width="100"
                height="100"
              />
            </a>
            <h3 className="font-bold pl-2">
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
          <div className={`${styles.cardIcon}`}>
            <img
              className="w-20 pt-1"
              src= {social_capital_book.src}
              alt="book"
            />
          </div>
          <div className={`${styles.itemButtons} flex`}>
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
            <svg
              className={`${styles.itemCart}`}
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
                  d="M3645 5899 c-155 -16 -324 -79 -465 -171 -83 -54 -224 -195 -278
                  -278 -123 -188 -182 -397 -182 -650 l0 -80 -168 0 c-189 0 -198 -3 -211 -65
                  -5 -22 -69 -703 -142 -1512 -101 -1109 -131 -1477 -123 -1490 27 -44 -20 -43
                  1684 -43 1285 0 1630 3 1650 13 13 7 29 24 34 38 6 18 -32 479 -123 1480 -73
                  800 -135 1474 -138 1498 -11 78 -19 81 -213 81 l-170 0 0 78 c-1 257 -55 454
                  -176 640 -169 259 -449 429 -764 462 -105 11 -103 11 -215 -1z m314 -164 c167
                  -40 303 -116 426 -240 177 -178 250 -356 262 -632 l6 -143 -892 0 -891 0 0 94
                  c0 448 247 793 650 910 131 38 307 42 439 11z m-1239 -1405 c0 -254 4 -280 47
                  -299 34 -16 47 -14 77 10 l26 20 0 255 0 254 890 0 890 0 0 -254 0 -255 26
                  -20 c30 -24 43 -26 77 -10 43 19 47 45 47 299 l0 240 120 0 c66 0 120 -3 120
                  -6 0 -3 56 -622 125 -1376 69 -753 125 -1383 125 -1399 l0 -29 -1535 0 -1535
                  0 5 38 c3 20 59 638 125 1372 66 734 123 1350 126 1368 l5 32 119 0 120 0 0
                  -240z"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
