"use client";
import styles from './Confirm-Page-Content.module.scss';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "@/app/context/CartContext";
import { useHearts } from "@/app/context/HeartContext";
import { useConfirmedOrder } from '@/app/context/ConfirmedOrderContext';
import ExpiredPage from "@/app/components/Expired-Page/Expired-Page";
import { useRouter } from "next/navigation";

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

const ConfirmPageContent: React.FC = () => {
  const [books, setBooks] = useState<TileCard[]>([]);
  const { bookHearts, toggleBookHeart } = useHearts(); // Ensure you have these from your context
  const apiURI = '/api/getCards';
  const handleBookHeartClick = (bookTitle: string) => {
    toggleBookHeart(bookTitle);
  };
  const { cartItems, totalPrice, orderNumber, totalQty, addToCart, clearCart, cartId, clearOrderNumber } = useCart();
  const [selectedBook, setSelectedBook] = useState<TileCard | null>(null);
  const [isConfirmAddToCart, setIsConfirmAddToCart] = useState(false);
  const [isCartAdded, setIsCartAdded] = useState(false);
  const [isCartCleared, setIsCartCleared] = useState(false);

  const { orderCompleted, completeOrder } = useConfirmedOrder();
  console.log("is order completed?: ", orderCompleted);

  const [email, setEmail] = useState('');
  const [shippingFirstName, setShippingFirstName] = useState('');
  const [shippingLastName, setShippingLastName] = useState('');
  const [shippingCompanyName, setShippingCompanyName] = useState('');
  const [shippingAddressLineOne, setShippingAddressLineOne] = useState('');
  const [shippingAddressLineTwo, setShippingAddressLineTwo] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [shippingState, setShippingState] = useState('');
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingZipcode, setShippingZipcode] = useState('');
  const [shippingPhone, setShippingPhone] = useState('');
  const [billingFirstName, setBillingFirstName] = useState('');
  const [billingLastName, setBillingLastName] = useState('');
  const [billingCompanyName, setBillingCompanyName] = useState('');
  const [billingAddressLineOne, setBillingAddressLineOne] = useState('');
  const [billingAddressLineTwo, setBillingAddressLineTwo] = useState('');
  const [billingCity, setBillingCity] = useState('');
  const [billingState, setBillingState] = useState('');
  const [billingCountry, setBillingCountry] = useState('');
  const [billingZipcode, setBillingZipcode] = useState('');
  const [billingPhone, setBillingPhone] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const bottomRef = useRef<null | HTMLDivElement>(null);
  const [numItems, setNumItems] = useState(5);
  const [isOrderSummaryHidden, setOrderSummaryHidden] = useState(true);
  const router = useRouter();
  const isBrowser = typeof window !== 'undefined';
  // Use conditional (ternary) operator to access localStorage only if isBrowser is true
  const storedEmail = isBrowser ? localStorage.getItem('email') : null
  console.log("total Price: ", totalPrice);
  const [is404Error, setIs404Error] = useState(false);
  const [hasPageLoaded, setHasPageLoaded] = useState(false);
  const currentUrl = window.location.pathname;


  const pickRandomBooks = (books: any, n: any) => {
    const shuffled = books.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };
  const isCellInRange = (cellName: any) => {
    const numberPart = parseInt(cellName, 10); // Extracts the numeric part
    const letterPart = cellName.charAt(cellName.length - 1); // Extracts the letter part

    return numberPart >= 1 && numberPart <= 8 && letterPart >= 'A' && letterPart <= 'I';
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(apiURI);
        const booksFromDB = response.data;
        const booksNotInCart = booksFromDB.filter(
          (book: any) => !cartItems.some((cartItem) => cartItem.bookTitle === book.book_title)
        );

        // Filter books within the specified cell range
        const booksInCellRange = booksNotInCart.filter((book: { cell_name: any; }) => isCellInRange(book.cell_name));

        // Randomly pick 5 books from the booksInCellRange array
        const randomBooks = pickRandomBooks(booksInCellRange, 5);
        setBooks(randomBooks);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setHasPageLoaded(true);
    }, 10)
  }, []);
  useEffect(() => {
    if (orderNumber === null || orderNumber === undefined || storedEmail === null || currentUrl === '/confirm') {
      setIs404Error(true);
    }
  }, []);

  const toggleOrderSummary = useCallback(() => {
    setOrderSummaryHidden(prevState => !prevState);
  }, []);

  // const handleAddToCart = (book: TileCard) => {
  //   console.log("add to cart invoked");
  //   handleClearCart();
  //   const newItem: any = {
  //     qty: 1, // or any other logic to determine quantity
  //     imageUrl: `/${book.cell_name}.jpg`,
  //     qtyPrice: parseFloat((1 * parseFloat(book.book_price)).toFixed(2)), // format qtyPrice
  //     bookPrice: parseFloat(book.book_price).toFixed(2),
  //     bookTitle: book.book_title,
  //     bookAuthors: book.book_authors,
  //     bookType: book.book_type,
  //     bookDate: book.book_date
  //   };
  //   console.log("Item to be added: ", newItem);
  //   addToCart(newItem);
  //   setIsConfirmAddToCart(true);
  //   setTimeout(() => {
  //     setIsConfirmAddToCart(false);
  //   }, 2000);
  // };

  const handleBuyNow = async (event: React.MouseEvent, book: TileCard) => {
    event.preventDefault();
    console.log("buy now invoked")
    completeOrder(false);
    setSelectedBook(book); // Set the book in state

    // Clear the existing cart items and old cart ID
    try {
      const isCartClearedResult = await clearCart();
      if (!isCartClearedResult) {
        throw new Error('Failed to clear the existing cart.');
      }
      setIsCartCleared(isCartClearedResult); // Se
    } catch (clearCartError) {
      console.error("Error clearing the cart:", clearCartError);
      return; // Stop further execution if clearing cart fails
    }
  }

  const handleAddToCart = async (book: TileCard) => {
    console.log("add to cart invoked");
    const newItem: any = {
      qty: 1, // or any other logic to determine quantity
      imageUrl: `/${book.cell_name}.jpg`,
      qtyPrice: parseFloat((1 * parseFloat(book.book_price)).toFixed(2)), // format qtyPrice
      bookPrice: parseFloat(book.book_price).toFixed(2),
      bookTitle: book.book_title,
      bookAuthors: book.book_authors,
      bookType: book.book_type,
      bookDate: book.book_date
    };
    console.log("Item to be added: ", newItem);
    try {
      const updatedCart = await addToCart(newItem);
      // @ts-ignore
      if (updatedCart) {
        setIsCartAdded(true);
        // console.log('Updated local storage:', localStorage.getItem('cart'));
        console.log("cart id = ", `${cartId}`)
      } else {
        throw new Error('Cart ID was not created.');
      }
    } catch (error) {
      console.error("Error in handleBuyNow:", error);
    }

  }

  useEffect(() => {
    if (isCartCleared && cartId === null && totalQty === 0 && totalPrice === 0 && selectedBook) {
      handleAddToCart(selectedBook);
      setIsCartCleared(false);
    }
  }, [isCartCleared, selectedBook]); // Run this effect when `isCartCleared` changes

  useEffect(() => {
    if (isCartAdded && cartId !== null && totalQty > 0 && totalPrice > 0) {
      setIsCartAdded(false);
      window.location.href = `/checkout/${cartId}`;
    }
  }, [isCartAdded, cartId]); // Run this effect when `isCartCleared` changes

  // const handleClearCart = () => {
  //   return new Promise((resolve) => {
  //     try {
  //       localStorage.setItem('cart', JSON.stringify({ items: [], totalPrice: 0, totalQty: 0, cartId: null }));
  //       console.log("Cart cleared");
  //       resolve(true); // Resolve the promise with true
  //     } catch (error) {
  //       console.error("Error clearing the cart:", error);
  //       resolve(false); // Resolve the promise with false in case of error
  //     }
  //   });
  // };

  useEffect(() => {
    completeOrder(true);
  }, []);

  useEffect(() => {
    if (orderNumber === undefined || orderNumber === null) {
      return;
    }
  }, []);

  useEffect(() => {
    console.log("cart id first render: ", cartId);
  }, [cartId]);

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');

    const storedShippingFirstName = localStorage.getItem('shippingFirstName');
    const storedShippingLastName = localStorage.getItem('shippingLastName');
    const storedShippingCompanyName = localStorage.getItem('shippingCompanyName');
    const storedShippingAddressLineOne = localStorage.getItem('shippingAddressLineOne');
    const storedShippingAddressLineTwo = localStorage.getItem('shippingAddressLineTwo');
    const storedShippingCity = localStorage.getItem('shippingCity');
    const storedShippingState = localStorage.getItem('shippingState');
    const storedShippingCountry = localStorage.getItem('shippingCountry');
    const storedShippingZipcode = localStorage.getItem('shippingZipcode');
    const storedShippingPhone = localStorage.getItem('shippingPhone');

    const storedBillingFirstName = localStorage.getItem('billingFirstName');
    const storedBillingLastName = localStorage.getItem('billingLastName');
    const storedBillingCompanyName = localStorage.getItem('billingCompanyName');
    const storedBillingAddressLineOne = localStorage.getItem('billingAddressLineOne');
    const storedBillingAddressLineTwo = localStorage.getItem('billingAddressLineTwo');
    const storedBillingCity = localStorage.getItem('billingCity');
    const storedBillingState = localStorage.getItem('billingState');
    const storedBillingCountry = localStorage.getItem('billingCountry');
    const storedBillingZipcode = localStorage.getItem('billingZipcode');
    const storedBillingPhone = localStorage.getItem('billingPhone');

    const storedCardNumber = localStorage.getItem('cardNumber');

    if (storedEmail) {
      setEmail(storedEmail);
    }
    if (storedShippingFirstName) {
      setShippingFirstName(storedShippingFirstName);
    }
    if (storedShippingLastName) {
      setShippingLastName(storedShippingLastName);
    }
    if (storedShippingCompanyName) {
      setShippingCompanyName(storedShippingCompanyName);
    }
    if (storedShippingAddressLineOne) {
      setShippingAddressLineOne(storedShippingAddressLineOne);
    }
    if (storedShippingAddressLineTwo) {
      setShippingAddressLineTwo(storedShippingAddressLineTwo);
    }
    if (storedShippingCity) {
      setShippingCity(storedShippingCity);
    }
    if (storedShippingState) {
      setShippingState(storedShippingState);
    }
    if (storedShippingCountry) {
      setShippingCountry(storedShippingCountry);
    }
    if (storedShippingZipcode) {
      setShippingZipcode(storedShippingZipcode);
    }
    if (storedShippingPhone) {
      setShippingPhone(storedShippingPhone);
    }
    if (storedBillingFirstName) {
      setBillingFirstName(storedBillingFirstName);
    }
    if (storedBillingLastName) {
      setBillingLastName(storedBillingLastName);
    }
    if (storedBillingCompanyName) {
      setBillingCompanyName(storedBillingCompanyName);
    }
    if (storedBillingAddressLineOne) {
      setBillingAddressLineOne(storedBillingAddressLineOne);
    }
    if (storedBillingAddressLineTwo) {
      setBillingAddressLineTwo(storedBillingAddressLineTwo);
    }
    if (storedBillingCity) {
      setBillingCity(storedBillingCity);
    }
    if (storedBillingState) {
      setBillingState(storedBillingState);
    }
    if (storedBillingCountry) {
      setBillingCountry(storedBillingCountry);
    }
    if (storedBillingZipcode) {
      setBillingZipcode(storedBillingZipcode);
    }
    if (storedBillingPhone) {
      setBillingPhone(storedBillingPhone);
    }
    if (storedCardNumber) {
      const lastFourDigits = storedCardNumber.slice(-4);
      setCardNumber(lastFourDigits);
    }

  }, []);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView(false);
    }

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

  console.log("order number: ", orderNumber);
  console.log("cart items:", cartItems);

  if (!hasPageLoaded) {
    return null;
  }
  // Returns
  if (totalQty === 0 && orderCompleted) {
    return <div><ExpiredPage/></div>
  } else if (is404Error) {
    router.push('/404');
  } else {
    return (
      <div
        className="relative select-none mx-auto flex flex-col w-full overflow-x-hidden xs:px-4 sm:px-8 md:px-8 lg:px-0">
        <div
          id="pageContainer"
          className={`${styles.pageContainer} mx-auto flex lg:pt-12 md:pt-12 sm:pt-2 xs:pt-2 xs:max-w-532px xs:flex-col-reverse sm:w-532px sm:flex-col-reverse md:w-full md:flex-row md:justify-between lg:w-1120px lg:flex-row lg:justify-between`}>

          <div id="leftContentWrapper"
               className="flex mx-auto flex-col sm:w-full md:w-51.5% lg:w-51.5%">
            <header id="checkoutTitle"
                 className="pt-1 pb-3 xs:hidden sm:hidden md:block lg:block">
              <div className="flex pb-1">
                <h1 className="py-3 text-3xl"><a href="/">Xandria</a></h1>
              </div>
            </header>
            <div className="xs:py-3 sm:py-3"></div>
            <div id="orderTitleNumber"
                 className="flex items-center">
              <div className="pr-3">
                <svg className="cursor-default" id="confirmTickIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px"
                     height="50px">
                  <path
                    fill="rgb(185, 161, 111)"
                    d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 37.690466 12.309534 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 13.390466 46 4 36.609534 4 25 C 4 13.390466 13.390466 4 25 4 z M 34.988281 14.988281 A 1.0001 1.0001 0 0 0 34.171875 15.439453 L 23.970703 30.476562 L 16.679688 23.710938 A 1.0001 1.0001 0 1 0 15.320312 25.177734 L 24.316406 33.525391 L 35.828125 16.560547 A 1.0001 1.0001 0 0 0 34.988281 14.988281 z"/>
                </svg>
              </div>
              <div>
                <div className="text-sm text-gray-400">
                  <p>Order #{orderNumber}</p>
                </div>
                <div className="font-bold text-lg">
                  <h4>Thank you {shippingFirstName}!</h4>
                </div>
              </div>
            </div>
            <div id="confirmationContainer"
                 className="flex flex-col">
              <div className="xl:pt-3 lg:pt-3 md:pt-3 sm:pt-6 xs:pt-6 pb-3">
                <div className="border rounded border-solid border-foreground p-4">
                  <h3 className="text-lg font-bold pb-1">Your order is confirmed</h3>
                  <p className="text-sm">We&apos;ve accepted your order and we&apos;re getting it ready. A confirmation
                    email
                    has been sent to
                    <span className="font-bold"> {email}</span> Come back to this page for updates on your order
                    status.
                  </p>
                </div>
              </div>
            </div>
            <article id="customerInformationContainer"
                 className="pt-3">
              <div
                className="mx-auto flex w-full flex-col border rounded border-solid p-4 border-foreground">
                <div id="contactWrapper"
                     className="">
                  <div id="contactTopSection">

                    <div className="pb-4">
                      <div className="flex flex-row items-center justify-between">
                        <h2 className="flex text-xl font-bold">Customer Information</h2>
                      </div>
                    </div>
                    {/*TODO*/}
                    <div id="customerInformationLists">
                      <div id="addressLists"
                           className="flex flex-col"
                      >
                        <div className="flex flex-row">
                          <h4 className="flex w-1/2 pr-10 font-bold">Shipping Address</h4>
                          <h4 className="flex w-1/2 pr-10 font-bold">Billing Address</h4>
                        </div>
                        <div className="">
                          <ul className="flex flex-col gap-1 text-gray-400 text-sm pt-2">
                            <div className="flex">
                              <li className="flex w-1/2 pr-10" id="shippingFullName">
                                {shippingFirstName} {shippingLastName}
                              </li>
                              <li className="flex w-1/2 pr-10" id="billingFullName">
                                {billingFirstName} {billingLastName}
                              </li>
                            </div>
                            <div className="flex">
                              <li className="flex w-1/2 pr-10" id="shippingCompanyName">{shippingCompanyName}</li>
                              <li className="flex w-1/2 pr-10" id="billingCompanyName">{billingCompanyName}</li>
                            </div>
                            <div className="flex">
                              <li className="flex w-1/2 pr-10"
                                  id="shippingAddressLineOne">{shippingAddressLineOne}</li>
                              <li className="flex w-1/2 pr-10"
                                  id="billingAddressLineOne">{billingAddressLineOne}</li>
                            </div>
                            <div className="flex">
                              <li className="flex w-1/2 pr-10"
                                  id="shippingAddressLineTwo">{shippingAddressLineTwo}</li>
                              <li className="flex w-1/2 pr-10"
                                  id="billingAddressLineTwo">{billingAddressLineTwo}</li>
                            </div>
                            <div className="flex">
                              <li className="flex w-1/2 pr-10"
                                  id="shippingCityStateZipCode">{shippingCity} {shippingState} {shippingZipcode}</li>
                              <li className="flex w-1/2 pr-10"
                                  id="billingCityStateZipcode">{billingCity} {billingState} {billingZipcode}</li>
                            </div>
                            <div className="flex">
                              <li className="flex w-1/2 pr-10" id="shippingCountry">{shippingCountry}</li>
                              <li className="flex w-1/2 pr-10" id="billingCountry">{billingCountry}</li>
                            </div>
                            <div className="flex">
                              <li className="flex w-1/2 pr-10" id="shippingPhone">{shippingPhone}</li>
                              <li className="flex w-1/2 pr-10" id="billingPhone">{billingPhone}</li>
                            </div>
                          </ul>
                        </div>
                      </div>

                      <div id="methodLists"
                           className="flex"
                      >
                        <div className="w-1/2 pt-4">
                          <h4 className="font-bold">Shipping method</h4>
                          <ul className="flex flex-col gap-1 text-gray-400 text-sm pt-2">
                            <li>Standard Delivery</li>
                            <li className="pt-1">5-14 business days</li>
                          </ul>
                        </div>
                        <div className="w-1/2 pt-4">
                          <h4 className="font-bold">Payment method</h4>
                          <ul className="flex flex-col gap-1 text-gray-400 text-sm pt-2">
                            <li className="flex items-center">
                              <div id="visa">
                                <div className="bg-white rounded border-2 border-solid border-black">
                                  <svg
                                    className={`cursor-default w-full h-full block`}
                                    width="2.5em" height="1.5em"
                                    transform="scale(.75)"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 83">
                                    <defs>
                                      <linearGradient id="logosVisa0" x1="45.974%" x2="54.877%" y1="-2.006%" y2="100%">
                                        <stop offset="0%" stop-color="#222357"/>
                                        <stop offset="100%" stop-color="#254AA5"/>
                                      </linearGradient>
                                    </defs>
                                    <path fill="url(#logosVisa0)"
                                          d="M132.397 56.24c-.146-11.516 10.263-17.942 18.104-21.763c8.056-3.92 10.762-6.434 10.73-9.94c-.06-5.365-6.426-7.733-12.383-7.825c-10.393-.161-16.436 2.806-21.24 5.05l-3.744-17.519c4.82-2.221 13.745-4.158 23-4.243c21.725 0 35.938 10.724 36.015 27.351c.085 21.102-29.188 22.27-28.988 31.702c.069 2.86 2.798 5.912 8.778 6.688c2.96.392 11.131.692 20.395-3.574l3.636 16.95c-4.982 1.814-11.385 3.551-19.357 3.551c-20.448 0-34.83-10.87-34.946-26.428m89.241 24.968c-3.967 0-7.31-2.314-8.802-5.865L181.803 1.245h21.709l4.32 11.939h26.528l2.506-11.939H256l-16.697 79.963h-17.665m3.037-21.601l6.265-30.027h-17.158l10.893 30.027m-118.599 21.6L88.964 1.246h20.687l17.104 79.963h-20.679m-30.603 0L53.941 26.782l-8.71 46.277c-1.022 5.166-5.058 8.149-9.54 8.149H.493L0 78.886c7.226-1.568 15.436-4.097 20.41-6.803c3.044-1.653 3.912-3.098 4.912-7.026L41.819 1.245H63.68l33.516 79.963H75.473"
                                          transform="matrix(1 0 0 -1 0 82.668)"/>
                                  </svg>
                                </div>
                                </div>&nbsp;
                                ending with {cardNumber} --</li>
                            <li>$129.46</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
            <nav id="lowerContainer" className="xl:pb-14 lg:pb-14 md:pb-14 sm:pb-10 xs:pb-10 ">
              <div className="xl:pt-10 lg:pt-10 md:pt-10 sm:pt-10 xs:pt-6">
                <div className="flex justify-between xs:flex-col-reverse">
                  <div id="contactContainer"
                       className="flex justify-start contents-center items-center xs:justify-center xs:pt-4">
                    <div className="flex items-center">
                      <div id="questionMarkIcon"
                           className="pr-1">
                        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                             width="32px" height="32px" viewBox="0 0 752.000000 752.000000"
                             preserveAspectRatio="xMidYMid meet">
                          <g transform="translate(0.000000,752.000000) scale(0.100000,-0.100000)"
                             fill="#d2cfca2b" stroke="none">
                            <path d="M3531 5919 c-230 -24 -489 -98 -701 -200 -230 -111 -402 -231 -583
                      -408 -194 -189 -313 -354 -433 -596 -361 -734 -282 -1587 210 -2255 81 -110
                       258 -296 366 -383 652 -527 1552 -635 2299 -276 235 113 400 228 584 408 194
                       190 314 354 432 596 300 611 300 1302 0 1910 -120 244 -238 407 -432 596 -462
                       452 -1101 675 -1742 608z m434 -803 c216 -58 424 -235 515 -440 51 -116 64
                       -180 64 -321 0 -153 -14 -217 -79 -350 -75 -155 -195 -275 -360 -361 -123 -64
                       -137 -86 -145 -230 -8 -120 -27 -165 -89 -209 -37 -26 -51 -30 -111 -30 -60 0
                       -74 4 -111 30 -70 49 -84 89 -84 230 1 128 15 197 60 285 56 111 166 213 290
                       269 85 39 158 108 197 189 31 62 33 73 33 172 0 94 -3 111 -28 166 -17 36 -50
                       82 -80 112 -160 157 -394 157 -554 0 -65 -65 -102 -145 -115 -252 -10 -83 -32
                       -138 -64 -167 -54 -48 -144 -64 -209 -39 -72 27 -125 110 -124 195 0 73 23
                       190 53 269 92 243 312 432 570 491 79 18 289 13 371 -9z m-115 -2366 c139 -71
                       140 -274 1 -347 -185 -97 -372 128 -245 295 54 70 163 93 244 52z"/>
                          </g>
                        </svg>
                      </div>
                      <div className="pr-2 text-gray-400 text-sm">Need help?</div>
                      <div className="cursor-pointer text-link-blue">Contact us</div>
                    </div>
                  </div>
                  <div id="browsingButtonContainer"
                          className="flex justify-end xs:justify-center">
                    <a href="/"
                       className="border-2 bg-shopify-blue font-bold rounded p-4 border-solid border-transparent hover:border-solid hover:border-foreground hover:bg-transparent"
                    >
                      {/*TODO: Continue browsing should fully clear cart*/}
                      CONTINUE BROWSING
                    </a>
                  </div>
                </div>
              </div>
            </nav>

          </div>

          <div id="rightContentWrapper"
               className="relative flex flex-col pt-1 xs:w-full sm:w-full md:w-39% lg:w-39%">
            <header id="checkoutTitle"
                 className="pt-1 xs:block sm:block md:hidden lg:hidden">
              <div className="flex pb-1">
                <h1 className="py-3 text-3xl">
                  <a href="/">Xandria</a>
                </h1>
              </div>

              <div id="orderSummaryBanner"
                   className={`relative z-10 flex py-4 text-sm font-medium justify-between items-center before:content-[''] before:absolute before:top-0 before:bottom-0 before:bg-translucent before:border-y before:border-foreground before:left-[calc(50%-50vw)] before:right-[calc(50%-50vw)] before:-z-10`}>
                <div id="orderSummaryLabel">
                  <button className={styles.orderSummaryButton}
                          onClick={toggleOrderSummary}>
                    <div className="fill-foreground pr-2">
                      <svg width="20" height="19" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M17.178 13.088H5.453c-.454 0-.91-.364-.91-.818L3.727 1.818H0V0h4.544c.455 0 .91.364.91.818l.09 1.272h13.45c.274 0 .547.09.73.364.18.182.27.454.18.727l-1.817 9.18c-.09.455-.455.728-.91.728zM6.27 11.27h10.09l1.454-7.362H5.634l.637 7.362zm.092 7.715c1.004 0 1.818-.813 1.818-1.817s-.814-1.818-1.818-1.818-1.818.814-1.818 1.818.814 1.817 1.818 1.817zm9.18 0c1.004 0 1.817-.813 1.817-1.817s-.814-1.818-1.818-1.818-1.818.814-1.818 1.818.814 1.817 1.818 1.817z"></path>
                      </svg>
                    </div>
                    <div className={`${styles.orderSummaryText} ${!isOrderSummaryHidden ? 'hidden' : 'flex'}`}>
                      <p>Show Order Summary</p>
                    </div>
                    <div className={`${styles.orderSummaryText} ${isOrderSummaryHidden ? 'hidden' : 'flex'}`}>
                      <p>Hide Order Summary</p>
                    </div>
                    <div id="summaryArrowButton"
                         className={`${styles.summaryArrowIcon} ${isOrderSummaryHidden ? 'hidden' : 'flex'} fill-foreground px-2`}>
                      <svg width="11" height="7" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M6.138.876L5.642.438l-.496.438L.504 4.972l.992 1.124L6.138 2l-.496.436 3.862 3.408.992-1.122L6.138.876z"></path>
                      </svg>
                    </div>
                    <div id="summaryArrowButton"
                         className={`${styles.summaryArrowIcon} ${!isOrderSummaryHidden ? 'hidden' : 'flex'} fill-foreground px-2`}>
                      <svg className="rotate-180" width="11" height="7" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M6.138.876L5.642.438l-.496.438L.504 4.972l.992 1.124L6.138 2l-.496.436 3.862 3.408.992-1.122L6.138.876z"></path>
                      </svg>
                    </div>
                  </button>
                </div>
                <div id="summaryBannerLeftSection"
                     className="font-bold text-lg">
                  <span className="pl-4">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </header>
            <aside id="borderSummary"
                 className={`${styles.borderSummary} ${isOrderSummaryHidden ? '' : styles.expanded} pr-4 `}>
              <div className="pt-6"></div>
              <div
                className={`${styles.scrollBar} ${styles.scrollBarContent} max-h-610px overflow-x-hidden overflow-y-auto pr-4`}>
                {/* right padding is for space between scroll bar && content */}
                <article id="cartItems">
                  {cartItems.map((item, index) => (
                    <div key={index} className="select-none pointer-events-none">
                      <div className="mx-auto flex w-full justify-between">
                        {/* Map over the cart items and display them */}
                        <div className="cart-item w-full flex h-full items-center flex-start">
                          <div className="inline-flex pr-3 w-20 h-24">
                            <img className={styles.unselectable} src={item.imageUrl} alt={item.bookTitle}
                                 draggable="false"/>
                          </div>
                          <div id="itemDetailsLeftSide"
                               className="flex h-full flex-col justify-center text-sm w-full">
                            <div className="pr-8 font-bold">{item.bookTitle}</div>
                            <div className="pr-8 text-gray-400">{item.bookAuthors}</div>
                            <div className="flex justify-between w-full">
                              <div className="flex text-gray-400">{item.bookType}</div>
                              <div className="flex">${item.qtyPrice.toFixed(2)}</div>
                            </div>
                            <div className="flex text-gray-400 pr-8">Qty: {item.qty}</div>
                          </div>
                        </div>
                      </div>
                      <div id="cartItemBorderGap" className="py-6 pb-6">
                        <div className="border-b border-solid border-foreground"></div>
                      </div>
                    </div>
                  ))}
                </article>

                <div className={`flex flex-col border-solid border-foreground`}>
                  <div className="flex justify-between pb-4">
                    <div className="inline-flex text-sm font-bold flex-start">Subtotal</div>
                    <div className="inline-flex text-sm flex-end font-bold">
                      ${totalPrice.toFixed(2)}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="inline-flex text-sm font-bold flex-start">Shipping</div>
                    <div className="inline-flex text-xs font-medium flex-end">Free</div>
                  </div>
                  <div className="py-6">
                    <div className={`border-foreground border-t border-solid`}></div>
                  </div>
                  <div className={`flex justify-between`}>
                    <div className={` flex`}>
                      <div className="text-lg font-medium">Total</div>
                    </div>
                    <div className="flex items-center">
                      <div ref={bottomRef}
                           className={`${styles.smoothScroll}
                     inline-flex text-2xl font-bold`}>
                        ${totalPrice.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className="py-1"></div>
                  <div className="relative flex justify-end items-center">
                    <div className="xs:hidden sm:hidden">
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>

        </div>

        <article id="bottomContainer"
             className="flex flex-col w-full mx-auto xl:px-6 sm:px-0 xs:max-w-532px sm:max-w-532px md:w-full lg:w-1120px">
          <div
            className={`${styles.featureSimilar} flex w-full`}>
            <h2 className={`${styles.similarText} text-xl`}>RECOMMENDED BOOKS</h2>
            <div className={`${styles.similarContainer} border-y border-solid border-foreground`}>
              <div className={`${styles.similarBooks} `}>

                {books.map((book, index) => (
                  <div key={index} className={`${styles.bookBlock} min-w-20 w-full h-full`}>
                    <div id="bookImg"
                      className="flex justify-center xs:w-16 sm:w-24 md:w-44 lg:w-44 xl:w-44 mx-auto object-fit">
                      <div className="flex-grow bg-white"></div>
                      {/* Left white fill */}
                      <img
                        className={`${styles.responsiveImage}`}
                        src={`/${book.cell_name}.jpg`}
                        alt={`${book.book_title} ${book.cell_name}`}
                        // width="115"
                        // height="115"
                      />
                      <div className="flex-grow bg-white"></div>
                      {/* Right white fill */}
                    </div>
                    <div id="bookInfo"
                         className="xs:w-16 sm:w-24 w-44 h-full flex flex-col mx-auto justify-between">
                      <div className="flex flex-col">
                        <div
                          className={` ${styles.textFlowFour} pt-3 text-xs font-extrabold h-fit max-h-20 `}>{book.book_title}</div>
                        <div
                          className={` ${styles.textFlowTwo} max-h-8 text-xs text-gray-400`}>{book.book_authors}</div>
                      </div>
                      <div>
                        <div
                          className="font-black py-2 text-xs flex items-center justify-center">${book.book_price}</div>

                        <div id="bookButtons"
                             className="flex flex-col justify-end">
                          <div className="flex w-40 xs:w-12 sm:w-20 mx-auto justify-evenly items-end">
                            <div>
                              <button
                                id="bookHeart"
                                className={`${styles.similarHeart} `}
                                onClick={() => handleBookHeartClick(book.book_title)} // Call the click handler here
                              >
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
                                    className={`${bookHearts[book.book_title] ? 'fill-custom-red' : 'fill-greyed-out'}`} // Set class based on the bookHearts state
                                    // fill="#d2cfca2b"
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
                              </button>
                            </div>
                            <div>
                              <button
                                onClick={(e) => handleBuyNow(e, book)}
                                className={`${styles.similarBag} `}>
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
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </div>
          <footer id="checkoutFooter"
               className="bottom-0 flex justify-center w-full py-3 text-xs font-bold text-gray-500 ">
            <div className="pr-4 cursor-pointer">Refund Policy</div>
            <div className="pr-4 cursor-pointer">Privacy Policy</div>
            <div className="pr-4 cursor-pointer">Terms of Service</div>
          </footer>
        </article>
      </div>
    );
  }


};

export default ConfirmPageContent;
