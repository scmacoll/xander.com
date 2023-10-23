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
// import {clearTimeout} from "timers";


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
const pageNumber = [-5, -4, -3, -2, 1, 2, 3, 4, 5];

const Content: React.FC<ContentProps> = ({ isCardButtonClicked }) => {

  const apiURI = '/api/getCards';
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [tileCards, setTileCards] = useState<TileCard[]>([]);
  const [numColumns, setNumColumns] = useState(getNumColumns());
  const [middleColumnChangedState, setMiddleColumnChangedState] =
    useState(false);
  const [selectedCard, setSelectedCard] = useState<null | TileCard>(null);
  const [displayedColumn, setDisplayedColumn] = useState('E');
  const [displayedNumber, setDisplayedNumber] = useState<number>(1);
  const [showArrows, setShowArrows] = useState(true);
  const [indexNumber, setIndexNumber] = useState(4);

  const handleScroll = () => {
    setShowArrows(false);
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      setShowArrows(true);
    }, 100);
  }

  const shiftColumn = (direction: 'left' | 'right') => {
    handleScroll();

    setDisplayedColumn((prevDisplayedColumn) => {
      const currentIndex = columns.indexOf(prevDisplayedColumn);

      let newIndex = currentIndex;
      if (direction === 'right' && currentIndex > 1) {
        newIndex = currentIndex - 1;
      } else if (direction === 'left' && currentIndex < 7) {
        newIndex = currentIndex + 1;
      }

      setIndexNumber(newIndex);
      // displayedColumn value index #
      return columns[newIndex];
    });

    setDisplayedNumber((prevSetPage) => {
      const currentIndex = columns.indexOf(prevSetPage);

      let newIndex = currentIndex;
      if (direction === 'right' && currentIndex) {
        newIndex = currentIndex - 1;
      } else if (direction === 'left' && currentIndex) {
        newIndex = currentIndex + 2;
      }

      return pageNumber[newIndex];
    });
    if (middleColumnChangedState) {
      setMiddleColumnChangedState((prevState) => !prevState);
    }
  };

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

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
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
    <div id="sectionWrapper">
      <section className={styles.contentLayout}>
        <div className={`${styles.similarRarrow} ${showArrows ? styles.visibleArrow : styles.hiddenArrow}`}
             style={{ display: indexNumber === 7 ? 'none' : 'block'}}
        >
          <div
            className={styles.circleButton}
            onClick={() => shiftColumn('left')}
          >
          </div>
          <FontAwesomeIcon icon={faChevronRight} size="xl"/>
        </div>
        <div className={`${styles.similarLarrow} ${showArrows ? styles.visibleArrow : styles.hiddenArrow}`}
             style={{ display: indexNumber === 1 ? 'none' : 'block'}}
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

          let firstColumn, secondColumn, thirdColumn;
          if (numColumns === 3) {
            firstColumn = columns[currentIndex - 1] || '';
            secondColumn = displayedColumn;
            thirdColumn = columns[currentIndex + 1] || '';
          } else if (numColumns === 2) {
            firstColumn = '';
            secondColumn = displayedColumn;
            thirdColumn = columns[currentIndex + 1] || '';
          } else {
            firstColumn = '';
            secondColumn = displayedColumn;
            thirdColumn = '';
          }

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
                [styles.changedState]:
                (isFirstColumn || isThirdColumn) && middleColumnChangedState,
              })}
            >
              <Card card={card} />
            </article>
          );
        })}


      </section>

      <div className={styles.pagination}>

        {pageNumber.map((num, index) => {
          // const currentPage = pageNumber.indexOf(displayedNumber);
          return (
            <a
              key={index}
              href={`#page-${index + 1}`}
              className={styles.pageNumber}
            >
              {index + 2}
            </a>
          );
        })}

        {/*{Array.from({length: 5}, (_, index) => {*/}
        {/*  const currentPage = pageNumber.indexOf(displayedNumber);*/}
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