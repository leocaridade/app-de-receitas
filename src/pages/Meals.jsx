import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

function Meals() {
  return (
    <>
      <Header title="Meals" searchBtn />
      <div>Meals</div>
      <Recipes recipeType="meals" />
      <Footer />
    </>
  );
}

export default Meals;
