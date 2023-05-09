import React from 'react';
import Header from '../components/Header';
import FavoriteRecipesList from '../components/FavoriteRecipesList';

function FavoriteRecipes() {
  return (
    <>
      <Header title="Favorite Recipes" searchBtn={ false } />
      <div>FavoriteRecipes</div>
      <button
        id="filter-by-all-btn"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        id="filter-by-meal-btn"
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        id="filter-by-drink-btn"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      <FavoriteRecipesList />
    </>
  );
}

export default FavoriteRecipes;
