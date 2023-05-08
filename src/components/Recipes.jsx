import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  fetchCategoriesMealsAPI,
  fetchFoodByCategoryAPI,
  fetchMealsAPI,
} from '../services/mealsAPI';
import {
  fetchCategoriesDrinksAPI,
  fetchDrinkByCategoryAPI,
  fetchDrinksAPI,
} from '../services/drinksAPI';

function Recipes({ recipeType }) {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [mappedRecipes, setMappedRecipes] = useState([]);
  const [mappedCategories, setMappedCategories] = useState([]);

  const mapFood = useCallback((recipeData) => {
    if (!recipeData) return;

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

  const handleCategoryClick = async ({ target }) => {
    setRecipes([]);
    if (recipeType === 'meals') {
      const recipeData = await fetchFoodByCategoryAPI(target.innerText);
      setRecipes(recipeData);
    }
    if (recipeType === 'drinks') {
      const recipeData = await fetchDrinkByCategoryAPI(target.innerText);
      setRecipes(recipeData);
    }
  };

  const handleAllCategoryClick = async () => {
    if (recipeType === 'meals') {
      const recipeData = await fetchMealsAPI();
      setRecipes(recipeData);
    }
    if (recipeType === 'drinks') {
      const recipeData = await fetchDrinksAPI();
      setRecipes(recipeData);
    }
  };

  const mapFoodByCategory = useCallback((categoriesData) => {
    const maxCardsNumber = 5;
    const maxCards = categoriesData.slice(0, maxCardsNumber);
    const cards = maxCards.map((category, index) => (
      <div key={ index } data-testid={ `${category.strCategory}-category-filter` }>
        <button onClick={ handleCategoryClick }>{ category.strCategory }</button>
      </div>
    ));
    setMappedCategories(cards);
  }, []);

  useEffect(() => {
    const handleFetch = async () => {
      try {
        let recipeData;
        let categoryData;

        if (recipeType === 'meals') {
          recipeData = await fetchMealsAPI();
          categoryData = await fetchCategoriesMealsAPI();
          setCategories(categoryData);
          setRecipes(recipeData);
        }
        if (recipeType === 'drinks') {
          recipeData = await fetchDrinksAPI();
          categoryData = await fetchCategoriesDrinksAPI();
          setCategories(categoryData);
          setRecipes(recipeData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    handleFetch();
  }, [recipeType]);

  useEffect(() => {
    mapFood(recipes);
  }, [recipes, mapFood]);

  useEffect(() => {
    mapFoodByCategory(categories);
  }, [categories, mapFoodByCategory]);

  return (
    <div>
      <div>
        <button onClick={ handleAllCategoryClick }>All</button>
        {mappedCategories}
      </div>
      {mappedRecipes}
    </div>
  );
}

Recipes.propTypes = {
  recipeType: PropTypes.string.isRequired,
};

export default Recipes;
