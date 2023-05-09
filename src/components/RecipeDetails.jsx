import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { useHistory, Link } from 'react-router-dom/cjs/react-router-dom.min';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { fetchFoodByIdAPI, fetchMealsAPI } from '../services/mealsAPI';
import { fetchDrinkByIdAPI, fetchDrinksAPI } from '../services/drinksAPI';
import { getLocalStorage, setLocalStorage } from '../services/localStorage';

function RecipeDetails({ recipeType }) {
  const [baseRecipes, setBaseRecipes] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [ingredientDetails, setIngredientDetails] = useState([]);
  const [renderButton, setRenderButton] = useState(true);
  const [recipeInProgress, setRecipeInProgress] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [favoriteIcon, setFavoriteIcon] = useState(false);
  const history = useHistory();

  const MAX_RECIPE_RECOMMENDATION = 6;
  const LINK_COPIED_MESSAGE_TIME = 4000;
  const LAST_LETTER = -1;
  const recipeID = history.location.pathname.split('/')[2];

  useEffect(() => {
    const handleFetchDetails = async () => {
      try {
        let baseRecipesAPI;
        let recipeDetail;
        let recipeIngredient;
        if (recipeType === 'meals') {
          baseRecipesAPI = await fetchDrinksAPI();
          recipeDetail = await fetchFoodByIdAPI(recipeID);
          recipeIngredient = Object
            .entries(recipeDetail[0])
            .filter(([key, value]) => key.startsWith('strIngredient') && value);
        }
        if (recipeType === 'drinks') {
          baseRecipesAPI = await fetchMealsAPI();
          recipeDetail = await fetchDrinkByIdAPI(recipeID);
          recipeIngredient = Object
            .entries(recipeDetail[0])
            .filter(([key, value]) => key.startsWith('strIngredient') && value);
        }
        setBaseRecipes(baseRecipesAPI);
        setRecipeDetails(recipeDetail);
        setIngredientDetails(recipeIngredient);
      } catch (error) {
        console.log(error);
      }
    };
    handleFetchDetails();
  }, [recipeType]);

  useEffect(() => {
    if (getLocalStorage('doneRecipes') !== null) {
      const recipesDone = getLocalStorage('doneRecipes');
      const recipeExists = recipesDone.filter((recipe) => recipe.id === Number(recipeID));
      if (recipeExists.length > 0) {
        setRenderButton(false);
      }
    }
    if (getLocalStorage('inProgressRecipes') !== null) {
      const recipesInProgress = getLocalStorage('inProgressRecipes');
      if (recipesInProgress[recipeType][recipeID]) {
        setRecipeInProgress(true);
      }
    }
    if (getLocalStorage('favoriteRecipes') !== null) {
      const favoriteRecipes = getLocalStorage('favoriteRecipes');
      const recipeExists = favoriteRecipes
        .filter((recipe) => recipe.id === recipeID);
      if (recipeExists.length > 0) {
        setFavoriteIcon(true);
      }
    }
  }, [recipeID]);

  const handleShareButton = () => {
    const URL = window.location.href;
    copy(URL);
    setIsLinkCopied(true);
    setTimeout(() => setIsLinkCopied(false), LINK_COPIED_MESSAGE_TIME);
  };

  const handleFavoriteButton = () => {
    const favoriteObj = {
      id: recipeDetails[0].idMeal || recipeDetails[0].idDrink,
      type: recipeType.slice(0, LAST_LETTER),
      nationality: recipeDetails[0].strArea || '',
      category: recipeDetails[0].strCategory,
      alcoholicOrNot: recipeDetails[0].strAlcoholic || '',
      name: recipeDetails[0].strMeal || recipeDetails[0].strDrink,
      image: recipeDetails[0].strMealThumb || recipeDetails[0].strDrinkThumb,
    };
    let newFavoriteRecipes;
    // Se existir, retira do localStorage e seta false no setFavoriteIcon
    // Se nao existir, seta no localStorage e seta true no setFavoriteIcon

    if (getLocalStorage('favoriteRecipes') !== null) {
      const favoriteRecipes = getLocalStorage('favoriteRecipes');

      if (favoriteRecipes.some((recipe) => recipe.id === favoriteObj.id)) {
        const favoriteRecipesFiltered = favoriteRecipes
          .filter((recipe) => recipe.id !== favoriteObj.id);
        setLocalStorage('favoriteRecipes', favoriteRecipesFiltered);
      } else {
        newFavoriteRecipes = [...favoriteRecipes, favoriteObj];
        setLocalStorage('favoriteRecipes', newFavoriteRecipes);
      }
    } else {
      newFavoriteRecipes = [favoriteObj];
      setLocalStorage('favoriteRecipes', newFavoriteRecipes);
    }
    setFavoriteIcon(!favoriteIcon);
  };

  return (
    <div>
      <p>{`Hello World! Your recipe type is: ${recipeType}`}</p>
      <button
        id="share-btn"
        data-testid="share-btn"
        onClick={ handleShareButton }
      >
        Compartilhar receita
      </button>
      <button
        id="favorite-btn"
        data-testid="favorite-btn"
        onClick={ handleFavoriteButton }
        src={ favoriteIcon ? blackHeartIcon : whiteHeartIcon }
      >
        {favoriteIcon
          ? <img src={ blackHeartIcon } alt="favorite icon" />
          : <img src={ whiteHeartIcon } alt="favorite icon" />}
      </button>
      {isLinkCopied && <p>Link copied!</p>}
      {recipeDetails.map((recipe, index) => (
        <div key={ index }>
          <p data-testid="recipe-title">{recipe.strDrink || recipe.strMeal}</p>
          {recipe.strAlcoholic && (
            <p data-testid="recipe-category">{recipe.strAlcoholic}</p>
          )}
          <p data-testid="recipe-category">{recipe.strCategory}</p>
          <div>
            <p>Ingredients:</p>
            {ingredientDetails.map((ingredient, i) => (
              <p key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
                {`${ingredient[1]} - ${recipe[`strMeasure${i + 1}`]}`}
              </p>
            ))}
          </div>
          <p> Instructions: </p>
          <p data-testid="instructions">{recipe.strInstructions}</p>
          {recipeType === 'meals' && (
            <iframe
              data-testid="video"
              title="video"
              width="320"
              height="240"
              src={ recipe.strYoutube.replace('watch?v=', 'embed/') }
            />
          )}
          <img
            src={ recipe.strDrinkThumb || recipe.strMealThumb }
            alt="Product"
            data-testid="recipe-photo"
          />
        </div>
      ))}
      <h2> Recomendações: </h2>
      <div className="w-full overflow-x-auto whitespace-nowrap">
        {baseRecipes.slice(0, MAX_RECIPE_RECOMMENDATION).map((recipe, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recommendation-card` }
            className="w-1/2 inline-block"
          >
            <p
              data-testid={ `${index}-recommendation-title` }
            >
              {recipe.strDrink || recipe.strMeal}
            </p>
            <img
              src={ recipe.strDrinkThumb || recipe.strMealThumb }
              alt="Product"
              data-testid={ `${index}-card-img` }
            />
          </div>
        ))}
      </div>
      {renderButton && (
        <Link to={ `${history.location.pathname}/in-progress` }>
          <button
            id="start-recipe-btn"
            data-testid="start-recipe-btn"
            className="fixed bottom-0"
          >
            { recipeInProgress ? 'Continue Recipe' : 'Start Recipe'}
          </button>
        </Link>
      )}
    </div>
  );
}

RecipeDetails.propTypes = {
  recipeType: PropTypes.string,
}.isRequired;

export default RecipeDetails;
