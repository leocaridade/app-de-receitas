import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

function Drinks() {
  return (
    <>
      <Header title="Drinks" searchBtn />
      <Recipes recipeType="drinks" />
      <div>Drinks</div>
      <Footer />
    </>
  );
}

export default Drinks;
