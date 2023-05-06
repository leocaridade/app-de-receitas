import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Meals from '../pages/Meals';
import Drinks from '../pages/Drinks';
import Profile from '../pages/Profile';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import MealDetails from '../pages/MealDetails';
import DrinkDetails from '../pages/DrinkDetails';

export default function Routes() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/meals/:id-da-receita" component={ MealDetails } />
        {/* <Route exact path="/meals/:id-da-receita/in-progress" component={ #Meals } /> */}
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/drinks/:id-da-receita" component={ DrinkDetails } />
        {/* <Route exact path="/drinks/:id-da-receita/in-progress" component={ #Drinks } /> */}
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </div>
  );
}
