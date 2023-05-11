import React from 'react';
import { screen, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouter';
import DoneRecipes from '../pages/DoneRecipes';

const initialState = { recipesReducer: { countFavoriteList: 0, searchRecipes: [] } };

const initialEntries = ['/done-recipes'];

const doneRecipes = [
  {
    alcoholicOrNot: 'Alcoholic',
    category: 'Cocktail',
    id: '17222',
    image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
    name: 'A1',
    nationality: '',
    tags: '',
    type: 'drink',
  },
  {
    alcoholicOrNot: '',
    category: 'Side',
    id: '53060',
    image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
    name: 'Burek',
    nationality: 'Croatian',
    tags: 'Streetfood, Onthego',
    type: 'meal',
  },
];

describe('Testa a página "done-recipes"', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn().mockReturnValue(JSON.stringify(doneRecipes)),
        clear: jest.fn(),
      },
      writable: true,
    });
    renderWithRouterAndRedux(<DoneRecipes />, { initialState, initialEntries });
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  test('Verifica se os elementos são renderizados corretamente na tela', () => {
    const title = screen.getByTestId('page-title');
    const allFilter = screen.getByRole('button', { name: /all/i });
    const mealFilter = screen.getByRole('button', { name: /meals/i });
    const drinkFilter = screen.getByRole('button', { name: /drinks/i });

    expect(title).toBeInTheDocument();
    expect(allFilter).toBeInTheDocument();
    expect(mealFilter).toBeInTheDocument();
    expect(drinkFilter).toBeInTheDocument();

    const img = screen.getByTestId('0-horizontal-image');
    const category = screen.getByTestId('0-horizontal-top-text');
    const name = screen.getByTestId('0-horizontal-name');
    const doneDate = screen.getByTestId('0-horizontal-done-date');
    const shareBtn = screen.getByTestId('0-horizontal-share-btn');

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg');
    expect(category).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(doneDate).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();

    userEvent.click(mealFilter);

    waitFor(() => {
      expect(img).not.toBeInTheDocument();
    });
  });
});
