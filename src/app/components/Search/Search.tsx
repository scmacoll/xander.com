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

// <div
//   className={`${styles['media-config']} flex flex-1 justify-end  border-1 border-white`}>
//   <button className="" type="button">
//     Font
//   </button>
// </div>;
