import { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  fetchMealsByFirstLetter,
  fetchMealsByIngredient,
  fetchMealsByName,
  fetchDrinksByIngredient,
  fetchDrinksByName,
  fetchDrinksByFirstLetter } from '../services/fetchByAttribute';

function SearchBar({ attributeName }) {
  const [radio, setRadio] = useState('ingredient');
  const history = useHistory();
  const { location: { pathname } } = history;

  const handleSearch = () => {
    switch (radio) {
    case 'ingredient':
      if (pathname === '/drinks') return fetchDrinksByIngredient(attributeName);
      return fetchMealsByIngredient(attributeName);
    case 'name':
      if (pathname === '/drinks') return fetchDrinksByName(attributeName);
      return fetchMealsByName(attributeName);
    case 'firstLetter':
      if (attributeName.length !== 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      if (pathname === '/drinks') return fetchDrinksByFirstLetter(attributeName);
      return fetchMealsByFirstLetter(attributeName);
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
