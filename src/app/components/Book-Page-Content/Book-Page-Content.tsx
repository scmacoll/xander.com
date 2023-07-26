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
        <p>mainContent</p>
      </div>
    </div>
  );
}


export default BookPageContent;