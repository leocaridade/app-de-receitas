import React from 'react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { legacy_createStore as createStore } from 'redux';
import recipesReducer from '../../redux/reducers/recipesReducer';

export const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

export const renderWithRouterAndRedux = (
  component,
  {
    initialState = {},
    store = createStore(recipesReducer, initialState),
    initialEntries = ['/'],
    history = createMemoryHistory({ initialEntries }),
  } = {},
) => ({
  ...render(
    <Router history={ history }>
      <Provider store={ store }>{component}</Provider>
    </Router>,
  ),
  history,
});
