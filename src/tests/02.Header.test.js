import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Drinks from '../pages/Drinks';

describe('Testa o elemento Header', () => {
  test('Verifica se os elementos são renderizados na tela', () => {
    render(<Drinks />);
    const title = screen.getByTestId('page-title');
    const profileBtn = screen.getByTestId('profile-top-btn');
    const searchBtn = screen.getByTestId('search-top-btn');
    expect(title).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });

  test('Verifica se muda para a pagina Profile ao clicar no botão profile', () => {
    const { history } = renderWithRouter(<Drinks />);
    const profileBtn = screen.getByTestId('profile-top-btn');
    userEvent.click(profileBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });

  test('Verifica se aparece um input de search ao clicar no botão search', () => {
    renderWithRouter(<Drinks />);
    const searchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchBtn);
    const inputSearch = screen.getByTestId('search-input');
    expect(inputSearch).toBeInTheDocument();
  });
});
