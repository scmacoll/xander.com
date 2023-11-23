import styles from './Payment-Page-Content.module.scss';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import Image from "next/image";
import masterandemissarry from '../../assets/masterandemissarry.jpg';
import { Country, State, City } from 'country-state-city';

const PaymentPageContent: React.FC = () => {
  const [isContinuedToPayment, setIsContinuedToPayment] = useState(false);
  const [checkedAddressInput, setCheckedAddressInput] = useState<string>('shipping');

  const [isFocused, setIsFocused] = useState({
    country: false,
    firstName: false,
    lastName: false,
    companyName: false,
    addressLineOne: false,
    addressLineTwo: false,
    city: false,
    state:  false,
    zipcode: false,
    phone: false,
  });
  const [hasText, setHasText] = useState({
    country: false,
    firstName: false,
    lastName: false,
    companyName: false,
    addressLineOne: false,
    addressLineTwo: false,
    city: false,
    state:  false,
    zipcode: false,
    phone: false,
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
    phone: '',
    firstNameError: false,
    lastNameError: false,
    addressLineOneError: false,
    cityError: false,
    zipcodeError: false,
    phoneError: false,
  });

  const [isBillingValid, setIsBillingValid] = useState(false);
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
  const [useShippingAddress, setUseShippingAddress] = useState(true);
  const [isSameAddress, setIsSameAddress] = useState(false);
  const bottomRef = useRef<null | HTMLDivElement>(null);
  const [isOrderSummaryHidden, setOrderSummaryHidden] = useState(true);

  const phoneRegex = /^[\d\s()]*$/;  // Allow digits, spaces, and brackets
  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountry = event.target.value
    setBillingDetails(prevDetails => ({
      ...prevDetails,
      country: newCountry,
    }));
  };
  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newState = event.target.value
    setBillingDetails(prevDetails => ({
      ...prevDetails,
      state: newState,
    }));
  };
  const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFirstName = event.target.value
    setBillingDetails(prevDetails => ({
      ...prevDetails,
      firstName: newFirstName,
      firstNameError: newFirstName.trim() === ''
    }));
  };
  const handleFirstNameBlur = (userClickOrEvent: any) => {
    const wasReviewButtonClicked = typeof userClickOrEvent === 'boolean' ? userClickOrEvent : false;
    const shouldValidate = wasReviewButtonClicked || reviewButtonClicked;

    if (shouldValidate) {
      const commonUpdate: any = (prevDetails: {firstName: string;}) => ({
        ...prevDetails,
        firstNameError: prevDetails.firstName.trim() === ''
      });
      // setShippingDetails(commonUpdate);
      setBillingDetails(commonUpdate);
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
    setBillingDetails(prevDetails => ({
      ...prevDetails,
      lastName: newLastName,
      lastNameError: newLastName.trim() === ''
    }));
  }
  const handleLastNameBlur = (userClickOrEvent: any) => {
    const wasReviewButtonClicked = typeof userClickOrEvent === 'boolean' ? userClickOrEvent : false;
    const shouldValidate = wasReviewButtonClicked || reviewButtonClicked;

    if (shouldValidate) {
      const commonUpdate: any = (prevDetails: {lastName: string;}) => ({
        ...prevDetails,
        lastNameError: prevDetails.lastName.trim() === ''
      });
      // setShippingDetails(commonUpdate);
      setBillingDetails(commonUpdate);
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
    setBillingDetails(prevDetails => ({
      ...prevDetails,
      companyName: newCompanyName,
    }));
  }
  const handleAddressLineOneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAddressLineOneChange = event.target.value;
    setBillingDetails(prevDetails => ({
      ...prevDetails,
      addressLineOne: newAddressLineOneChange,
      addressLineOneError: newAddressLineOneChange.trim() === ''
    }));
  }
  const handleAddressLineOneBlur = (userClickOrEvent: any) => {
    const wasReviewButtonClicked = typeof userClickOrEvent === 'boolean' ? userClickOrEvent : false;
    const shouldValidate = wasReviewButtonClicked || reviewButtonClicked;

    if (shouldValidate) {
      const commonUpdate: any = (prevDetails: {addressLineOne: string;}) => ({
        ...prevDetails,
        addressLineOneError: prevDetails.addressLineOne.trim() === ''
      });
      // setShippingDetails(commonUpdate);
      setBillingDetails(commonUpdate);
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

    setBillingDetails(prevDetails => ({
      ...prevDetails,
      addressLineTwo: newAddressLineTwoChange,
      addressLineTwoError: prevDetails.addressLineTwo.trim() === ''
    }));
  }
  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPhone = event.target.value;

    setBillingDetails(prevDetails => ({
      ...prevDetails,
      phone: newPhone,
      phoneError: prevDetails.phone.trim() !== '' && !phoneRegex.test(prevDetails.phone)
    }));
  };
  const handlePhoneBlur = (userClickOrEvent: any) => {
    const wasReviewButtonClicked = typeof userClickOrEvent === 'boolean' ? userClickOrEvent : false;
    const shouldValidate = wasReviewButtonClicked || reviewButtonClicked;

    if (shouldValidate) {
      const commonUpdate: any = (prevDetails: {phone: string;}) => ({
        ...prevDetails,
        phoneError: prevDetails.phone.trim() !== '' && !phoneRegex.test(prevDetails.phone)
      });
      // setShippingDetails(commonUpdate);
      setBillingDetails(commonUpdate);
    } else {
      setBillingDetails(prevDetails => ({
        ...prevDetails,
        phoneError: prevDetails.phone.trim() !== '' && !phoneRegex.test(prevDetails.phone)
      }));
    }
    setReviewButtonClicked(false);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCityChange = event.target.value;
    setBillingDetails(prevDetails => ({
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
      const commonUpdate: any = (prevDetails: {city: string;}) => ({
        ...prevDetails,
        cityError: prevDetails.city.trim() === ''
      });
      // setShippingDetails(commonUpdate);
      setBillingDetails(commonUpdate);
    } else {
      setBillingDetails(prevDetails => ({
        ...prevDetails,
        cityError: prevDetails.city.trim() === ''
      }));
    }
    setIsFocused(prevDetails => ({
      ...prevDetails,
      city: false
    }))
    setReviewButtonClicked(false);
  };
  const showLabel = isFocused.city || hasText.city;
  const handleZipcodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newZipcodeChange = event.target.value;
    setBillingDetails(prevDetails => ({
      ...prevDetails,
      zipcode: newZipcodeChange,
      zipcodeError: newZipcodeChange.trim() === ''
    }));
  }
  const handleZipcodeBlur = (userClickOrEvent: any) => {
    const wasReviewButtonClicked = typeof userClickOrEvent === 'boolean' ? userClickOrEvent : false;
    const shouldValidate = wasReviewButtonClicked || reviewButtonClicked;

    if (shouldValidate) {
      const commonUpdate: any = (prevDetails: {zipcode: string;}) => ({
        ...prevDetails,
        zipcodeError: prevDetails.zipcode.trim() === ''
      });
      // setShippingDetails(commonUpdate);
      setBillingDetails(commonUpdate);
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
    if (isContinuedToPayment) {
      setTimeout(() => {
        const shippingRadioButton = document.getElementById('shipping');
        if (shippingRadioButton) {
          (shippingRadioButton as HTMLInputElement).click();
        }
        setIsContinuedToPayment(false);
        setIsNavigating(false);
      }, 500)
    } else {
      setTimeout(() => {
        setIsContinuedToPayment(true);
        setIsNavigating(false);
      }, 1200)
    }
  };
  const handleAddressInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("input change to :  ", event.target.value);
    setCheckedAddressInput(event.target.value);
  };

  // const updateContactDetails = (firstName: string) => {
  //   setContactDetails({
  //     shippingDetails: { ...shippingDetails, firstName },
  //     billingDetails: { ...billingDetails }
  //   });
  // };
  const saveToLocalStorage = () => {
    localStorage.setItem('billingFirstName', billingDetails.firstName);
    localStorage.setItem('billingLastName', billingDetails.lastName);
    localStorage.setItem('billingCompanyName', billingDetails.companyName);
    localStorage.setItem('billingAddressLineOne', billingDetails.addressLineOne);
    localStorage.setItem('billingAddressLineTwo', billingDetails.addressLineTwo);
    localStorage.setItem('billingCity', billingDetails.city);
    localStorage.setItem('billingState', billingDetails.state);
    localStorage.setItem('billingCountry', billingDetails.country);
    localStorage.setItem('billingZipcode', billingDetails.zipcode);
    localStorage.setItem('billingPhone', billingDetails.phone);
  }
  const handleReviewButtonClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setReviewButtonClicked(true);

    if (isBillingValid) {
      saveToLocalStorage();
      setIsReviewing(true);
      setIsReviewed(false);
      setTimeout(() => {
        setIsReviewing(false);
        setIsReviewed(true);
        setOrderSummaryHidden(false);
      }, 2000);
    } else {
      handleFirstNameBlur(true);
      handleLastNameBlur(true);
      handleAddressLineOneBlur(true);
      handleCityBlur(true);
      handleZipcodeBlur(true);
      setDisplayIncompleteMessage(true);
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
    if (billingDetails.country) {
      const newBillingStates = State.getStatesOfCountry(billingDetails.country);
      // @ts-ignore
      setBillingStates(newBillingStates);
    }
  }, [billingDetails.country]);

  useEffect(() => {
    const validateBillingDetails = (billing: any) => {
      return (
        billing.firstName.trim() !== '' &&
        billing.lastName.trim() !== '' &&
        billing.addressLineOne.trim() !== '' &&
        billing.city.trim() !== '' &&
        billing.zipcode.trim() !== ''
      );
    };

    const billingIsValid = validateBillingDetails(billingDetails);
    setIsBillingValid(billingIsValid);

    // updating review btn errors in real-time
    if (billingIsValid) {
      setBillingError(false);
    } else {
      setDisplayIncompleteMessage(false);
    }
  }, [billingDetails]);


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
              <div className="flex flex-col py-3 px-4">
                <div className="flex justify-between text-sm">
                  <div className="flex xs:flex-col">
                    <div className="flex text-gray-400 w-20">Contact</div>
                    <div className="pr-8 flex w-full flex-1">bobby@gmail.com</div>
                  </div>
                  <div className="flex font-bold cursor-pointer">Change</div>
                </div>
                <div>
                  <div className="pt-3 xs:pt-3"></div>
                  <div className="border-solid border-b border-foreground"></div>
                  <div className="pb-3"></div>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="flex xs:flex-col">
                    <div className="text-gray-400 flex-start w-20">Ship to</div>
                    <div className="w-full flex flex-1 pr-8">123 Wahroonga Avenue, Wahroonga NSW 2076, Australia</div>
                  </div>
                  <div className="flex font-bold cursor-pointer">Change</div>
                </div>

                <div
                  className={`transition-opacity duration-1000 ${!isContinuedToPayment ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 h-auto'}`}>
                  <div>
                    <div className="pt-3 xs:pt-3"></div>
                    <div className="border-solid border-b border-foreground"></div>
                    <div className="pb-3"></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <div className="flex xs:flex-col">
                      <div className="text-gray-400 flex-start w-20">Shipping Method</div>
                      <div className="w-full flex flex-1 pr-8">Standard Shipping (5-14 business days) · Free</div>
                    </div>
                    <div className="flex font-bold cursor-pointer"></div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div
            className={`transition-opacity duration-1000 ${isContinuedToPayment ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 h-auto'}`}>
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
                    <a className="sm:px-4 xs:px-4 py-2"
                       href="/checkout"
                    >
                      <div className="flex justify-center items-center text-sm font-bold cursor-pointer">
                        <div className="fill-white pr-1">
                          <svg className="-rotate-90" width="11" height="7" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M6.138.876L5.642.438l-.496.438L.504 4.972l.992 1.124L6.138 2l-.496.436 3.862 3.408.992-1.122L6.138.876z"></path>
                          </svg>
                        </div>
                        <div className="flex">Return to information</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div
            className={`transition-opacity duration-1000 ${!isContinuedToPayment ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 h-auto'} `}>
            <div
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
                    <div className="flex items-center">
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
                      </div>
                      <div className="px-1"></div>
                      <div id="newMasterCard">
                        <div className="bg-white rounded border-2 border-solid border-black">
                          <svg
                            className={`cursor-default w-full h-full block`}
                            width="2.5em" height="1.5em"
                            xmlns="http://www.w3.org/2000/svg" id="svg895" version="1.1"
                            viewBox="-96 -98.908 832 593.448">
                            <defs id="defs879">
                              <style id="style877" type="text/css">.</style>
                            </defs>
                            <path id="rect887" display="inline" fill="#ff5f00" stroke-width="5.494"
                                  d="M224.833 42.298h190.416v311.005H224.833z"/>
                            <path id="path889"
                                  d="M244.446 197.828a197.448 197.448 0 0175.54-155.475 197.777 197.777 0 100 311.004 197.448 197.448 0 01-75.54-155.53z"
                                  fill="#eb001b" stroke-width="5.494"/>
                            <path id="path891"
                                  d="M621.101 320.394v-6.372h2.747v-1.319h-6.537v1.319h2.582v6.373zm12.691 0v-7.69h-1.978l-2.307 5.493-2.308-5.494h-1.977v7.691h1.428v-5.823l2.143 5h1.483l2.143-5v5.823z"
                                  className="e" fill="#f79e1b" stroke-width="5.494"/>
                            <path id="path893"
                                  d="M640 197.828a197.777 197.777 0 01-320.015 155.474 197.777 197.777 0 000-311.004A197.777 197.777 0 01640 197.773z"
                                  className="e" fill="#f79e1b" stroke-width="5.494"/>
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

            <div className="border-purple">
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
                        <input id="shipping"
                               value="shipping"
                               type="radio"
                               name="addressType"
                               className="form-radio cursor-pointer accent-gray-600"
                               checked={checkedAddressInput === 'shipping'}
                               onChange={handleAddressInputChange}
                        />
                      </div>
                      <label htmlFor="shipping" className="cursor-pointer">Same as shipping address</label>
                    </div>
                  </div>
                  <div className="border-b border-solid border-foreground"></div>
                  <div className="flex text-sm">
                    <div className="flex items-center p-4">
                      <div className="pr-2">
                        <input id="billing"
                               value="billing"
                               type="radio"
                               name="addressType"
                               className="form-radio cursor-pointer accent-gray-600"
                               checked={checkedAddressInput === 'billing'}
                               onChange={handleAddressInputChange}
                        />
                      </div>
                      <label htmlFor="billing" className="cursor-pointer"
                      >Use a different billing address</label>
                    </div>
                  </div>
                </div>
                <div
                  className={`border-red transition-opacity duration-500 ${checkedAddressInput === 'billing' ? 'h-auto p-auto opacity-100' : 'opacity-0 h-0 p-0 overflow-hidden'} border-t border-solid border-foreground p-4`}>
                  <div id="contactDetails">
                    <div id="billingDetailsCountrySelect"
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
                        // disabled={isReviewed}
                              className="block w-full appearance-none px-3 pt-7 pb-2 font-bold bg-background focus:border-blue-500 focus:outline-none"
                              value={billingDetails.country}
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
                         className="flex w-full justify-between pt-4">
                      <input type="text"
                             placeholder="First Name"
                             readOnly={isReviewed}
                             value={billingDetails.firstName}
                             onChange={handleFirstNameChange}
                             onBlur={handleFirstNameBlur}
                             className={`items-center border border-solid bg-transparent p-3 py-4 text-sm placeholder:font-bold outline-none w-49% placeholder-greyed-out
                               ${billingDetails.firstNameError ? 'border-custom-red' : 'border-foreground'}
                               `}
                      />
                      <input type="text"
                             placeholder="Last Name"
                             readOnly={isReviewed}
                             value={billingDetails.lastName}
                             onChange={handleLastNameChange}
                             onBlur={handleLastNameBlur}
                             className={`items-center border border-solid bg-transparent p-3 py-4 text-sm placeholder:font-bold outline-none w-49% placeholder-greyed-out
                               ${billingDetails.lastNameError ? 'border-custom-red' : 'border-foreground'}
                               `}
                      />
                    </div>
                    <div id="contactCompany"
                         className="flex w-full justify-between pt-4">
                      <input type="text"
                             placeholder="Company (required for business addresses)"
                             readOnly={isReviewed}
                             value={billingDetails.companyName}
                             onChange={handleCompanyNameChange}
                             className="w-full items-center border border-solid bg-transparent p-3 py-4 text-sm placeholder:font-bold outline-none border-foreground placeholder-greyed-out"/>
                    </div>
                    <div id="contactAddressLineOne"
                         className="flex w-full justify-between pt-4">
                      <input type="text"
                             placeholder="Address"
                             readOnly={isReviewed}
                             value={billingDetails.addressLineOne}
                             onChange={handleAddressLineOneChange}
                             onBlur={handleAddressLineOneBlur}
                             className={`w-full items-center border border-solid bg-transparent p-3 py-4 text-sm placeholder:font-bold outline-none placeholder-greyed-out
                               ${billingDetails.addressLineOneError ? 'border-custom-red' : 'border-foreground'}
                               `}
                      />
                    </div>
                    <div id="contactAddressLineTwo"
                         className="flex w-full justify-between pt-4">
                      <input type="text" placeholder="Apartment, suite, etc. (optional)"
                             readOnly={isReviewed}
                             value={billingDetails.addressLineTwo}
                             onChange={handleAddressLineTwoChange}
                             className="w-full items-center border border-solid bg-transparent p-3 py-4 text-sm placeholder:font-bold outline-none border-foreground placeholder-greyed-out"/>
                    </div>
                    <div id="contactCityStateCode"
                         className="flex justify-between gap-1 pt-4">

                      <div id="cityInput" className={`${billingDetails.cityError ? 'border-custom-red' : 'border-foreground'} relative flex flex-col border border-solid w-32%`}>
                        <label htmlFor="state"
                               className={`transition-opacity duration-500 ${showLabel ? 'pt-1 h-fit opacity-100' : 'opacity-0 h-0 overflow-hidden pt-0'}
                                 flex items-end  text-sm px-3 font-bold text-greyed-out`}>
                          City
                        </label>
                        <input id="cityInput"
                               type="text"
                               placeholder={showLabel ? "" : "City"}
                               readOnly={isReviewed}
                               value={billingDetails.city}
                               onChange={handleCityChange}
                               onFocus={handleCityFocused}
                               onBlur={handleCityBlur}
                               className={`placeholder:transition-opacity placeholder:duration-700
                               ${showLabel ? 'h-auto placeholder:opacity-0 overflow-hidden' : 'h-full placeholder:opacity-100'} block text-sm appearance-none pb-1 px-3 bg-background placeholder:font-bold outline-none w-full placeholder-greyed-out
                               `}
                               // className={`border border-solid bg-transparent p-3 py-4 text-sm placeholder:font-bold outline-none w-full placeholder-greyed-out
                               // ${billingDetails.cityError ? 'border-custom-red' : 'border-foreground'}
                               // `}
                        />
                      </div>
                      <div id="stateInput" className="relative border border-solid w-32% border-foreground">
                        <label htmlFor="state"
                               className="absolute xs:hidden top-1 left-3 text-sm font-bold text-greyed-out"
                        >
                          State/Province
                        </label>
                        <label htmlFor="state"
                               className="hidden xs:block absolute top-1 left-3 text-sm font-bold text-greyed-out"
                        >
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
                        <select id="billingDetailsstate"
                                disabled={isReviewed}
                                value={billingDetails.state}
                                onChange={handleStateChange}
                                className="block text-sm w-full appearance-none px-3 pt-6 pb-1 bg-background focus:border-blue-500 focus:outline-none"
                        >
                          {billingStates.map(({isoCode, name}) => (
                            <option
                              key={isoCode}
                              value={isoCode}
                            >
                              {name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <input id="zipcodeInput"
                             type="text"
                             placeholder="ZIP code"
                             readOnly={isReviewed}
                             value={billingDetails.zipcode}
                             onChange={handleZipcodeChange}
                             onBlur={handleZipcodeBlur}
                             className={`items-center border border-solid bg-transparent p-3 py-4 text-sm placeholder:font-bold outline-none w-32% placeholder-greyed-out
                             ${billingDetails.zipcodeError ? 'border-custom-red' : 'border-foreground'} `}
                      />
                    </div>
                    <div id="contactPhone"
                         className="flex w-full justify-between pt-4">
                      <input type="text" placeholder="Phone (optional)"
                             readOnly={isReviewed}
                             value={billingDetails.phone}
                             onChange={handlePhoneChange}
                             onBlur={handlePhoneBlur}
                             className={`w-full items-center border border-solid bg-transparent p-3 py-4 text-sm placeholder:font-bold outline-none placeholder-greyed-out
                             ${billingDetails.phoneError ? 'border-custom-red' : 'border-foreground'} `}
                      />
                    </div>

                  </div>
                </div>

              </div>
            </div>

            <div className="py-3"></div>

            <div
              className="flex border-blue flex-row-reverse xs:flex-col xl:items-center lg:items-center md:items-center sm:items-center sm:justify-between md:justify-between lg:justify-between xl:justify-between">
              {/*<div className="pb-4">*/}
              {/*  <button id="reviewOrderButton"*/}
              {/*          className={`border-2 rounded w-full font-bold px-6 py-3 border-solid border-transparent hover:bg-transparent hover:border-foreground bg-shopify-blue transition duration-200`}*/}
              {/*          type="button"*/}
              {/*  >*/}
              {/*    PAY NOW*/}
              {/*  </button>*/}
              {/*</div>*/}
              <div id="orderButton" className="flex">
                <div id="loadingBorder"
                     className={`${isReviewing ? 'border-2 rounded font-bold p-4 border-solid border-foreground bg-greyed-out' : ''}`}
                >
                  {isReviewing ? (
                    <button id="loadingReviewButton"
                            className={styles.loader}
                            disabled={isReviewing}></button>
                  ) : !isReviewed ? (
                    <button id="reviewOrderButton"
                            className={`border-2 rounded font-bold p-4 border-solid
                              ${!isBillingValid ? 'border-foreground bg-greyed-out cursor-default'
                              : 'border-transparent hover:border-foreground bg-shopify-blue hover:bg-transparent'}
                              `}
                            type="button"
                            onClick={!isReviewing ? handleReviewButtonClick : undefined}
                    >
                      REVIEW ORDER
                    </button>
                  ) : (
                    <a
                      href="/confirm"
                      id="placeOrderButton"
                      className={`border-2 rounded font-bold p-4 border-solid
                              ${isReviewed ? 'bg-amazon-yellow border-amazon-yellow' : ''}
                              `}
                    >
                      PLACE ORDER
                    </a>
                  )}
                </div>
              </div>
              <div className="">
                <div>
                  <div className="sm:px-4 xs:px-4 py-2">
                    <div
                      className={`flex justify-center items-center text-sm font-bold ${isNavigating ? 'cursor-default' : 'cursor-pointer'} `}>
                      <div className="fill-white pr-2">
                        <svg className={`${isNavigating ? 'hidden' : ''} `} width="11" height="7"
                             xmlns="http://www.w3.org/2000/svg">
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