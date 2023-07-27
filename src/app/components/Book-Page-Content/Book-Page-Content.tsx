import styles from './Book-Page-Content.module.scss';
import Image from 'next/image';
import masterandemissarry from '../../assets/masterandemissarry.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';


<div className={`${styles.shippingContainer}`}>
  <div className={`${styles.stockVerify}`}>
    <FontAwesomeIcon icon={faCheck} />
    <div className="">IN STOCK - SHIPS NEXT DAY</div>
  </div>
  <div className={`${styles.deliveryDate}`}>
    <a href="/book">
      <span>Get estimated delivery dates</span>
    </a>
  </div>
</div>




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
            By Iain McGilchrist &nbsp;&nbsp;|&nbsp;&nbsp; Paperback
            &nbsp;&nbsp;|&nbsp;&nbsp; 1&nbsp; February 2019
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

        <div className={`${styles.bookCart}`}>
          <div className={`${styles.cartContainer}`}>
            <div className={`${styles.bookPrice}  font-extrabold`}>$34.95</div>
            <div className={`${styles.cartButton}`}>
              <button>Add To Cart</button>
            </div>
            <div className={`${styles.checkoutBuyNow}`}>
              <button>BUY NOW</button>
            </div>
          </div>
          <div className={`${styles.rewardsContainer}`}>
            <div className={`${styles.afterPay}`}>
              or 4 payments of $8.74 with afterpay .. Learn more
            </div>
            <div className={`${styles.bookRewards}`}>
              Booklovers earn $1.70 in rewards
            </div>
          </div>
        </div>

        <div className={`${styles.shippingContainer}`}>
          <div className={`${styles.stockVerify}`}>
            <span className={`${styles.iconBlock}`}>
              <FontAwesomeIcon
                className={`${styles.iconTick}`}
                icon={faCheck}></FontAwesomeIcon>
            </span>
            <div className={`${styles.stockText}`}>
              IN STOCK - SHIPS NEXT DAY
            </div>
          </div>
          <div className={`${styles.deliveryDate}`}>
            <a href="/book">
              <p>Get estimated delivery dates</p>
            </a>
          </div>
        </div>

        <div className={`${styles.bookAbout}`}>
          <div className={`${styles.aboutHeading} font-bold py-5`}>
            <p>
              A new edition of the bestselling classic – published with a
              special introduction to mark its 10th anniversary
            </p>
          </div>
          <div>
            <p className="pb-5">
              This pioneering account sets out to understand the structure of
              the human brain – the place where mind meets matter. Until
              recently, the left hemisphere of our brain has been seen as the
              ‘rational’ side, the superior partner to the right. But is this
              distinction true?
            </p>
            <p>
              Drawing on a vast body of experimental research, Iain McGilchrist
              argues while our left brain makes for a wonderful servant, it is a
              very poor master. As he shows, it is the right side which is the
              more reliable and insightful. Without it, our world would be
              mechanistic – stripped of depth, colour and value.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


export default BookPageContent;