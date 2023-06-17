import styles from './Search.module.scss';

const Search = () => {
  return (
    <div
      className={`${styles.search} flex justify-between items-center mx-auto p-4`}>
      <div className={`${styles['user-buttons']} flex flex-1 justify-start`}>
        <button type="button">Option 1</button>
        <button type="button">Option 2</button>
      </div>

      <form
        className="flex flex-1 justify-center"
        action="/search"
        method="get">
        <input
          className={`${styles['search-bar']} w-80 h-10`}
          type="text"
          id="search"
          name="q"
          placeholder="Search the world's creative reference library   ⌘K"
        />
      </form>

        <div className={`${styles['media-config']} flex flex-1 justify-end border-1 border-white`}>
        <button type="button">Text-to-speech</button>
        <button type="button">Change language</button>
      </div>
    </div>
  );
};

export default Search;
