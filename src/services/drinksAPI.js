export const fetchDrinksAPI = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  return data.drinks;
};

export const fetchCategoriesDrinksAPI = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();
  console.log(data.drinks);
  return data.drinks;
};
