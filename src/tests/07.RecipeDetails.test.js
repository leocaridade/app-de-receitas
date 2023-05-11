import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouter';
import App from '../App';

const LINK_MEALS = '/meals/52771';
const RECIPE_CATEGORY = 'recipe-category';
const INGREDIENT_AND_MEASURE = '0-ingredient-name-and-measure';
const START_RECIPE_BTN = 'start-recipe-btn';

describe('Testa a tela de detalhes de uma receita', () => {
  describe('Testa os detalhes se for pela rota de comidas', () => {
    afterAll(() => localStorage.clear());
    test('Testa se os componentes renderizam na tela', async () => {
      const { history } = renderWithRouterAndRedux(<App />);
      history.push(LINK_MEALS);
      await waitFor(() => expect(screen.getByTestId('recipe-photo')).toBeInTheDocument());
      await waitFor(() => expect(screen.getByTestId('recipe-title')).toBeInTheDocument());
      await waitFor(() => expect(screen.getByTestId('share-btn')).toBeInTheDocument());
      await waitFor(() => expect(screen.getByTestId('favorite-btn')).toBeInTheDocument());
      await waitFor(() => expect(screen
        .getByTestId(RECIPE_CATEGORY)).toBeInTheDocument());
      await waitFor(() => expect(screen
        .getByTestId(RECIPE_CATEGORY)).toBeInTheDocument());
      await waitFor(() => expect(screen
        .getByTestId(INGREDIENT_AND_MEASURE)).toBeInTheDocument());
      await waitFor(() => expect(screen
        .getByTestId(INGREDIENT_AND_MEASURE)).toBeInTheDocument());
      await waitFor(() => expect(screen.getByTestId('instructions')).toBeInTheDocument());
      await waitFor(() => expect(screen.getByTestId('video')).toBeInTheDocument());
      await waitFor(() => expect(screen
        .getByTestId(START_RECIPE_BTN)).toBeInTheDocument());
    });

    test('Testa se depois de clicar no botao de clicar, a tela muda', async () => {
      const { history } = renderWithRouterAndRedux(<App />);
      history.push(LINK_MEALS);
      await waitFor(() => expect(screen
        .getByTestId(START_RECIPE_BTN)).toBeInTheDocument());
      const startRecipeBtn = screen.getByTestId('start-recipe-btn');
      userEvent.click(startRecipeBtn);
      await waitFor(() => expect(screen
        .queryByTestId(START_RECIPE_BTN)).not.toBeInTheDocument());
    });

    test('Testa se ja tiver a receita no local storage, o botão de iniciar receita não é renderizado', async () => {
      localStorage.setItem('doneRecipes', JSON.stringify([{ id: '52771' }]));
      const { history } = renderWithRouterAndRedux(<App />);
      history.push(LINK_MEALS);

      await waitFor(() => expect(screen
        .queryByTestId(START_RECIPE_BTN)).not.toBeInTheDocument());
    });
  });
  describe('Testa o botão se for pela rota de bebidas', () => {
    afterAll(() => localStorage.clear());
    test('Testa se os componentes renderizam na tela', async () => {
      const { history } = renderWithRouterAndRedux(<App />);
      history.push('/drinks/178319');
      await waitFor(() => expect(screen.getByTestId('recipe-photo')).toBeInTheDocument());
      await waitFor(() => expect(screen.getByTestId('recipe-title')).toBeInTheDocument());
      await waitFor(() => expect(screen.getByTestId('share-btn')).toBeInTheDocument());
      await waitFor(() => expect(screen.getByTestId('favorite-btn')).toBeInTheDocument());
      await waitFor(() => {
        const allCategories = screen.getAllByTestId('recipe-category');
        expect(allCategories.length).toBe(2);
      });
      await waitFor(() => expect(screen
        .getByTestId(INGREDIENT_AND_MEASURE)).toBeInTheDocument());
      await waitFor(() => expect(screen
        .getByTestId(INGREDIENT_AND_MEASURE)).toBeInTheDocument());
      await waitFor(() => expect(screen.getByTestId('instructions')).toBeInTheDocument());
      await waitFor(() => expect(screen
        .getByTestId(START_RECIPE_BTN)).toBeInTheDocument());
    });
  });
});
