import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchDrinkByIdAPI, fetchDrinksAPI } from '../services/drinksAPI';
import { fetchFoodByIdAPI, fetchMealsAPI } from '../services/mealsAPI';

function RecipeInProgress() {
  const [baseRecipes, setBaseRecipes] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [ingredientDetails, setIngredientDetails] = useState([]);
  const history = useHistory();

  const recipeID = history.location.pathname.split('/')[2];
  const recipeType = history.location.pathname.split('/')[1];

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
        console.log(baseRecipesAPI);
      } catch (error) {
        console.log(error);
      }
    };
    handleFetchDetails();
  }, [history.location.pathname]);

  return (
    <div>
      <p>{`Hello World! Your recipe type is: ${recipeType}`}</p>
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
      <button
        id="start-recipe-btn"
        data-testid="start-recipe-btn"
        className="fixed bottom-0"
      >
        Start Recipe
      </button>
      <button
        data-testid="finish-recipe-btn"
      >
        Finalizar
      </button>
    </div>
  );
}

export default RecipeInProgress;
