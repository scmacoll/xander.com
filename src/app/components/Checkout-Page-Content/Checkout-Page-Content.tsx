"use client";
import styles from './Checkout-Page-Content.module.scss';
import ExpiredPage from "@/app/components/Expired-Page/Expired-Page";
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { TileCard } from '../Home-Content/Content';
import { Country, State, City } from 'country-state-city';
import { useCart } from "@/app/context/CartContext";
import { useConfirmedOrder } from "@/app/context/ConfirmedOrderContext";
import { useRouter } from 'next/navigation';
import Link from "next/link";


interface CardProps {
  card: TileCard
}


const CheckoutPageContent: React.FC<CardProps> = ({card}) => {
  const cartData = localStorage.getItem('cart');
  console.log("Cart stored in local storage: ", cartData ? JSON.parse(cartData) : 'No cart data');
  const { cartItems, totalPrice, totalQty, cartId, orderNumber, addToCart, removeFromCart, clearCart } = useCart();
  console.log("Cart Items:", cartItems);
  console.log("total Qty: ", totalQty);
  const { orderCompleted, setOrderCompleted } = useConfirmedOrder();
  console.log("is order completed?: ", orderCompleted);
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  console.log("is session expired?: ", isSessionExpired);
  const [is404Error, setIs404Error] = useState(false);
  const router = useRouter();
  const [hasPageLoaded, setHasPageLoaded] = useState(false);
  const currentUrl = window.location.pathname;

  useEffect(() => {
    setTimeout(() => {
      setHasPageLoaded(true);
    },10)
  }, []);
  useEffect(() => {
    if (totalQty === 0 || cartData === null || cartData === undefined || currentUrl === '/checkout')
    {
      setIs404Error(true);
    }
  }, []);


  const [isFocused, setIsFocused] = useState({
    cardNumber: false,
    cardName: false,
    cardExpiry: false,
    cardCode: false,
    firstName: false,
    lastName: false,
    companyName: false,
    addressLineOne: false,
    addressLineTwo: false,
    city: false,
    state: false,
    zipcode: false,
    phone: false,
  });
  const [hasText, setHasText] = useState({
    cardNumber: false,
    cardName: false,
    cardExpiry: false,
    cardCode: false,
    firstName: false,
    lastName: false,
    companyName: false,
    addressLineOne: false,
    addressLineTwo: false,
    city: false,
    state: false,
    zipcode: false,
    phone: false,
  });
  const [shippingDetails, setShippingDetails] = useState({
    country: 'AU',
    firstName: '',
    lastName: '',
    companyName: '',
    addressLineOne: '',
    addressLineTwo: '',
    city: '',
    state: 'NSW',
    zipcode: '',
    phone: '',
    firstNameError: false,
    lastNameError: false,
    addressLineOneError: false,
    cityError: false,
    zipcodeError: false,
    phoneError: false
  });
  const [isShippingValid, setIsShippingValid] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [countries, setCountries] = useState([]);
  const [shippingStates, setShippingStates] = useState([]);
  const [discountCode, setDiscountCode] = useState('');
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reviewButtonClicked, setReviewButtonClicked] = useState(false);
  const [displayIncompleteMessage, setDisplayIncompleteMessage] = useState(false);
  const [shippingError, setShippingError] = useState(false);
  const [displayInvalidCodeMessage, setDisplayInvalidCodeMessage] = useState(false);
  const [isClearCartWindowOpen, setIsClearCartWindowOpen] = React.useState(false);
  const clearCartWindowRef = useRef<null | HTMLDivElement>(null);
  const bottomRef = useRef<null | HTMLDivElement>(null);
  const [isOrderSummaryHidden, setOrderSummaryHidden] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleEmailChange = (event: any) => {
    const {value} = event.target;
    setEmail(value);
  };
  const handleEmailBlur = () => {
    if (emailRegex.test(email)) {
      setEmailError('');
    } else if (email.length === 0) {
      setEmailError('');
    } else {
      setEmailError('Invalid email address');
    }
    setReviewButtonClicked(false);
  };

  const handleCountryChange = (eventOrValue?: React.ChangeEvent<HTMLSelectElement> | string) => {
    const newCountry = typeof eventOrValue === 'string' ? eventOrValue : eventOrValue?.target.value || 'Australia';
    setShippingDetails(prevDetails => ({
      ...prevDetails,
      country: newCountry,
    }));
  };
  const handleStateChange = (eventOrValue?: React.ChangeEvent<HTMLSelectElement> | string) => {
    const newState = typeof eventOrValue === 'string' ? eventOrValue : eventOrValue?.target.value || 'NSW';
    setShippingDetails(prevDetails => ({
      ...prevDetails,
      state: newState,
    }));
  };

  const handleFirstNameChange = (event?: React.ChangeEvent<HTMLInputElement>) => {
    let newFirstName = event ? event.target.value : '';
    newFirstName = newFirstName.substring(0, 30);

    setShippingDetails(prevDetails => ({
      ...prevDetails,
      firstName: newFirstName,
      firstNameError: newFirstName.trim() === '' && newFirstName.length > 0
    }));
    setHasText(prevDetails => ({
      ...prevDetails,
      firstName: newFirstName.length > 0
    }));
  };
  const handleFirstNameFocused = () => {
    setIsFocused(prevState => ({
      ...prevState,
      firstName: true
    }));
  };
  const handleFirstNameBlur = (userClickOrEvent: any) => {
    const wasReviewButtonClicked = typeof userClickOrEvent === 'boolean' ? userClickOrEvent : false;
    const shouldValidate = wasReviewButtonClicked || reviewButtonClicked;

    if (shouldValidate) {
      const commonUpdate: any = (prevDetails: {
        firstName: string;
      }) => ({
        ...prevDetails,
        firstNameError: prevDetails.firstName.trim() === ''
      });
      // setShippingDetails(commonUpdate);
      setShippingDetails(commonUpdate);
    } else {
      setShippingDetails(prevDetails => ({
        ...prevDetails,
        firstNameError: prevDetails.firstName.trim() === ' '
      }));
    }
    setIsFocused(prevDetails => ({
      ...prevDetails,
      firstName: false
    }));
    setReviewButtonClicked(false);
  };

  const handleLastNameChange = (event?: React.ChangeEvent<HTMLInputElement>) => {
    let newLastName = event ? event.target.value : '';
    newLastName = newLastName.substring(0, 30);

    setShippingDetails(prevDetails => ({
      ...prevDetails,
      lastName: newLastName,
      lastNameError: newLastName.trim() === ''
    }));
    setHasText(prevDetails => ({
      ...prevDetails,
      lastName: newLastName.length > 0
    }));
  }
  const handleLastNameBlur = (userClickOrEvent: any) => {
    const wasReviewButtonClicked = typeof userClickOrEvent === 'boolean' ? userClickOrEvent : false;
    const shouldValidate = wasReviewButtonClicked || reviewButtonClicked;

    if (shouldValidate) {
      const commonUpdate: any = (prevDetails: {
        lastName: string;
      }) => ({
        ...prevDetails,
        lastNameError: prevDetails.lastName.trim() === ''
      });
      // setShippingDetails(commonUpdate);
      setShippingDetails(commonUpdate);
    } else {
      setShippingDetails(prevDetails => ({
        ...prevDetails,
        lastNameError: prevDetails.lastName.trim() === ' '
      }));
    }
    setIsFocused(prevDetails => ({
      ...prevDetails,
      lastName: false
    }));
    setReviewButtonClicked(false);
  }
  const handleLastNameFocused = () => {
    setIsFocused(prevState => ({
      ...prevState,
      lastName: true
    }));
  }

  const handleCompanyNameChange = (event?: React.ChangeEvent<HTMLInputElement>) => {
    let newCompanyName = event ? event.target.value : '';
    newCompanyName = newCompanyName.substring(0, 60);

    setShippingDetails(prevDetails => ({
      ...prevDetails,
      companyName: newCompanyName,
    }));
    setHasText(prevDetails => ({
      ...prevDetails,
      companyName: newCompanyName.length > 0
    }));
  };
  const handleCompanyNameBlur = (userClickOrEvent: any) => {
    setIsFocused(prevDetails => ({
      ...prevDetails,
      companyName: false
    }));
    setReviewButtonClicked(false);
  }
  const handleCompanyNameFocused = () => {
    setIsFocused(prevState => ({
      ...prevState,
      companyName: true
    }));
  };

  const handleAddressLineOneChange = (event?: React.ChangeEvent<HTMLInputElement>) => {
    let newAddressLineOne = event ? event.target.value : '';
    newAddressLineOne = newAddressLineOne.substring(0, 60);
    setShippingDetails(prevDetails => ({
      ...prevDetails,
      addressLineOne: newAddressLineOne,
      addressLineOneError: newAddressLineOne.trim() === ''
    }));
    setHasText(prevDetails => ({
      ...prevDetails,
      addressLineOne: newAddressLineOne.length > 0
    }));
  };
  const handleAddressLineOneBlur = (userClickOrEvent: any) => {
    const wasReviewButtonClicked = typeof userClickOrEvent === 'boolean' ? userClickOrEvent : false;
    const shouldValidate = wasReviewButtonClicked || reviewButtonClicked;

    if (shouldValidate) {
      const commonUpdate: any = (prevDetails: {
        addressLineOne: string;
      }) => ({
        ...prevDetails,
        addressLineOneError: prevDetails.addressLineOne.trim() === ''
      });
      // setShippingDetails(commonUpdate);
      setShippingDetails(commonUpdate);
    } else {
      setShippingDetails(prevDetails => ({
        ...prevDetails,
        addressLineOneError: prevDetails.addressLineOne.trim() === ' '
      }));
    }
    setIsFocused(prevDetails => ({
      ...prevDetails,
      addressLineOne: false
    }));
    setReviewButtonClicked(false);
  };
  const handleAddressLineOneFocused = () => {
    setIsFocused(prevState => ({
      ...prevState,
      addressLineOne: true
    }));
  };
  const handleAddressLineTwoChange = (event?: React.ChangeEvent<HTMLInputElement>) => {
    let newAddressLineTwo = event ? event.target.value : '';
    newAddressLineTwo = newAddressLineTwo.substring(0, 60);

    setShippingDetails(prevDetails => ({
      ...prevDetails,
      addressLineTwo: newAddressLineTwo,
      addressLineTwoError: prevDetails.addressLineTwo.trim() === ''
    }));
  };
  const handleAddressLineTwoBlur = () => {
    setIsFocused(prevDetails => ({
      ...prevDetails,
      addressLineTwo: false
    }));
    setReviewButtonClicked(false);
  };

  const handleAddressLineTwoFocused = () => {
    setIsFocused(prevState => ({
      ...prevState,
      addressLineTwo: true
    }));
  };

  const phoneRegex = /^[\d\s()]*$/;  // Allow digits, spaces, and brackets
  const handlePhoneChange = (event?: React.ChangeEvent<HTMLInputElement>) => {
    let newPhone = event ? event.target.value : '';
    newPhone = newPhone.replace(/[^\d\s()]/g, '');
    newPhone = newPhone.substring(0, 15);

    setShippingDetails(prevDetails => ({
      ...prevDetails,
      phone: newPhone,
      phoneError: prevDetails.phone.trim() !== '' && !phoneRegex.test(prevDetails.phone)
    }));
    setHasText(prevDetails => ({
      ...prevDetails,
      phone: newPhone.length > 0
    }));
  };
  const handlePhoneBlur = (userClickOrEvent: any) => {
    const wasReviewButtonClicked = typeof userClickOrEvent === 'boolean' ? userClickOrEvent : false;
    const shouldValidate = wasReviewButtonClicked || reviewButtonClicked;

    if (shouldValidate) {
      const commonUpdate: any = (prevDetails: {
        phone: string;
      }) => ({
        ...prevDetails,
        phoneError: prevDetails.phone.trim() !== '' && !phoneRegex.test(prevDetails.phone)
      });
      // setShippingDetails(commonUpdate);
      setShippingDetails(commonUpdate);
    } else {
      setShippingDetails(prevDetails => ({
        ...prevDetails,
        phoneError: prevDetails.phone.trim() !== '' && !phoneRegex.test(prevDetails.phone)
      }));
    }
    setIsFocused(prevDetails => ({
      ...prevDetails,
      phone: false
    }));
    setReviewButtonClicked(false);
  };
  const handlePhoneFocused = () => {
    setIsFocused(prevState => ({
      ...prevState,
      phone: true
    }));
  };

  const handleCityChange = (event?: React.ChangeEvent<HTMLInputElement>) => {
    let newCityChange = event ? event.target.value : '';
    newCityChange = newCityChange.substring(0, 30);

    setShippingDetails(prevDetails => ({
      ...prevDetails,
      city: newCityChange,
      cityError: newCityChange.trim() === ''
    }));
    setHasText(prevDetails => ({
      ...prevDetails,
      city: newCityChange.length > 0
    }));
  }
  const handleCityFocused = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFocused(prevState => ({
      ...prevState,
      city: true
    }));
  };
  const handleCityBlur = (userClickOrEvent: any) => {
    const wasReviewButtonClicked = typeof userClickOrEvent === 'boolean' ? userClickOrEvent : false;
    const shouldValidate = wasReviewButtonClicked || reviewButtonClicked;

    if (shouldValidate) {
      const commonUpdate: any = (prevDetails: {
        city: string;
      }) => ({
        ...prevDetails,
        cityError: prevDetails.city.trim() === ''
      });
      // setShippingDetails(commonUpdate);
      setShippingDetails(commonUpdate);
    } else {
      setShippingDetails(prevDetails => ({
        ...prevDetails,
        cityError: prevDetails.city.trim() === ' '
      }));
    }
    setIsFocused(prevDetails => ({
      ...prevDetails,
      city: false
    }))
    setReviewButtonClicked(false);
  };

  const handleZipcodeFocused = () => {
    setIsFocused(prevState => ({
      ...prevState,
      zipcode: true
    }));
  };
  const handleZipcodeChange = (event?: React.ChangeEvent<HTMLInputElement>) => {
    let newZipcode = event ? event.target.value : '';
    // Allow digits, letters, spaces, and hyphens
    newZipcode = newZipcode.replace(/[^\d\w\s-]/g, '');
    newZipcode = newZipcode.substring(0, 10);

    setShippingDetails(prevDetails => ({
      ...prevDetails,
      zipcode: newZipcode,
      zipcodeError: newZipcode.trim() === ''
    }));
    setHasText(prevDetails => ({
      ...prevDetails,
      zipcode: newZipcode.length > 0
    }));
  }
  const handleZipcodeBlur = (userClickOrEvent: any) => {
    const wasReviewButtonClicked = typeof userClickOrEvent === 'boolean' ? userClickOrEvent : false;
    const shouldValidate = wasReviewButtonClicked || reviewButtonClicked;

    if (shouldValidate) {
      const commonUpdate: any = (prevDetails: {
        zipcode: string;
      }) => ({
        ...prevDetails,
        zipcodeError: prevDetails.zipcode.trim() === ''
      });
      // setShippingDetails(commonUpdate);
      setShippingDetails(commonUpdate);
    } else {
      setShippingDetails(prevDetails => ({
        ...prevDetails,
        zipcodeError: prevDetails.zipcode.trim() === ' '
      }));
    }
    setIsFocused(prevDetails => ({
      ...prevDetails,
      zipcode: false
    }));
    setReviewButtonClicked(false);
  };


  const handleDiscountCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCode = event.target.value;
    setDiscountCode(newCode);
    setIsCodeValid(newCode.trim().length !== 0);
    setDisplayInvalidCodeMessage(false);
  }

  const toggleOrderSummary = useCallback(() => {
    setOrderSummaryHidden(prevState => !prevState);
  }, []);
  const handleApplyButtonClick = () => {
    setIsLoading(true); // Start loading
    setDisplayInvalidCodeMessage(false); // Hide any previous invalid code messages
    // Simulate a loading/spinner for 3 seconds
    setTimeout(() => {
      setIsLoading(false); // Stop loading after 3 seconds
      setDisplayInvalidCodeMessage(true); // Display invalid code message
    }, 2000);
  };
  const showFirstNameLabel = isFocused.firstName || hasText.firstName;
  const showLastNameLabel = isFocused.lastName || hasText.lastName;
  const showCompanyNameLabel = isFocused.companyName || hasText.companyName;
  const showAddressLineOneLabel = isFocused.addressLineOne || hasText.addressLineOne;
  const showAddressLineTwoLabel = isFocused.addressLineTwo || hasText.addressLineTwo;
  const showCityLabel = isFocused.city || hasText.city;
  const showZipcodeLabel = isFocused.zipcode || hasText.zipcode;
  const showPhoneLabel = isFocused.phone || hasText.phone;
  const saveToLocalStorage = () => {
    localStorage.setItem('email', email);
    localStorage.setItem('shippingFirstName', shippingDetails.firstName);
    localStorage.setItem('shippingLastName', shippingDetails.lastName);
    localStorage.setItem('shippingCompanyName', shippingDetails.companyName);
    localStorage.setItem('shippingAddressLineOne', shippingDetails.addressLineOne);
    localStorage.setItem('shippingAddressLineTwo', shippingDetails.addressLineTwo);
    localStorage.setItem('shippingCity', shippingDetails.city);
    localStorage.setItem('shippingState', shippingDetails.state);
    localStorage.setItem('shippingCountry', shippingDetails.country);
    localStorage.setItem('shippingZipcode', shippingDetails.zipcode);
    localStorage.setItem('shippingPhone', shippingDetails.phone);
  }
  const handleReviewButtonClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setReviewButtonClicked(true);

    if (isShippingValid) {
      // updateContactDetails(shippingDetails.firstName)
      saveToLocalStorage();
      setTimeout(() => {
        setOrderSummaryHidden(false);
      }, 2000);
    } else {
      handleEmailBlur();
      handleFirstNameBlur(true);
      handleLastNameBlur(true);
      handleAddressLineOneBlur(true);
      handleCityBlur(true);
      handleZipcodeBlur(true);
      setDisplayIncompleteMessage(true);
      setShippingError(true);
    }
  };
  const handleSaveToLocalStorage = (event: React.MouseEvent) => {
    setReviewButtonClicked(true);
    saveToLocalStorage();
  };

  const handleOpenClearCartWindow = () => {
    setIsClearCartWindowOpen(true);
  };
  const handleCloseClearCartWindow = () => {
    setIsClearCartWindowOpen(false);
  };
  const handleNavigateHome = () => {
    window.location.href = '/';
    handleCloseClearCartWindow();
    localStorage.setItem('cart', JSON.stringify({ items: [], totalPrice: 0, totalQty: 0, cartId: null }));
    // // @ts-ignore
    // clearCart();
  }

  const handleIncreaseQty = (itemTitle: string) => {
    const itemToUpdate = cartItems.find(item => item.bookTitle === itemTitle);
    if (itemToUpdate) {
      // Create a new CartItem with qty set to 1
      const updatedItem = { ...itemToUpdate, qty: 1 };
      addToCart(updatedItem); // Call addToCart with the updated item
    }
  };

  const handleDecreaseQty = (itemTitle: string | any) => {
    const itemToUpdate = cartItems.find(item => item.bookTitle === itemTitle);
    if (itemToUpdate) {
      if (itemToUpdate.qty > 1) {
        // Decrease the quantity by 1
        addToCart({ ...itemToUpdate, qty: -1 });
      } else {
        return;
      }
    }
  };

  const handleRemoveFromCart = (itemTitle: string | any) => {
    if (cartItems.length === 1) {
      handleOpenClearCartWindow()
    } else {
      removeFromCart(itemTitle);
    }
  };

  console.log("cart items length: ", cartItems.length);

  useEffect(() => {
    if (orderCompleted) {
      console.log("triggering order complete -> session expiry");
      setIsSessionExpired(true);
    }
  }, []);

  useEffect(() => {
    if ((totalQty === 0 || cartData === null || cartData === undefined)) {
      setIs404Error(true);
      // router.push('/404');
    }
  }, []);

  // useEffect(() => {
  //   if (isSessionExpired || is404Error) {
  //
  //   }
  // }, []);


  // if ((totalPrice === 0 || totalQty === 0 || cartItems.length === 0)) {
  //   return null; // or a small placeholder/loading component until the redirect kicks in
  // }

  useEffect(() => {
    if (!orderCompleted) {
      localStorage.removeItem('email');
      localStorage.removeItem('shippingFirstName');
      localStorage.removeItem('shippingLastName');
      localStorage.removeItem('shippingCompanyName');
      localStorage.removeItem('shippingAddressLineOne');
      localStorage.removeItem('shippingAddressLineTwo');
      localStorage.removeItem('shippingCity');
      localStorage.removeItem('shippingState');
      localStorage.removeItem('shippingCountry');
      localStorage.removeItem('shippingZipcode');
      localStorage.removeItem('shippingPhone');
    } else {
      return;
    }
  }, []);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    const handleOutsideClick = (event: MouseEvent) => {
      if (clearCartWindowRef.current && !clearCartWindowRef.current.contains(event.target as Node)) {
        console.log("mouse click trigger √");
        handleCloseClearCartWindow();
      }
    };

    if (isClearCartWindowOpen) {
      // Set a timeout for 1 second (1000 milliseconds)
      timerId = setTimeout(() => {
        document.addEventListener('mousedown', handleOutsideClick);
      }, 750);
    } else {
      // If the cart window is closed, immediately remove the event listener
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      // Cleanup: remove the event listener and clear the timeout
      document.removeEventListener('mousedown', handleOutsideClick);
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [isClearCartWindowOpen]);

  useEffect(() => {
    const handleResize = () => {
      handleCloseClearCartWindow()
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    // @ts-ignore
    setCountries(Country.getAllCountries());

    if (bottomRef.current) {
      bottomRef.current.scrollIntoView(false);
    }
  }, []);

  useEffect(() => {
    if (shippingDetails.country) {
      const newShippingStates = State.getStatesOfCountry(shippingDetails.country);
      // @ts-ignore
      setShippingStates(newShippingStates);
    }
  }, [shippingDetails.country]);

  useEffect(() => {
    const validateShippingDetails = (shipping: any) => {
      return (
        shipping.firstName.trim() !== '' &&
        shipping.lastName.trim() !== '' &&
        shipping.addressLineOne.trim() !== '' &&
        shipping.city.trim() !== '' &&
        shipping.zipcode.trim() !== '' &&
        emailRegex.test(email)
      );
    };

    const shippingIsValid = validateShippingDetails(shippingDetails);
    setIsShippingValid(shippingIsValid);

    // updating review btn errors in real-time
    if (shippingIsValid) {
      setDisplayIncompleteMessage(false);
      setShippingError(false);
      return;
    } else if (!shippingIsValid) {
      if (shippingIsValid) {
        setShippingError(false);
      }
    }
  }, [shippingDetails, email]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSessionExpired(true);
      setOrderCompleted(true);
    }, 450000); // 7.5 minutes = 450000 milliseconds

    return () => {
      clearTimeout(timer);
    };
  }, []);

  console.log("order number is : ", orderNumber);
  const storedEmail = localStorage.getItem('email');
  console.log('Email stored in local storage:', storedEmail);

  if (!hasPageLoaded) {
    return null;
  }
  // Returns
  if (isSessionExpired) {
    return <div><ExpiredPage/></div>
  } else if (is404Error) {
    router.push('/404');
  } else {
    return (
      <div className="mx-auto flex flex-col w-full overflow-x-hidden xs:px-4 sm:px-8 md:px-8 lg:px-0">
        <div id="pageContainer"
             className={`${styles.pageContainer}
           mx-auto flex lg:pt-12 md:pt-12 sm:pt-2 xs:pt-2 xs:max-w-532px xs:flex-col-reverse sm:w-532px sm:flex-col-reverse md:w-full md:flex-row md:justify-between lg:w-1120px lg:flex-row lg:justify-between`}
        >
          <div id="leftContentWrapper"
               className="flex flex-col sm:w-full md:w-51.5% lg:w-51.5%">
            <div id="checkoutTitle"
                 className="pt-1 pb-3 xs:hidden sm:hidden md:block lg:block">
              <div className="flex pb-1">
                <h1 className="py-3 text-3xl">
                  <a href="/">Xandria</a>
                </h1>
              </div>
            </div>
            <div className={`${isOrderSummaryHidden ? 'py-2' : ''} `}></div>
            <div id="checkoutExpressContainer"
                 className="flex flex-col pt-4 pb-6">
              <div
                id="checkoutExpressButtonsWrapper"
                className="relative flex flex-col justify-center rounded border border-solid pb-4 border-foreground"
              >
                <div
                  className="absolute top-0 right-0 left-0 z-10 mx-auto flex w-fit -translate-y-1/2 transform justify-center px-3 font-bold bg-background">
                  Express checkout
                </div>

                <div
                  id="checkoutExpressButtons"
                  className="mt-5 flex flex-row justify-around gap-3 p-1 px-4 xs:flex-col"
                >
                  <div id="shopPayButton"
                       className="inline-flex h-10 w-1/3  items-center justify-center rounded border-2 border-solid bg-shopify-blue border-shopify-blue xs:h-12 xs:w-full">
                    <svg
                      className={``}
                      version="1.0"
                      xmlns="http://www.w3.org/2000/svg"
                      width="85px"
                      height="16px"
                      transform="scale(3.5)"
                      viewBox="0 0 2030.000000 738.000000"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <g
                        transform="translate(0.000000,738.000000) scale(0.100000,-0.100000)"
                        fill="#ffffff"
                        stroke="none"
                      >
                        <path
                          d="M6495 4858 c-3 -7 -4 -425 -3 -928 l3 -915 175 0 175 0 5 435 c5 459
                      6 461 54 525 33 43 116 85 179 92 109 11 189 -36 229 -135 22 -55 23 -70 28
                      -487 l5 -430 170 0 170 0 0 485 0 485 -28 80 c-70 197 -202 310 -393 336 -146
                      19 -279 -25 -379 -125 l-55 -55 0 325 0 324 -165 0 c-123 0 -167 -3 -170 -12z"
                        />
                        <path
                          d="M11570 4854 c-64 -17 -148 -71 -185 -120 -14 -19 -38 -60 -53 -92
                      l-27 -57 0 -860 0 -860 23 -57 c32 -80 99 -150 180 -190 l67 -33 1585 0 1585
                      0 62 29 c76 35 144 104 181 184 l27 57 0 870 0 870 -26 55 c-32 69 -75 119
                      -137 159 -101 64 -11 61 -1697 60 -1309 0 -1538 -2 -1585 -15z m925 -412 c113
                      -42 204 -130 245 -239 61 -163 21 -354 -98 -465 -100 -94 -182 -118 -399 -118
                      l-153 0 -2 -177 -3 -178 -100 0 -100 0 -3 594 c-2 469 1 597 10 603 7 5 132 7
                      278 5 241 -3 270 -6 325 -25z m803 -362 c96 -13 165 -44 208 -93 59 -70 64
                      -105 64 -434 l0 -294 -92 3 c-91 3 -93 4 -96 28 -6 39 -19 46 -44 22 -52 -48
                      -116 -67 -228 -67 -95 0 -110 3 -163 29 -179 87 -178 338 2 427 71 36 141 49
                      300 56 l133 6 -4 49 c-9 86 -69 125 -183 116 -77 -7 -114 -24 -140 -65 l-20
                      -32 -92 -1 c-90 0 -93 1 -93 23 0 24 30 92 52 117 47 56 132 96 233 109 83 12
                      81 12 163 1z m623 -95 c15 -38 59 -153 99 -255 90 -236 101 -260 114 -260 6 0
                      56 132 111 293 l100 292 98 3 c86 2 97 1 97 -15 0 -19 -341 -905 -372 -967
                      -32 -62 -113 -141 -171 -166 -56 -25 -170 -37 -232 -26 l-36 7 3 87 3 87 65
                      -3 c86 -5 142 17 181 71 53 73 55 64 -121 500 -88 218 -160 404 -160 412 0 13
                      15 15 97 13 l96 -3 28 -70z"
                        />
                        <path
                          d="M12102 4282 c-9 -7 -12 -62 -10 -243 l3 -234 150 0 c135 0 154 2 191
                      22 86 46 130 132 122 238 -9 109 -65 181 -165 211 -50 15 -269 19 -291 6z"
                        />
                        <path
                          d="M13190 3610 c-97 -8 -143 -27 -165 -70 -51 -98 53 -171 200 -140 91
                      19 154 93 155 183 l0 37 -52 -1 c-29 -1 -91 -5 -138 -9z"
                        />
                        <path
                          d="M5620 4525 c-149 -33 -288 -135 -352 -258 -32 -60 -33 -66 -33 -182
                      0 -111 2 -124 27 -170 68 -128 189 -197 503 -285 167 -47 220 -72 241 -112 48
                      -94 -47 -174 -206 -172 -133 1 -230 54 -247 135 l-5 29 -180 0 c-141 0 -180
                      -3 -184 -14 -8 -22 25 -146 54 -200 57 -107 195 -211 332 -250 136 -39 319
                      -38 458 4 199 59 335 212 349 391 10 134 -27 240 -114 326 -73 72 -149 106
                      -370 162 -105 27 -206 57 -224 66 -83 43 -105 120 -51 175 55 54 211 64 294
                      17 34 -18 68 -67 68 -96 0 -13 356 -16 364 -3 8 14 -22 141 -44 187 -50 103
                      -157 187 -294 231 -102 33 -284 42 -386 19z"
                        />
                        <path
                          d="M8326 4524 c-44 -8 -116 -29 -160 -47 -104 -41 -246 -134 -246 -160
                      0 -24 121 -247 137 -254 7 -3 41 16 77 42 36 25 91 57 123 70 118 47 309 68
                      411 45 155 -36 273 -161 328 -347 21 -71 24 -235 5 -313 -19 -78 -77 -184
                      -123 -226 -91 -81 -232 -122 -363 -103 -185 26 -295 134 -295 292 0 83 23 134
                      89 194 l45 43 -59 121 c-33 66 -65 125 -72 131 -27 22 -153 -81 -215 -176 -57
                      -88 -79 -171 -79 -291 0 -183 56 -321 180 -445 87 -87 176 -138 296 -171 67
                      -18 97 -21 209 -17 109 4 144 9 211 32 254 87 434 298 490 575 13 65 16 114
                      12 210 -10 247 -84 420 -251 587 -77 77 -106 98 -186 137 -52 26 -122 54 -155
                      63 -85 23 -308 28 -409 8z"
                        />
                        <path
                          d="M9560 3505 l0 -925 178 2 177 3 3 302 2 302 44 -43 c205 -199 568
                      -175 795 53 135 135 199 280 208 474 7 125 -7 220 -45 317 -100 255 -320 421
                      -578 437 -57 4 -111 1 -145 -7 -79 -18 -178 -73 -243 -135 -32 -30 -59 -55
                      -62 -55 -2 0 -4 45 -4 100 l0 100 -165 0 -165 0 0 -925z m823 559 c51 -18 121
                      -68 151 -107 14 -18 38 -60 53 -92 23 -51 27 -73 27 -145 0 -71 -4 -94 -27
                      -144 -39 -85 -86 -137 -159 -177 -60 -33 -67 -34 -168 -34 -89 0 -112 3 -152
                      23 -74 37 -134 96 -170 170 -30 61 -33 74 -33 162 0 82 4 103 27 152 66 142
                      208 226 358 211 30 -3 72 -12 93 -19z"
                        />
                      </g>
                    </svg>
                  </div>
                  <div id="amazonPayButton"
                       className={`inline-flex h-10 w-1/3 items-center justify-center rounded border-2 border-solid bg-amazon-yellow border-amazon-yellow xs:h-12 xs:w-full`}
                  >
                    <svg
                      className={``}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 176.515 33.863"
                      width="85px"
                      height="16px"
                      transform="translate(0, 2), scale(1.1)"
                    >
                      <defs>
                        <clipPath id="_clipPath_YQXZfDyPH8PDg72bLQM3P9CWVeOJZUa0">
                          <rect width="176.515" height="33.863"/>
                        </clipPath>
                      </defs>
                      <g clip-path="url(#_clipPath_YQXZfDyPH8PDg72bLQM3P9CWVeOJZUa0)">
                        <path
                          d=" M 69.652 26.489 C 63.129 31.303 53.672 33.863 45.528 33.863 C 34.115 33.863 23.837 29.644 16.059 22.621 C 15.449 22.069 15.993 21.316 16.727 21.743 C 25.118 26.626 35.496 29.567 46.213 29.567 C 53.443 29.567 61.391 28.066 68.704 24.964 C 69.807 24.497 70.732 25.691 69.652 26.489 Z "
                          fill-rule="evenodd"
                          fill="rgb(247,156,52)"
                        />
                        <path
                          d=" M 72.367 23.389 C 71.532 22.321 66.852 22.883 64.749 23.135 C 64.112 23.212 64.013 22.655 64.587 22.252 C 68.321 19.629 74.44 20.386 75.151 21.265 C 75.867 22.15 74.962 28.285 71.464 31.212 C 70.925 31.662 70.413 31.422 70.652 30.828 C 71.44 28.861 73.202 24.459 72.367 23.389 Z "
                          fill-rule="evenodd"
                          fill="rgb(247,156,52)"
                        />
                        <path
                          d=" M 64.897 3.724 L 64.897 1.176 C 64.899 0.788 65.191 0.53 65.543 0.531 L 76.965 0.53 C 77.33 0.53 77.624 0.795 77.624 1.173 L 77.624 3.358 C 77.62 3.725 77.311 4.203 76.764 4.962 L 70.847 13.41 C 73.043 13.359 75.366 13.688 77.362 14.809 C 77.812 15.062 77.933 15.437 77.968 15.804 L 77.968 18.523 C 77.968 18.898 77.558 19.331 77.126 19.106 C 73.611 17.264 68.946 17.063 65.058 19.128 C 64.661 19.34 64.246 18.912 64.246 18.537 L 64.246 15.952 C 64.246 15.539 64.254 14.831 64.671 14.201 L 71.525 4.367 L 65.557 4.366 C 65.192 4.366 64.899 4.106 64.897 3.724 Z "
                          fill-rule="evenodd"
                          fill="rgb(51,62,71)"
                        />
                        <path
                          d=" M 23.233 19.641 L 19.758 19.641 C 19.427 19.62 19.163 19.372 19.136 19.054 L 19.139 1.219 C 19.139 0.863 19.439 0.578 19.81 0.578 L 23.046 0.577 C 23.384 0.594 23.656 0.85 23.677 1.176 L 23.677 3.504 L 23.743 3.504 C 24.586 1.252 26.175 0.201 28.316 0.201 C 30.489 0.201 31.852 1.252 32.825 3.504 C 33.668 1.252 35.582 0.201 37.625 0.201 C 39.085 0.201 40.674 0.802 41.647 2.153 C 42.75 3.655 42.524 5.831 42.524 7.745 L 42.52 19 C 42.52 19.355 42.221 19.641 41.85 19.641 L 38.38 19.641 C 38.03 19.619 37.756 19.343 37.756 19.001 L 37.755 9.546 C 37.755 8.796 37.82 6.92 37.657 6.207 C 37.398 5.005 36.62 4.667 35.615 4.667 C 34.771 4.667 33.895 5.23 33.538 6.13 C 33.181 7.032 33.214 8.532 33.214 9.546 L 33.214 19 C 33.214 19.355 32.914 19.641 32.544 19.641 L 29.073 19.641 C 28.724 19.619 28.449 19.343 28.449 19.001 L 28.445 9.546 C 28.445 7.557 28.77 4.631 26.305 4.631 C 23.807 4.631 23.905 7.482 23.905 9.546 L 23.903 19 C 23.903 19.355 23.603 19.641 23.233 19.641 Z "
                          fill-rule="evenodd"
                          fill="rgb(51,62,71)"
                        />
                        <path
                          d=" M 87.488 3.842 C 84.926 3.842 84.764 7.331 84.764 9.508 C 84.764 11.685 84.732 16.339 87.457 16.339 C 90.149 16.339 90.279 12.586 90.279 10.297 C 90.279 8.796 90.213 6.994 89.759 5.568 C 89.37 4.329 88.591 3.842 87.488 3.842 Z  M 87.457 0.201 C 92.614 0.201 95.403 4.631 95.403 10.26 C 95.403 15.7 92.322 20.017 87.457 20.017 C 82.396 20.017 79.639 15.588 79.639 10.072 C 79.639 4.517 82.428 0.201 87.457 0.201 Z "
                          fill-rule="evenodd"
                          fill="rgb(51,62,71)"
                        />
                        <path
                          d=" M 102.092 19.641 L 98.629 19.641 C 98.282 19.619 98.006 19.343 98.006 19.001 L 98 1.16 C 98.03 0.833 98.318 0.578 98.668 0.578 L 101.891 0.577 C 102.195 0.593 102.445 0.799 102.509 1.076 L 102.509 3.804 L 102.574 3.804 C 103.548 1.364 104.909 0.201 107.309 0.201 C 108.866 0.201 110.391 0.764 111.364 2.303 C 112.272 3.729 112.272 6.13 112.272 7.857 L 112.272 19.08 C 112.234 19.396 111.95 19.641 111.606 19.641 L 108.123 19.641 C 107.801 19.621 107.542 19.384 107.504 19.08 L 107.504 9.397 C 107.504 7.445 107.732 4.592 105.331 4.592 C 104.488 4.592 103.709 5.155 103.32 6.018 C 102.833 7.107 102.768 8.195 102.768 9.397 L 102.768 19 C 102.762 19.355 102.462 19.641 102.092 19.641 Z "
                          fill-rule="evenodd"
                          fill="rgb(51,62,71)"
                        />
                        <path
                          d=" M 59.294 19.597 C 59.065 19.803 58.734 19.817 58.474 19.678 C 57.32 18.719 57.113 18.276 56.482 17.362 C 54.575 19.305 53.224 19.888 50.753 19.888 C 47.828 19.888 45.552 18.082 45.552 14.472 C 45.552 11.651 47.081 9.733 49.258 8.793 C 51.143 7.965 53.776 7.815 55.792 7.589 L 55.792 7.138 C 55.792 6.309 55.857 5.333 55.369 4.618 C 54.946 3.978 54.134 3.715 53.419 3.715 C 52.093 3.715 50.916 4.394 50.626 5.801 C 50.565 6.114 50.337 6.425 50.023 6.441 L 46.654 6.076 C 46.37 6.011 46.054 5.783 46.135 5.349 C 46.9 1.32 50.498 0.064 53.768 0.03 L 54.026 0.03 C 55.7 0.051 57.838 0.51 59.14 1.759 C 60.831 3.339 60.667 5.445 60.667 7.74 L 60.667 13.153 C 60.667 14.782 61.344 15.496 61.979 16.373 C 62.202 16.69 62.251 17.065 61.968 17.297 C 61.258 17.892 59.997 18.987 59.304 19.605 L 59.294 19.597 Z  M 55.792 11.125 C 55.792 12.479 55.824 13.607 55.142 14.811 C 54.589 15.788 53.711 16.39 52.736 16.39 C 51.404 16.39 50.624 15.375 50.624 13.87 C 50.624 10.91 53.278 10.372 55.792 10.372 L 55.792 11.125 Z "
                          fill-rule="evenodd"
                          fill="rgb(51,62,71)"
                        />
                        <path
                          d=" M 13.743 19.597 C 13.513 19.803 13.181 19.817 12.922 19.678 C 11.767 18.719 11.56 18.276 10.93 17.362 C 9.022 19.305 7.672 19.888 5.201 19.888 C 2.276 19.888 0 18.082 0 14.472 C 0 11.651 1.527 9.733 3.706 8.793 C 5.591 7.965 8.224 7.815 10.239 7.589 L 10.239 7.138 C 10.239 6.309 10.305 5.333 9.817 4.618 C 9.394 3.978 8.581 3.715 7.867 3.715 C 6.541 3.715 5.362 4.394 5.074 5.801 C 5.014 6.114 4.785 6.425 4.47 6.441 L 1.102 6.076 C 0.817 6.011 0.501 5.783 0.583 5.349 C 1.346 1.32 4.945 0.064 8.216 0.03 L 8.474 0.03 C 10.148 0.051 12.286 0.51 13.588 1.759 C 15.278 3.339 15.115 5.445 15.115 7.74 L 15.115 13.153 C 15.115 14.782 15.792 15.496 16.427 16.373 C 16.648 16.69 16.699 17.065 16.416 17.297 C 15.706 17.892 14.444 18.987 13.751 19.605 L 13.743 19.597 Z  M 10.239 11.125 C 10.239 12.479 10.272 13.607 9.589 14.811 C 9.037 15.788 8.159 16.39 7.183 16.39 C 5.851 16.39 5.071 15.375 5.071 13.87 C 5.071 10.91 7.726 10.372 10.239 10.372 L 10.239 11.125 Z "
                          fill-rule="evenodd"
                          fill="rgb(51,62,71)"
                        />
                        <path
                          d=" M 159.773 26.039 C 159.773 25.587 159.773 25.181 159.773 24.729 C 159.773 24.356 159.956 24.099 160.345 24.122 C 161.071 24.225 162.098 24.328 162.827 24.178 C 163.779 23.98 164.462 23.305 164.866 22.38 C 165.435 21.078 165.812 20.028 166.05 19.339 L 158.821 1.431 C 158.699 1.127 158.663 0.563 159.27 0.563 L 161.797 0.563 C 162.279 0.563 162.475 0.869 162.583 1.169 L 167.824 15.715 L 172.827 1.169 C 172.929 0.871 173.134 0.563 173.612 0.563 L 175.995 0.563 C 176.598 0.563 176.564 1.126 176.444 1.431 L 169.273 19.898 C 168.345 22.356 167.109 26.271 164.325 26.951 C 162.929 27.316 161.168 27.184 160.134 26.751 C 159.873 26.62 159.773 26.27 159.773 26.039 Z "
                          fill-rule="evenodd"
                          fill="rgb(51,62,71)"
                        />
                        <path
                          d=" M 156.402 18.55 C 156.402 18.883 156.129 19.156 155.794 19.156 L 154.012 19.156 C 153.627 19.156 153.364 18.878 153.315 18.55 L 153.136 17.337 C 152.317 18.03 151.312 18.639 150.222 19.063 C 148.126 19.877 145.71 20.012 143.662 18.754 C 142.181 17.845 141.395 16.068 141.395 14.235 C 141.395 12.817 141.832 11.411 142.801 10.39 C 144.094 8.995 145.968 8.31 148.231 8.31 C 149.598 8.31 151.554 8.471 152.977 8.936 L 152.977 6.495 C 152.977 4.013 151.932 2.939 149.177 2.939 C 147.071 2.939 145.46 3.257 143.218 3.954 C 142.859 3.966 142.649 3.693 142.649 3.36 L 142.649 1.968 C 142.649 1.634 142.934 1.311 143.243 1.213 C 144.844 0.515 147.112 0.08 149.523 0 C 152.666 0 156.402 0.709 156.402 5.543 L 156.402 18.55 Z  M 152.977 14.986 L 152.977 11.303 C 151.781 10.976 149.802 10.84 149.036 10.84 C 147.826 10.84 146.501 11.126 145.809 11.871 C 145.292 12.417 145.058 13.201 145.058 13.959 C 145.058 14.939 145.397 15.922 146.189 16.408 C 147.109 17.033 148.536 16.957 149.877 16.576 C 151.166 16.21 152.376 15.563 152.977 14.986 Z "
                          fill-rule="evenodd"
                          fill="rgb(51,62,71)"
                        />
                        <path
                          d=" M 130.127 2.994 C 134.081 2.994 135.158 6.103 135.158 9.663 C 135.18 12.063 134.739 14.203 133.496 15.428 C 132.566 16.345 131.527 16.595 129.963 16.595 C 128.571 16.595 126.74 15.869 125.372 14.858 L 125.372 4.679 C 126.796 3.585 128.613 2.994 130.127 2.994 Z  M 124.766 26.678 L 122.379 26.678 C 122.045 26.678 121.772 26.405 121.772 26.072 C 121.772 17.782 121.772 9.491 121.772 1.201 C 121.772 0.868 122.045 0.595 122.379 0.595 L 124.206 0.595 C 124.59 0.595 124.853 0.873 124.902 1.201 L 125.094 2.504 C 126.805 0.985 129.008 0.011 131.107 0.011 C 136.986 0.011 138.919 4.855 138.919 9.892 C 138.919 15.281 135.962 19.611 130.961 19.611 C 128.855 19.611 126.886 18.834 125.372 17.484 L 125.372 26.072 C 125.372 26.405 125.099 26.678 124.766 26.678 Z "
                          fill-rule="evenodd"
                          fill="rgb(51,62,71)"
                        />
                      </g>
                    </svg>
                  </div>
                  <div id="paypalButton"
                       className="inline-flex h-10 w-1/3 items-center justify-center rounded border-2 border-solid bg-amazon-yellow border-amazon-yellow xs:h-12 xs:w-full">
                    <svg
                      className={``}
                      xmlns="http://www.w3.org/2000/svg"
                      width="85px"
                      height="16px"
                      viewBox="0 0 338.667 89.785"
                      transform="scale(1.4)"
                    >
                      <g transform="translate(936.898 -21.779)">
                        <path
                          clip-path="none"
                          d="M-828.604 39.734c-.697 0-1.289.506-1.398 1.195l-8.068 51.165a1.31 1.31 0 0 0 1.294 1.513h9.568c.696 0 1.289-.507 1.398-1.195l2.37-15.025c.108-.688.701-1.195 1.398-1.195h8.699c10.164 0 18.792-7.416 20.368-17.465 1.589-10.134-6.328-18.971-17.549-18.993zm9.301 11.422h6.96c5.73 0 7.596 3.381 7.006 7.12-.59 3.747-3.488 6.507-9.031 6.507h-7.084zm45.788 3.478c-2.416.009-5.196.504-8.317 1.804-7.159 2.984-10.597 9.151-12.057 13.647 0 0-4.647 13.717 5.852 21.253 0 0 9.737 7.255 20.698-.447l-.189 1.203a1.31 1.31 0 0 0 1.292 1.513h9.083c.697 0 1.289-.507 1.398-1.195l5.525-35.038a1.31 1.31 0 0 0-1.292-1.515h-9.083c-.697 0-1.29.507-1.398 1.195l-.297 1.886s-3.967-4.333-11.216-4.306zm.297 11.067c1.043 0 1.997.144 2.853.419 3.919 1.258 6.141 5.023 5.498 9.104-.793 5.025-4.914 8.725-10.199 8.725-1.042 0-1.996-.143-2.853-.418-3.918-1.258-6.154-5.023-5.511-9.104.793-5.025 4.927-8.727 10.212-8.727z"
                          fill="#003087"
                        />
                        <path
                          clip-path="none"
                          d="M-697.804 39.734c-.697 0-1.289.506-1.398 1.195l-8.068 51.165a1.31 1.31 0 0 0 1.294 1.513h9.568c.696 0 1.289-.507 1.398-1.195l2.37-15.025c.108-.688.701-1.195 1.398-1.195h8.699c10.164 0 18.791-7.416 20.366-17.465 1.59-10.134-6.326-18.971-17.547-18.993zm9.301 11.422h6.96c5.73 0 7.596 3.381 7.006 7.12-.59 3.747-3.487 6.507-9.031 6.507h-7.084zm45.787 3.478c-2.416.009-5.196.504-8.317 1.804-7.159 2.984-10.597 9.151-12.057 13.647 0 0-4.645 13.717 5.854 21.253 0 0 9.735 7.255 20.697-.447l-.189 1.203a1.31 1.31 0 0 0 1.294 1.513h9.082c.697 0 1.289-.507 1.398-1.195l5.527-35.038a1.31 1.31 0 0 0-1.294-1.515h-9.083c-.697 0-1.29.507-1.398 1.195l-.297 1.886s-3.967-4.333-11.216-4.306zm.297 11.067c1.043 0 1.997.144 2.853.419 3.919 1.258 6.141 5.023 5.498 9.104-.793 5.025-4.914 8.725-10.199 8.725-1.042 0-1.996-.143-2.853-.418-3.918-1.258-6.154-5.023-5.511-9.104.793-5.025 4.927-8.727 10.212-8.727z"
                          fill="#0070e0"
                        />
                        <path
                          clip-path="none"
                          d="M-745.92 55.859c-.72 0-1.232.703-1.012 1.388l9.958 30.901-9.004 14.562c-.437.707.071 1.62.902 1.62h10.642a1.77 1.77 0 0 0 1.513-.854l27.811-46.007c.427-.707-.083-1.611-.909-1.611h-10.641a1.77 1.77 0 0 0-1.522.869l-10.947 18.482-5.557-18.345c-.181-.597-.732-1.006-1.355-1.006z"
                          fill="#003087"
                        />
                        <path
                          clip-path="none"
                          d="M-609.107 39.734c-.696 0-1.289.507-1.398 1.195l-8.07 51.163a1.31 1.31 0 0 0 1.294 1.515h9.568c.696 0 1.289-.507 1.398-1.195l8.068-51.165a1.31 1.31 0 0 0-1.292-1.513z"
                          fill="#0070e0"
                        />
                        <path
                          clip-path="none"
                          d="M-908.37 39.734a2.59 2.59 0 0 0-2.556 2.185l-4.247 26.936c.198-1.258 1.282-2.185 2.556-2.185h12.445c12.525 0 23.153-9.137 25.095-21.519a20.76 20.76 0 0 0 .245-2.793c-3.183-1.669-6.922-2.624-11.019-2.624z"
                          fill="#001c64"
                        />
                        <path
                          clip-path="none"
                          d="M-874.832 42.359a20.76 20.76 0 0 1-.245 2.793c-1.942 12.382-12.571 21.519-25.095 21.519h-12.445c-1.273 0-2.358.926-2.556 2.185l-3.905 24.752-2.446 15.528a2.1 2.1 0 0 0 2.075 2.43h13.508a2.59 2.59 0 0 0 2.556-2.185l3.558-22.567a2.59 2.59 0 0 1 2.558-2.185h7.953c12.525 0 23.153-9.137 25.095-21.519 1.379-8.788-3.047-16.784-10.611-20.75z"
                          fill="#0070e0"
                        />
                        <path
                          clip-path="none"
                          d="M-923.716 21.779c-1.273 0-2.358.926-2.556 2.183l-10.6 67.216c-.201 1.276.785 2.43 2.077 2.43h15.719l3.903-24.752 4.247-26.936a2.59 2.59 0 0 1 2.556-2.185h22.519c4.098 0 7.836.956 11.019 2.624.218-11.273-9.084-20.58-21.873-20.58z"
                          fill="#003087"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="relative flex justify-center border-b border-solid pt-10 border-foreground">
                <div
                  className="absolute z-10 flex -translate-y-1/2 transform justify-center px-3 text-xs bg-background">
                  OR CONTINUE BELOW TO PAY WITH A CREDIT CARD
                </div>
              </div>
            </div>
            <div id="contactContainer">
              <div
                className="mx-auto flex h-full w-full flex-col border-b border-solid py-2 xl:pt-8 lg:pt-8 md:pt-8 sm:pt-4 xs:pt-4 pb-14 border-foreground">
                <div id="contactWrapper"
                     className="">
                  <form id="contactForm">
                    <div id="contactHeader"
                         className="pb-4">
                      <div className="flex flex-row items-center justify-between">
                        <div className="flex text-xl font-bold">Contact</div>
                        <div className="flex text-sm">
                          <div>Have an account?</div>
                          <div className={`cursor-pointer pl-1 font-bold`}>
                            Log in
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="contactEmail"
                         className="pb-3">
                      <div className="relative flex flex-col border border-solid border-foreground">
                        <input type="text"
                               placeholder="Email"
                               value={email}
                               onChange={handleEmailChange}
                               onBlur={handleEmailBlur}
                               className="w-70% xs:w-60% items-center bg-transparent p-3 py-4 text-sm placeholder:font-bold outline-none placeholder-greyed-out"
                        />
                        {emailError && (
                          <span
                            className="absolute z-10 inset-y-0 right-0 pr-4 flex items-center text-sm text-custom-red bg-transparent"
                          >
                      {emailError}
                    </span>
                        )}

                      </div>
                    </div>
                    <div id="emailOffersCheckbox"
                         className="pb-12">
                      <div className="flex items-center align-center">
                        <div className="inline-flex">
                          <input type="checkbox"
                                 value="1"
                                 className="accent-foreground"/>
                        </div>
                        <div className="inline-flex pl-2 text-sm">
                          Email me with news and offers
                        </div>
                      </div>
                    </div>
                    <div id="contactBottomSection">
                      <div id="shippingAddressDetails"
                           className={``}
                      >
                        <div id="contactShippingHeader"
                             className="flex flex-row">
                          <div className="flex w-1/2 pb-2 text-xl font-bold">
                            <div>
                              Shipping Address
                            </div>
                          </div>
                        </div>
                        <div id="contactDetails" className="flex flex-col gap-3">
                          <div id="shippingDetailsCountrySelect"
                               className="relative w-full border border-solid border-foreground">
                            <label htmlFor="country"
                                   className="absolute top-2 left-3 text-sm">Country/region
                            </label>
                            <div id="selectArrow"
                                 className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                              <svg className="h-4 w-4" fill="none" stroke="currentColor"
                                   viewBox="0 0 24 24"
                                   xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M19 9l-7 7-7-7"></path>
                              </svg>
                            </div>
                            <select id="country"
                                    className="block w-full appearance-none px-3 pt-7 pb-2 font-bold bg-background focus:border-blue-500 focus:outline-none"
                                    value={shippingDetails.country}
                                    onChange={handleCountryChange}>
                              {countries.map(({isoCode, name}) => (
                                <option
                                  key={isoCode}
                                  value={isoCode}>
                                  {name}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div id="contactNames"
                               className="flex w-full justify-between gap-3">
                            <div id="firstNameInputContainer"
                                 className={`${shippingDetails.firstNameError ? 'border-custom-red' : 'border-foreground'} 
                           relative flex flex-col border border-solid w-full`}>
                              <label
                                className={`transition-opacity duration-500 ${showFirstNameLabel ? 'h-fit pt-1 opacity-100' : 'opacity-0 h-0 pt-0 overflow-hidden'} flex items-end text-xs px-3 font-bold text-greyed-out`}>
                                First Name
                              </label>
                              <input type="text"
                                     placeholder={showFirstNameLabel ? '' : 'First Name'}
                                     value={shippingDetails.firstName}
                                     onChange={handleFirstNameChange}
                                     onFocus={handleFirstNameFocused}
                                     onBlur={handleFirstNameBlur}
                                     className={`placeholder:transition-opacity placeholder:duration-700
                               ${showFirstNameLabel ? 'h-auto placeholder:opacity-0 pb-2 overflow-hidden' : 'h-full placeholder:opacity-100 py-4'} block text-sm appearance-none px-3 bg-background placeholder:font-bold outline-none w-full placeholder-greyed-out `}
                              />
                            </div>
                            <div id="lastNameInputContainer"
                                 className={`${shippingDetails.lastNameError ? 'border-custom-red' : 'border-foreground'} relative flex flex-col border border-solid w-full`}>
                              <label
                                className={`transition-opacity duration-500 ${showLastNameLabel ? 'h-fit pt-1 opacity-100' : 'opacity-0 h-0 pt-0 overflow-hidden'} flex items-end text-xs px-3 font-bold text-greyed-out`}>
                                Last Name
                              </label>
                              <input type="text"
                                     placeholder={showLastNameLabel ? '' : 'Last Name'}
                                     value={shippingDetails.lastName}
                                     onChange={handleLastNameChange}
                                     onFocus={handleLastNameFocused}
                                     onBlur={handleLastNameBlur}
                                // className={`items-center border border-solid bg-transparent p-3 py-4 text-sm placeholder:font-bold outline-none w-49% placeholder-greyed-out`}
                                     className={`placeholder:transition-opacity placeholder:duration-700
                             ${showLastNameLabel ? 'h-auto placeholder:opacity-0 pb-2 overflow-hidden' : 'h-full placeholder:opacity-100 py-4'} block text-sm appearance-none px-3 bg-background placeholder:font-bold outline-none w-full placeholder-greyed-out `}

                              />
                            </div>
                          </div>

                          <div id="companyNameInputContainer"
                               className={`w-full`}>
                            <div className="border border-solid border-foreground">
                              <label
                                className={`transition-opacity duration-500 ${showCompanyNameLabel ? 'h-fit pt-1 opacity-100' : 'opacity-0 h-0 pt-0 overflow-hidden'}
                          flex items-end text-xs px-3 font-bold text-greyed-out`}>
                                Company (optional)
                              </label>
                              <input type="text"
                                     placeholder={showCompanyNameLabel ? '' : 'Company (optional)'}
                                     value={shippingDetails.companyName}
                                     onChange={handleCompanyNameChange}
                                     onFocus={handleCompanyNameFocused}
                                     onBlur={handleCompanyNameBlur}
                                     className={`placeholder:transition-opacity placeholder:duration-700
                             ${showCompanyNameLabel ? 'h-auto placeholder:opacity-0 pb-2 overflow-hidden' : 'h-full placeholder:opacity-100 py-4'} block text-sm appearance-none px-3 bg-background placeholder:font-bold outline-none w-full placeholder-greyed-out `}
                              />
                            </div>
                          </div>

                          <div id="addressLineOneInputContainer"
                               className={`relative w-full`}>
                            <div
                              className={`${shippingDetails.addressLineOneError ? 'border-custom-red' : 'border-foreground'} border border-solid `}>
                              <label
                                className={`transition-opacity duration-500 ${showAddressLineOneLabel ? 'h-fit pt-1 opacity-100' : 'opacity-0 h-0 pt-0 overflow-hidden'} flex items-end text-xs px-3 font-bold text-greyed-out`}>
                                Address
                              </label>
                              <input type="text"
                                     placeholder={showAddressLineOneLabel ? '' : 'Address'}
                                     value={shippingDetails.addressLineOne}
                                     onChange={handleAddressLineOneChange}
                                     onFocus={handleAddressLineOneFocused}
                                     onBlur={handleAddressLineOneBlur}
                                     className={`placeholder:transition-opacity placeholder:duration-700
                             ${showAddressLineOneLabel ? 'h-auto placeholder:opacity-0 pb-2 overflow-hidden' : 'h-full placeholder:opacity-100 py-4'} block text-sm appearance-none px-3 bg-background placeholder:font-bold outline-none w-full placeholder-greyed-out `}
                              />
                            </div>
                          </div>
                          <div id="addressLineTwoInputContainer"
                               className={`relative w-full`}>
                            <div className="border border-solid border-foreground">
                              <label
                                className={`transition-opacity duration-500 ${showAddressLineTwoLabel ? 'h-fit pt-1 opacity-100' : 'opacity-0 h-0 pt-0 overflow-hidden'} flex items-end text-xs px-3 font-bold text-greyed-out`}>
                                Apartment, suite, etc. (optional)
                              </label>
                              <input type="text"
                                     placeholder={showAddressLineTwoLabel ? '' : 'Apartment, suite, etc. (optional)'}
                                     value={shippingDetails.addressLineTwo}
                                     onChange={handleAddressLineTwoChange}
                                     onFocus={handleAddressLineTwoFocused}
                                     onBlur={handleAddressLineTwoBlur}
                                     className={`placeholder:transition-opacity placeholder:duration-700
                             ${showAddressLineTwoLabel ? 'h-auto placeholder:opacity-0 pb-2 overflow-hidden' : 'h-full placeholder:opacity-100 py-4'} block text-sm appearance-none px-3 bg-background placeholder:font-bold outline-none w-full placeholder-greyed-out `}
                              />
                            </div>
                          </div>

                          <div id="contactCityStateCode"
                               className="flex w-full justify-between gap-3">
                            <div id="cityInputContainer"
                                 className={`${shippingDetails.cityError ? 'border-custom-red' : 'border-foreground'} relative flex flex-col border border-solid w-full`}>
                              <label
                                className={`transition-opacity duration-500 ${showCityLabel ? 'pt-1 h-fit opacity-100' : 'opacity-0 h-0 overflow-hidden pt-0'}
                           flex items-end text-xs px-3 font-bold text-greyed-out`}>
                                City
                              </label>
                              <input id="cityInput"
                                     type="text"
                                     placeholder={showCityLabel ? "" : "City"}
                                     value={shippingDetails.city}
                                     onChange={handleCityChange}
                                     onFocus={handleCityFocused}
                                     onBlur={handleCityBlur}
                                     className={`placeholder:transition-opacity placeholder:duration-700
                               ${showCityLabel ? 'h-auto placeholder:opacity-0 pb-2 overflow-hidden' : 'h-full placeholder:opacity-100 py-4'} block text-sm appearance-none px-3 bg-background placeholder:font-bold outline-none w-full placeholder-greyed-out
                               `}
                              />
                            </div>

                            <div id="stateInput" className="relative border border-solid w-full border-foreground">
                              <label className="xs:hidden flex items-end pt-1 px-3 text-xs font-bold text-greyed-out">
                                State/territory
                              </label>
                              <label className="hidden xs:flex items-end pt-1 px-3 text-xs font-bold text-greyed-out">
                                State
                              </label>
                              <div id="selectArrow"
                                   className="pointer-events-none absolute inset-y-0 right-3 top-1 flex ">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24"
                                     xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M19 9l-7 7-7-7"></path>
                                </svg>
                              </div>
                              <select id="stateSelect"
                                      value={shippingDetails.state}
                                      onChange={handleStateChange}
                                      className="block text-sm w-full overflow-hidden appearance-none px-3 pb-2 bg-background focus:border-blue-500 focus:outline-none"
                              >
                                {shippingStates.map(({isoCode, name}) => (
                                  <option
                                    key={isoCode}
                                    value={isoCode}
                                  >
                                    {name}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div id="zipcodeInputContainer"
                                 className={`${shippingDetails.zipcodeError ? 'border-custom-red' : 'border-foreground'} relative flex flex-col border border-solid w-full`}>
                              <label
                                className={`transition-opacity duration-500 ${showZipcodeLabel ? 'pt-1 h-fit opacity-100' : 'opacity-0 h-0 overflow-hidden pt-0'}
                                flex items-end text-xs px-3 font-bold text-greyed-out`}>
                                Postcode
                              </label>
                              <input id="zipcodeInput"
                                     type="text"
                                     placeholder={showZipcodeLabel ? '' : 'Postcode'}
                                     value={shippingDetails.zipcode}
                                     onFocus={handleZipcodeFocused}
                                     onChange={handleZipcodeChange}
                                     onBlur={handleZipcodeBlur}
                                     className={`placeholder:transition-opacity placeholder:duration-700
                               ${showZipcodeLabel ? 'h-auto placeholder:opacity-0 overflow-hidden pb-2' : 'h-full placeholder:opacity-100 py-4'} block text-sm appearance-none px-3 bg-background placeholder:font-bold outline-none w-full placeholder-greyed-out
                               `}
                              />
                            </div>
                          </div>
                          <div id="phoneInputContainer"
                               className={`relative w-full`}>
                            <div className="border border-solid border-foreground">
                              <label
                                className={`transition-opacity duration-500 ${showPhoneLabel ? 'h-fit pt-1 opacity-100' : 'opacity-0 h-0 pt-0 overflow-hidden'} flex items-end text-xs px-3 font-bold text-greyed-out`}>
                                Phone (optional)
                              </label>
                              <input type="text"
                                     placeholder={showPhoneLabel ? '' : 'Phone (optional)'}
                                     value={shippingDetails.phone}
                                     onChange={handlePhoneChange}
                                     onFocus={handlePhoneFocused}
                                     onBlur={handlePhoneBlur}
                                     className={`placeholder:transition-opacity placeholder:duration-500
                             ${showPhoneLabel ? 'h-auto placeholder:opacity-0 pb-2 overflow-hidden' : 'h-full placeholder:opacity-100 py-4'} block text-sm appearance-none px-3 bg-background placeholder:font-bold outline-none w-full placeholder-greyed-out `}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="shippingButton"
                           className="pt-8 items-center flex mx-auto justify-end">
                        {displayIncompleteMessage && (
                          <div id="incompleteError"
                               className="flex text-sm pr-16 text-custom-red xs:w-1/2">
                            <button disabled={displayIncompleteMessage}>
                              Please fill out all the required fields.
                            </button>
                          </div>
                        )}
                        <div id="orderButton" className="flex">
                          <div id="loadingBorder"
                          >
                            <Link id="reviewOrderButton"
                                  href={isShippingValid ? `/payment/${cartId}` : ""}
                                  className={`border-2 rounded font-bold py-3 px-4 border-solid
                              ${!isShippingValid ? 'border-transparent bg-greyed-out cursor-default'
                                    : 'border-transparent hover:border-foreground bg-shopify-blue hover:bg-transparent'}
                              `}
                                  type="button"
                                  onClick={!isShippingValid ? handleReviewButtonClick : handleSaveToLocalStorage}
                            >
                              CONTINUE TO SHIPPING
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

            </div>
          </div>
          <div id="rightContentWrapper"
               className="relative flex flex-col pt-1 xs:w-full sm:w-full md:w-39% lg:w-39%">
            <div id="checkoutTitle"
                 className="pt-1 xs:block sm:block md:hidden lg:hidden">
              <div className="flex pb-1">
                <h1 className="py-3 text-3xl">
                  <a href="/">Xandria</a>
                </h1>
              </div>

              <div id="orderSummaryBanner"
                   className={`relative select-none z-10 flex py-4 text-sm font-medium justify-between items-center before:content-[''] before:absolute before:top-0 before:bottom-0 before:bg-translucent before:border-y before:border-foreground before:left-[calc(50%-50vw)] before:right-[calc(50%-50vw)] before:-z-10`}>
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
                     className="flex font-bold text-lg">
                  <div id="summaryBannerBinButton"
                       className={`${isOrderSummaryHidden ? 'hidden' : ''}
                      relative group flex items-center`}
                       onClick={handleOpenClearCartWindow}
                  >
                    <div id="binButtonDefault"
                         className={`${isClearCartWindowOpen ? 'pointer-events-none' : ''} w-fit h-fit`}>
                      <svg className="flex h-3 px-0.5 fill-foreground hover:fill-custom-red" focusable="false"
                           data-icon="trash" role="img"
                           xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path fill=""
                              d="M0 84V56c0-13.3 10.7-24 24-24h112l9.4-18.7c4-8.2 12.3-13.3 21.4-13.3h114.3c9.1 0 17.4 5.1 21.5 13.3L312 32h112c13.3 0 24 10.7 24 24v28c0 6.6-5.4 12-12 12H12C5.4 96 0 90.6 0 84zm415.2 56.7L394.8 467c-1.6 25.3-22.6 45-47.9 45H101.1c-25.3 0-46.3-19.7-47.9-45L32.8 140.7c-.4-6.9 5.1-12.7 12-12.7h358.5c6.8 0 12.3 5.8 11.9 12.7z"></path>
                      </svg>
                    </div>
                  </div>
                  <span id="orderSummaryBannerPrice" className="pl-4">${totalPrice.toFixed(2)}</span>
                </div>
                <div id="clearCartWindow"
                     ref={clearCartWindowRef}
                     className={`${isClearCartWindowOpen ? '' : 'hidden'} absolute z-20 flex xs:right-0 sm:right-0 md:left-0 lg:left-0 xl:left-0 bottom-0
                    xs:translate-y-20 sm:translate-y-20 xs:translate-x-11 px-4 py-3 h-20 border-solid
                    border-foreground border rounded-md bg-background
                    `}
                >
                {/*<div id="clearCartWindow"*/}
                {/*     ref={clearCartWindowRef}*/}
                {/*     className={`${isClearCartWindowOpen ? '' : 'hidden'} absolute z-20 flex xs:right-0 sm:right-0 md:left-0 lg:left-0 xl:left-0 bottom-0*/}
                {/*    xs:translate-y-20 sm:translate-y-20 xs:translate-x-11 px-4 py-3 h-20 border-solid*/}
                {/*    border-foreground border rounded-md bg-background*/}
                {/*    xs:before:-top-2 xs:before:left-1/2 xs:before:-translate-x-1/2 xs:before:border-l-transparent*/}
                {/*    xs:before:border-r-transparent xs:before:border-b-gray-300*/}
                {/*    xs:before:border-t-transparent xs:before:border-l-8 xs:before:border-r-8 xs:before:border-b-8*/}
                {/*    xs:before:border-solid xs:before:content-[''] xs:before:absolute*/}
                {/*    sm:before:-top-2 sm:before:left-1/2 sm:before:-translate-x-1/2 sm:before:border-l-transparent*/}
                {/*    sm:before:border-r-transparent sm:before:border-b-gray-300*/}
                {/*    sm:before:border-t-transparent sm:before:border-l-8 sm:before:border-r-8 sm:before:border-b-8*/}
                {/*    sm:before:border-solid sm:before:content-[''] sm:before:absolute`}*/}
                {/*>*/}
                  <div className={`flex flex-col`}>
                    <p className="font-bold h-full flex">Clear cart and return to homepage?</p>
                    <div className="text-sm font-bold h-full flex gap-1 items-end justify-around">
                      <button
                        className="text-foreground py-0.5 border-amazon-yellow border border-solid bg-amazon-yellow rounded-md w-full hover:border-transparent hover:text-white"
                        onClick={handleNavigateHome}
                      >
                        Yes
                      </button>
                      <button
                        className="text-foreground hover:text-white py-0.5 border border-solid border-foreground rounded-md w-full hover:border-gray-500"
                        onClick={handleCloseClearCartWindow}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div id="borderSummary"
                 className={`${styles.borderSummary} ${isOrderSummaryHidden ? '' : styles.expanded} pr-4`}>
              <div className="pt-6"></div>
              <div
                className={`${styles.scrollBar} ${styles.scrollBarContent} max-h-610px overflow-x-hidden overflow-y-auto pr-4`}>
                {/* right padding is for space between scroll bar && content */}
                <div id="cartItems">
                  {cartItems.map((item, index) => (
                    <div key={index} className="select-none">
                      <div className="mx-auto flex w-full justify-between">
                        {/* Map over the cart items and display them */}
                        <div className="cart-item w-full flex h-full items-center flex-start">
                          <div className="inline-flex pr-3 w-20 h-24 object-cover">
                            <img src={item.imageUrl} alt={item.bookTitle}/>
                          </div>
                          <div id="itemDetailsLeftSide"
                               className="flex h-full flex-col justify-center text-sm w-full">
                            <div className="w-3/4">
                              <div className="font-bold">{item.bookTitle}</div>
                              <div className="pr-8 text-gray-400">{item.bookAuthors}</div>
                              <div className="flex text-gray-400">{item.bookType}</div>
                            </div>
                            <div className="py-0.5"></div>
                            <div className="flex items-center justify-between">
                              <div id="itemQtyContainer"
                                   className="flex items-center w-fit border border-solid border-foreground rounded">
                                <div>
                                  {item.qty === 1 ? (
                                    <button className="h-6" onClick={() => handleRemoveFromCart(item.bookTitle)}>
                                      <svg id="itemQtyBin" className="h-3 px-2" focusable="false" data-icon="trash"
                                           role="img"
                                           xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path fill="currentColor"
                                              d="M0 84V56c0-13.3 10.7-24 24-24h112l9.4-18.7c4-8.2 12.3-13.3 21.4-13.3h114.3c9.1 0 17.4 5.1 21.5 13.3L312 32h112c13.3 0 24 10.7 24 24v28c0 6.6-5.4 12-12 12H12C5.4 96 0 90.6 0 84zm415.2 56.7L394.8 467c-1.6 25.3-22.6 45-47.9 45H101.1c-25.3 0-46.3-19.7-47.9-45L32.8 140.7c-.4-6.9 5.1-12.7 12-12.7h358.5c6.8 0 12.3 5.8 11.9 12.7z"></path>
                                      </svg>
                                    </button>
                                  ) : (
                                    <button className="h-6" onClick={() => handleDecreaseQty(item.bookTitle)}>
                                      <svg className="h-3 px-2" focusable="false" data-icon="minus" role="img"
                                           xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path fill="currentColor"
                                              d="M424 318.2c13.3 0 24-10.7 24-24v-76.4c0-13.3-10.7-24-24-24H24c-13.3 0-24 10.7-24 24v76.4c0 13.3 10.7 24 24 24h400z"></path>
                                      </svg>
                                    </button>
                                  )}
                                </div>
                                <div
                                  className="flex font-light border-x border-solid border-foreground px-4 py-0.5">{item.qty}</div>
                                <button id="qtyPlusButton" className="h-6"
                                        onClick={() => handleIncreaseQty(item.bookTitle)}>
                                  <svg className="h-3 px-2" focusable="false" data-icon="plus" role="img"
                                       xmlns="http://www.w3.org/2000/svg"
                                       viewBox="0 0 448 512">
                                    <path fill="rgb(210, 207, 202)"
                                          d="M448 294.2v-76.4c0-13.3-10.7-24-24-24H286.2V56c0-13.3-10.7-24-24-24h-76.4c-13.3 0-24 10.7-24 24v137.8H24c-13.3 0-24 10.7-24 24v76.4c0 13.3 10.7 24 24 24h137.8V456c0 13.3 10.7 24 24 24h76.4c13.3 0 24-10.7 24-24V318.2H424c13.3 0 24-10.7 24-24z">
                                    </path>
                                  </svg>
                                </button>
                              </div>
                              <div className="inline-flex text-sm flex-end font-bold">
                                ${item.qtyPrice.toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="relative text-sm flex flex-col flex-end">
                          <button
                            onClick={() => {
                              handleRemoveFromCart(item.bookTitle)
                            }}
                            className={`${styles.closeButton} flex absolute z-5 translate-x-2 -translate-y-1.5 right-0 top-0`}>
                            <svg
                              className={``}
                              version="1.0"
                              xmlns="http://www.w3.org/2000/svg"
                              width="32px"
                              height="32px"
                              viewBox="0 0 752.000000 752.000000"
                              preserveAspectRatio="xMidYMid meet">
                              <g
                                transform="translate(0.000000,752.000000) scale(0.100000,-0.100000)"
                                stroke="none">
                                <path
                                  d="M2743 4838 c-41 -11 -65 -46 -65 -94 0 -35 21 -58 473 -510 l474
                -474 -474 -474 c-445 -445 -473 -475 -473 -508 0 -66 34 -100 100 -100 33 0
                63 28 508 473 l474 474 474 -474 c445 -445 475 -473 508 -473 66 0 100 34 100
                100 0 33 -28 63 -473 508 l-474 474 474 474 c445 445 473 475 473 508 0 66
                -34 100 -100 100 -33 0 -63 -28 -508 -473 l-474 -474 -472 471 c-260 260 -482
                474 -493 476 -11 3 -35 1 -52 -4z"
                                />
                              </g>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div id="cartItemBorderGap" className="py-6 pb-6">
                        <div className="border-b border-solid border-foreground"></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={`flex justify-between border-b-gray-50 pb-6 xs:gap-2 sm:gap-2 md:gap-4 lg:gap-4`}>
                  <div className="relative inline-flex flex-grow">
                    <input
                      type="text"
                      placeholder="Discount code or gift card"
                      value={discountCode}
                      onChange={handleDiscountCodeChange}
                      maxLength={16}
                      className="w-full items-center border border-solid bg-transparent px-3 py-4 text-sm placeholder:font-bold outline-none border-foreground placeholder-greyed-out"
                    />
                    {displayInvalidCodeMessage && (
                      <span
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-sm text-red-500 bg-transparent"
                      >
                      Invalid code
                    </span>
                    )}
                  </div>
                  <div
                    className={`${styles.applyButton} inline-flex items-center border-2 border-solid rounded py-2 px-5 font-bold border-transparent
                  ${!isLoading ? (isCodeValid ? 'bg-shopify-blue cursor-pointer hover:border-foreground hover:bg-transparent transition duration-200' : 'bg-greyed-out cursor-default') : 'bg-transparent border-transparent cursor-default'}
                  `}
                    onClick={isCodeValid && !isLoading ? handleApplyButtonClick : undefined}
                  >
                    {isLoading ? (
                      <button className={styles.loader}></button>
                    ) : (
                      <button disabled={!isCodeValid}>APPLY</button>
                    )}
                  </div>
                </div>
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
                    <div id="totalOrderPriceBinButton"
                         className={`group xs:hidden sm:hidden`}
                         onClick={handleOpenClearCartWindow}
                    >
                      <div id="binButtonDefaultRightSide"
                           className="w-fit h-fit group-hover:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg"
                             className="icon icon-tabler icon-tabler-trash w-6 h-6" viewBox="00 24 24"
                             style={{stroke: '#d2cfca2b'}}
                             fill="none">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <path d="M4 7l16 0"/>
                          <path d="M10 11l0 6"/>
                          <path d="M14 11l0 6"/>
                          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"/>
                          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"/>
                        </svg>
                      </div>
                      <div id="binButtonHoverRightSide"
                           className="w-fit h-fit">
                        <svg xmlns="http://www.w3.org/2000/svg"
                             className="hidden group-hover:block icon icon-tabler icon-tabler-trash w-6 h-6 stroke-custom-red"
                             viewBox="00 24 24"
                             fill="none">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <path d="M4 7h16"/>
                          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"/>
                          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"/>
                          <path d="M10 12l4 4m0 -4l-4 4"/>
                        </svg>
                      </div>
                    </div>
                    <div className="xs:hidden sm:hidden">

                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-full justify-center">
                <div id="clearCartWindow"
                     ref={clearCartWindowRef}
                     className={`
                         ${isClearCartWindowOpen ? 'flex xs:hidden sm:hidden' : 'hidden'} 
                          absolute z-20 mx-auto
                          px-4 py-3 h-20 border-solid
                          border-foreground border rounded-md bg-background
                          `}
                >
                  <div className={`flex flex-col`}>
                    <p className="font-bold h-full flex">Clear cart and return to homepage?</p>
                    <div className="text-sm font-bold h-full flex gap-1 items-end justify-around">
                      <button
                        className="text-foreground py-0.5 border-amazon-yellow border border-solid bg-amazon-yellow rounded-md w-full hover:border-transparent hover:text-white"
                        onClick={handleNavigateHome}
                      >
                        Yes
                      </button>
                      <button
                        className="text-foreground hover:text-white py-0.5 border border-solid border-foreground rounded-md w-full hover:border-gray-500"
                        onClick={handleCloseClearCartWindow}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="checkoutFooter"
             className="bottom-0 flex justify-start w-full py-3 text-xs font-bold text-gray-500 mx-auto xs:max-w-532px sm:max-w-532px md:w-full lg:w-1120px">
          <div className="pr-4 cursor-pointer">Refund Policy</div>
          <div className="pr-4 cursor-pointer">Privacy Policy</div>
          <div className="pr-4 cursor-pointer">Terms of Service</div>
        </div>

      </div>
    );
  }

};

export default CheckoutPageContent;