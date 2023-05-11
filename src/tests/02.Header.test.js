import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Meals from '../pages/Meals';
import { renderWithRouterAndRedux } from './helpers/renderWithRouter';

const initialState = { recipesReducer: { searchRecipes: [], countFavoriteList: 0 } };
const initialEntries = ['/meals'];
describe('Testa o elemento Header', () => {
  test('Verifica se muda para a pagina Profile ao clicar no botão profile', () => {
    const { history } = renderWithRouterAndRedux(
      <Meals />,
      { initialState, initialEntries },
    );
    expect(history.location.pathname).toBe('/meals');
    screen.getByRole('heading', { name: /meals/i });
    const profileBtn = screen.getByTestId('profile-top-btn');
    userEvent.click(profileBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });
  test('Verifica se muda para a pagina Profile ao clicar no botão search', () => {
    const { history } = renderWithRouterAndRedux(
      <Meals />,
      { initialState, initialEntries },
    );
    expect(history.location.pathname).toBe('/meals');
    screen.getByRole('heading', { name: /meals/i });
    const searchBtn = screen.getByRole('button', { name: /search-icon/i });
    userEvent.click(searchBtn);
    const radioIngredient = screen.getByTestId('ingredient-search-radio');
    userEvent.click(radioIngredient);
    const inputSearch = screen.getByTestId('search-input');
    userEvent.type(inputSearch, 'beef');
    const submitBtn = screen.getByTestId('exec-search-btn');
    userEvent.click(submitBtn);
  });
});
