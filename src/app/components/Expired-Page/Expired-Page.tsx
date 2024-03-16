import React from "react";
import styles from "./Expired-Page.module.scss"

const ExpiredPage = () => {
  return (
    <div className={`${styles.pageContainer} flex flex-col items-center min-h-screen bg-background px-4 py-6`}>
      <header className={`${styles.xandria} sticky top-0 w-full`}>
        <a href="/">
          <h1>Xandria</h1>
        </a>
      </header>
      <div className={`${styles.centerContent}`}>
        <section className="flex flex-col justify-center align-center max-w-md mx-auto w-full bg-background border-foreground border border-solid rounded-lg shadow-md p-6 text-center">
          <h1 className="text-2xl font-semibold text-foreground mb-4">Checkout Session Expired</h1>
          <p className="text-gray-400 mb-6">Your session has expired. Please start your checkout process again.</p>
          <div className="flex justify-center">
            <a href="/" className="bg-shopify-blue border-transparent hover:bg-transparent hover:border-foreground border-solid border-2 text-fg font-bold py-2 px-4 rounded">
              Return Home
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ExpiredPage;
