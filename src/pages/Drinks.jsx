import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

function Drinks() {
  return (
    <div className="h-screen">
      <Header title="Drinks" searchBtn />
      <Recipes recipeType="drinks" />
      <Footer />
    </div>
  );
}

export default Drinks;
