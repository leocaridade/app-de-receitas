export const fetchMealsAPI = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  console.log(data.meals);
  return data.meals;
};

export const fetchCategoriesMealsAPI = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();
  console.log(data.meals);
  return data.meals;
};
