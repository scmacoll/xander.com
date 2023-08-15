//src/app/components/Content/Content.tsx
"use client";

import styles from './Content.module.scss';
import Lightbox from './Lightbox/Lightbox'
import Card from './Card/Card';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
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

const Content: React.FC<ContentProps> = ({ isCardButtonClicked }) => {
  
  const apiURI = '/api/getCards';
  const [tileCards, setTileCards] = useState<TileCard[]>([]);
  const [numColumns, setNumColumns] = useState(getNumColumns());
  const [middleColumnChangedState, setMiddleColumnChangedState] =
    useState(false);
  const [selectedCard, setSelectedCard] = useState<null | TileCard>(null);
  
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
    <div id="sectionWrapper">  
      <section className={styles.contentLayout}>
        
        <div className={`${styles.similarRarrow}`}>
          <a href="/">
            <FontAwesomeIcon icon={faChevronRight} size="xl" />
          </a>
        </div>
        <div className={`${styles.similarLarrow}`}>
          <a href="/">
            <FontAwesomeIcon icon={faChevronLeft} size="xl" />
          </a>
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
          
          const isFirstColumn =
            cellNumber >= 1 && cellNumber <= 8 && cellLetter === 'D';
          const isSecondColumn =
            cellNumber >= 1 && cellNumber <= 8 && cellLetter === 'E';
          const isThirdColumn =
            cellNumber >= 1 && cellNumber <= 8 && cellLetter === 'F';
          
          if (
            (numColumns === 1 && !isSecondColumn) ||
            (numColumns === 2 && isFirstColumn)
          ) {
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