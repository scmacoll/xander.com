import styles from './Search.module.scss';
import React from 'react';


const Search = () => {

  return (
    <div className={`${styles.search}`}>
      <form className={`${styles.searchForm}`} action="/search" method="get">
        <div className={`${styles.searchBar}`}>
          <svg
            className="absolute left-2 h-6 w-6"
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 752.000000 752.000000"
            preserveAspectRatio="xMidYMid meet">
            <g
              transform="translate(0.000000,752.000000) scale(0.100000,-0.100000)"
              fill="#ffffff"
              stroke="none">
              <path
                d="M3050 6123 c-335 -33 -587 -121 -841 -292 -664 -446 -965 -1277 -745
                -2058 118 -418 397 -801 756 -1036 101 -66 294 -159 407 -197 691 -229 1452
                -2 1913 571 691 859 498 2131 -415 2732 -310 204 -734 314 -1075 280z m385
                -168 c232 -40 480 -144 675 -282 238 -171 462 -457 571 -728 90 -225 123 -402
                123 -660 -1 -261 -36 -444 -130 -666 -369 -876 -1364 -1262 -2198 -854 -469
                229 -801 671 -908 1207 -30 149 -32 460 -5 608 51 277 159 527 323 747 81 107
                242 265 355 346 199 142 485 259 704 286 50 6 101 13 115 15 48 9 286 -4 375
                -19z"
              />
              <path
                d="M4812 2737 l-53 -53 633 -648 633 -647 48 51 c26 28 47 55 47 59 0 6
                -355 371 -1224 1259 l-32 32 -52 -53z"
              />
            </g>
          </svg>

          <input
            className={`${styles.searchInput}`}
            type="text"
            id="search"
            name="q"
            placeholder="Search the world's quote reference library"
            autoFocus
          />
          
          <span className="absolute right-2 bg-gray-500 border-none text-white inline-block text-xs cursor-text rounded py-0.5 px-1 mx-1 opacity-70">
            ⌘K
          </span>
        </div>
      </form>
    </div>
  );
};

export default Search;

// <div
//   className={`${styles['media-config']} flex flex-1 justify-end  border-1 border-white`}>
//   <button className="" type="button">
//     Font
//   </button>
// </div>;
