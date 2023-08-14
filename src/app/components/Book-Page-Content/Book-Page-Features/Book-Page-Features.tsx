import React, { useState, useEffect } from 'react';
import styles from './Book-Page-Features.module.scss';
import Image from 'next/image';
import masterandemissarry from '../../../assets/masterandemissarry.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

const BookPageFeatures: React.FC = () => {
    
  const [numItems, setNumItems] = useState(5);
  
  useEffect(() => {
    const updateNumItems = () => {
      const width = window.innerWidth;
      
      if (width >= 1200 && width <= 700) {
        setNumItems(5);
      } else if (width >= 1000 && width <= 1199) {
        setNumItems(5);
      } else if (width >= 750 && width <= 999) {
        setNumItems(5);
      } else if (width >= 700 && width <= 749) {
        setNumItems(5);
      } else if (width >= 575 && width <= 699) {
        setNumItems(4);
      } else if (width <= 574) {
        setNumItems(3);
      }
    };
    
    // Initial call
    updateNumItems();
    
    // Add event listener
    window.addEventListener('resize', updateNumItems);
    
    // Cleanup
    return () => window.removeEventListener('resize', updateNumItems);
  }, []);
  
  return (
    <div className={`${styles.featureContent}`}>
      <div className={`${styles.featureContainer}`}>
        <div className={`${styles.tabsContainer}`}>
          <div className={`${styles.tabsWrapper}`}>
            <div
              className={`${styles.featureTabs}
              font-bold border-b border-solid border-foreground`}>
              PRODUCT DETAILS
            </div>
            <div className={`${styles.featureTabs}`}>RATINGS & REVIEW</div>
            <div className={`${styles.featureTabs}`}>SHIPPING & RETURNS</div>
          </div>
        </div>
        <div className={`${styles.featurePoints}`}>
          <ul className="block justify-start flex-1 pt-1">
            <li className="pb-1">
              <span style={{ fontWeight: 'bold' }}>Title</span>: The Master and
              His Emissary 2ED
            </li>
            <li className="pb-1">
              <span style={{ fontWeight: 'bold' }}>Author</span>:{' '}
              <span style={{ color: '#2466b8' }}>
                <a href="">Iain McGilchrist</a>
              </span>
            </li>
            <li className="pb-1">
              <span style={{ fontWeight: 'bold' }}>Edition</span>: 2, New
              Expanded Edition
            </li>
            <li className="pb-1">
              <span style={{ fontWeight: 'bold' }}>Edition Type</span>: 2 EXP
              NEW
            </li>
            <li className="pb-1">
              <span style={{ fontWeight: 'bold' }}>Publisher</span>: Yale
              University Press
            </li>
            <li className="pb-1">
              <span style={{ fontWeight: 'bold' }}>ISBN</span>: 9780300245929
            </li>
            <li>
              <span style={{ fontWeight: 'bold' }}>Languages</span>: English
            </li>
          </ul>
          <ul className="block justify-center flex-1 pt-1">
            <li className="pb-1">
              <span style={{ fontWeight: 'bold' }}>Subtitle</span>: The Divided
              Brain and the Making of the Western World
            </li>
            <li className="pb-1">
              <span style={{ fontWeight: 'bold' }}>Format</span>: PaperBack
            </li>
            <li className="pb-1">
              <span style={{ fontWeight: 'bold' }}>Category:</span>
              <span style={{ color: '#2466b8' }}>
                {' '}
                <a href="">Ancient & Medieval History</a>
                <span className={`${styles.comma}`}>,</span>{' '}
                <a href="">Psychology</a>
              </span>
            </li>
            <li className="pb-1">
              <span style={{ fontWeight: 'bold' }}>Subjects: </span>
              <span style={{ color: '#2466b8' }}>
                <a href="">Psychology</a>
                <span className={`${styles.comma}`}>,</span>{' '}
                <a href="">Classical History / Classical Civilisation</a>
                <span className={`${styles.comma}`}>,</span>{' '}
                <a href="">Psychology / Cognitive Psychology & Cognition</a>
                <span className={`${styles.comma}`}>,</span>{' '}
                <a href="">Psychology / Neuropsychology</a>
                <span className={`${styles.comma}`}>,</span>{' '}
                <a href="">History / Civilization</a>
              </span>
            </li>
            <li className="pb-1">
              <span style={{ fontWeight: 'bold' }}>Publication Date</span>:
              01/02/2019
            </li>
            <li>
              <span style={{ fontWeight: 'bold' }}>Pages</span>: 616
            </li>
          </ul>
        </div>
      </div>
      
      <div className={`${styles.featureSimilar}`}>
        <div className={`${styles.similarText}`}>SIMILAR BOOKS</div>
        <div className={`${styles.similarContainer}`}>
          <div className={`${styles.similarBooks}`}>
            {Array(numItems)
              .fill(null)
              .map((_, index) => (
                <div key={index} className={`${styles.bookBlock}`}>
                  <div>
                    <a href="/book">
                      <Image
                        className={`${styles.responsiveImage}`}
                        src={masterandemissarry.src}
                        alt="yuko"
                        width="115"
                        height="115"
                      />
                    </a>
                  </div>
                  <div className="pt-3 pb-5 font-extrabold">Title</div>
                  <div className="pb-6">Author</div>
                  <div className="font-black pb-2">$24.99</div>
                  <div className="flex justify-evenly">
                    <div className={`${styles.similarHeart}`}>
                      <svg
                        version="1.0"
                        xmlns="http://www.w3.org/2000/svg"
                        width="2em"
                        height="2em"
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
                    <div className={`${styles.similarBag}`}>
                      <svg
                        version="1.0"
                        xmlns="http://www.w3.org/2000/svg"
                        width="2em"
                        height="2em"
                        viewBox="0 0 752.000000 752.000000"
                        preserveAspectRatio="xMidYMid meet"
                      >
                        <g
                          transform="translate(0.000000,752.000000) scale(0.100000,-0.100000)"
                          fill="#d2cfca2b"
                          stroke="none"
                        >
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
                    </div>
                  </div>
                </div>
              ))}
            
            <div className={`${styles.similarRarrow}`}>
              <a href="/book">
                <FontAwesomeIcon icon={faChevronRight} size="xl" />
              </a>
            </div>
            <div className={`${styles.similarLarrow}`}>
              <a href="/book">
                <FontAwesomeIcon icon={faChevronLeft} size="xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookPageFeatures;
