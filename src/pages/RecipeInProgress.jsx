import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { fetchDrinkByIdAPI } from '../services/drinksAPI';
import { fetchFoodByIdAPI } from '../services/mealsAPI';
import { getLocalStorage, setLocalStorage } from '../services/localStorage';
import shareSVG from '../images/shareIcon.svg';

function RecipeInProgress() {
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [ingredientDetails, setIngredientDetails] = useState([]);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [favoriteIcon, setFavoriteIcon] = useState(false);
  const [checkboxValues, setCheckboxValues] = useState({});
  const [isFinishBtnEnabled, setIsFinishBtnEnabled] = useState(false);
  const history = useHistory();
  const LINK_COPIED_MESSAGE_TIME = 4000;
  const LAST_LETTER = -1;
  const recipeID = history.location.pathname.split('/')[2];
  const recipeType = history.location.pathname.split('/')[1];
  useEffect(() => {
    const handleFetchDetails = async () => {
      try {
        let recipeDetail;
        let recipeIngredient;
        if (recipeType === 'meals') {
          recipeDetail = await fetchFoodByIdAPI(recipeID);
          recipeIngredient = Object
            .entries(recipeDetail[0])
            .filter(([key, value]) => key.startsWith('strIngredient') && value);
        }
        if (recipeType === 'drinks') {
          recipeDetail = await fetchDrinkByIdAPI(recipeID);
          recipeIngredient = Object
            .entries(recipeDetail[0])
            .filter(([key, value]) => key.startsWith('strIngredient') && value);
        }
        setRecipeDetails(recipeDetail);
        setIngredientDetails(recipeIngredient);
      } catch (error) {
        console.log(error);
      }
    };
    handleFetchDetails();
  }, [recipeID, recipeType]);
  useEffect(() => {
    if (getLocalStorage('doneRecipes') !== null) {
      const recipesDone = getLocalStorage('doneRecipes');
      const recipeExists = recipesDone.filter((recipe) => recipe.id === Number(recipeID));
      if (recipeExists.length > 0) {
        setRenderButton(false);
      }
    }
    if (getLocalStorage('inProgressRecipes') !== null) {
      const recipesInProgress = getLocalStorage('inProgressRecipes') || {};
      if (recipesInProgress[recipeType] && recipesInProgress[recipeType][recipeID]) {
        setCheckboxValues(recipesInProgress);
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
  }, [recipeType, recipeID]);
  const handleShareButton = () => {
    const URL = window.location.href;
    const modifiedURL = URL.replace('/in-progress', '');
    copy(modifiedURL);
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
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxValues((prevState) => ({
      ...prevState,
      [recipeType]: {
        ...prevState[recipeType],
        [recipeID]: {
          ...(prevState[recipeType]?.[recipeID] || {}),
          [name]: checked,
        },
      },
    }));
    try {
      const inProgressRecipes = getLocalStorage('inProgressRecipes') || {};
      setLocalStorage('inProgressRecipes', {
        ...inProgressRecipes,
        [recipeType]: {
          ...(inProgressRecipes[recipeType] || {}),
          [recipeID]: {
            ...(inProgressRecipes[recipeType]?.[recipeID] || {}),
            [name]: checked,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const checkboxes = Object.values(checkboxValues[recipeType]?.[recipeID] || {});
    const checkboxesChecked = checkboxes.filter((checked) => checked);
    if (ingredientDetails.length === checkboxesChecked.length) {
      setIsFinishBtnEnabled(true);
    } else { setIsFinishBtnEnabled(false); }
  }, [checkboxValues, ingredientDetails, recipeID, recipeType]);
  const getCurrentDateTime = () => {
    const now = new Date(); return now.toISOString().slice(0, 10);
  };
  const handleFinishButton = () => {
    const doneObj = {
      id: recipeDetails[0].idMeal || recipeDetails[0].idDrink,
      nationality: recipeDetails[0].strArea || '',
      name: recipeDetails[0].strMeal || recipeDetails[0].strDrink,
      category: recipeDetails[0].strCategory,
      image: recipeDetails[0].strMealThumb || recipeDetails[0].strDrinkThumb,
      tags: recipeDetails[0].strTags ? recipeDetails[0].strTags
        .split(',').map((tag) => tag.trim()) : [],
      alcoholicOrNot: recipeDetails[0].strAlcoholic || '',
      type: recipeType.slice(0, LAST_LETTER),
      doneDate: getCurrentDateTime(),
    };
    let newDoneRecipes;
    if (getLocalStorage('doneRecipes') !== null) {
      const doneRecipes = getLocalStorage('doneRecipes');
      if (doneRecipes.some((recipe) => recipe.id === doneObj.id)) {
        const doneRecipesFiltered = doneRecipes
          .filter((recipe) => recipe.id !== doneObj.id);
        setLocalStorage('doneRecipes', doneRecipesFiltered);
      } else {
        newDoneRecipes = [...doneRecipes, doneObj];
        setLocalStorage('doneRecipes', newDoneRecipes);
      }
    } else {
      newDoneRecipes = [doneObj];
      setLocalStorage('doneRecipes', newDoneRecipes);
    }
  };
  return (
    <div>
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
              className="flex justify-end"
            >
              {isLinkCopied && <p className="text-black">Link copied!</p>}
              <button
                id="share-btn"
                data-testid="share-btn"
                onClick={ handleShareButton }
              >
                <img src={ shareSVG } alt="share" />
              </button>
              <button
                id="favorite-btn"
                data-testid="favorite-btn"
                onClick={ handleFavoriteButton }
                src={ favoriteIcon ? blackHeartIcon : whiteHeartIcon }
              >
                {
                  favoriteIcon
                    ? <img src={ blackHeartIcon } alt="favorite icon" />
                    : <img src={ whiteHeartIcon } alt="favorite icon" />
                }
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
              {recipe.strAlcoholic && (
                <p data-testid="recipe-category">{recipe.strAlcoholic}</p>
              )}
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
                className="p-1"
              >
                <label
                  key={ i }
                  data-testid={ `${i}-ingredient-step` }
                  style={ {
                    textDecoration: (
                      checkboxValues[recipeType]?.[recipeID]?.[`ingredientstep${i}`]
                        ? 'line-through solid rgb(0, 0, 0)' : 'none'
                    ),
                  } }
                >
                  <input
                    type="checkbox"
                    id={ `ingredientstep${i}` }
                    name={ `ingredientstep${i}` }
                    checked={ checkboxValues[recipeType]?.
                      [recipeID]?.[`ingredientstep${i}`] || false }
                    onChange={ handleCheckboxChange }
                  />
                  {` ${ingredient[1]} - ${recipe[`strMeasure${i + 1}`]}`}
                </label>
              </p>
            ))}
          </div>
          <div
          className="box-border border border-gray-300 rounded-lg bg-white p-2 m-2 card-shadow"
          >
            <p> Instructions: </p>
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
              className="mx-auto box-border border border-gray-300 rounded-lg bg-white p-2 m-2 card-shadow mb-10"
            />
          )}
        </div>
      ))}
      <Link to="/done-recipes">
        <button
          data-testid="finish-recipe-btn"
          className={
            `${
              !isFinishBtnEnabled
                ? ('fixed bottom-0 inset-x-0 bg-gray-400 rounded-lg py-1 w-screen text-gray-700 cursor-not-allowed')
                : ('fixed bottom-0 inset-x-0 bg-[#FCC436] rounded-t-lg py-1 w-screen')}`
          }
          disabled={ !isFinishBtnEnabled }
          onClick={ handleFinishButton }
        >
          Finalizar
        </button>
      </Link>
    </div>
  );
}
export default RecipeInProgress;
