import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

function Meals() {
  return (
    <div className="h-full bg-[#ffa94d]">
      <div className="h-screen">
        <Header title="Meals" searchBtn />
        <Recipes recipeType="meals" />
        <Footer />
      </div>
    </div>
  );
}

export default Meals;
