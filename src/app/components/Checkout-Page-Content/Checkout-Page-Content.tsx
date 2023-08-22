import styles from './Checkout-Page-Content.module.scss';
import React from 'react';
import classNames from 'classnames';



const CheckoutPageContent: React.FC = () => {
  return (
    <div
      id="pageContainer"
      className="flex justify-between w-78% h-screen pt-12 mx-auto border-d-white"
    >
      <div
        id="paymentDetailsWrapper"
        className="flex flex-col w-51.5% border-blue"
      >
        <div id="checkoutTitle" className="block pt-1 pb-5 border-green">
          <div className="flex pb-1">
            <h1>Xandria</h1>
          </div>
          <div className="flex">
            <h4>Shipping ≥ Payment</h4>
          </div>
        </div>
        <div
          id="checkoutExpressContainer"
          className="flex flex-col py-5 px-2 border-red"
        >
          <div
            id="checkoutExpressButtonsWrapper"
            className="flex flex-col justify-center pb-4 border-white rounded"
          >
            <div className="flex justify-center">Express checkout</div>
            
            <div id="checkoutExpressButtons"
              className="flex justify-around p-1"
            >
              <div className="inline-flex border-purp">
                <a href="/checkout">Button</a>
              </div>
              <div className="inline-flex border-purp">
                <a href="/checkout">Button</a>
              </div>
              <div className="inline-flex border-purp">
                <a href="/checkout">Button</a>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
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