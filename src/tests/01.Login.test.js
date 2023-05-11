import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouter';
import Login from '../pages/Login';

const validEmail = 'email@teste.com';
const validPassword = '1234567';

describe('Teste a página de login', () => {
  test('Testa se os elementos do formulário de login estão na tela.', () => {
    render(<Login />);
    const getInputEmail = screen.getByTestId('email-input');
    const getInputPassword = screen.getByTestId('password-input');
    const getButton = screen.getByRole('button', {
      name: /enter/i,
    });

    expect(getInputEmail).toBeInTheDocument();
    expect(getInputPassword).toBeInTheDocument();
    expect(getButton).toBeInTheDocument();
  });

  test('Testa se quando digita o botão é habilitado e passa para a proxima pagina', () => {
    const { history } = renderWithRouterAndRedux(
      <Login />,
      { },
    );
    const getInputEmail = screen.getByTestId('email-input');
    const getInputPassword = screen.getByTestId('password-input');
    const getButton = screen.getByRole('button', {
      name: /enter/i,
    });

    expect(getButton).toBeDisabled();

    // Digita o email no input de email
    userEvent.type(getInputEmail, validEmail);

    // Digita a senha no input de senha
    userEvent.type(getInputPassword, validPassword);

    expect(getButton).toBeEnabled();

    userEvent.click(getButton);

    const { pathname } = history.location;

    expect(pathname).toBe('/meals');
  });
});
