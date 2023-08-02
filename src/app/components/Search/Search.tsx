import styles from './Search.module.scss';
import SearchForm from './SearchForm';


const Search = () => {

  return (
    <div className={`${styles.search}`}>
      <SearchForm className={`${styles.relative}`}/>
    </div>
  );
};

export default Search;

