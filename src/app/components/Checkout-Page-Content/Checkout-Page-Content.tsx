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
                Button
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