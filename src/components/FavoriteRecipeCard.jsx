import React from 'react';
import PropTypes from 'prop-types';
import ShareButton from './ShareButton';
import DeleteFavoriteRecipeButton from './DeleteFavoriteRecipeButton';

function FavoriteRecipeCard({
  id,
  srcImage,
  name,
  category,
  index,
  shareTestId,
  favoriteTestId }) {
  return (
    <div>
      <img
        src={ srcImage }
        alt={ name }
        data-testid={ `${index}-horizontal-image` }
      />
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        { category }
      </p>
      <p
        data-testid={ `${index}-horizontal-name` }
      >
        { name }
      </p>
      <ShareButton
        testId={ shareTestId }
      />
      <DeleteFavoriteRecipeButton
        testId={ favoriteTestId }
        id={ id }
      />
    </div>
  );
}

FavoriteRecipeCard.propTypes = {
  srcImage: PropTypes.string,
  name: PropTypes.string,
  category: PropTypes.string,
  index: PropTypes.number,
  shareTestId: PropTypes.string,
  favoriteTestId: PropTypes.string,
  id: PropTypes.string,
}.isRequired;

export default FavoriteRecipeCard;
