//src/app/components/Content/Content.tsx
"use client";

import styles from './Content.module.scss';
import Lightbox from './Lightbox/Lightbox'
import Card from './Card/Card';
import classNames from 'classnames';
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';


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

export type TileCard = {
  cell_name: string;
  quote: string;
  author: string;
};

const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
const pageNumber = ['5 L', '4 L', '3 L', '2 L', '1', '2 R', '3 R', '4 R', '5 R'];

const Content: React.FC<ContentProps> = ({ isCardButtonClicked }) => {

  const apiURI = '/api/getCards';
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [tileCards, setTileCards] = useState<TileCard[]>([]);
  const [numColumns, setNumColumns] = useState(getNumColumns());
  const [middleColumnChangedState, setMiddleColumnChangedState] =
    useState(false);
  const [selectedCard, setSelectedCard] = useState<null | TileCard>(null);
  const [displayedColumn, setDisplayedColumn] = useState('E');
  const [displayedPageNumber, setDisplayedPageNumber] = useState('1');
  const [showArrows, setShowArrows] = useState(true);
  const [indexNumber, setIndexNumber] = useState(4);

  const shiftColumn = (direction: 'left' | 'right') => {

    setDisplayedColumn((prevDisplayedColumn) => {
      const currentIndex = columns.indexOf(prevDisplayedColumn);

      let newIndex;
      if (direction === 'left') {
        newIndex = (currentIndex + 1) % columns.length;
      } else {
        newIndex = (currentIndex - 1 + columns.length) % columns.length;
      }
      const newColumn = columns[newIndex];
      setIndexNumber(newIndex);
      setDisplayedPageNumber(pageNumber[newIndex]);
      return newColumn;
    });
    if (middleColumnChangedState) {
      setMiddleColumnChangedState((prevState) => !prevState);
    }
  };

  const getPageNumbersSubset = () => {
    const currentIndex = columns.indexOf(displayedColumn);
    // Calculate the start and end indexes for slicing the array. These calculations ensure the carousel effect.
    let start = currentIndex - 2;
    let end = currentIndex + 3; // Because the 'slice' method doesn't include the element at the ending index.
    // The following conditions create the carousel effect, cycling through the start or end of the array when necessary.
    if (start < 0) {
      const absStart = Math.abs(start);
      return [...pageNumber.slice(-absStart), ...pageNumber.slice(0, end)];
    } else if (end > pageNumber.length) {
      const overflow = end - pageNumber.length;
      return [...pageNumber.slice(start), ...pageNumber.slice(0, overflow)];
    } else {
      return pageNumber.slice(start, end);
    }
  };

  const togglePageNumber = (clickedNumber: string) => {
    const currentNumber = pageNumber.indexOf(displayedPageNumber);
    const newNumber = pageNumber.indexOf(clickedNumber);

    const difference = newNumber - currentNumber;
    const direction = difference > 0 ? 'left' : 'right';
    const shifts = Math.abs(difference);

    switch (shifts) {
      case 1:
      case 2:
      case 7:
      case 8:
        for (let i = 0; i < shifts; i++) {
          shiftColumn(direction);
        }
        return true; // A shift occurred
      default:
        return; // No action needed
    }
  }

  // const handleScroll = () => {
  //   setShowArrows(false);
  //   if (debounceTimeout.current) {
  //     clearTimeout(debounceTimeout.current);
  //   }
  //   debounceTimeout.current = setTimeout(() => {
  //     setShowArrows(true);
  //   }, 100);
  // };

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

    // Focus Toggle
    if (middleColumnChangedState !== isCardButtonClicked) {
      if (isCardButtonClicked) {
        console.log('Focus Mode OFF!');
        toggleChangedState();
      } else {
        toggleChangedState();
        console.log('Focus Mode ON!');
      }
    }

    const handleVisibility = () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
      debounceTimeout.current = setTimeout(() => {
        setShowArrows(true);
      }, 100);
    };
    const handleResize = () => {
      const newNumColumns = getNumColumns();
      if (newNumColumns !== numColumns && newNumColumns === 1) {
        toggleChangedState();
      }
      setNumColumns(newNumColumns);

      setShowArrows(false);
      handleVisibility();
    };

    // window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    return () => {
      // window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [isCardButtonClicked, middleColumnChangedState, numColumns]);

  // fetch data from mongodb via axios API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiURI);
        const filteredData = response.data.filter((card: TileCard) => {
          const cellNumber = parseInt(card.cell_name.slice(0, -1));
          return cellNumber >= 1 && cellNumber <= 8;
        });
        // Sort the filtered data
        filteredData.sort((a: TileCard, b: TileCard) => {
          // if (a.cell_name < b.cell_name) {
          //   return -1;
          // }
          // if (a.cell_name > b.cell_name) {
          //   return 1;
          // }
          // return 0;
          return a.cell_name.localeCompare(b.cell_name);
        });
        setTileCards(filteredData);
      } catch (error) {
        console.error('Error fetching tile cards:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div id="sectionWrapper">
      <section className={styles.contentLayout}>
        <div className={`${styles.similarRarrow} ${showArrows ? styles.visibleArrow : styles.hiddenArrow}`}
        >
          <div
            className={styles.circleButton}
            onClick={() => shiftColumn('left')}
          >
          </div>
          <FontAwesomeIcon icon={faChevronRight} size="xl"/>
        </div>
        <div className={`${styles.similarLarrow} ${showArrows ? styles.visibleArrow : styles.hiddenArrow}`}
        >
          <div
            className={styles.circleButton}
            onClick={() => shiftColumn('right')}
          >
          </div>
          <FontAwesomeIcon icon={faChevronLeft} size="xl"/>
        </div>
        <div className={`${styles.similarDarrow}`}>
          <a href="/">
            <FontAwesomeIcon icon={faChevronDown} size="xl" />
          </a>
        </div>

        {selectedCard && (
          <Lightbox card={selectedCard} onClose={() => setSelectedCard(null)} />
        )}

        {tileCards.map((card, index) => {
          const cellLetter = card.cell_name.slice(-1);
          const currentIndex = columns.indexOf(displayedColumn);
          const prevIndex = (currentIndex - 1 + columns.length) % columns.length;
          const nextIndex = (currentIndex + 1) % columns.length;

          const firstColumn = columns[prevIndex];
          const secondColumn = columns[currentIndex];
          const thirdColumn = columns[nextIndex];
          const isFirstColumn = cellLetter === firstColumn;
          const isSecondColumn = cellLetter === secondColumn;
          const isThirdColumn = cellLetter === thirdColumn;

          if (!isFirstColumn && !isSecondColumn && !isThirdColumn) {
            return null;
          }

          return (
            <article
              key={index}
              onClick={() => setSelectedCard(card)}
              className={classNames(styles.card, {
                [styles.leftCard]: isFirstColumn,
                [styles.middleCard]: isSecondColumn,
                [styles.rightCard]: isThirdColumn,
                [styles.changedState]: (isFirstColumn || isThirdColumn) && middleColumnChangedState,
              })}
            >
              <Card card={card} />
            </article>
          );
        })}


      </section>

      <div className={styles.pagination}>
        {(() => {
          const currentPageNumbers = getPageNumbersSubset();
          // Render the page numbers
          return currentPageNumbers.map((num, index) => (
            <a
              key={index}
              className={`${styles.pageNumber} ${num === displayedPageNumber ? styles.currentPage : ''}`}
              onClick={() => {
                togglePageNumber(num);
              }}
            >
              {num}
            </a>
          ));
        })()}

        {/*{pageNumber.map((num, index) => {*/}
        {/*  // const currentPage = pageNumber.indexOf(displayedPageNumber);*/}
        {/*  return (*/}
        {/*    <a*/}
        {/*      key={index}*/}
        {/*      href={`#page-${index + 1}`}*/}
        {/*      className={styles.pageNumber}*/}
        {/*    >*/}
        {/*      {num}*/}
        {/*    </a>*/}
        {/*  );*/}
        {/*})}*/}

        {/*{(() => {*/}
        {/*  const currentPageWindow = calculatePaginationWindow(displayedPageNumber);*/}

        {/*  // Render the page numbers*/}
        {/*  return currentPageWindow.map((num, index) => (*/}
        {/*    <a*/}
        {/*      key={index}*/}
        {/*      href={`#page-${num}`}*/}
        {/*      className={`${styles.pageNumber} ${num === displayedPageNumber ? styles.active : ''}`}*/}
        {/*      onClick={() => {*/}
        {/*        setDisplayedPageNumber(num);*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      {num}*/}
        {/*    </a>*/}
        {/*  ));*/}
        {/*})()}*/}

        {/*{Array.from({length: 5}, (_, index) => {*/}
        {/*  const currentPage = pageNumber.indexOf(displayedPageNumber);*/}
        {/*  return (*/}
        {/*    <a*/}
        {/*      key={index}*/}
        {/*      href={`#page-${index + 1}`}*/}
        {/*      className={styles.pageNumber}*/}
        {/*    >*/}
        {/*      {index + 2}*/}
        {/*    </a>*/}
        {/*  );*/}
        {/*})}*/}

      </div>

    </div>
  );
};


export default Content;