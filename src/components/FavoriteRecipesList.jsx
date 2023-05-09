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
    setFavoriteRecipes(favoriteRecipesFromLocalStorage);
  }, [favoriteRecipesCount]);

  return (
    <div>
      { favoriteRecipes.map(({ id, image, category, name }, index) => (
        <FavoriteRecipeCard
          key={ `favorite-recipe-${id}` }
          id={ id }
          srcImage={ image }
          category={ category }
          name={ name }
          index={ index }
          shareTestId={ `${index}-horizontal-share-btn` }
          favoriteTestId={ `${index}-horizontal-favorite-btn` }
        />
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
