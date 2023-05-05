import React from 'react';
import { render, screen } from '@testing-library/react';
import Drinks from '../pages/Drinks';

describe('Testa o elemento Header', () => {
  test('Verifica se os elementos são renderizados na tela', () => {
    render(<Drinks />);
    const title = screen.getByTestId('page-title');
    expect(title).toBeInTheDocument();
  });
});
