import styles from './Payment-Page-Content.module.scss';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import Image from "next/image";
import masterandemissarry from '../../assets/masterandemissarry.jpg';
import { Country, State, City } from 'country-state-city';

const PaymentPageContent: React.FC = () => {
  const [isContinuedToPayment, setIsContinuedToPayment] = useState(false);

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
    firstNameError: false,
    lastNameError: false,
    addressLineOneError: false,
    cityError: false,
    zipcodeError: false,
  });
  const [billingDetails, setBillingDetails] = useState({
    country: 'AU',
    firstName: '',
    lastName: '',
    companyName: '',
    addressLineOne: '',
    addressLineTwo: '',
    city: '',
    state: 'NSW',
    zipcode: '',
    firstNameError: false,
    lastNameError: false,
    addressLineOneError: false,
    cityError: false,
    zipcodeError: false,
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [countries, setCountries] = useState([]);
  const [shippingStates, setShippingStates] = useState([]);
  const [billingStates, setBillingStates] = useState([]);
  const [discountCode, setDiscountCode] = useState('');
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [reviewButtonClicked, setReviewButtonClicked] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [isReviewed, setIsReviewed] = useState(false);
  const [displayIncompleteMessage, setDisplayIncompleteMessage] = useState(false);
  const [shippingError, setShippingError] = useState(false);
  const [billingError, setBillingError] = useState(false);
  const [displayInvalidCodeMessage, setDisplayInvalidCodeMessage] = useState(false);
  const [isBillingAddress, setIsBillingAddress] = useState(false);

  const [isSameAddress, setIsSameAddress] = useState(false);
  const bottomRef = useRef<null | HTMLDivElement>(null);
  const [isOrderSummaryHidden, setOrderSummaryHidden] = useState(true);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleEmailChange = (event: any) => {
    const {value} = event.target;
    setEmail(value);
  };
  const handleEmailBlur = () => {
    if (emailRegex.test(email)) {
      setEmailError('');
    } else {
      setEmailError('Invalid email address');
    }
    setReviewButtonClicked(false);
  };
  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountry = event.target.value

    if (!isBillingAddress) {
      setShippingDetails(prevDetails => ({
        ...prevDetails,
        country: newCountry,
      }));
    }
    if (isBillingAddress || isSameAddress) {
      setBillingDetails(prevDetails => ({
        ...prevDetails,
        country: newCountry,
      }));
    }
  };
  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newState = event.target.value

    if (!isBillingAddress) {
      setShippingDetails(prevDetails => ({
        ...prevDetails,
        state: newState,
      }));
    }
    if (isBillingAddress || isSameAddress) {
      setBillingDetails(prevDetails => ({
        ...prevDetails,
        state: newState,
      }));
    }
  };
  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFirstName = event.target.value

    if (!isBillingAddress) {
      setShippingDetails(prevDetails => ({
        ...prevDetails,
        firstName: newFirstName,
        firstNameError: newFirstName.trim() === ''
      }));
    }
    if (isBillingAddress || isSameAddress) {
      setBillingDetails(prevDetails => ({
        ...prevDetails,
        firstName: newFirstName,
        firstNameError: newFirstName.trim() === ''
      }));
    }
  };
  const handleFirstNameBlur = (userClickOrEvent: any) => {
    const wasReviewButtonClicked = typeof userClickOrEvent === 'boolean' ? userClickOrEvent : false;
    const shouldValidate = wasReviewButtonClicked || reviewButtonClicked;

    if (shouldValidate) {
      const commonUpdate: any = (prevDetails: { firstName: string; }) => ({
        ...prevDetails,
        firstNameError: prevDetails.firstName.trim() === ''
      });
      setShippingDetails(commonUpdate);
      setBillingDetails(commonUpdate);
    } else if (!isBillingAddress) {
      setShippingDetails(prevDetails => ({
        ...prevDetails,
        firstNameError: prevDetails.firstName.trim() === ''
      }));
    } else {
      setBillingDetails(prevDetails => ({
        ...prevDetails,
        firstNameError: prevDetails.firstName.trim() === ''
      }));
    }
    setReviewButtonClicked(false);
  };
  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLastName = event.target.value;

    if (!isBillingAddress) {
      setShippingDetails(prevDetails => ({
        ...prevDetails,
        lastName: newLastName,
        lastNameError: newLastName.trim() === ''
      }));
    }
    if (isBillingAddress || isSameAddress) {
      setBillingDetails(prevDetails => ({
        ...prevDetails,
        lastName: newLastName,
        lastNameError: newLastName.trim() === ''
      }));
    }
  }
  const handleLastNameBlur = (userClickOrEvent: any) => {
    const wasReviewButtonClicked = typeof userClickOrEvent === 'boolean' ? userClickOrEvent : false;
    const shouldValidate = wasReviewButtonClicked || reviewButtonClicked;

    if (shouldValidate) {
      const commonUpdate: any = (prevDetails: { lastName: string; }) => ({
        ...prevDetails,
        lastNameError: prevDetails.lastName.trim() === ''
      });
      setShippingDetails(commonUpdate);
      setBillingDetails(commonUpdate);
    } else if (!isBillingAddress) {
      setShippingDetails(prevDetails => ({
        ...prevDetails,
        lastNameError: prevDetails.lastName.trim() === ''
      }));
    } else {
      setBillingDetails(prevDetails => ({
        ...prevDetails,
        lastNameError: prevDetails.lastName.trim() === ''
      }));
    }
    setReviewButtonClicked(false);
  }
  const handleCompanyNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCompanyName = event.target.value;

    if (!isBillingAddress) {
      setShippingDetails(prevDetails => ({
        ...prevDetails,
        companyName: newCompanyName,
      }));
    }
    if (isBillingAddress || isSameAddress) {
      setBillingDetails(prevDetails => ({
        ...prevDetails,
        companyName: newCompanyName,
      }));
    }
  }
  const handleAddressLineOneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAddressLineOneChange = event.target.value;

    if (!isBillingAddress) {
      setShippingDetails(prevDetails => ({
        ...prevDetails,
        addressLineOne: newAddressLineOneChange,
        addressLineOneError: newAddressLineOneChange.trim() === ''
      }));
    }
    if (isBillingAddress || isSameAddress) {
      setBillingDetails(prevDetails => ({
        ...prevDetails,
        addressLineOne: newAddressLineOneChange,
        addressLineOneError: newAddressLineOneChange.trim() === ''
      }));
    }
  }
  const handleAddressLineOneBlur = (userClickOrEvent: any) => {
    const wasReviewButtonClicked = typeof userClickOrEvent === 'boolean' ? userClickOrEvent : false;
    const shouldValidate = wasReviewButtonClicked || reviewButtonClicked;

    if (shouldValidate) {
      const commonUpdate: any = (prevDetails: { addressLineOne: string; }) => ({
        ...prevDetails,
        addressLineOneError: prevDetails.addressLineOne.trim() === ''
      });
      setShippingDetails(commonUpdate);
      setBillingDetails(commonUpdate);
    } else if (!isBillingAddress) {
      setShippingDetails(prevDetails => ({
        ...prevDetails,
        addressLineOneError: prevDetails.addressLineOne.trim() === ''
      }));
    } else {
      setBillingDetails(prevDetails => ({
        ...prevDetails,
        addressLineOneError: prevDetails.addressLineOne.trim() === ''
      }));
    }
    setReviewButtonClicked(false);
  };
  const handleAddressLineTwoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAddressLineTwoChange = event.target.value;

    if (!isBillingAddress) {
      setShippingDetails(prevDetails => ({
        ...prevDetails,
        addressLineTwo: newAddressLineTwoChange,
        addressLineTwoError: prevDetails.addressLineTwo.trim() === ''
      }));
    }
    if (isBillingAddress || isSameAddress) {
      setBillingDetails(prevDetails => ({
        ...prevDetails,
        addressLineTwo: newAddressLineTwoChange,
        addressLineTwoError: prevDetails.addressLineTwo.trim() === ''
      }));
    }
  }
  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCityChange = event.target.value;

    if (!isBillingAddress) {
      setShippingDetails(prevDetails => ({
        ...prevDetails,
        city: newCityChange,
        cityError: newCityChange.trim() === ''
      }));
    }
    if (isBillingAddress || isSameAddress) {
      setBillingDetails(prevDetails => ({
        ...prevDetails,
        city: newCityChange,
        cityError: newCityChange.trim() === ''
      }));
    }
  }
  const handleCityBlur = (userClickOrEvent: any) => {
    const wasReviewButtonClicked = typeof userClickOrEvent === 'boolean' ? userClickOrEvent : false;
    const shouldValidate = wasReviewButtonClicked || reviewButtonClicked;

    if (shouldValidate) {
      const commonUpdate: any = (prevDetails: { city: string; }) => ({
        ...prevDetails,
        cityError: prevDetails.city.trim() === ''
      });
      setShippingDetails(commonUpdate);
      setBillingDetails(commonUpdate);
    } else if (!isBillingAddress) {
      setShippingDetails(prevDetails => ({
        ...prevDetails,
        cityError: prevDetails.city.trim() === ''
      }));
    } else {
      setBillingDetails(prevDetails => ({
        ...prevDetails,
        cityError: prevDetails.city.trim() === ''
      }));
    }
    setReviewButtonClicked(false);
  };
  const handleZipcodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newZipcodeChange = event.target.value;

    if (!isBillingAddress) {
      setShippingDetails(prevDetails => ({
        ...prevDetails,
        zipcode: newZipcodeChange,
        zipcodeError: newZipcodeChange.trim() === ''
      }));
    }
    if (isBillingAddress || isSameAddress) {
      setBillingDetails(prevDetails => ({
        ...prevDetails,
        zipcode: newZipcodeChange,
        zipcodeError: newZipcodeChange.trim() === ''
      }));
    }
  }
  const handleZipcodeBlur = (userClickOrEvent: any) => {
    const wasReviewButtonClicked = typeof userClickOrEvent === 'boolean' ? userClickOrEvent : false;
    const shouldValidate = wasReviewButtonClicked || reviewButtonClicked;

    if (shouldValidate) {
      const commonUpdate: any = (prevDetails: { zipcode: string; }) => ({
        ...prevDetails,
        zipcodeError: prevDetails.zipcode.trim() === ''
      });
      setShippingDetails(commonUpdate);
      setBillingDetails(commonUpdate);
    } else if (!isBillingAddress) {
      setShippingDetails(prevDetails => ({
        ...prevDetails,
        zipcodeError: prevDetails.zipcode.trim() === ''
      }));
    } else {
      setBillingDetails(prevDetails => ({
        ...prevDetails,
        zipcodeError: prevDetails.zipcode.trim() === ''
      }));
    }
    setReviewButtonClicked(false);
  };
  const handleDiscountCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCode = event.target.value;
    setDiscountCode(newCode);
    setIsCodeValid(newCode.trim().length !== 0);
    setDisplayInvalidCodeMessage(false);
  }
  const toggleBillingAddress = () => {
    setIsBillingAddress(true);
  };
  const toggleShippingAddress = () => {
    setIsBillingAddress(false);
  };
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

  const handleContinueToPaymentButtonClick = () => {
    setIsNavigating(true);
    setTimeout(() =>{
      setIsNavigating(false);
      if (isContinuedToPayment) {
        setIsContinuedToPayment(false);
      } else {
        setIsContinuedToPayment(true);
      }
    }, 1000)
  };


  // const updateContactDetails = (firstName: string) => {
  //   setContactDetails({
  //     shippingDetails: { ...shippingDetails, firstName },
  //     billingDetails: { ...billingDetails }
  //   });
  // };
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
    localStorage.setItem('billingFirstName', billingDetails.firstName);
    localStorage.setItem('billingLastName', billingDetails.lastName);
    localStorage.setItem('billingCompanyName', billingDetails.companyName);
    localStorage.setItem('billingAddressLineOne', billingDetails.addressLineOne);
    localStorage.setItem('billingAddressLineTwo', billingDetails.addressLineTwo);
    localStorage.setItem('billingCity', billingDetails.city);
    localStorage.setItem('billingState', billingDetails.state);
    localStorage.setItem('billingCountry', billingDetails.country);
    localStorage.setItem('billingZipcode', billingDetails.zipcode);
  }
  const handleReviewButtonClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setReviewButtonClicked(true);

    if (isFormValid) {
      // updateContactDetails(shippingDetails.firstName)
      saveToLocalStorage();
      setIsReviewing(true);
      setIsReviewed(false);
      setTimeout(() => {
        setIsReviewing(false);
        setIsReviewed(true);
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
      setBillingError(true);
    }
  };

  const handleCancelButtonClick = () => {
    setIsReviewed(false);
  };

  const toggleSameAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newIsSameAddress = event.target.checked;
    setIsSameAddress(!isSameAddress);

    if (newIsSameAddress) {
      setIsSameAddress(true);
      setBillingDetails({
        ...shippingDetails,
      });
    }
    // else {
    //   setIsSameAddress(false);
    //   setBillingDetails({
    //     firstName: '',
    //     lastName: '',
    //     address: '',
    //     city: '',
    //     zipcode: '',
    //     firstNameError: false,
    //     lastNameError: false,
    //     addressLineOneError: false,
    //     cityError: false,
    //     zipcodeError: false,
    //   });
    // }
  }

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
    if (billingDetails.country) {
      const newBillingStates = State.getStatesOfCountry(billingDetails.country);
      // @ts-ignore
      setBillingStates(newBillingStates);
    }
  }, [billingDetails.country]);

  useEffect(() => {
    const validateShippingDetails = (shipping: any) => {
      return (
        shipping.firstName.trim() !== '' &&
        shipping.lastName.trim() !== '' &&
        shipping.addressLineOne.trim() !== '' &&
        shipping.city.trim() !== '' &&
        shipping.zipcode.trim() !== ''
      );
    };
    const validateBillingDetails = (billing: any) => {
      return (
        billing.firstName.trim() !== '' &&
        billing.lastName.trim() !== '' &&
        billing.addressLineOne.trim() !== '' &&
        billing.city.trim() !== '' &&
        billing.zipcode.trim() !== ''
      );
    };
    const validateForm = (shipping: any, billing: any, email: any) => {
      return validateShippingDetails(shipping) && validateBillingDetails(billing) && emailRegex.test(email);
    };

    const formIsValid = validateForm(shippingDetails, billingDetails, email);
    const shippingIsValid = validateShippingDetails(shippingDetails);
    const billingIsValid = validateBillingDetails(billingDetails);
    setIsFormValid(formIsValid);

    // updating review btn errors in real-time
    if (formIsValid) {
      setDisplayIncompleteMessage(false);
      setShippingError(false);
      setBillingError(false);
      return;
    } else if (!formIsValid) {
      if (shippingIsValid) {
        setShippingError(false);
      }
      if (billingIsValid) {
        setBillingError(false);
      }
    }
  }, [shippingDetails, billingDetails, email]);


  return (
    <div className="mx-auto flex h-screen flex-col w-full overflow-x-hidden xs:px-4 sm:px-8 md:px-8 lg:px-0">
      <div id="pageContainer"
           className={`${styles.pageContainer} pb-16 h-screen
           mx-auto flex lg:pt-12 md:pt-12 sm:pt-2 xs:pt-2 xs:max-w-532px xs:flex-col-reverse sm:max-w-532px sm:flex-col-reverse md:w-full md:flex-row md:justify-between lg:w-1120px lg:flex-row lg:justify-between`}>

        <div id="leftContentWrapper"
             className="flex h-full flex-col sm:w-full md:w-51.5% lg:w-51.5%">
          <div id="checkoutTitle"
               className={`${isContinuedToPayment ? 'block' : 'hidden'} pt-1 md:block lg:block xl:block`}>
            <div className="flex pb-1">
              <h1 className="py-3 text-3xl">
                <a href="/">Xandria</a>
              </h1>
            </div>
          </div>
          <div id="rightContentWrapper"
               className={`${isContinuedToPayment ? 'md:hidden lg:hidden xl:hidden' : 'hidden'} relative flex flex-col pt-1 xs:w-full sm:w-full md:w-39% lg:w-39%`}>
            <div className="">
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
                         className={`${styles.summaryArrowIcon} ${isOrderSummaryHidden ? 'hidden' : 'flex'} fill-foreground pl-2`}>
                      <svg width="11" height="7" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M6.138.876L5.642.438l-.496.438L.504 4.972l.992 1.124L6.138 2l-.496.436 3.862 3.408.992-1.122L6.138.876z"></path>
                      </svg>
                    </div>
                  </button>
                </div>
                <div className="font-bold text-lg">$135.00</div>
              </div>
              <div id="borderSummary"
                   className={`${styles.borderSummary} ${isOrderSummaryHidden ? '' : styles.expanded} pr-4 `}>
                <div className="pt-6"></div>
                <div
                  className={` ${styles.scrollBar} ${styles.scrollBarContent} max-h-610px overflow-x-hidden overflow-y-auto`}>

                  {/* <boughtItem> */}
                  <div id="boughtItem">
                    <div id="boughtItemContainer"
                         className="mx-auto flex w-full items-center justify-between">
                      <div className="flex h-full items-center flex-start">
                        <div className="inline-flex h-full pr-3">
                          <Image
                            src={masterandemissarry.src}
                            alt="yuko"
                            width="60"
                            height="60"
                          />
                        </div>
                        <div
                          className="inline-flex h-full flex-col justify-center text-sm xs:w-3/4 sm:w-77% md:w-55% lg:w-64%">
                          <div className="flex font-medium">Men's Tree Dasher Relay - Arid Orange (Arid Orange
                            Sole)
                          </div>
                          <div className="flex font-light">13</div>
                        </div>
                      </div>
                      <div className="inline-flex text-sm flex-end">$135.00</div>
                    </div>
                    <div id="borderGap" className="py-6 pb-6">
                      <div className="border-b border-solid border-foreground"></div>
                    </div>
                  </div>
                  {/* <boughtItem /> */}

                  <div
                    className={`${isReviewed ? 'hidden' : ''} flex justify-between border-b-gray-50 pb-6 xs:gap-2 sm:gap-2 md:gap-4 lg:gap-4`}>
                    <div className="relative inline-flex flex-grow">
                      <input
                        type="text"
                        placeholder="Discount code or gift card"
                        value={discountCode}
                        onChange={handleDiscountCodeChange}
                        maxLength={16}
                        className="w-full items-center border border-solid bg-transparent px-2 py-4 text-sm placeholder:font-bold outline-none border-foreground placeholder-greyed-out"
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
                      className={`${styles.applyButton} inline-flex items-center border-2 border-solid rounded p-2 px-5 font-bold border-transparent
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
                  <div className={`${isReviewed ? 'border-b pb-6' : 'border-y py-6'}
              flex flex-col border-solid border-foreground`}>
                    <div className="flex justify-between pb-4">
                      <div className="inline-flex text-sm font-bold flex-start">Subtotal</div>
                      <div className="inline-flex text-sm flex-end font-bold">$135.00
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="inline-flex text-sm font-bold flex-start">Shipping</div>
                      <div className="inline-flex text-xs font-medium flex-end">Free</div>
                    </div>
                  </div>
                  <div className="flex justify-between pt-6">
                    <div className="flex">
                      <div className="text-lg font-medium">Total</div>
                    </div>
                    <div className="flex items-center">
                      <div ref={bottomRef}
                           className={`${styles.smoothScroll}
                     inline-flex text-2xl font-bold`}>
                        $135.00
                      </div>
                    </div>
                  </div>
                  <div id="shippingButton">
                    <div className={`sm:hidden xs:hidden flex justify-end pt-8`}>
                      {isReviewed && (
                        <div id="incompleteError"
                             className="flex text-sm pr-16 text-custom-red xs:w-1/2">
                          <button className="underline"
                                  onClick={handleCancelButtonClick}
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                      <a
                        href="/confirm"
                        className={`border-2 rounded font-bold p-4 border-solid
                    bg-amazon-yellow border-amazon-yellow
                    ${isReviewed ? '' : 'hidden'}`}
                      >
                        PLACE ORDER
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/*<div className="pt-8 pb-10">*/}
          {/*  <div className="border border-solid border-foreground grid grid-rows-3 grid-cols-3 text-sm">*/}
          {/*    <div className="row-border p-4">Contact</div>*/}
          {/*    <div className="row-border p-4">bobby@gmail.com</div>*/}
          {/*    <div className="row-border p-4">Change</div>*/}

          {/*    <div className="border p-4">Ship to</div>*/}
          {/*    <div className="border p-4">123 Wahroonga Avenue, Wahroonga NSW 2076, Australia</div>*/}
          {/*    <div className="border p-4">Change</div>*/}

          {/*    <div className="border-t border-solid border-foreground p-4">Shipping method</div>*/}
          {/*    <div className="border-t border-solid border-foreground p-4">Standard Shipping (5-14 business days) - Free</div>*/}
          {/*    <div className="border-t border-solid border-foreground p-4"></div>*/}
          {/*  </div>*/}

          {/*  <div className="pt-12"></div>*/}
          {/*  <div className="grid grid-cols-3 grid-rows-3 border border-solid border-foreground text-sm items-center">*/}
          {/*    <div className="border-green w-32 p-4">Contact</div>*/}
          {/*    <div className="p-4 border-red w-full">bobby@gmail.com</div>*/}
          {/*    <div className="flex justify-end w-fit p-4 border-green">Change</div>*/}
          {/*    <div>Item 4</div>*/}
          {/*    <div>Item 5</div>*/}
          {/*    <div>Item 6</div>*/}
          {/*    <div className="w-32 border-green">Shipping Method</div>*/}
          {/*    <div>Item 8</div>*/}
          {/*    <div>Item 9</div>*/}
          {/*  </div>*/}
          {/*</div>*/}

          {/*<div className="pt-8 pb-10">*/}
          {/*  <div className="border border-solid border-foreground">*/}
          {/*    <div className="flex flex-col p-4">*/}
          {/*      <div className="flex justify-between text-sm">*/}
          {/*        <div className="flex xs:flex-col">*/}
          {/*          <div className="flex border-green text-gray-400 w-fit pb-2">Contact</div>*/}
          {/*          <div className="border-red pr-8">bobby@gmail.com</div>*/}
          {/*        </div>*/}
          {/*        <div className="flex font-bold cursor-pointer">Change</div>*/}
          {/*      </div>*/}
          {/*      <div>*/}
          {/*        <div className="pt-2 xs:pt-4"></div>*/}
          {/*        <div className="border-solid border-b border-foreground"></div>*/}
          {/*        <div className="pb-4"></div>*/}
          {/*      </div>*/}
          {/*      <div className="flex justify-between text-sm">*/}
          {/*        <div className="flex xs:flex-col">*/}
          {/*          <div className="text-gray-400 border-green w-10 pb-2">Ship to</div>*/}
          {/*          <div className="border-red pr-8">123 Wahroonga Avenue, Wahroonga NSW 2076, Australia</div>*/}
          {/*        </div>*/}
          {/*        <div className="flex font-bold cursor-pointer">Change</div>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}

          <div className="pt-8 pb-10">
            <div className="border border-solid border-foreground">
              <div className="flex flex-col p-4">
                <div className="flex justify-between text-sm">
                  <div className="flex xs:flex-col">
                    <div className="flex text-gray-400 w-16 pb-2">Contact</div>
                    <div className="pr-8 flex w-full flex-1">bobby@gmail.com</div>
                  </div>
                  <div className="flex font-bold cursor-pointer">Change</div>
                </div>
                <div>
                  <div className="pt-2 xs:pt-4"></div>
                  <div className="border-solid border-b border-foreground"></div>
                  <div className="pb-4"></div>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="flex xs:flex-col">
                    <div className="text-gray-400 flex-start w-16 pb-2">Ship to</div>
                    <div className="w-full flex flex-1 pr-8">123 Wahroonga Avenue, Wahroonga NSW 2076, Australia</div>
                  </div>
                  <div className="flex font-bold cursor-pointer">Change</div>
                </div>
              </div>
            </div>
          </div>

          <div className={`transition-opacity duration-1000 ${isContinuedToPayment ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 h-auto'} border-blue `}>
            <div id="shippingReturnContinueContainer">
              <div className="pb-6">
                <div className="flex w-1/2 pb-4 text-xl font-bold">
                  Shipping method
                </div>
                <div className="border border-solid border-foreground">
                  <div className="p-4">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex text-gray-400 pr-2">
                        <input type="radio" className="form-radio accent-gray-600" checked/>
                      </div>
                      <div className="flex flex-1">Standard Shipping (5-14 business days)</div>
                      <div className="flex font-bold cursor-pointer">Free</div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="flex flex-row-reverse xs:flex-col xl:items-center lg:items-center md:items-center sm:items-center sm:justify-between md:justify-between lg:justify-between xl:justify-between">
                <div className="pb-4">
                  <div id="reviewOrderButton"
                          onClick={handleContinueToPaymentButtonClick}
                          className={`${isNavigating ? 'bg-transparent border-transparent cursor-default hover:border-transparent' : ''}border-2 rounded w-full font-bold p-3 border-solid border-transparent hover:bg-transparent hover:border-foreground bg-shopify-blue transition duration-200`}
                          type="button"
                  >
                    {isNavigating ? (
                      <button className={styles.loader}></button>
                    ) : (
                      <button className="flex mx-auto">CONTINUE TO PAYMENT</button>
                    )}
                  </div>
                </div>

                <div className="pb-4">
                  <div>
                    <div className="sm:px-4 xs:px-4 py-2">
                      <div className="flex justify-center items-center text-sm font-bold cursor-pointer">
                        <div className="fill-white pr-1">
                          <svg className="-rotate-90" width="11" height="7" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M6.138.876L5.642.438l-.496.438L.504 4.972l.992 1.124L6.138 2l-.496.436 3.862 3.408.992-1.122L6.138.876z"></path>
                          </svg>
                        </div>
                        <div className="flex">Return to information</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>

          </div>

          <div className={`transition-opacity duration-1000 ${!isContinuedToPayment ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 h-auto'} `}>            <div
              className={`${isReviewed ? 'hidden' : ''} ${isOrderSummaryHidden ? '' : 'hidden'} flex justify-between border-b-gray-50 pb-6 md:hidden lg:hidden xl:hidden xs:gap-2 sm:gap-2 md:gap-4 lg:gap-4`}>
              <div className="relative inline-flex flex-grow">
                <input
                  type="text"
                  placeholder="Discount code or gift card"
                  value={discountCode}
                  onChange={handleDiscountCodeChange}
                  maxLength={16}
                  className="w-full items-center border border-solid bg-transparent px-2 py-4 text-sm placeholder:font-bold outline-none border-foreground placeholder-greyed-out"
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
                className={`${styles.applyButton}  inline-flex items-center border-2 border-solid rounded p-2 px-5 font-bold border-transparent
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

            <div className="p-2"></div>

            <div id="paymentContainer" className="">
              <div className="pb-6">
                <div className="w-1/2 text-xl font-bold">
                  Payment
                </div>
                <div className="text-sm">
                  All transactions are secured and encrypted.
                </div>
              </div>
              <div className="border border-solid border-foreground text-sm">
                <div className="">
                  <div
                    className="flex justify-between mx-auto items-center p-4 border-b border-solid border-foreground">
                    <div className="flex items-center">
                      <div className="pr-2">
                        <input type="radio" className="form-radio accent-gray-600" checked/>
                      </div>
                      <div className="pr-2">
                        Credit card
                      </div>
                    </div>
                    <div className="flex">
                      <div className="pr-2">
                          <span>
                               <svg
                                 className={`cursor-default`}
                                 width="2.5em" height="2em"
                                 enable-background="new 0 0 780 500" viewBox="0 0 780 500" xmlns="http://www.w3.org/2000/svg">
                                   <rect x="0" y="0" width="780" height="500" fill="#fff" stroke="#000" stroke-width="15" rx="65" ry="65"/>

                                 <path d="m293.2 348.73 33.359-195.76h53.358l-33.384 195.76zm246.11-191.54c-10.569-3.966-27.135-8.222-47.821-8.222-52.726 0-89.863 26.551-90.181 64.604-.297 28.129 26.515 43.822 46.754 53.185 20.771 9.598 27.752 15.716 27.652 24.283-.133 13.123-16.586 19.115-31.924 19.115-21.355 0-32.701-2.967-50.225-10.273l-6.878-3.111-7.487 43.822c12.463 5.467 35.508 10.199 59.438 10.445 56.09 0 92.502-26.248 92.916-66.885.199-22.27-14.016-39.215-44.801-53.188-18.65-9.056-30.072-15.099-29.951-24.269 0-8.137 9.668-16.838 30.56-16.838 17.446-.271 30.088 3.534 39.936 7.5l4.781 2.259zm137.31-4.223h-41.23c-12.772 0-22.332 3.486-27.94 16.234l-79.245 179.4h56.031s9.159-24.121 11.231-29.418c6.123 0 60.555.084 68.336.084 1.596 6.854 6.492 29.334 6.492 29.334h49.512l-43.187-195.64zm-65.417 126.41c4.414-11.279 21.26-54.724 21.26-54.724-.314.521 4.381-11.334 7.074-18.684l3.606 16.878s10.217 46.729 12.353 56.527h-44.293zm-363.3-126.41-52.239 133.5-5.565-27.129c-9.726-31.274-40.025-65.157-73.898-82.12l47.767 171.2 56.455-.063 84.004-195.39-56.524-.001" fill="#0e4595"/><path d="m146.92 152.96h-86.041l-.682 4.073c66.939 16.204 111.23 55.363 129.62 102.42l-18.709-89.96c-3.229-12.396-12.597-16.096-24.186-16.528" fill="#f2ae14"/></svg>
                          </span>
                      </div>
                      <div className="">
                          <div className="overflow-hidden h-[2em] w-[3em] rounded-lg">
                            <svg
                              className={`cursor-default w-full h-full block`}
                              width="2.5em" height="2em"
                              enable-background="new 0 0 780 500" viewBox="0 0 780 500"
                              xmlns="http://www.w3.org/2000/svg">
                              <path d="m0 0h780v500h-780z" fill="#fff" stroke="#000" stroke-width="15"/>
                              <path
                                d="m449.01 250c0 99.143-80.371 179.5-179.51 179.5s-179.5-80.361-179.5-179.5c0-99.133 80.362-179.5 179.5-179.5 99.137 0 179.51 80.371 179.51 179.5"
                                fill="#d9222a"/>
                              <path
                                d="m510.49 70.496c-46.379 0-88.643 17.596-120.5 46.467-6.49 5.889-12.548 12.237-18.125 18.996h36.267c4.965 6.037 9.536 12.387 13.685 19.012h-63.635c-3.827 6.122-7.281 12.469-10.342 19.008h84.313c2.894 6.185 5.431 12.53 7.601 19.004h-99.513c-2.09 6.234-3.832 12.58-5.217 19.008h109.94c2.689 12.49 4.045 25.231 4.042 38.008 0 19.935-3.254 39.112-9.254 57.021h-99.513c2.164 6.477 4.7 12.824 7.596 19.008h84.316c-3.063 6.541-6.519 12.889-10.347 19.013h-63.625c4.147 6.62 8.719 12.966 13.685 18.996h36.259c-5.57 6.772-11.63 13.127-18.13 19.013 31.857 28.866 74.117 46.454 120.5 46.454 99.139 0 179.51-80.361 179.51-179.5 0-99.129-80.371-179.5-179.51-179.5"
                                fill="#ee9f2d"/>
                              <path
                                d="m666.07 350.06c0-3.199 2.592-5.801 5.796-5.801s5.796 2.602 5.796 5.801-2.592 5.801-5.796 5.801-5.796-2.602-5.796-5.801zm5.796 4.408c2.434-.001 4.407-1.974 4.408-4.408 0-2.432-1.971-4.402-4.402-4.404h-.006c-2.429-.003-4.4 1.963-4.404 4.391v.014c-.002 2.433 1.968 4.406 4.4 4.408.001-.001.003-.001.004-.001zm-.783-1.86h-1.187v-5.096h2.149c.45 0 .908 0 1.305.254.413.279.646.771.646 1.279 0 .571-.338 1.104-.884 1.312l.938 2.25h-1.315l-.779-2.017h-.871zm0-2.89h.658c.246 0 .505.021.726-.1.195-.125.296-.359.296-.584-.005-.209-.112-.402-.288-.518-.207-.129-.536-.101-.758-.101h-.634zm-443.5-80.063c-2.046-.238-2.945-.301-4.35-.301-11.046 0-16.638 3.787-16.638 11.268 0 4.611 2.729 7.545 6.987 7.545 7.939 0 13.659-7.559 14.001-18.512zm14.171 32.996h-16.146l.371-7.676c-4.926 6.065-11.496 8.949-20.426 8.949-10.563 0-17.804-8.25-17.804-20.229 0-18.024 12.596-28.541 34.217-28.541 2.208 0 5.042.199 7.941.57.604-2.441.763-3.488.763-4.801 0-4.908-3.396-6.737-12.5-6.737-9.533-.108-17.396 2.271-20.625 3.333.204-1.229 2.7-16.659 2.7-16.659 9.712-2.846 16.116-3.917 23.325-3.917 16.732 0 25.596 7.513 25.579 21.712.033 3.805-.597 8.5-1.579 14.671-1.691 10.734-5.32 33.721-5.816 39.325zm-62.158 0h-19.487l11.162-69.997-24.925 69.997h-13.279l-1.642-69.597-11.733 69.597h-18.242l15.237-91.056h28.021l1.7 50.968 17.092-50.968h31.167zm354.97-32.996c-2.037-.238-2.941-.301-4.342-.301-11.041 0-16.634 3.787-16.634 11.268 0 4.611 2.726 7.545 6.983 7.545 7.94 0 13.664-7.559 13.993-18.512zm14.184 32.996h-16.146l.366-7.676c-4.926 6.065-11.5 8.949-20.422 8.949-10.565 0-17.8-8.25-17.8-20.229 0-18.024 12.588-28.541 34.213-28.541 2.208 0 5.037.199 7.934.57.604-2.441.763-3.488.763-4.801 0-4.908-3.392-6.737-12.496-6.737-9.533-.108-17.387 2.271-20.629 3.333.204-1.229 2.709-16.659 2.709-16.659 9.712-2.846 16.112-3.917 23.313-3.917 16.74 0 25.604 7.513 25.587 21.712.032 3.805-.597 8.5-1.579 14.671-1.684 10.734-5.321 33.721-5.813 39.325zm-220.39-1.125c-5.333 1.679-9.491 2.398-14 2.398-9.962 0-15.399-5.725-15.399-16.267-.142-3.271 1.433-11.88 2.671-19.737 1.125-6.917 8.449-50.529 8.449-50.529h19.371l-2.263 11.208h11.699l-2.642 17.796h-11.742c-2.25 14.083-5.454 31.625-5.491 33.95 0 3.816 2.037 5.483 6.671 5.483 2.221 0 3.94-.227 5.254-.7zm59.392-.6c-6.654 2.034-13.075 3.017-19.879 3-21.684-.021-32.987-11.346-32.987-33.032 0-25.313 14.38-43.947 33.899-43.947 15.971 0 26.171 10.433 26.171 26.796 0 5.429-.7 10.729-2.388 18.212h-38.574c-1.305 10.741 5.57 15.217 16.837 15.217 6.935 0 13.188-1.429 20.142-4.663zm-10.888-43.9c.107-1.543 2.055-13.217-9.013-13.217-6.171 0-10.583 4.704-12.38 13.217zm-123.42-5.017c0 9.367 4.542 15.826 14.842 20.676 7.892 3.709 9.112 4.81 9.112 8.17 0 4.617-3.479 6.701-11.191 6.701-5.813 0-11.221-.908-17.458-2.922 0 0-2.563 16.321-2.68 17.102 4.43.967 8.38 1.861 20.279 2.19 20.563 0 30.059-7.829 30.059-24.75 0-10.175-3.976-16.146-13.737-20.634-8.171-3.75-9.108-4.587-9.108-8.045 0-4.004 3.237-6.046 9.537-6.046 3.825 0 9.05.408 14 1.112l2.775-17.175c-5.046-.8-12.696-1.442-17.15-1.442-21.801.001-29.347 11.388-29.28 25.063m229.09-23.116c5.412 0 10.458 1.421 17.412 4.921l3.188-19.763c-2.854-1.121-12.904-7.7-21.417-7.7-13.041 0-24.065 6.471-31.82 17.15-11.309-3.746-15.958 3.825-21.657 11.367l-5.063 1.179c.383-2.483.729-4.95.612-7.446h-17.896c-2.445 22.917-6.778 46.128-10.171 69.075l-.884 4.976h19.496c3.254-21.143 5.037-34.68 6.121-43.842l7.341-4.084c1.097-4.078 4.529-5.458 11.417-5.291-.926 5.008-1.389 10.091-1.383 15.184 0 24.225 13.07 39.308 34.05 39.308 5.404 0 10.041-.712 17.221-2.658l3.43-20.759c-6.458 3.181-11.759 4.677-16.559 4.677-11.329 0-18.184-8.363-18.184-22.185 0-20.051 10.196-34.109 24.746-34.109"/>
                              <path
                                d="m185.21 297.24h-19.491l11.171-69.988-24.926 69.988h-13.283l-1.642-69.588-11.733 69.588h-18.241l15.237-91.042h28.021l.788 56.362 18.904-56.362h30.267z"
                                fill="#fff"/>
                              <path
                                d="m647.52 211.6-4.321 26.309c-5.329-7.013-11.054-12.088-18.612-12.088-9.833 0-18.783 7.455-24.642 18.425-8.158-1.692-16.597-4.563-16.597-4.563l-.004.067c.658-6.134.921-9.875.862-11.146h-17.9c-2.438 22.917-6.771 46.128-10.157 69.075l-.893 4.976h19.492c2.633-17.096 4.648-31.291 6.133-42.551 6.658-6.016 9.992-11.266 16.721-10.916-2.979 7.205-4.725 15.503-4.725 24.017 0 18.513 9.366 30.725 23.533 30.725 7.142 0 12.621-2.462 17.967-8.171l-.913 6.884h18.435l14.842-91.042zm-24.371 73.941c-6.634 0-9.983-4.908-9.983-14.596 0-14.555 6.271-24.875 15.112-24.875 6.695 0 10.32 5.104 10.32 14.509.001 14.679-6.37 24.962-15.449 24.962z"/>
                              <path
                                d="m233.19 264.26c-2.042-.236-2.946-.299-4.346-.299-11.046 0-16.634 3.787-16.634 11.266 0 4.604 2.729 7.547 6.979 7.547 7.947-.001 13.668-7.559 14.001-18.514zm14.178 32.984h-16.146l.367-7.663c-4.921 6.054-11.5 8.95-20.421 8.95-10.567 0-17.805-8.25-17.805-20.229 0-18.032 12.592-28.542 34.217-28.542 2.208 0 5.042.2 7.938.571.604-2.441.763-3.487.763-4.808 0-4.909-3.392-6.729-12.496-6.729-9.537-.108-17.396 2.271-20.629 3.321.204-1.225 2.7-16.637 2.7-16.637 9.708-2.858 16.12-3.929 23.32-3.929 16.737 0 25.604 7.517 25.588 21.704.029 3.821-.604 8.513-1.584 14.675-1.687 10.724-5.319 33.724-5.812 39.316zm261.38-88.592-3.191 19.767c-6.95-3.496-12-4.92-17.407-4.92-14.551 0-24.75 14.058-24.75 34.106 0 13.821 6.857 22.181 18.184 22.181 4.8 0 10.096-1.492 16.554-4.675l-3.421 20.75c-7.184 1.957-11.816 2.67-17.225 2.67-20.977 0-34.051-15.084-34.051-39.309 0-32.55 18.059-55.3 43.888-55.3 8.507.001 18.561 3.609 21.419 4.73m31.443 55.608c-2.041-.236-2.941-.299-4.347-.299-11.041 0-16.633 3.787-16.633 11.266 0 4.604 2.729 7.547 6.983 7.547 7.938-.001 13.663-7.559 13.997-18.514zm14.178 32.984h-16.15l.371-7.663c-4.925 6.054-11.5 8.95-20.421 8.95-10.563 0-17.804-8.25-17.804-20.229 0-18.032 12.596-28.542 34.212-28.542 2.213 0 5.042.2 7.941.571.601-2.441.763-3.487.763-4.808 0-4.909-3.393-6.729-12.495-6.729-9.533-.108-17.396 2.271-20.63 3.321.204-1.225 2.704-16.637 2.704-16.637 9.709-2.858 16.116-3.929 23.316-3.929 16.741 0 25.604 7.517 25.583 21.704.033 3.821-.596 8.513-1.579 14.675-1.682 10.724-5.323 33.724-5.811 39.316zm-220.39-1.121c-5.338 1.679-9.496 2.408-14 2.408-9.962 0-15.399-5.726-15.399-16.268-.138-3.279 1.438-11.88 2.675-19.736 1.12-6.926 8.445-50.534 8.445-50.534h19.368l-2.26 11.212h9.941l-2.646 17.788h-9.975c-2.25 14.092-5.463 31.62-5.496 33.95 0 3.83 2.041 5.482 6.671 5.482 2.221 0 3.938-.216 5.254-.691zm59.391-.592c-6.65 2.033-13.079 3.012-19.879 3-21.685-.021-32.987-11.346-32.987-33.033 0-25.321 14.379-43.95 33.899-43.95 15.971 0 26.171 10.429 26.171 26.8 0 5.434-.7 10.733-2.384 18.212h-38.574c-1.306 10.741 5.569 15.222 16.837 15.222 6.93 0 13.188-1.435 20.138-4.677zm-10.891-43.912c.116-1.538 2.06-13.217-9.013-13.217-6.167 0-10.579 4.717-12.375 13.217zm-123.42-5.005c0 9.367 4.542 15.818 14.842 20.675 7.892 3.709 9.112 4.812 9.112 8.172 0 4.616-3.483 6.699-11.188 6.699-5.816 0-11.225-.908-17.467-2.921 0 0-2.554 16.321-2.671 17.101 4.421.967 8.375 1.85 20.275 2.191 20.566 0 30.059-7.829 30.059-24.746 0-10.18-3.971-16.15-13.737-20.637-8.167-3.759-9.113-4.584-9.113-8.046 0-4 3.246-6.059 9.542-6.059 3.821 0 9.046.421 14.004 1.125l2.771-17.179c-5.042-.8-12.692-1.441-17.146-1.441-21.804 0-29.346 11.379-29.283 25.066m398.45 50.63h-18.438l.917-6.893c-5.347 5.717-10.825 8.18-17.968 8.18-14.166 0-23.528-12.213-23.528-30.726 0-24.63 14.521-45.392 31.708-45.392 7.559 0 13.279 3.087 18.604 10.096l4.325-26.308h19.221zm-28.746-17.109c9.075 0 15.45-10.283 15.45-24.953 0-9.405-3.629-14.509-10.325-14.509-8.837 0-15.115 10.315-15.115 24.875-.001 9.686 3.357 14.587 9.99 14.587zm-56.842-56.929c-2.441 22.917-6.773 46.13-10.162 69.063l-.892 4.976h19.491c6.972-45.275 8.658-54.117 19.588-53.009 1.742-9.267 4.982-17.383 7.399-21.479-8.163-1.7-12.721 2.913-18.688 11.675.471-3.788 1.333-7.467 1.162-11.225zm-160.42 0c-2.446 22.917-6.779 46.13-10.167 69.063l-.888 4.976h19.5c6.963-45.275 8.646-54.117 19.57-53.009 1.75-9.267 4.991-17.383 7.399-21.479-8.154-1.7-12.717 2.913-18.679 11.675.471-3.788 1.324-7.467 1.162-11.225zm254.57 68.241c-.004-3.199 2.586-5.795 5.784-5.799h.012c3.197-.004 5.793 2.586 5.796 5.783v.016c-.001 3.201-2.595 5.795-5.796 5.797-3.201-.002-5.795-2.596-5.796-5.797zm5.796 4.405c2.431.002 4.402-1.969 4.403-4.399v-.004c.003-2.433-1.968-4.406-4.399-4.408h-.004c-2.435.001-4.407 1.974-4.408 4.408.002 2.432 1.975 4.403 4.408 4.403zm-.784-1.871h-1.188v-5.082h2.153c.446 0 .909.009 1.296.254.417.283.654.767.654 1.274 0 .575-.337 1.112-.888 1.317l.941 2.236h-1.32l-.779-2.009h-.87zm0-2.879h.653c.246 0 .513.019.729-.1.196-.125.296-.361.296-.588-.009-.21-.114-.404-.287-.523-.204-.117-.542-.084-.763-.084h-.629z"
                                fill="#fff"/>
                            </svg>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex flex-col p-4">
                    <div className="">
                      <div className="border border-solid border-foreground w-full">
                        <div className="p-3">Card Number</div>
                      </div>
                      <div className="pt-3"></div>
                      <div className="border border-solid border-foreground w-full">
                        <div className="p-3">
                          Name on card
                        </div>
                      </div>
                      <div className="pt-3"></div>
                      <div className="flex">
                        <div className="border border-solid border-foreground w-full">
                          <div className="p-3">
                            Expiration Date
                          </div>
                        </div>
                        <div className="pr-3"></div>
                        <div className="border border-solid border-foreground w-full">
                          <div className="p-3">
                            Security Code
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="py-5"></div>

            <div>
              <div className="pb-6">
                <div className="w-1/2 text-xl font-bold">
                  Billing Address
                </div>
                <div className="text-sm">
                  Select the address that matches your card or payment method.
                </div>
              </div>
              <div className="border border-solid border-foreground">
                <div className="flex flex-col">
                  <div className="flex text-sm">
                    <div className="flex items-center p-4">
                      <div className="pr-2">
                        <input id="shippingAddressCheck" type="radio" name="addressType" className="form-radio cursor-pointer accent-gray-600" checked/>
                      </div>
                      <label htmlFor="shippingAddressCheck" className="cursor-pointer">Same as shipping address</label>
                    </div>
                  </div>
                  <div className="border-b border-solid border-foreground">
                  </div>
                  <div className="flex justify-between text-sm">
                    <div className="flex p-4">
                      <div className="pr-2">
                        <input id="billingAddressCheck" type="radio" name="addressType" className="form-radio cursor-pointer accent-gray-600"/>
                      </div>
                      <label htmlFor="billingAddressCheck" className="cursor-pointer">Use a different billing address</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="py-3"></div>

            <div
              className="flex flex-row-reverse xs:flex-col xl:items-center lg:items-center md:items-center sm:items-center sm:justify-between md:justify-between lg:justify-between xl:justify-between">
              <div className="pb-4">
                <button id="reviewOrderButton"
                        className={`border-2 rounded w-full font-bold px-6 py-3 border-solid border-transparent hover:bg-transparent hover:border-foreground bg-shopify-blue transition duration-200`}
                        type="button"
                >
                  PAY NOW
                </button>
              </div>

              <div className="pb-4">
                <div>
                  <div className="sm:px-4 xs:px-4 py-2">
                    <div className={`flex justify-center items-center text-sm font-bold ${isNavigating ? 'cursor-default' : 'cursor-pointer'} `}>
                      <div className="fill-white pr-2">
                        <svg className={`${isNavigating ? 'hidden' : ''} `} width="11" height="7" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M6.138.876L5.642.438l-.496.438L.504 4.972l.992 1.124L6.138 2l-.496.436 3.862 3.408.992-1.122L6.138.876z"></path>
                        </svg>
                      </div>
                      <div className="flex"
                           onClick={handleContinueToPaymentButtonClick}
                      >
                      {isNavigating ? (
                        <button className={styles.loader}></button>
                      ) : (
                        <button>Return to shipping</button>
                      )}
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="py-5"></div>

            <div id="finePrintContainer"
                 className="text-sm">
              <div>
                <div>
                  Foreign transaction fees may apply.
                </div>
                <div>
                  Please check with your financial institution.
                </div>
              </div>
              <div className="py-2"></div>
              <div>
                By placing this order, you agree to our <span
                className="cursor-pointer underline text-link-blue font-bold">Terms of Service</span> and understand
                our <span className="cursor-pointer underline text-link-blue font-bold">Privacy Policy</span>.
              </div>
            </div>
          </div>

          <div className="pb-4"></div>
          <div id="checkoutFooter"
               className="xl:h-full lg:h-full md:h-full xl:items-end lg:items-end md:items-end flex justify-start w-full sm:pt-16 xs:pt-6 py-3 text-xs font-bold text-gray-500 mx-auto">
            <div className="flex border-t border-solid border-foreground pt-3 w-full">
              <div className="pr-4 cursor-pointer">Refund Policy</div>
              <div className="pr-4 cursor-pointer">Privacy Policy</div>
              <div className="pr-4 cursor-pointer">Terms of Service</div>
            </div>
          </div>
        </div>

        <div id="rightContentWrapper"
             className={`${isContinuedToPayment ? 'xs:hidden sm:hidden' : ''} relative flex flex-col pt-1 xs:w-full sm:w-full md:w-39% lg:w-39%`}>
          <div className="">
            <div id="checkoutTitle"
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
                         className={`${styles.summaryArrowIcon} ${isOrderSummaryHidden ? 'hidden' : 'flex'} fill-foreground pl-2`}>
                      <svg width="11" height="7" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M6.138.876L5.642.438l-.496.438L.504 4.972l.992 1.124L6.138 2l-.496.436 3.862 3.408.992-1.122L6.138.876z"></path>
                      </svg>
                    </div>
                  </button>
                </div>
                <div className="font-bold text-lg">$135.00</div>
              </div>
            </div>

            <div id="borderSummary"
                 className={`${styles.borderSummary} ${isOrderSummaryHidden ? '' : styles.expanded} pr-4 `}>
              <div className="pt-6"></div>
              <div
                className={` ${styles.scrollBar} ${styles.scrollBarContent} max-h-610px overflow-x-hidden overflow-y-auto`}>

                {/* <boughtItem> */}
                <div id="boughtItem">
                  <div id="boughtItemContainer"
                       className="mx-auto flex w-full items-center justify-between">
                    <div className="flex h-full items-center flex-start">
                      <div className="inline-flex h-full pr-3">
                        <Image
                          src={masterandemissarry.src}
                          alt="yuko"
                          width="60"
                          height="60"
                        />
                      </div>
                      <div
                        className="inline-flex h-full flex-col justify-center text-sm xs:w-3/4 sm:w-77% md:w-55% lg:w-64%">
                        <div className="flex font-medium">Men's Tree Dasher Relay - Arid Orange (Arid Orange
                          Sole)
                        </div>
                        <div className="flex font-light">13</div>
                      </div>
                    </div>
                    <div className="inline-flex text-sm flex-end">$135.00</div>
                  </div>
                  <div id="borderGap" className="py-6 pb-6">
                    <div className="border-b border-solid border-foreground"></div>
                  </div>
                </div>
                {/* <boughtItem /> */}

                <div
                  className={`${isReviewed ? 'hidden' : ''} flex justify-between border-b-gray-50 pb-6 xs:gap-2 sm:gap-2 md:gap-4 lg:gap-4`}>
                  <div className="relative inline-flex flex-grow">
                    <input
                      type="text"
                      placeholder="Discount code or gift card"
                      value={discountCode}
                      onChange={handleDiscountCodeChange}
                      maxLength={16}
                      className="w-full items-center border border-solid bg-transparent px-2 py-4 text-sm placeholder:font-bold outline-none border-foreground placeholder-greyed-out"
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
                    className={`${styles.applyButton} inline-flex items-center border-2 border-solid rounded p-2 px-5 font-bold border-transparent
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
                <div className={`${isReviewed ? 'border-b pb-6' : 'border-y py-6'}
              flex flex-col border-solid border-foreground`}>
                  <div className="flex justify-between pb-4">
                    <div className="inline-flex text-sm font-bold flex-start">Subtotal</div>
                    <div className="inline-flex text-sm flex-end font-bold">$135.00
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="inline-flex text-sm font-bold flex-start">Shipping</div>
                    <div className="inline-flex text-xs font-medium flex-end">Free</div>
                  </div>
                </div>
                <div className="flex justify-between pt-6">
                  <div className="flex">
                    <div className="text-lg font-medium">Total</div>
                  </div>
                  <div className="flex items-center">
                    <div ref={bottomRef}
                         className={`${styles.smoothScroll}
                     inline-flex text-2xl font-bold`}>
                      $135.00
                    </div>
                  </div>
                </div>
                <div id="shippingButton">
                  <div className={`sm:hidden xs:hidden flex justify-end pt-8`}>
                    {isReviewed && (
                      <div id="incompleteError"
                           className="flex text-sm pr-16 text-custom-red xs:w-1/2">
                        <button className="underline"
                                onClick={handleCancelButtonClick}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                    <a
                      href="/confirm"
                      className={`border-2 rounded font-bold p-4 border-solid
                    bg-amazon-yellow border-amazon-yellow
                    ${isReviewed ? '' : 'hidden'}`}
                    >
                      PLACE ORDER
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>


    </div>
  );

};

export default PaymentPageContent;