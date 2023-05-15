import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import copy from 'clipboard-copy';
import { useHistory, Link } from 'react-router-dom/cjs/react-router-dom.min';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { fetchFoodByIdAPI, fetchMealsAPI } from '../services/mealsAPI';
import { fetchDrinkByIdAPI, fetchDrinksAPI } from '../services/drinksAPI';
import { getLocalStorage, setLocalStorage } from '../services/localStorage';
import ShareButton from './ShareButton';
import Recommendations from './Recommendations';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function RecipeDetails({ recipeType }) {
  const [baseRecipes, setBaseRecipes] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [ingredientDetails, setIngredientDetails] = useState([]);
  const [renderButton, setRenderButton] = useState(true);
  const [recipeInProgress, setRecipeInProgress] = useState(false);
  const [favoriteIcon, setFavoriteIcon] = useState(false);
  const history = useHistory();

  const LAST_LETTER = -1;
  const recipeID = history.location.pathname.split('/')[2];

  useEffect(() => {
    const handleFetchDetails = async () => {
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
      if (recipesInProgress[recipeType] && recipesInProgress[recipeType][recipeID]) {
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
    <div className="h-screen w-screen flex flex-col">
      {/* <section> */}
      {recipeDetails.map((recipe, index) => (
        <div
          key={ index }
          className="bg-red-500 flex flex-col"
        >
          <div className="flex justify-end">
            <ShareButton testId="share-btn" />
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
          </div>
          <section
            className="flex flex-col justify-center items-center"
          >
            <p
              data-testid="recipe-title"
              className="text-2xl font-bold text-center"
            >
              {recipe.strDrink || recipe.strMeal}
            </p>
            {
              recipe.strAlcoholic && (
                <p data-testid="recipe-category">{recipe.strAlcoholic}</p>
              )
            }
            <p data-testid="recipe-category">{recipe.strCategory}</p>
          </section>
          <div
            className="box-border border-2 border-black rounded-lg bg-white p-2 m-2"
          >
            <p
              className="text-2xl font-bold text-center"
            >
              Ingredients:
            </p>
            {ingredientDetails.map((ingredient, i) => (
              <p key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
                {`${ingredient[1]} - ${recipe[`strMeasure${i + 1}`]}`}
              </p>
            ))}
          </div>
          <div
            className="box-border border-2 border-black rounded-lg bg-white p-2 m-2"
          >
            <p
              className="text-2xl font-bold text-center"
            >
              Instructions:
            </p>
            <p data-testid="instructions">{recipe.strInstructions}</p>
          </div>
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
      <div>
        <Recommendations
          baseRecipes={ baseRecipes }
        />
      </div>
      {renderButton && (
        <button
          id="start-recipe-btn"
          data-testid="start-recipe-btn"
          className="fixed bottom-0 inset-x-0 bg-red-500 rounded-lg py-1"
          onClick={ () => history.push(`${history.location.pathname}/in-progress`) }
        >
          { recipeInProgress ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      )}
    </div>
  );
}

RecipeDetails.propTypes = {
  recipeType: PropTypes.string,
}.isRequired;

export default RecipeDetails;
