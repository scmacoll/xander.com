import styles from './Search.module.scss';
import SearchForm from './SearchForm';


const Search = () => {

  return (
    <div className={`${styles.search}`}>
      {/*<SearchForm className={`${styles.relative}`} isBookPage/>*/}
      <h2 className={styles.h2TagLine}>Browse the world's quote reference library</h2>
    </div>
  );
};

export default Search;

