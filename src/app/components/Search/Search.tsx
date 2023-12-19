import styles from './Search.module.scss';
import React from "react";


interface SearchProps {
  isCheckoutButtonClicked: boolean,
  isEmptyCartWindowOpen: boolean
}

const Search: React.FC<SearchProps> = ({isCheckoutButtonClicked, isEmptyCartWindowOpen}) => {

  return (
    <div className={`${styles.search} relative select-none`}>
      {/*<SearchForm className={`${styles.relative}`} isBookPage/>*/}
      <h2 className={`${styles.h2TagLine} `}>Browse the world's quote reference library</h2>

      <div id="clearCartWindow"
           className={`${isEmptyCartWindowOpen ? '' : 'hidden'}
           absolute z-20 flex right-0 top-0 px-4 py-3 h-fit border-solid border-white border-2
           rounded-md bg-background -translate-y-0.5 translate-x-1
           before:-top-2 before:right-3.5 before:-translate-x-1/2 before:border-l-transparent
           before:border-r-transparent before:border-b-gray-300
           before:border-t-transparent before:border-l-8 before:border-r-8 before:border-b-8
           before:border-solid before:content-[''] before:absolute

           `}
      >
        <div className={`flex flex-col`}>
          <p className="select-none font-bold h-full flex">Your Cart is <span className="text-custom-red">&nbsp;Empty!</span></p>
        </div>
      </div>

    </div>
  );
};

export default Search;

