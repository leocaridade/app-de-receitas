import { ADD_RECIPES, RENDER_FAVORITE_LIST } from '../actions';

const INITIAL_STATE = {
  searchRecipes: [],
  countFavoriteList: 0,
};

const recipesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_RECIPES:
    return {
      ...state,
      searchRecipes: action.payload,
    };
  case RENDER_FAVORITE_LIST:
    return {
      ...state,
      countFavoriteList: state.countFavoriteList + action.payload,
    };
  default:
    return state;
  }
};

export default recipesReducer;
