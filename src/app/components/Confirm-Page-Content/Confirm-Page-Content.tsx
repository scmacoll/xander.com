import styles from './Confirm-Page-Content.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import Image from "next/image";
import masterandemissarry from '../../assets/masterandemissarry.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";


const ConfirmPageContent: React.FC = () => {
  const bottomRef = useRef<null | HTMLDivElement>(null);
  const [numItems, setNumItems] = useState(5);

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

  return (
    <div className="relative mx-auto flex flex-col w-full overflow-x-hidden xs:px-4 sm:px-8 md:px-8 lg:px-0">
      <div
        id="pageContainer"
        className={`${styles.pageContainer} mx-auto flex lg:pt-12 md:pt-12 sm:pt-2 xs:pt-2 xs:w-532px xs:flex-col-reverse sm:w-532px sm:flex-col-reverse md:w-1120px md:flex-row md:justify-between lg:w-1120px lg:flex-row lg:justify-between`}
      >
        {/*left side content*/}
        <div id="paymentDetailsWrapper"
             className="flex mx-auto flex-col sm:w-full md:w-51.5% lg:w-51.5%">
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
              <div className="pt-3 pb-3">
                <div className="border rounded border-solid border-foreground p-4">
                  <div className="text-lg font-bold pb-1">Your order is confirmed</div>
                  <div className="text-sm">We've accepted your order and we're getting it ready. A confirmation email
                    has been sent to
                    stuart.charles.co@gmail.com. Come back to this page for updates on your order status.
                  </div>
                </div>
              </div>
            </div>
            <div id="customerInformationContainer"
                 className="pt-3">
              <div
                className="mx-auto flex w-full flex-col border rounded border-solid p-4 border-foreground">
                <div id="contactWrapper"
                     className="">
                  <div id="contactTopSection">

                    <div className="pb-4">
                      <div className="flex flex-row items-center justify-between">
                        <div className="flex text-xl font-bold">Customer Information</div>
                      </div>
                    </div>
                    {/*TODO*/}
                    <div id="customerInformationLists">
                      <div id="addressLists"
                           className="flex"
                      >
                        <div className="w-1/2">
                          <h4 className="font-bold">Shipping Address</h4>
                          <ul className="flex flex-col gap-1 font-light text-sm pt-2">
                            <li>Liz Brown</li>
                            <li>2731 Davis Drive</li>
                            <li>Markham ON L3P 2M4</li>
                            <li>Canada</li>
                            <li>403-561-0873</li>
                          </ul>
                        </div>
                        <div className="w-1/2">
                          <h4 className="font-bold">Billing Address</h4>
                          <ul className="flex flex-col gap-1 font-light text-sm pt-2">
                            <li>Liz Brown</li>
                            <li>2731 Davis Drive</li>
                            <li>Markham ON L3P 2M4</li>
                            <li>Canada</li>
                            <li>403-561-0873</li>
                          </ul>
                        </div>
                      </div>
                      <div id="methodLists"
                           className="flex"
                      >
                        <div className="w-1/2 pt-4">
                          <h4 className="font-bold">Shipping method</h4>
                          <ul className="flex flex-col gap-1 font-light text-sm pt-2">
                            <li>Expedited Parcel</li>
                          </ul>
                        </div>
                        <div className="w-1/2 pt-4">
                          <h4 className="font-bold">Payment method</h4>
                          <ul className="flex flex-col gap-1 font-light text-sm pt-2">
                            <li>VISA ending with 4242 --</li>
                            <li>$129.46</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          <div id="bottomContainer" className="pb-14">
            <div className="pt-8">
              <div className="flex justify-between xs:flex-col-reverse">
                <div id="contactContainer"
                     className="flex justify-start contents-center items-end xs:justify-center xs:pt-4">
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
                    <div className="pr-2 font-light text-sm">Need help?</div>
                    <div className="cursor-pointer text-link-blue">Contact us</div>
                  </div>
                </div>
                <div id="browsingButtonContainer"
                     className="flex justify-end xs:justify-center">
                  <button className="border-2 bg-shopify-blue font-bold border-solid border-foreground rounded p-4">
                    CONTINUE BROWSING
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div id="checkoutFooter"
               className="absolute bottom-0 flex pt-4 text-xs font-bold text-greyed-out">
            <div className="pr-4 cursor-pointer">Refund Policy</div>
            <div className="pr-4 cursor-pointer">Privacy Policy</div>
            <div className="pr-4 cursor-pointer">Terms of Service</div>
          </div>

        </div>
        {/*right side content*/}
        <div id="rightContentWrapper"
             className="relative mx-auto flex flex-col pt-1 max-h-610px xs:w-full sm:w-full md:w-39% lg:w-39%">
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
          <div className="pt-6"></div>
          <div className={`${styles.scrollBar} ${styles.scrollBarContent}  overflow-x-hidden overflow-y-auto`}>
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
            <div className="flex flex-col border-b border-solid pb-6 border-foreground">
              <div className="flex justify-between pb-4">
                <div className="inline-flex text-sm font-bold flex-start">Subtotal</div>
                <div className="inline-flex text-sm font-medium flex-end">$130.96</div>
              </div>
              <div className="flex justify-between pb-4">
                <div className="inline-flex text-sm font-bold flex-start">Shipping</div>
                <div className="inline-flex text-sm font-medium flex-end">Free</div>
              </div>
              <div className="flex justify-between pb-4">
                <div className="inline-flex text-sm font-bold flex-start">Discount</div>
                <div className="inline-flex text-sm font-medium flex-end">0.00</div>
              </div>
              <div className="flex justify-between">
                <div className="inline-flex text-sm font-bold flex-start">Taxes</div>
                <div className="inline-flex text-xs font-medium flex-end">$14.04</div>
              </div>
            </div>
            <div className="flex justify-between pt-6">
              <div className="flex">
                <div className="text-lg font-medium">Total</div>
              </div>
              <div className="flex items-center">
                <div className="inline-flex pr-3 text-xs">AUD</div>
                <div ref={bottomRef}
                     className={`${styles.smoothScroll}
                     inline-flex text-2xl font-bold`}>
                  $135.00
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.featureSimilar} `}>
        <div className={`${styles.similarText}`}>SIMILAR BOOKS</div>
        <div className={`${styles.similarContainer}`}>
          <div className={`${styles.similarBooks}`}>
            {Array(numItems)
              .fill(null)
              .map((_, index) => (
                <div key={index} className={`${styles.bookBlock}`}>
                  <div>
                    <a href="/book">
                      <Image
                        className={`${styles.responsiveImage}`}
                        src={masterandemissarry.src}
                        alt="yuko"
                        width="115"
                        height="115"
                      />
                    </a>
                  </div>
                  <div className="pt-3 pb-5 font-extrabold">Title</div>
                  <div className="pb-6">Author</div>
                  <div className="font-black pb-2">$24.99</div>
                  <div className="flex justify-evenly">
                    <div className={`${styles.similarHeart}`}>
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
                          fill="#d2cfca2b"
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
                    </div>
                    <div className={`${styles.similarBag}`}>
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
                    </div>
                  </div>
                </div>
              ))}

            <div className={`${styles.similarRarrow}`}>
              <a href="/book">
                <FontAwesomeIcon icon={faChevronRight} size="xl" />
              </a>
            </div>
            <div className={`${styles.similarLarrow}`}>
              <a href="/book">
                <FontAwesomeIcon icon={faChevronLeft} size="xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );


};

export default ConfirmPageContent;