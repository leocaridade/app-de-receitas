import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  fetchMealByFirstLetter,
  fetchMealByIngredient,
  fetchMealByName } from '../services/fetchByAttribute';

function SearchBar({ attributeName }) {
  const [radio, setRadio] = useState('ingredient');

  const handleSearch = () => {
    switch (radio) {
    case 'ingredient':
      return fetchMealByIngredient(attributeName);
    case 'name':
      return fetchMealByName(attributeName);
    case 'firstLetter':
      if (attributeName.length !== 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      return fetchMealByFirstLetter(attributeName);
    default:
      break;
    }
  };

  return (
    <div>
      <label>
        <input
          type="radio"
          id="ingredient-search-radio"
          name="searchByAttribute"
          data-testid="ingredient-search-radio"
          value="ingredient"
          onChange={ ({ target }) => setRadio(target.value) }
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
          onChange={ ({ target }) => setRadio(target.value) }
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
          onChange={ ({ target }) => setRadio(target.value) }
        />
        First Letter
      </label>
      <button
        id="exec-search-btn"
        data-testid="exec-search-btn"
        onClick={ handleSearch }
      >
        Search
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  attributeName: PropTypes.string.isRequired,
};

export default SearchBar;
