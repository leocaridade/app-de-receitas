import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import DeleteFavoriteRecipeButton from './DeleteFavoriteRecipeButton';
import ShareButtonById from './ShareButtonById';

const DONE_RECIPES = 'done-recipes';
const FAVORITE_RECIPES = 'favorite-recipes';

function RecipeCard({
  pageType,
  tags,
  doneDate,
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
          {pageType === DONE_RECIPES && (
            <p
              data-testid={ `${index}-horizontal-done-date` }
            >
              {`Done in: ${doneDate}`}
            </p>
          )}
          {pageType === DONE_RECIPES && Array.isArray(tags) && (
            tags.map((tag) => (
              <p
                data-testid={ `${index}-${tag}-horizontal-tag` }
                key={ tag }
              >
                {tag}
              </p>
            ))
          )}
        </Link>
      </div>
      <ShareButtonById
        testId={ shareTestId }
        id={ id }
        type={ type }
      />
      {pageType === FAVORITE_RECIPES && (
        <DeleteFavoriteRecipeButton
          testId={ favoriteTestId }
          id={ id }
        />
      )}
    </div>
  );
}

RecipeCard.propTypes = {
  pageType: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.shape(PropTypes.string)),
  doneDate: PropTypes.string,
  srcImage: PropTypes.string,
  name: PropTypes.string,
  category: PropTypes.string,
  index: PropTypes.number,
  shareTestId: PropTypes.string,
  favoriteTestId: PropTypes.string,
  id: PropTypes.string,
}.isRequired;

export default RecipeCard;
