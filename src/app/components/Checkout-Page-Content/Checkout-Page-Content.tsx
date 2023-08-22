import styles from './Checkout-Page-Content.module.scss';
import React from 'react';
import classNames from 'classnames';



const CheckoutPageContent: React.FC = () => {
  return (
    <div id="pageContainer"
      className="flex justify-between w-78% h-screen pt-12 mx-auto 
      border-d-white"
    >
      <div id="paymentDetailsWrapper"
        className="flex flex-col w-51.5%
        border-blue"
      >
        <div id="checkoutTitle"
          className="block pt-1 pb-5 
          border-green">
          <div className="flex pb-1">
            <h1>Xandria</h1>
          </div>
          <div className="flex">
            <h4>Shipping ≥ Payment</h4>
          </div>
        </div>
        <div className="flex">express checkout container</div>
        <div className="flex">contact details container</div>
      </div>
      <div
        id="cartDetailsWrapper"
        className="flex flex-col w-39%
        border-green"
      >
        <div>Content</div>
      </div>
    </div>
  );
  
    
};

export default CheckoutPageContent;