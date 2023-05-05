import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, searchBtn }) {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <div>
      <h1 data-testid="page-title">{title}</h1>
      <button>
        <img data-testid="profile-top-btn" src={ profileIcon } alt="profile-button" />
      </button>
      {
        searchBtn
          && (
            <button>
              <img data-testid="search-top-btn" src={ searchIcon } alt="search-icon" />
            </button>)
      }

    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  searchBtn: PropTypes.bool,
}.isRequired;

export default Header;
