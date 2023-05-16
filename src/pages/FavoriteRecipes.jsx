import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import RecipesList from '../components/RecipesList';

function FavoriteRecipes() {
  const [filter, setFilter] = useState('All');
  const [pageType, setPageType] = useState('');
  const location = useLocation();

  useEffect(() => {
    // Current URL
    const URL = location.pathname.split('/')[1];
    setPageType(URL);
  }, []);

  const handleFilterClick = ({ target: { innerText } }) => {
    setFilter(innerText);
  };

  return (
    <div className="h-screen bg-[#FAF6F4]">
      <Header title="Favorite Recipes" searchBtn={ false } />
      <div className="flex flex-row w-full justify-center mt-6">
        <div className="justify-center items-center flex flex-row w-[80%] mb-2">
          <button
            id="filter-by-all-btn"
            data-testid="filter-by-all-btn"
            onClick={ handleFilterClick }
            className="py-1 px-2 w-full teste-shadow rounded-md bg-white mx-1"
          >
            All
          </button>
          <button
            id="filter-by-meal-btn"
            data-testid="filter-by-meal-btn"
            onClick={ handleFilterClick }
            className="py-1 px-2 w-full teste-shadow rounded-md bg-white mx-1"
          >
            Meals
          </button>
          <button
            id="filter-by-drink-btn"
            data-testid="filter-by-drink-btn"
            onClick={handleFilterClick}
            className="py-1 px-2 w-full teste-shadow rounded-md bg-white mx-1"
          >
            Drinks
          </button>
        </div>
      </div>
      <RecipesList listFilter={ filter } pageType={ pageType } />
    </div>
  );
}

export default FavoriteRecipes;
