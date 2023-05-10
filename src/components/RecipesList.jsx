import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { getLocalStorage } from '../services/localStorage';
import RecipeCard from './RecipeCard';

function RecipeList({ favoriteRecipesCount, listFilter, pageType }) {
  const [localStorageFavoriteRecipes, setLocalStorageFavoriteRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    if (pageType === 'favorite-recipes') {
      const favoriteRecipesFromLocalStorage = getLocalStorage('favoriteRecipes');
      setLocalStorageFavoriteRecipes(favoriteRecipesFromLocalStorage || []);
    }
    if (pageType === 'done-recipes') {
      const doneRecipesFromLocalStorage = getLocalStorage('doneRecipes');
      setLocalStorageFavoriteRecipes(doneRecipesFromLocalStorage || []);
    }
  }, [favoriteRecipesCount, pageType]);

  useEffect(() => {
    const allRecipes = localStorageFavoriteRecipes;
    switch (listFilter) {
    case 'All':
      setFavoriteRecipes(allRecipes);
      break;
    case 'Meals':
      setFavoriteRecipes(allRecipes.filter(({ type }) => type === 'meal'));
      break;
    case 'Drinks':
      setFavoriteRecipes(allRecipes.filter(({ type }) => type === 'drink'));
      break;
    default:
      break;
    }
  }, [listFilter, localStorageFavoriteRecipes]);

  return (
    <div>
      {favoriteRecipes
        .map(({
          tags,
          doneDate,
          id,
          image,
          category,
          name,
          type,
          nationality,
          alcoholicOrNot }, index) => (
          (
            <RecipeCard
              pageType={ pageType }
              tags={ tags }
              doneDate={ doneDate }
              key={ `recipe-${id}` }
              alcoholicOrNot={ alcoholicOrNot }
              id={ id }
              srcImage={ image }
              category={ category }
              nationality={ nationality }
              type={ type }
              name={ name }
              index={ index }
              shareTestId={ `${index}-horizontal-share-btn` }
              favoriteTestId={ `${index}-horizontal-favorite-btn` }
            />
          )
        )) }
    </div>
  );
}

RecipeList.propTypes = {
  favoriteRecipesCount: PropTypes.number,
  listFilter: PropTypes.string,
  pageType: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  favoriteRecipesCount: state.recipesReducer.countFavoriteList,
});

export default connect(mapStateToProps)(RecipeList);
