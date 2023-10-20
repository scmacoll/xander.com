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

const Content: React.FC<ContentProps> = ({ isCardButtonClicked }) => {

  const apiURI = '/api/getCards';
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [tileCards, setTileCards] = useState<TileCard[]>([]);
  const [numColumns, setNumColumns] = useState(getNumColumns());
  const [middleColumnChangedState, setMiddleColumnChangedState] =
    useState(false);
  const [selectedCard, setSelectedCard] = useState<null | TileCard>(null);
  const [displayedColumn, setDisplayedColumn] = useState('E');
  const [showArrows, setShowArrows] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);

  console.log("current index:", columns.indexOf(displayedColumn))

  const handleScroll = () => {
    setHasScrolled(true);
    setShowArrows(false);
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      setShowArrows(true);
    }, 100);
  }

  const shiftColumn = (direction: 'left' | 'right') => {
    const currentIndex = columns.indexOf(displayedColumn);
    if (direction === 'right' && currentIndex > 1) {
        setDisplayedColumn(columns[currentIndex - 1]);
    } else if (direction === 'left' && currentIndex < 7) {
        setDisplayedColumn(columns[currentIndex + 1]);
    } else {
      return;
    }
    if (middleColumnChangedState) {
      setMiddleColumnChangedState(!middleColumnChangedState);
    }
    if (hasScrolled) {
      setHasScrolled(false);
    }
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    setShowArrows(true);
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
        <div className={`${styles.similarRarrow} ${showArrows ? styles.visibleArrow : styles.hiddenArrow}`}>
          <div
            className={styles.circleButton}
            onClick={() => shiftColumn('left')}
          >
          </div>
          <FontAwesomeIcon icon={faChevronRight} size="xl"/>
        </div>
        <div className={`${styles.similarLarrow} ${showArrows ? styles.visibleArrow : styles.hiddenArrow}`}>
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
          const cellNumber = parseInt(card.cell_name.slice(0, -1));
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
        {Array.from({ length: 5 }, (_, index) => (
          <a
            key={index}
            href={`#page-${index + 1}`}
            className={styles.pageNumber}
          >
            {index + 1}
          </a>
        ))}
      </div>
    </div>
  );
};


export default Content;