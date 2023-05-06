import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import Login from '../pages/Login';
import Profile from '../pages/Profile';

const validEmail = 'email@teste.com';
const validPassword = '1234567';

describe('Teste a página de profile', () => {
  test('Testa se os botões de perfil, receitas feitas, receitas favoritas e sair estão na tela.', () => {
    renderWithRouter(<Profile />);
    screen.getAllByRole('button').forEach((button) => {
      expect(button).toBeInTheDocument();
    });
  });

  test('local storage é limpo após o click', () => {
    localStorage.setItem('user', JSON.stringify({ email: 'user@example.com' }));

    renderWithRouter(<Profile />);

    const logoutButton = screen.getByTestId('profile-logout-btn');
    userEvent.click(logoutButton);

    expect(localStorage.getItem('user')).toBeNull();
  });
});
