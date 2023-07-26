import styles from './Book-Page-Content.module.scss';
import Image from 'next/image';
import masterandemissarry from '../../assets/masterandemissarry.jpg';



const BookPageContent: React.FC = () => {
  return (
    <div className={`${styles.contentLayout}`}>
      <div className={`${styles.imageContent}`}>
        <div className={`${styles.bookImage}`}>
          <a href="/book">
            <Image
              src={masterandemissarry.src}
              alt="yuko"
              width="10000"
              height="10000"
            />
          </a>
        </div>
      </div>
      <div className={`${styles.mainContent}`}>
        <div className="flex">
          <h2 className="text-2xl font-bold">
            The Master And His Emissary 2ED
          </h2>
        </div>
        <div className={`${styles.infoContainer}`}>
          <div className={`${styles.bookInfo}`}>
            By Iain McGilchrist &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; Paperback
            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; 1&nbsp; February 2019
          </div>
          <div className={`${styles.cardHeart}`}>
            <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="3em"
              height="3em"
              viewBox="0 0 752.000000 752.000000"
              preserveAspectRatio="xMidYMid meet">
              <g
                transform="translate(100.000000,752.000000) scale(0.100000,-0.100000)"
                fill="#d2cfca2b"
                stroke="none">
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
        </div>
      </div>
    </div>
  );
}


export default BookPageContent;