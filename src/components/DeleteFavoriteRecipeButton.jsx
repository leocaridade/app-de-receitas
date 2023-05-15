import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { renderFavoriteList } from '../redux/actions';
import { getLocalStorage, setLocalStorage } from '../services/localStorage';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function DeleteFavoriteRecipeButton({ id, testId, dispatch }) {
  const handleDeleteFavoriteRecipe = () => {
    dispatch(renderFavoriteList(1));
    if (getLocalStorage('favoriteRecipes') !== null) {
      const favoriteRecipes = getLocalStorage('favoriteRecipes');

      const newFavoriteRecipes = favoriteRecipes.filter((favoriteRecipe) => (
        favoriteRecipe.id !== id
      ));

      setLocalStorage('favoriteRecipes', newFavoriteRecipes);
    }
  };

  return (
    <button
      onClick={ handleDeleteFavoriteRecipe }
      data-testid={ testId }
      src={ blackHeartIcon }
      className="pl-2"
    >
      <img src={ blackHeartIcon } alt="Unfavorite Button" />
    </button>
  );
}

DeleteFavoriteRecipeButton.propTypes = {
  id: PropTypes.string,
  testId: PropTypes.string,
}.isRequired;

export default connect()(DeleteFavoriteRecipeButton);
