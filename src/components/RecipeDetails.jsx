import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchFoodByIdAPI } from '../services/mealsAPI';
import { fetchDrinkByIdAPI } from '../services/drinksAPI';

function RecipeDetails({ recipeType }) {
  const history = useHistory();
  console.log(history);

  useEffect(() => {
    const recipeID = history.location.pathname.split('/')[2];
    const handleFetchDetails = async () => {
      try {
        let recipeDetails;
        if (recipeType === 'meals') {
          recipeDetails = await fetchFoodByIdAPI(recipeID);
        }
        if (recipeType === 'drinks') {
          recipeDetails = await fetchDrinkByIdAPI(recipeID);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleFetchDetails();
  }, [recipeType]);

  return (
    <div>
      <p>{`Hello World! Your recipe type is: ${recipeType}`}</p>
    </div>
  );
}

RecipeDetails.propTypes = {
  recipeType: PropTypes.string,
}.isRequired;

export default RecipeDetails;
