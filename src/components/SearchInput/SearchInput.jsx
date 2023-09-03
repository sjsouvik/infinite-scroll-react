import "./SearchInput.css";

export const SearchInput = (props) => {
  const { searchText, setSearchText, searchHandler } = props;

  const formHandler = (e) => {
    e.preventDefault();
    searchHandler();
  };

  return (
    <form className="search" onSubmit={formHandler}>
      <input
        type="search"
        placeholder="Type to search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="search-input"
      />
      <button
        className={`search-btn ${!searchText ? "disabled" : ""}`}
        disabled={!searchText}
      >
        Search
      </button>
    </form>
  );
};
