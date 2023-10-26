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
  const [middleColumnChangedState, setMiddleColumnChangedState] = useState(false);
  const [selectedCard, setSelectedCard] = useState<null | TileCard>(null);
  const [displayedColumn, setDisplayedColumn] = useState('E');
  const [displayedPageNumber, setDisplayedPageNumber] = useState('1');
  const [showArrows, setShowArrows] = useState(true);
  const [indexNumber, setIndexNumber] = useState(4);

  const shiftColumn = (direction: 'left' | 'right') => {
    setDisplayedColumn((prevDisplayedColumn) => {
      const currentIndex = columns.indexOf(prevDisplayedColumn);

      // Calculate the new index based on the direction. The modulo operation creates the circular effect.
      let newIndex;
      if (direction === 'left') {
        newIndex = (currentIndex + 1) % columns.length; // Move forward
      } else {
        // Move backward and handle looping from the first item to the last
        newIndex = (currentIndex - 1 + columns.length) % columns.length;
      }

      const newColumn = columns[newIndex];
      setIndexNumber(newIndex); // Assuming you need to keep track of the index number separately
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

    if (newNumber === currentNumber - 1) {
      shiftColumn('right');
    } else if (newNumber === currentNumber + 1) {
      shiftColumn('left');
    } else if (newNumber === currentNumber - 2) {
      shiftColumn('right');
      shiftColumn('right');
    } else if (newNumber === currentNumber + 2) {
      shiftColumn('left');
      shiftColumn('left');
    } else if (newNumber === currentNumber + 7) {
      shiftColumn('left');
      shiftColumn('left');
      shiftColumn('left');
      shiftColumn('left');
      shiftColumn('left');
      shiftColumn('left');
      shiftColumn('left');
    } else if (newNumber === currentNumber - 7) {
      shiftColumn('right');
      shiftColumn('right');
      shiftColumn('right');
      shiftColumn('right');
      shiftColumn('right');
      shiftColumn('right');
      shiftColumn('right');
    } else if (newNumber === currentNumber + 8) {
      shiftColumn('left');
      shiftColumn('left');
      shiftColumn('left');
      shiftColumn('left');
      shiftColumn('left');
      shiftColumn('left');
      shiftColumn('left');
      shiftColumn('left');
    } else if (newNumber === currentNumber - 8) {
      shiftColumn('right');
      shiftColumn('right');
      shiftColumn('right');
      shiftColumn('right');
      shiftColumn('right');
      shiftColumn('right');
      shiftColumn('right');
      shiftColumn('right');
    } else {
      return;
    }
    return true;
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

  // Function to get the data for the columns based on the current index
  const getColumnData = (currentIndex) => {
    // Default column data positions
    let leftDataIndex = (currentIndex - 1 + columns.length) % columns.length;
    let middleDataIndex = currentIndex;
    let rightDataIndex = (currentIndex + 1) % columns.length;

    // Adjustments for specific cases at the boundaries
    if (currentIndex === 0) {
      leftDataIndex = columns.length - 1; // Last item for the left column
      middleDataIndex = 0; // First item for the middle column
      rightDataIndex = 1; // Second item for the right column
    } else if (currentIndex === columns.length - 1) {
      leftDataIndex = columns.length - 2; // Second last item for the left column
      middleDataIndex = columns.length - 1; // Last item for the middle column
      rightDataIndex = 0; // First item for the right column
    }

    // Fetch the data based on the calculated indices
    const leftData = tileCards.find(card => card.cell_name.endsWith(columns[leftDataIndex]));
    const middleData = tileCards.find(card => card.cell_name.endsWith(columns[middleDataIndex]));
    const rightData = tileCards.find(card => card.cell_name.endsWith(columns[rightDataIndex]));

    return { leftData, middleData, rightData };
  };
// ... inside your component, before the return statement ...

// Function to organize cards into rows for rendering
  const prepareRows = (cards) => {
    const numberOfRows = 8; // Based on your setup
    const rows = [];

    for (let i = 0; i < numberOfRows; i++) {
      // Extract the cards for the current row
      const row = cards.filter((card) => {
        const cellNumber = parseInt(card.cell_name.slice(0, -1));
        return cellNumber === i + 1; // because your rows seem to be 1-indexed
      });

      rows.push(row);
    }

    return rows;
  };

  const cardRows = prepareRows(tileCards); // This organizes your cards into rows for rendering


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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(apiURI);
  //       const filteredData = response.data.filter((card: any) => {
  //         const cellNumber = parseInt(card.cell_name.slice(0, -1));
  //         return cellNumber >= 1 && cellNumber <= 8;
  //       });
  //
  //       // Define the custom order for the letters
  //       const letterOrder = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  //
  //       // Custom sort function
  //       filteredData.sort((a: TileCard, b: TileCard) => {
  //         const numA = parseInt(a.cell_name.slice(0, -1));
  //         const numB = parseInt(b.cell_name.slice(0, -1));
  //
  //         const letterA = a.cell_name.slice(-1);
  //         const letterB = b.cell_name.slice(-1);
  //
  //         // First, compare the numeric part
  //         if (numA < numB) return -1;
  //         if (numA > numB) return 1;
  //
  //         // If numeric part is the same, compare the alphabetic part based on custom order
  //         if (letterOrder.indexOf(letterA) < letterOrder.indexOf(letterB)) {
  //           return -1;
  //         } else if (letterOrder.indexOf(letterA) > letterOrder.indexOf(letterB)) {
  //           return 1;
  //         }
  //
  //         return 0; // if both numeric and alphabetic parts are the same
  //       });
  //
  //       setTileCards(filteredData);
  //     } catch (error) {
  //       console.error('Error fetching tile cards:', error);
  //     }
  //   };
  //
  //   fetchData();
  // }, []);

 const { leftData, middleData, rightData } = getColumnData(indexNumber); // This was your original logic.
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

        {/*{cardRows.map((row, rowIndex) => {*/}
        {/*  const { leftData, middleData, rightData } = getColumnData(indexNumber); // This was your original logic.*/}
        {/*  return (*/}
        {/*    <div key={rowIndex} className={styles.rowContainer}>*/}
        {/*      /!*left column*!/*/}
        {/*      {leftData && (*/}
        {/*        <article onClick={() => setSelectedCard(leftData)} className={classNames(styles.card, styles.leftCard)}>*/}
        {/*          <Card card={leftData} />*/}
        {/*        </article>*/}
        {/*      )}*/}
        {/*      /!*middle column*!/*/}
        {/*      {middleData && (*/}
        {/*        <article onClick={() => setSelectedCard(middleData)} className={classNames(styles.card, styles.middleCard)}>*/}
        {/*          <Card card={middleData} />*/}
        {/*        </article>*/}
        {/*      )}*/}
        {/*      /!*right column*!/*/}
        {/*      {rightData && (*/}
        {/*        <article onClick={() => setSelectedCard(rightData)} className={classNames(styles.card, styles.rightCard)}>*/}
        {/*          <Card card={rightData} />*/}
        {/*        </article>*/}
        {/*      )}*/}
        {/*    </div>*/}
        {/*  );*/}
        {/*})}*/}


        {/* Left column */}
        {leftData && (
          <article onClick={() => setSelectedCard(leftData)} className={classNames(styles.card, styles.leftCard)}>
            <Card card={leftData} />
          </article>
        )}

        {/* Middle column */}
        {middleData && (
          <article onClick={() => setSelectedCard(middleData)} className={classNames(styles.card, styles.middleCard)}>
            <Card card={middleData} />
          </article>
        )}

        {/* Right column */}
        {rightData && (
          <article onClick={() => setSelectedCard(rightData)} className={classNames(styles.card, styles.rightCard)}>
            <Card card={rightData} />
          </article>
        )}

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