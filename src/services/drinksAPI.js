const fetchDrinksAPI = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  console.log(data.drinks);
  return data.drinks;
};

export default fetchDrinksAPI;
