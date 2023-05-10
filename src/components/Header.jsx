import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title, searchBtn }) {
  const history = useHistory();
  const [searchInput, setInputSearch] = useState(false);
  const [attributeName, setAttributeName] = useState('');

  return (
    <div>
      <h1 data-testid="page-title">{title}</h1>
      <button
        onClick={ () => history.push('/profile') }
        src={ profileIcon }
        data-testid="profile-top-btn"
      >
        <img src={ profileIcon } alt="profile-button" />
      </button>
      {
        searchBtn
          && (
            <button onClick={ () => setInputSearch(!searchInput) }>
              <img data-testid="search-top-btn" src={ searchIcon } alt="search-icon" />
            </button>
          )
      }
      {
        searchInput && (
          <>
            <input
              type="text"
              data-testid="search-input"
              onChange={ ({ target }) => setAttributeName(target.value) }
              value={ attributeName }
            />
            <SearchBar
              attributeName={ attributeName }
            />
          </>
        )
      }
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  searchBtn: PropTypes.bool,
}.isRequired;

export default Header;
