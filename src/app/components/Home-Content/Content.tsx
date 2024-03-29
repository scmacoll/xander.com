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
} from '@fortawesome/free-solid-svg-icons';
import { useConfirmedOrder } from "@/app/context/ConfirmedOrderContext";
import { useCart } from "@/app/context/CartContext";


interface ContentProps {
  isCardButtonClicked: boolean,
  numColumns: number,
  setShowFooter: (value: (((prevState: boolean) => boolean) | boolean)) => void
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
  book_authors: string;
  book_date: string;
  book_price: string;
  book_title: string;
  book_type: string;
};

const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
const pageNumber = ['5 L', '4 L', '3 L', '2 L', '1', '2 R', '3 R', '4 R', '5 R'];

const Content: React.FC<ContentProps> = ({isCardButtonClicked, setShowFooter}) => {


  const [isGetLocalStorage, setIsGetLocalStorage] = useState(false);
  // >>>>>> New code
  const isBrowser = typeof window !== 'undefined';
  const [cartData, setCartData] = useState();
  const [cartId, setCartId] = useState();
  // >>>>>> New code
  const { orderCompleted, completeOrder } = useConfirmedOrder();
  const { totalQty, clearCart, clearOrderNumber } = useCart();
  const [hasPageLoaded, setHasPageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const loadingBarRef = useRef(null); // Use useRef to get a reference to the loading bar

  useEffect(() => {
    setTimeout(() => {
      setHasPageLoaded(true);
    }, 10)
  }, []);

  useEffect(() => {
    if (orderCompleted) {
      completeOrder(false)
      // @ts-ignore
      clearCart();
      // @ts-ignore
      clearOrderNumber();
    }
  }, [orderCompleted]);

  useEffect(() => {
    if (isBrowser) {
      console.log("<<<<<<<<<<<<< getting item cart data! >>>>>>>>>>>>>>>");
      const localCartData: any = localStorage.getItem('cart');
      const parsedCartData = localCartData ? JSON.parse(localCartData) : null;
      setCartData(localCartData);
      setCartId(parsedCartData ? parsedCartData.cartId : null);
      setIsGetLocalStorage(true);
    }
  }, []);

  console.log("Cart ID: ", cartId ? cartId : 'No cart ID');
  console.log("Cart Data: ", cartData ? cartData : 'No cart data');
  console.log("is order completed?: ", orderCompleted);
  console.log("totalQty: ", totalQty);
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

  const preloadImage = (imageUrl: any) => {
    const img = new Image();
    img.src = imageUrl;
  };

  // Inside Content component
  useEffect(() => {
    // This assumes tileCards is already defined and updated in Content component
    const shouldShowFooter = tileCards.length > 0;
    setShowFooter(shouldShowFooter);
  }, [tileCards, setShowFooter]);

  useEffect(() => {
    if (selectedCard) {
      // When the lightbox is active, prevent scrolling on the body
      document.body.style.overflow = 'hidden';
    } else {
      // When the lightbox is closed, restore scrolling
      document.body.style.overflow = '';
    }

    // Clean up function to ensure scrolling is enabled when component unmounts or updates
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedCard]);
  const handleCardInteraction = (card: TileCard) => {
    setSelectedCard(card);
  };

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
  const getColumnData = (indexNumber: any) => {
    // Default column data positions
    let leftDataIndex = (indexNumber - 1 + columns.length) % columns.length;
    let middleDataIndex = indexNumber;
    let rightDataIndex = (indexNumber + 1) % columns.length;

    // Fetch the data based on the calculated indices
    const leftData = tileCards.filter(card => card.cell_name.endsWith(columns[leftDataIndex]));
    const middleData = tileCards.filter(card => card.cell_name.endsWith(columns[middleDataIndex]));
    const rightData = tileCards.filter(card => card.cell_name.endsWith(columns[rightDataIndex]));

    return {leftData, middleData, rightData};
  };

  const mergeData = (leftData: any, middleData: any, rightData: any) => {
    const mergedData = [];
    // Assuming all columns have the same number of cards
    const numberOfCards = leftData.length;

    for (let i = 0; i < numberOfCards; i++) {
      // Add the cards from each column in the correct order
      if (leftData[i]) {
        mergedData.push({...leftData[i], column: 'left'});
      }
      if (middleData[i]) {
        mergedData.push({...middleData[i], column: 'middle'});
      }
      if (rightData[i]) {
        mergedData.push({...rightData[i], column: 'right'});
      }
    }
    return mergedData;
  }

  const {leftData, middleData, rightData} = getColumnData(indexNumber);
  const combinedData = mergeData(leftData, middleData, rightData);

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
      setIsLoading(true);
      try {
        const response = await axios.get(apiURI);
        const filteredData = response.data.filter((card: TileCard) => {
          const cellNumber = parseInt(card.cell_name.slice(0, -1));
          return cellNumber >= 1 && cellNumber <= 8;
        });
        // Sort the filtered data
        filteredData.sort((a: TileCard, b: TileCard) => {
          return a.cell_name.localeCompare(b.cell_name);
        });

        // Sequentially preload images with adjusted logic
        const columnGroups = [['E', 'F', 'D'], ['G', 'C'], ['H', 'B'], ['I', 'A']];
        for (const group of columnGroups) {
          for (let row = 1; row <= 8; row++) {
            for (const column of group) {
              const card = filteredData.find((card: { cell_name: string; }) => card.cell_name === `${row}${column}`);
              if (card) {
                await preloadImage(`P${card.cell_name}.png`); // Ensure preloadImage returns a Promise
              }
            }
          }
        }


        setTileCards(filteredData);

        // dynamically create Image objects to preload images
        filteredData.forEach((card: any) => {
          const img = new Image();
          img.src = `P${card.cell_name}.png`;
        });

      } catch (error) {
        console.error('Error fetching tile cards:', error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (!hasPageLoaded) {
    return null;
  }

  if (isLoading) {
    return <div className={styles.loadingBar}></div>;
  }

  return (
    <div id="sectionWrapper" className="">
      <div className={`${styles.contentLayout} `}>

        <div id="arrowButtons" className="absolute">
          <div className={`${styles.similarRarrow} ${showArrows ? styles.visibleArrow : styles.hiddenArrow}`}
          >
            <button
              className={styles.circleButton}
              onClick={() => shiftColumn('left')}
            >
            </button>
            <FontAwesomeIcon icon={faChevronRight}/>
          </div>
          <div className={`${styles.similarLarrow} ${showArrows ? styles.visibleArrow : styles.hiddenArrow}`}
          >
            <button
              className={styles.circleButton}
              onClick={() => shiftColumn('right')}
            >
            </button>
            <FontAwesomeIcon icon={faChevronLeft}/>
          </div>
        </div>

        {combinedData.map((card, index) => {
          const bookImageUrl = `/${card.cell_name}.jpg`;

          const cellLetter = card.cell_name.slice(-1);
          const currentIndex = columns.indexOf(displayedColumn);
          const prevIndex = (currentIndex - 1 + columns.length) % columns.length;
          const nextIndex = (currentIndex + 1) % columns.length;
          let firstColumn, secondColumn, thirdColumn;

          if (numColumns === 3) {
            firstColumn = columns[prevIndex];
            secondColumn = columns[currentIndex];
            thirdColumn = columns[nextIndex];
          } else if (numColumns === 2) {
            firstColumn = '';
            secondColumn = columns[currentIndex];
            thirdColumn = columns[nextIndex];
          } else {
            firstColumn = '';
            secondColumn = columns[currentIndex];
            thirdColumn = '';
          }

          const isFirstColumn = cellLetter === firstColumn;
          const isSecondColumn = cellLetter === secondColumn;
          const isThirdColumn = cellLetter === thirdColumn;

          if (!isFirstColumn && !isSecondColumn && !isThirdColumn) {
            return null;
          }

          return (
            <div key={index}
                 onMouseEnter={() => preloadImage(bookImageUrl)}
                 className={classNames(styles.card, {
                   [styles.leftCard]: isFirstColumn,
                   [styles.middleCard]: isSecondColumn,
                   [styles.rightCard]: isThirdColumn,
                   [styles.changedState]: (isFirstColumn || isThirdColumn) && middleColumnChangedState,
                 })}
                 onClick={() => handleCardInteraction(card)}
            >
              <Card
                card={card}
                onInteraction={() => handleCardInteraction(card)}
              />
            </div>
          );
        })}

        {selectedCard && (
          <Lightbox
            card={selectedCard}
            onClose={() => setSelectedCard(null)}
            numColumns={numColumns}/>
        )}

      </div>

      <nav aria-label="pageNavigation" id="paginationMenu"
           className={`${tileCards.length === 0 ? 'hidden' : ''} flex mx-auto justify-center items-center gap-1`}>
        <button id="leftArrow"
             className={`xs:hidden xl:px-7 lg:px-6 md:px-5 sm:px-4 xs:px-3 translate-y-2`}
             onClick={() => shiftColumn('right')}>
          <FontAwesomeIcon icon={faChevronLeft} size="xl" className="text-fg-06 hover:text-foreground"/>
        </button>
        <li className={`${styles.pagination} select-none`}>
          {(() => {
            const currentPageNumbers = getPageNumbersSubset();
            // Render the page numbers
            return currentPageNumbers.map((num, index) => (
                <button
                  key={index}
                  className={`${styles.pageNumber} ${num === displayedPageNumber ? styles.currentPage : ''}`}
                  onClick={() => {
                    togglePageNumber(num);
                  }}
                >
                  {num}
                </button>
            ));
          })()}
        </li>
        <button id="rightArrow"
             className={`xs:hidden xl:px-7 lg:px-6 md:px-5 sm:px-4 xs:px-3 translate-y-2`}
             onClick={() => shiftColumn('left')}>
          <FontAwesomeIcon icon={faChevronRight} size="xl" className="text-fg-06 hover:text-foreground"/>
        </button>
      </nav>

    </div>
  );
};


export default Content;