import styles from './Checkout-Page-Content.module.scss';
import React from 'react';
import classNames from 'classnames';



const CheckoutPageContent: React.FC = () => {
  return (
    <div
      id="pageContainer"
      className="flex justify-between w-78% h-screen pt-12 mx-auto border-d-white"
    >
      <div id="paymentDetailsWrapper" className="flex flex-col w-51.5%">
        <div id="checkoutTitle" className="block pt-1 pb-5">
          <div className="flex pb-1">
            <h1>Xandria</h1>
          </div>
          <div className="flex">
            <h4>Shipping ≥ Payment</h4>
          </div>
        </div>
        <div id="checkoutExpressContainer" className="flex flex-col py-5 px-2">
          <div
            id="checkoutExpressButtonsWrapper"
            className="flex flex-col justify-center pb-4 border-white rounded"
          >
            <div className="flex justify-center">Express checkout</div>
            
            <div
              id="checkoutExpressButtons"
              className="flex justify-around p-1 px-4 gap-3"
            >
              <div className="inline-flex justify-center items-center rounded w-full h-10 cursor-pointer bg-shopify-blue border-solid border-2 border-shopify-blue">
                <svg
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="10em"
                  height="10em"
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
              <div className="inline-flex justify-center items-center border-solid border-2 rounded w-full h-10 cursor-pointer bg-amazon-yellow border-amazon-yellow">
                <a href="/checkout">Button</a>
              </div>
              <div className="inline-flex justify-center items-center rounded w-full h-10 cursor-pointer border-solid border-2 bg-amazon-yellow border-amazon-yellow">
                <a href="/checkout">Button</a>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-10">
            OR CONTINUE BELOW TO PAY WITH A CREDIT CARD
          </div>
        </div>
        <div className="flex justify-center mt-20">
          contact details container
        </div>
      </div>
      <div id="cartDetailsWrapper" className="flex flex-col w-39% border-green">
        <div>Content</div>
      </div>
    </div>
  );
  
    
};

export default CheckoutPageContent;