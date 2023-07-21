import styles from './Lightbox.module.scss'
import Card from './CardClicked';
import { TileCard } from './Content'
import React from 'react';


interface LightboxProps {
  card: TileCard;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ card, onClose }) => {
  return (
    <div className={styles.lightbox}>
      <div className={styles.lightboxContent}>
        <Card card={card} />
        <button className={`${styles.closeButton}`} onClick={onClose}>
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="32px"
            height="32px"
            viewBox="0 0 752.000000 752.000000"
            preserveAspectRatio="xMidYMid meet">
            <g
              transform="translate(0.000000,752.000000) scale(0.100000,-0.100000)"
              fill="rgba(210, 207, 202, 0.6)"
              stroke="none">
              <path
                d="M2743 4838 c-41 -11 -65 -46 -65 -94 0 -35 21 -58 473 -510 l474
                -474 -474 -474 c-445 -445 -473 -475 -473 -508 0 -66 34 -100 100 -100 33 0
                63 28 508 473 l474 474 474 -474 c445 -445 475 -473 508 -473 66 0 100 34 100
                100 0 33 -28 63 -473 508 l-474 474 474 474 c445 445 473 475 473 508 0 66
                -34 100 -100 100 -33 0 -63 -28 -508 -473 l-474 -474 -472 471 c-260 260 -482
                474 -493 476 -11 3 -35 1 -52 -4z"
              />
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Lightbox;
