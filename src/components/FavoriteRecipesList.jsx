import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { getLocalStorage } from '../services/localStorage';
import FavoriteRecipeCard from './FavoriteRecipeCard';

function FavoriteRecipesList({ favoriteRecipesCount }) {
  const [favoriteRecipes,
    setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const favoriteRecipesFromLocalStorage = getLocalStorage('favoriteRecipes');
    setFavoriteRecipes(favoriteRecipesFromLocalStorage || []);
  }, [favoriteRecipesCount]);

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
}.isRequired;

const mapStateToProps = (state) => ({
  favoriteRecipesCount: state.recipesReducer.countFavoriteList,
});

export default connect(mapStateToProps)(FavoriteRecipesList);
