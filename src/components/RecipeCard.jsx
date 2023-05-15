/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
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
  const history = useHistory();
  return (
    <div className="flex flex-row mx-6 rounded-md card-shadow mb-4 mt-2 bg-[#FFF]">
      <div className="max-w-[50%]">
        <img
          src={ srcImage }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
          onClick={ () => history.push(`/${type}s/${id}`) }
          className="rounded-l-md"
        />
      </div>
      <div className="w-1/2 flex flex-col items-center justify-between py-2">
        <p
          className="text-center"
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
        <div className="flex flex-row">
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
      </div>
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
