import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import DeleteFavoriteRecipeButton from './DeleteFavoriteRecipeButton';
import ShareButtonById from './ShareButtonById';

function FavoriteRecipeCard({
  type,
  nationality,
  id,
  srcImage,
  name,
  category,
  index,
  alcoholicOrNot,
  shareTestId,
  favoriteTestId }) {
  return (
    <div>
      <div>
        <Link to={ `/${type}s/${id}` }>
          <img
            src={ srcImage }
            alt={ name }
            data-testid={ `${index}-horizontal-image` }
          />
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            {type === 'meal'
              ? `${nationality} - ${category}` : `${alcoholicOrNot} - ${category}`}
          </p>
          <p
            data-testid={ `${index}-horizontal-name` }
          >
            { name }
          </p>
        </Link>
      </div>
      <ShareButtonById
        testId={ shareTestId }
        id={ id }
        type={ type }
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
