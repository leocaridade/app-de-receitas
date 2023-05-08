import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveUserSearch } from '../redux/actions';
import {
  fetchMealsByFirstLetter,
  fetchMealsByIngredient,
  fetchMealsByName,
  fetchDrinksByIngredient,
  fetchDrinksByName,
  fetchDrinksByFirstLetter } from '../services/fetchByAttribute';

function SearchBar({ attributeName, dispatch }) {
  const [radio, setRadio] = useState('ingredient');
  const [apiResult, setApiResult] = useState([]);
  const history = useHistory();
  const { location: { pathname } } = history;

  const handleSearch = () => {
    switch (radio) {
    case 'ingredient':
      if (pathname === '/drinks') {
        fetchDrinksByIngredient(attributeName).then(({ drinks }) => setApiResult(drinks));
        break;
      }
      fetchMealsByIngredient(attributeName).then(({ meals }) => setApiResult(meals));
      break;
    case 'name':
      if (pathname === '/drinks') {
        fetchDrinksByName(attributeName).then(({ drinks }) => setApiResult(drinks));
        break;
      }
      fetchMealsByName(attributeName).then(({ meals }) => setApiResult(meals));
      break;
    case 'firstLetter':
      if (attributeName.length !== 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      if (pathname === '/drinks') {
        fetchDrinksByFirstLetter(attributeName)
          .then(({ drinks }) => setApiResult(drinks));
        break;
      }
      fetchMealsByFirstLetter(attributeName).then(({ meals }) => setApiResult(meals));
      break;
    default:
      break;
    }
  };

  useEffect(() => {
    if (apiResult !== null) {
      dispatch(saveUserSearch(apiResult));
      return;
    }
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  }, [apiResult, dispatch]);

  useEffect(() => {
    if (apiResult !== null && apiResult.length === 1) {
      switch (pathname) {
      case '/drinks':
        history.push(`/drinks/${apiResult[0].idDrink}`);
        break;
      case '/meals':
        history.push(`/meals/${apiResult[0].idMeal}`);
        break;
      default:
        break;
      }
    }
  }, [apiResult, history, pathname]);

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
  attributeName: PropTypes.string,
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(SearchBar);
