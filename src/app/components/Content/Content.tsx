import styles from './Content.module.scss';
import classNames from 'classnames';
import userIcon from '../../assets/user_icon.svg'
import yukioMishimaImage from '../../assets/Yukio_Mishima,_1955_(cropped)-modified(1).png';
import React from 'react';
import Image from 'next/image'


const Content = () => {
  const tileCards = [
    {
      title:
        'We are drowning in information, while starving for wisdom. The world henceforth will be run by synthesizers, people able to put together the right information at the right time, think critically about it, and make important choices wisely.',
      text: 'Neil Postman',
    },
    {
      title:
        'What transforms this world is—knowledge... Nothing else can change anything in this world. Knowledge alone is capable of transforming the world, while at the same time leaving it exactly as it is...',
      text: 'Mishima',
    },
    {
      title:
        "Computers, by their nature, tend to present information in isolated fragments, lacking the necessary context and meaning that are crucial for students to develop a comprehensive understanding. This decontextualization of knowledge could hinder students' ability to grasp the bigger picture and make connections between different pieces of information, thereby limiting their capacity to appreciate the broader significance of what they learn.",
      text: 'Neil Postman',
    },
    {
      title:
        '“It has always seemed strange to me that in our endless discussions about education so little stress is laid on the pleasure of becoming an educated person, the enormous interest it adds to life. To be able to be caught up into the world of thought—that is to be educated".',
      text: 'Edith Hamilton',
    },
    {
      title:
        'I created this library as a tribute to the Library of Alexandria. My ambition is that this place will be a source of learning and innovation and that it will bring back the glories of the ancient library.',
      text: 'Ismail Serageldin',
    },
    {
      title:
        'We can roam the bloated stacks of the Library of Alexandria, where all imagination and knowledge are assembled; we can recognize in its destruction the warning that all we gather will be lost, but also that much of it can be collected again.',
      text: 'Alberto Manguel',
    },
    {
      title:
        'Digital environments have the potential for a high degree of procedural and participatory complexity, which makes them well suited for capturing the densely layered, interconnected nature of human experience.',
      text: 'Janet Murray',
    },
    {
      title:
        '“Without an allegiance to beauty, art degenerates into a caricature of itself. It is beauty that animates aesthetic experience, making it so seductive; but aesthetic experience itself degenerates into a kind of  fetish or idol if it is held up as an end in itself, untested by the rest of life”.',
      text: 'Roger Kimball',
    },
    {
      title:
        'Finding the links between people and ideas is the true magic of innovation.',
      text: 'Steven Johnson',
    },
    {
      title:
        'A people without the knowledge of their past history, origin, and culture is like a tree without roots.',
      text: 'Marcus Garvey',
    },
    {
      title:
        'Relationships are all there is. Everything in the universe only exists because it is in relationship to everything else. Nothing exists in isolation.',
      text: 'Margaret Wheatley',
    },
    {
      title:
        '“Science does not rest upon solid bedrock. The bold structure of its theories rises, as it were, above a swamp. It is like a building erected on piles. The piles are driven down from above into the swamp, but not down to any natural or ‘given’ base; and if we stop driving the piles deeper, it is not because we have reached firm ground. We simply stop when we are satisfied that the piles are firm enough to carry the structure, at least for the time being.”',
      text: 'Karl Popper',
    },
  ];
  return (
    <section className={styles.contentLayout}>
      {tileCards.map((tile, index) => {
        const isFirstColumn = index % 3 === 0;
        const isSecondColumn = index % 3 === 1;
        const isThirdColumn = index % 3 === 2;
        return (
          <article
            key={index}
            className={classNames(styles.card, {
              [styles.leftCard]: isFirstColumn,
              [styles.middleCard]: isSecondColumn,
              [styles.rightCard]: isThirdColumn,
            })}>
            {
              <div className={`${styles.cardContent}`}>
                <div className={`${styles.topContent}`}>
                  <div>
                    <p className={`${styles.cardTitle}`}>{tile.title}</p>
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
                        <a href="#">{tile.text}</a>
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
                      width="2.5em"
                      height="2.5em"
                      // transform="translate(0, -12)"
                      viewBox="0 0 752.000000 752.000000"
                      preserveAspectRatio="xMidYMid meet">
                      <g
                        transform="translate(0.000000,752.000000) scale(0.100000,-0.100000)"
                        fill="#868478"
                        stroke="none">
                        <path
                          d="M1945 5575 l-25 -24 0 -1791 0 -1791 25 -24 24 -25 1791 0 1791 0 24
                          25 25 24 0 1791 0 1791 -25 24 -24 25 -1791 0 -1791 0 -24 -25z m585 -410 l0
                          -265 -220 0 -220 0 0 258 c0 142 3 262 7 265 3 4 102 7 220 7 l213 0 0 -265z
                          m2280 -525 l0 -790 -1050 0 -1050 0 0 790 0 790 1050 0 1050 0 0 -790z m618
                          523 l2 -263 -220 0 -220 0 0 265 0 265 218 -2 217 -3 3 -262z m-2898 -703 l0
                          -260 -220 0 -220 0 0 260 0 260 220 0 220 0 0 -260z m2900 0 l0 -260 -220 0
                          -220 0 0 260 0 260 220 0 220 0 0 -260z m-2900 -700 l0 -260 -220 0 -220 0 0
                          260 0 260 220 0 220 0 0 -260z m2900 0 l0 -260 -220 0 -220 0 0 260 0 260 220
                          0 220 0 0 -260z m-620 -880 l0 -790 -1050 0 -1050 0 0 790 0 790 1050 0 1050
                          0 0 -790z m-2280 180 l0 -260 -220 0 -220 0 0 260 0 260 220 0 220 0 0 -260z
                          m2900 0 l0 -260 -220 0 -220 0 0 260 0 260 220 0 220 0 0 -260z m-2900 -705
                          l0 -265 -217 2 -218 3 -3 263 -2 262 220 0 220 0 0 -265z m2898 3 l-3 -263
                          -217 -3 -218 -2 0 265 0 265 220 0 220 0 -2 -262z"
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
                          d="M2140 5289 c-98 -13 -214 -74 -284 -150 -62 -66 -95 -124 -120 -208
                          -14 -49 -16 -173 -16 -1171 0 -998 2 -1122 16 -1171 59 -198 220 -335 424
                          -360 55 -6 638 -9 1660 -7 l1575 3 64 23 c163 59 277 178 325 341 14 49 16
                          173 16 1171 0 998 -2 1122 -16 1171 -48 163 -162 282 -325 341 l-64 23 -1595
                          1 c-877 1 -1624 -2 -1660 -7z m3290 -200 c74 -34 120 -76 156 -141 l29 -53 0
                          -1135 0 -1135 -29 -53 c-36 -65 -82 -107 -156 -141 l-55 -26 -1615 0 -1615 0
                          -55 26 c-78 36 -124 80 -160 151 l-30 61 0 1116 0 1116 24 50 c43 94 115 154
                          215 181 36 10 398 12 1641 11 l1595 -2 55 -26z"
                        />
                        <path
                          d="M4719 4781 c-20 -20 -29 -39 -29 -61 0 -22 9 -41 29 -61 29 -28 32
                          -29 135 -29 57 0 116 4 131 10 36 14 58 68 44 109 -17 49 -52 61 -174 61 -104
                          0 -107 -1 -136 -29z"
                        />
                        <path
                          d="M3680 4519 c-194 -18 -383 -120 -511 -275 -189 -228 -225 -565 -90
                          -832 70 -138 212 -276 351 -341 206 -97 451 -97 655 -1 269 125 436 390 436
                          690 0 457 -381 800 -841 759z m220 -191 c156 -37 315 -165 382 -308 45 -94 61
                          -165 61 -260 0 -161 -56 -295 -172 -411 -116 -116 -250 -172 -411 -172 -160 0
                          -292 55 -410 172 -117 115 -174 250 -174 411 0 94 17 165 61 260 69 146 237
                          278 393 309 30 6 64 13 75 15 28 7 141 -3 195 -16z"
                        />
                      </g>
                    </svg>
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
                          d="M2534 5410 c-12 -5 -26 -15 -30 -22 -5 -7 -11 -661 -14 -1453 l-5
                          -1440 -28 -56 c-30 -63 -92 -125 -159 -161 -37 -20 -58 -23 -143 -23 -89 0
                          -106 3 -150 27 -62 32 -129 103 -158 166 l-22 47 -5 1215 c-3 668 -6 1216 -8
                          1217 -1 1 -9 9 -18 17 -21 22 -77 20 -97 -2 -16 -17 -17 -117 -17 -1228 0
                          -1078 2 -1216 16 -1265 51 -173 206 -309 385 -339 85 -13 3310 -14 3393 0 140
                          23 268 119 329 247 l32 68 3 1476 2 1476 -21 19 c-21 19 -60 19 -1643 21 -903
                          1 -1631 -2 -1642 -7z m3164 -1547 l-3 -1408 -31 -55 c-34 -61 -105 -121 -164
                          -139 -27 -8 -447 -11 -1520 -11 l-1482 0 27 31 c35 42 75 122 91 184 11 41 14
                          309 14 1428 l0 1377 1535 0 1535 0 -2 -1407z"
                        />
                        <path
                          d="M2950 4940 c-27 -27 -25 -66 5 -95 l24 -25 456 0 455 0 0 -445 0
                          -445 -410 0 -410 0 0 335 c0 322 -1 336 -20 355 -27 27 -71 26 -98 -3 -22 -23
                          -22 -27 -22 -404 0 -360 1 -382 19 -404 l19 -24 504 -3 c500 -3 505 -2 531 18
                          l27 21 0 553 c0 523 -1 554 -18 569 -17 15 -68 17 -530 17 -499 0 -513 -1
                          -532 -20z"
                        />
                        <path
                          d="M4396 4938 c-23 -32 -20 -65 9 -93 l24 -25 355 0 c243 0 363 4 380
                          11 13 7 30 25 37 41 10 25 9 33 -8 56 l-20 27 -381 3 -381 2 -15 -22z"
                        />
                        <path
                          d="M4433 4443 c-28 -5 -53 -39 -53 -71 0 -12 11 -34 25 -47 l24 -25 355
                          0 c243 0 363 4 380 11 13 7 30 24 37 40 9 24 9 33 -5 54 -10 14 -28 30 -42 35
                          -24 10 -675 12 -721 3z"
                        />
                        <path
                          d="M4420 3917 c-53 -27 -49 -106 6 -127 37 -14 706 -13 738 1 13 7 30
                          24 37 40 9 24 9 33 -5 54 -10 14 -28 30 -42 35 -40 16 -703 13 -734 -3z"
                        />
                        <path
                          d="M2970 3397 c-53 -27 -49 -106 6 -127 38 -15 2155 -13 2188 1 54 25
                          54 103 -1 128 -37 17 -2159 15 -2193 -2z"
                        />
                        <path
                          d="M2970 2877 c-53 -27 -49 -106 6 -127 34 -13 2143 -14 2178 0 14 5 32
                        21 42 35 14 21 14 30 5 54 -7 16 -24 33 -37 40 -38 17 -2160 15 -2194 -2z"
                        />
                        <path
                          d="M2101 4934 c-21 -27 -21 -28 -21 -1186 l0 -1159 25 -24 c29 -30 64
                          -32 96 -6 l24 19 0 1170 c0 1136 -1 1171 -19 1191 -28 31 -79 28 -105 -5z"
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


          // <div className={`${styles.cardContent}`}>
          //   <p className={`${styles.cardTitle}`}>{tile.title}</p>
          //   <div className="flex items-center">
          //     <svg
          //       version="1.0"
          //       xmlns="http://www.w3.org/2000/svg"
          //       width="3.2em"
          //       height="3.2em"
          //       viewBox="0 0 752.000000 752.000000"
          //       preserveAspectRatio="xMidYMid meet">
          //       <g
          //         transform="translate(0.000000,752.000000) scale(0.100000,-0.100000)"
          //         fill="rgb(var(--foreground-rgb))"
          //         stroke="none">
          //         <path
          //           d="M3491 5764 c-656 -89 -1232 -499 -1534 -1092 -247 -484 -285 -1065
          //           -105 -1582 67 -192 206 -439 338 -600 794 -971 2243 -1004 3077 -71 333 373
          //           513 843 513 1341 0 317 -65 597 -205 885 -301 620 -904 1046 -1590 1125 -124
          //           14 -369 11 -494 -6z m499 -95 c326 -40 613 -152 893 -349 120 -84 353 -317
          //           437 -437 135 -192 227 -381 285 -584 61 -211 70 -278 69 -544 0 -223 -2 -249
          //           -27 -368 -70 -327 -210 -617 -419 -865 -38 -45 -72 -82 -76 -82 -4 0 -20 39
          //           -35 88 -113 354 -379 662 -720 833 -81 41 -270 109 -303 109 -10 0 16 19 57
          //           43 222 126 360 302 419 532 73 283 -2 570 -203 782 -335 352 -879 352 -1214 0
          //           -343 -361 -296 -939 98 -1237 43 -32 103 -70 134 -85 l57 -28 -79 -23 c-453
          //           -131 -819 -484 -960 -926 -15 -49 -31 -88 -35 -88 -4 0 -38 37 -76 83 -209
          //           248 -349 537 -419 864 -25 119 -27 145 -27 368 -1 266 8 333 69 543 161 559
          //           579 1021 1128 1247 113 46 308 99 422 115 50 6 97 13 105 15 40 8 345 4 420
          //           -6z m-54 -699 c226 -57 423 -226 508 -436 78 -192 72 -411 -18 -599 -84 -177
          //           -240 -317 -426 -380 -158 -54 -321 -54 -480 0 -400 136 -604 585 -444 979 84
          //           208 281 378 504 436 103 26 252 26 356 0z m48 -1575 c270 -47 516 -175 712
          //           -370 109 -109 210 -251 268 -376 36 -79 96 -258 96 -287 0 -10 -21 -36 -47
          //           -57 -267 -225 -541 -360 -880 -432 -120 -25 -144 -27 -373 -27 -228 0 -254 2
          //           -371 27 -345 73 -628 214 -899 446 l-35 30 17 63 c134 509 543 890 1056 982
          //           106 19 348 20 456 1z"
          //         />
          //       </g>
          //     </svg>
          //     <h3 className="font-bold pt-1">{tile.text}</h3>
          //   </div>
          // </div>;