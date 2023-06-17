import styles from './Search.module.scss';

const Search = () => {
  return (
    <div className={styles.search}>
      <div className={styles['search-bar']}>
        <form action="/search" method="get">
          <input type="text" id="search" name="q" placeholder="Search..." />

          <div className={styles['user-buttons']}>
            <button type="button">Option 1</button>
            <button type="button">Option 2</button>
          </div>
        </form>

        <div className={styles['media-config']}>
          <button type="button">Text-to-speech</button>
          <button type="button">Change language</button>
        </div>
      </div>
    </div>
  );
};

export default Search;
