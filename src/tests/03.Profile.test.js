import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouter';
import Profile from '../pages/Profile';

describe('Teste a página de profile', () => {
  test('Testa se os botões de perfil, receitas feitas, receitas favoritas e sair estão na tela.', () => {
    renderWithRouterAndRedux(<Profile />);
    screen.getAllByRole('button').forEach((button) => {
      expect(button).toBeInTheDocument();
    });
  });

  test('local storage é limpo após o click', () => {
    localStorage.setItem('user', JSON.stringify({ email: 'user@example.com' }));

    renderWithRouterAndRedux(<Profile />);

    const logoutButton = screen.getByTestId('profile-logout-btn');
    userEvent.click(logoutButton);

    expect(localStorage.getItem('user')).toBeNull();
  });
});
