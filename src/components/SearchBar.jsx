function SearchBar() {
  return (
    <div>
      <label>
        <input
          type="radio"
          id="ingredient-search-radio"
          name="searchByAttribute"
          data-testid="ingredient-search-radio"
          value="ingredient"
        />
        Ingredient
      </label>
      <label>
        <input
          type="radio"
          id="name-search-radio"
          name="searchByAttribute"
          data-testid="name-search-radio"
          value="name"
        />
        Name
      </label>
      <label>
        <input
          type="radio"
          id="first-letter-search-radio"
          name="searchByAttribute"
          data-testid="first-letter-search-radio"
          value="firstLetter"
        />
        First Letter
      </label>
      <button
        id="exec-search-btn"
        data-testid="exec-search-btn"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
