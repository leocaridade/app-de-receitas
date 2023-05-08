import { ADD_RECIPES } from '../actions';

const INITIAL_STATE = {
  searchRecipes: [],
};

const recipesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_RECIPES:
    return {
      ...state,
      searchRecipes: action.payload,
    };
  default:
    return state;
  }
};

export default recipesReducer;
