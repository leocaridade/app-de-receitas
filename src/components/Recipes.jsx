import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchMealsAPI from '../services/mealsAPI';
import fetchDrinksAPI from '../services/drinksAPI';

function Recipes({ recipeType }) {
  const [recipes, setRecipes] = useState([]);
  const [mappedRecipes, setMappedRecipes] = useState([]);

  const mapFood = useCallback((recipeData) => {
    if (recipeData.length === 0) return;

    const maxCardsNumber = 12;
    const maxCards = recipeData.slice(0, maxCardsNumber);
    const cards = maxCards.map((recipe, index) => (
      <div key={ index } data-testid={ `${index}-recipe-card` }>
        <p data-testid={ `${index}-card-name` }>{recipe.strMeal || recipe.strDrink}</p>
        <img
          alt="Food"
          src={ recipe.strMealThumb || recipe.strDrinkThumb }
          data-testid={ `${index}-card-img` }
        />
      </div>
    ));
    setMappedRecipes(cards);
  }, []);

  useEffect(() => {
    const handleFetch = async () => {
      try {
        let recipeData;
        if (recipeType === 'meals') {
          recipeData = await fetchMealsAPI();
          setRecipes(recipeData);
        }
        if (recipeType === 'drinks') {
          recipeData = await fetchDrinksAPI();
          setRecipes(recipeData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    handleFetch();
  }, [recipeType, mapFood]);

  useEffect(() => {
    mapFood(recipes);
  }, [recipes, mapFood]);

  return (
    <div>
      {mappedRecipes}
    </div>
  );
}

Recipes.propTypes = {
  recipeType: PropTypes.string.isRequired,
};

export default Recipes;
