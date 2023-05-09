export const ADD_RECIPES = 'ADD_RECIPES';
export const RENDER_FAVORITE_LIST = 'RENDER_FAVORITE_LIST';

export const saveUserSearch = (payload) => ({
  type: ADD_RECIPES,
  payload,
});

export const renderFavoriteList = (payload) => ({
  type: RENDER_FAVORITE_LIST,
  payload,
});
