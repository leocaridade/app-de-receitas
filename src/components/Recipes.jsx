import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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

function Recipes({ recipeType, searchRecipes }) {
  // Estados das receitas
  const [mappedRecipes, setMappedRecipes] = useState([]);
  const [baseRecipes, setBaseRecipes] = useState([]);

  // Estados das categorias
  const [mappedCategories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Estado do loading
  const [isLoading, setIsLoading] = useState(false);

  const mapFood = (recipeData) => {
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
  };

  const handleCategoryClick = async (categoryName) => {
    setIsLoading(true);
    if (selectedCategory === categoryName) {
      setSelectedCategory(null);
      mapFood(baseRecipes);
      setIsLoading(false);
    } else if (selectedCategory === null) {
      let recipeData;
      if (recipeType === 'meals') {
        recipeData = await fetchFoodByCategoryAPI(categoryName);
        setSelectedCategory(categoryName);
      }
      if (recipeType === 'drinks') {
        recipeData = await fetchDrinkByCategoryAPI(categoryName);
        setSelectedCategory(categoryName);
      }
      mapFood(recipeData);
      setIsLoading(false);
    }
  };

  const handleAllCategoryClick = () => {
    if (recipeType === 'meals') {
      mapFood(baseRecipes);
    }
    if (recipeType === 'drinks') {
      mapFood(baseRecipes);
    }
  };

  useEffect(() => {
    const handleFetch = async () => {
      try {
        let recipeData;
        let categoryData;

        if (recipeType === 'meals') {
          const maxCardNumber = 5;
          recipeData = await fetchMealsAPI();
          categoryData = await fetchCategoriesMealsAPI();
          const slicedCategories = categoryData.slice(0, maxCardNumber);
          setCategories(slicedCategories);
          setBaseRecipes(recipeData);
          mapFood(recipeData);
        }
        if (recipeType === 'drinks') {
          const maxCardNumber = 5;
          recipeData = await fetchDrinksAPI();
          categoryData = await fetchCategoriesDrinksAPI();
          const slicedCategories = categoryData.slice(0, maxCardNumber);
          setCategories(slicedCategories);
          setBaseRecipes(recipeData);
          mapFood(recipeData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    handleFetch();
  }, [recipeType]);

  useEffect(() => {
    if (searchRecipes !== null && searchRecipes.length !== 0) {
      mapFood(searchRecipes);
    }
  }, [searchRecipes]);

  return (
    <div>
      <div>
        <button
          onClick={ handleAllCategoryClick }
          data-testid="All-category-filter"
        >
          All
        </button>
        {mappedCategories.map((category, index) => (
          <div key={ index }>
            <button
              onClick={ () => handleCategoryClick(category.strCategory) }
              data-testid={ `${category.strCategory}-category-filter` }
            >
              {category.strCategory}
            </button>
          </div>
        ))}
      </div>
      {isLoading ? <p>Loading...</p> : mappedRecipes}
    </div>
  );
}

Recipes.propTypes = {
  recipeType: PropTypes.string,
  searchRecipes: PropTypes.arrayOf(
    PropTypes.shape({}),
  ),
}.isRequired;

const mapStateToProps = (state) => ({
  searchRecipes: state.recipesReducer.searchRecipes,
});

export default connect(mapStateToProps)(Recipes);
