import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
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
    <div className="h-screen w-screen">
      {/* <section> */}
      {recipeDetails.map((recipe, index) => (
        <div
          key={ index }
          className="flex flex-col"
        >
          <section
            className="bg-cover bg-center text-white h-40"
            style={ {
              backgroundImage: `url(${recipe.strDrinkThumb || recipe.strMealThumb})`,
            } }
          >
            <div
              className="flex justify-end mt-2 mr-2"
            >
              <ShareButton testId="share-btn" />
              <button
                className="pl-2"
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
            <div
              className="flex flex-col justify-center items-center"
            >
              <p
                data-testid="recipe-title"
                className="text-5xl font-bold text-center"
              >
                {recipe.strDrink || recipe.strMeal}
              </p>
              {
                recipe.strAlcoholic && (
                  <p data-testid="recipe-category">{recipe.strAlcoholic}</p>
                )
              }
              <p data-testid="recipe-category">{recipe.strCategory}</p>
            </div>
          </section>
          <div
            className="box-border border border-gray-300 rounded-lg bg-white p-2 m-2 card-shadow"
          >
            <p
              className="text-2xl font-bold text-center"
            >
              Ingredients:
            </p>
            {ingredientDetails.map((ingredient, i) => (
              <p
                key={ i }
                data-testid={ `${i}-ingredient-name-and-measure` }
                className="p-1"
              >
                {`${ingredient[1]} - ${recipe[`strMeasure${i + 1}`]}`}
              </p>
            ))}
          </div>
          <div
            className="box-border border border-gray-300 rounded-lg bg-white p-2 m-2 card-shadow"
          >
            <p
              className="text-2xl font-bold text-center"
              data-testid="instructions"
            >
              Instructions:
            </p>
            {
              recipe.strInstructions.split('\r\n\r\n').map((instruction, i) => (
                <p
                  key={ i }
                  className="p-2"
                >
                  {instruction}
                </p>
              ))
            }
          </div>
          {recipeType === 'meals' && (
            <iframe
              data-testid="video"
              title="video"
              width="320"
              height="240"
              src={ recipe.strYoutube.replace('watch?v=', 'embed/') }
              className="mx-auto box-border border border-gray-300 rounded-lg bg-white p-2 m-2 card-shadow"
            />
          )}
          <div
            className="pb-10"
          >
            <h2 className="text-2xl font-bold text-center"> Recomendações: </h2>
            <Recommendations
              baseRecipes={ baseRecipes }
            />
          </div>
          <button
            id="start-recipe-btn"
            data-testid="start-recipe-btn"
            className="fixed bottom-0 inset-x-0 bg-[#FCC436] rounded-t-lg py-1 w-screen"
            onClick={ () => history.push(`${history.location.pathname}/in-progress`) }
          >
            { recipeInProgress ? 'Continue Recipe' : 'Start Recipe'}
          </button>
        </div>
      ))}
    </div>
  );
}

RecipeDetails.propTypes = {
  recipeType: PropTypes.string,
}.isRequired;

export default RecipeDetails;
