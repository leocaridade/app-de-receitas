import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { getLocalStorage } from '../services/localStorage';
import FavoriteRecipeCard from './FavoriteRecipeCard';

function FavoriteRecipesList({ favoriteRecipesCount, listFilter }) {
  const [localStorageFavoriteRecipes, setLocalStorageFavoriteRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const favoriteRecipesFromLocalStorage = getLocalStorage('favoriteRecipes');
    setLocalStorageFavoriteRecipes(favoriteRecipesFromLocalStorage);
  }, [favoriteRecipesCount]);

  useEffect(() => {
    const allRecipes = localStorageFavoriteRecipes;
    switch (listFilter) {
    case 'All':
      setFavoriteRecipes(allRecipes); break;
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
          id,
          image,
          category,
          name,
          type,
          nationality,
          alcoholicOrNot }, index) => (
          (
            <FavoriteRecipeCard
              key={ `favorite-recipe-${id}` }
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

FavoriteRecipesList.propTypes = {
  favoriteRecipesCount: PropTypes.number,
  listFilter: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  favoriteRecipesCount: state.recipesReducer.countFavoriteList,
});

export default connect(mapStateToProps)(FavoriteRecipesList);
