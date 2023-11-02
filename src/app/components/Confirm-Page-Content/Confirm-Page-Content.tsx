import styles from './Confirm-Page-Content.module.scss';
import React from 'react';
import Image from "next/image";
import masterandemissarry from '../../assets/masterandemissarry.jpg';


const ConfirmPageContent: React.FC = () => {
  return (
    <div className="mx-auto flex w-full xs:px-4 sm:px-8 md:px-8 lg:px-0">
      <div
        id="pageContainer"
        className={`${styles.pageContainer} mx-auto flex lg:pt-12 md:pt-12 sm:pt-2 xs:pt-2 xs:w-532px xs:flex-col-reverse sm:w-532px sm:flex-col-reverse md:w-1120px md:flex-row md:justify-between lg:w-1120px lg:flex-row lg:justify-between`}
      >
        {/*left side content*/}
        <div id="paymentDetailsWrapper"
             className="flex flex-col sm:w-full md:w-51.5% lg:w-51.5%">
          <div id="checkoutTitle"
               className="pt-1 pb-3 xs:hidden sm:hidden md:block lg:block">
            <div className="flex pb-1">
              <h1 className="py-3 text-3xl">Xandria</h1>
            </div>

            <div id="orderTitleNumber"
                 className="flex items-center">
              <div className="pr-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px">
                  <path
                    fill="rgb(185, 161, 111)"
                    d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 37.690466 12.309534 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 13.390466 46 4 36.609534 4 25 C 4 13.390466 13.390466 4 25 4 z M 34.988281 14.988281 A 1.0001 1.0001 0 0 0 34.171875 15.439453 L 23.970703 30.476562 L 16.679688 23.710938 A 1.0001 1.0001 0 1 0 15.320312 25.177734 L 24.316406 33.525391 L 35.828125 16.560547 A 1.0001 1.0001 0 0 0 34.988281 14.988281 z"/>
                </svg>
              </div>
              <div>
                <div className="text-sm font-light">
                  <p>Order #1494</p>
                </div>
                <div className="font-bold text-lg">
                  <h4>Thank you Stuart!</h4>
                </div>
              </div>
            </div>
          </div>

          <div id="confirmationContainer"
               className="flex flex-col">
            <div className="pt-3">
              <div className="border border-solid border-foreground p-4">
                <div className="text-lg font-bold pb-1">Your order is confirmed</div>
                <div className="text-sm">We've accepted your order and we're getting it ready. A confirmation email has been sent to
                  stuart.charles.co@gmail.com. Come back to this page for updates on your order status.
                </div>
              </div>
            </div>
          </div>

          <div id="contactContainer">
            <div
              className="mx-auto flex h-full w-full flex-col border-b border-solid py-2 pt-16 pb-14 border-foreground">
              <div id="contactWrapper"
                   className="">
                <div id="contactTopSection">
                  <div id="contactHeader"
                       className="pb-4">
                    <div className="flex flex-row items-center justify-between">
                      <div className="flex text-xl font-bold">Contact</div>
                      <div className="flex text-sm">
                        <div>Have an account?</div>
                        <div className="cursor-pointer pl-1 font-bold">Log in</div>
                      </div>
                    </div>
                  </div>
                  <div id="contactEmail"
                       className="pb-3">
                    <div className="flex">
                      <input type="text"
                             placeholder="Email"
                             className="w-full items-center border border-solid bg-transparent p-3 py-4 text-sm placeholder:font-bold outline-none border-foreground placeholder-greyed-out"
                      />
                    </div>
                  </div>
                  <div id="emailOffersCheckbox"
                       className="pb-12">
                    <div className="flex items-center align-center">
                      <div className="inline-flex">
                        <input type="checkbox"
                               value="1"
                               className="accent-gray-500"/>
                      </div>
                      <div className="inline-flex pl-2">
                        Email me with news and offers
                      </div>
                    </div>
                  </div>
                  <div id="contactBottomSection">
                    <div id="contactShippingHeader">
                      <div className="flex pb-2 text-xl font-bold">Shipping Address</div>
                    </div>
                    {/*!TODO:*/}
                    <div id="contactDetails">
                      <div id="countrySelect"
                           className="relative w-full border border-solid border-foreground">
                        <label htmlFor="country"
                               className="absolute top-2 left-3 text-sm">Country/region</label>
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
                                className="block w-full appearance-none px-3 pt-7 pb-2 font-bold bg-background focus:border-blue-500 focus:outline-none">
                          <option value="Australia">Australia</option>
                        </select>
                      </div>
                      <div id="contactNames"
                           className="flex w-full justify-between pt-4">
                        <input type="text" placeholder="First Name"
                               className="items-center border border-solid bg-transparent p-3 py-4 text-sm placeholder:font-bold outline-none w-49% border-foreground placeholder-greyed-out"/>
                        <input type="text" placeholder="Last Name"
                               className="items-center border border-solid bg-transparent p-3 py-4 text-sm placeholder:font-bold outline-none w-49% border-foreground placeholder-greyed-out"/>
                      </div>
                      <div id="contactCompany"
                           className="flex w-full justify-between pt-4">
                        <input type="text"
                               placeholder="Company (required for business addresses)"
                               className="w-full items-center border border-solid bg-transparent p-3 py-4 text-sm placeholder:font-bold outline-none border-foreground placeholder-greyed-out"/>
                      </div>
                      <div id="contactAddressLineOne"
                           className="flex w-full justify-between pt-4">
                        <input type="text" placeholder="Address"
                               className="w-full items-center border border-solid bg-transparent p-3 py-4 text-sm placeholder:font-bold outline-none border-foreground placeholder-greyed-out"/>
                      </div>
                      <div id="contactAddressLineTwo"
                           className="flex w-full justify-between pt-4">
                        <input type="text" placeholder="Apartment, suite, etc. (optional)"
                               className="w-full items-center border border-solid bg-transparent p-3 py-4 text-sm placeholder:font-bold outline-none border-foreground placeholder-greyed-out"/>
                      </div>
                      <div id="contactAddressLineThree"
                           className="flex justify-between gap-1 pt-4">
                        <input type="text" placeholder="City"
                               className="items-center border border-solid bg-transparent p-3 py-4 text-sm placeholder:font-bold outline-none w-32% border-foreground placeholder-greyed-out"/>
                        <div className="relative border border-solid w-32% border-foreground">
                          <label htmlFor="country"
                                 className="absolute top-2 left-3 text-sm font-bold text-greyed-out">State</label>
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
                                  className="block w-full appearance-none px-3 pt-6 pb-1 bg-background focus:border-blue-500 focus:outline-none">
                            <option value="State" selected disabled>State</option>
                            <option value="State">Australian Capital Territory</option>
                            <option value="State">New South Wales</option>
                            <option value="State">Northern Territory</option>
                            <option value="State">Queensland</option>
                            <option value="State">South Australia</option>
                            <option value="State">Tasmania</option>
                            <option value="State">Victoria</option>
                            <option value="State">Western Australia</option>
                          </select>
                        </div>
                        <input type="text" placeholder="ZIP code"
                               className="items-center border border-solid bg-transparent p-3 py-4 text-sm placeholder:font-bold outline-none w-32% border-foreground placeholder-greyed-out"/>
                      </div>
                    </div>

                    <div id="shippingButton">
                      <div className="flex justify-end pt-8">
                        <button
                          className="border-2 bg-shopify-blue font-bold border-solid border-foreground p-4">CONTINUE TO
                          SHIPPING
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="checkoutFooter" className="flex py-4 text-xs font-bold text-greyed-out">
              <div className="pr-4 cursor-pointer">Refund Policy</div>
              <div className="pr-4 cursor-pointer">Privacy Policy</div>
              <div className="pr-4 cursor-pointer">Terms of Service</div>
            </div>
          </div>

        </div>
        {/*right side content*/}
        <div id="cartDetailsWrapper"
             className="relative flex flex-col pt-1 xs:w-full sm:w-full md:w-39% lg:w-39%">
          <div id="checkoutTitle"
               className="pt-1 xs:block sm:block md:hidden lg:hidden">
            <div className="flex pb-1">
              <h1 className="py-3 text-3xl">Xandria</h1>
            </div>

            <div
              className="relative z-10 flex py-4 text-sm font-medium justify-between before:content-[''] before:absolute before:top-0 before:bottom-0 before:bg-translucent before:border-y before:border-foreground before:left-[calc(50%-50vw)] before:right-[calc(50%-50vw)] before:-z-10">
              <div>Hide Order Summary</div>
              <div>$135.00</div>
            </div>

            <div className="flex text-sm xs:hidden sm:hidden">
              <h4>
                <span>Shipping</span>
                <span className="px-2">&#x2C3;</span>
                <span>Payment</span>
              </h4>
            </div>
          </div>

          <div
            className="mx-auto flex w-full items-center justify-between border-b border-solid py-6 border-foreground">
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
          <div className="flex justify-between border-b-gray-50 py-6 xs:gap-2 sm:gap-2 md:gap-4 lg:gap-4">
            <div className="inline-flex flex-grow">
              <input
                type="text"
                placeholder="Gift card or discount code"
                className="w-full items-center border border-solid bg-transparent px-2 py-4 text-sm placeholder:font-bold outline-none border-foreground placeholder-greyed-out"
              />
            </div>
            <div
              className="inline-flex items-center rounded-sm border-2 border-solid p-2 px-5 font-bold border-foreground bg-greyed-out">
              <button>APPLY</button>
            </div>
          </div>
          <div className="flex flex-col border-y border-solid py-6 border-foreground">
            <div className="flex justify-between pb-4">
              <div className="inline-flex text-sm font-bold flex-start">Subtotal</div>
              <div className="inline-flex text-sm font-bold flex-end">$135.00</div>
            </div>
            <div className="flex justify-between">
              <div className="inline-flex text-sm font-bold flex-start">Shipping</div>
              <div className="inline-flex text-xs font-medium flex-end">Free</div>
            </div>
          </div>
          <div className="flex justify-between py-6">
            <div className="flex">
              <div className="text-lg font-medium">Total</div>
            </div>
            <div className="flex items-center">
              <div className="inline-flex pr-3 text-xs">AUD</div>
              <div className="inline-flex text-2xl font-bold">$135.00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );


};

export default ConfirmPageContent;