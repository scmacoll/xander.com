import styles from './Search.module.scss';

const Search = () => {
  return (
    <div
      className={`${styles.search} flex justify-between items-center mx-auto p-4`}>
      <div className={`${styles['user-buttons']} flex flex-1 justify-start`}>
        <button type="button">Random</button>
      </div>

      <form
        className="relative flex flex-1 justify-center"
        action="/search"
        method="get">
        <svg
          style={{ transform: 'translateX(-8.8em) translateY(.3em)' }}
          className="absolute"
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="2rem"
          height="2rem"
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
          className={`${styles['search-bar']} w-80 h-10`}
          type="text"
          id="search"
          name="q"
          placeholder="Search the world's creative reference library   ⌘K"
        />
      </form>

      <div
        className={`${styles['media-config']} flex flex-1 justify-end  border-1 border-white`}>
        <button className="pr-10" type="button">
          Font
        </button>
        <button type="button">Lang</button>
      </div>
    </div>
  );
};

export default Search;
