import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

function Meals() {
  return (
    <div className="h-screen">
      <Header title="Meals" searchBtn />
      <Recipes recipeType="meals" />
      <Footer />
    </div>
  );
}

export default Meals;
