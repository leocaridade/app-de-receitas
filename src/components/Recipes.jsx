import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../index.css';
import { Link } from 'react-router-dom';
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
      <div key={ index } className="w-1/2 py-2 px-2">
        <Link to={ `/${recipeType}/${recipe.idMeal || recipe.idDrink}` }>
          <div
            data-testid={ `${index}-recipe-card` }
            className="bg-white rounded-md card-shadow"
          >
            <img
              alt="Food"
              src={ recipe.strMealThumb || recipe.strDrinkThumb }
              data-testid={ `${index}-card-img` }
              className="rounded-t-md"
            />
            <p
              data-testid={ `${index}-card-name` }
              className="pl-3 pb-2"
            >
              {recipe.strMeal || recipe.strDrink}
            </p>
          </div>
        </Link>
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
    } else if (selectedCategory !== categoryName) {
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
    <div className={ `${recipeType === 'meals' ? 'bg-[#fff4e6]' : 'bg-[#fff4e6]'}` }>
      <div className="flex flex-row flex-wrap justify-center" id="categories-div">
        <button
          onClick={ handleAllCategoryClick }
          data-testid="All-category-filter"
          className="rounded-md py-1 px-2 w-[30%] my-1 mx-1 teste-shadow bg-white"
        >
          All
        </button>
        {mappedCategories.map((category, index) => (
          <div key={ index } className="w-[30%] my-1 mx-1 flex">
            <button
              onClick={ () => handleCategoryClick(category.strCategory) }
              data-testid={ `${category.strCategory}-category-filter` }
              className=" py-1 px-2 w-full teste-shadow rounded-md bg-white"
            >
              {category.strCategory}
            </button>
          </div>
        ))}
      </div>
      <div className="w-full flex flex-row flex-wrap pb-20">
        {isLoading ? <p>Loading...</p> : mappedRecipes}
      </div>
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
