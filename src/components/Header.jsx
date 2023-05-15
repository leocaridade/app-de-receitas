import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import drawingLogo from '../images/drawinglogoBlack.svg';
import mealsLogo from '../images/mealspage.svg';
import drinksLogo from '../images/drinkspage.svg';
import nameLogo from '../images/nameBlack.svg';
import profileIconBlack from '../images/profileIconBlack.svg';
import doneRecipes from '../images/donerecipes.svg';
import favoriteRecipes from '../images/favoriterecipes.svg';

function Header({ title, searchBtn }) {
  const history = useHistory();
  const [searchInput, setInputSearch] = useState(false);
  const [attributeName, setAttributeName] = useState('');
  const [iconSrc, setIconSrc] = useState('');

  useEffect(() => {
    switch (title) {
    case 'Meals':
      setIconSrc(mealsLogo);
      break;
    case 'Drinks':
      setIconSrc(drinksLogo);
      break;
    case 'Profile':
      setIconSrc(profileIconBlack);
      break;
    case 'Done Recipes':
      setIconSrc(doneRecipes);
      break;
    case 'Favorite Recipes':
      setIconSrc(favoriteRecipes);
      break;
    default:
      break;
    }
  }, [title]);

  return (
    <div className=" h-[25%] flex flex-col">
      <div
        className={ `
      h-[40%]
      flex
      flex-row
      w-full
      justify-between
      px-5 pt-2 pb-2 ${title === 'Meals' ? 'bg-[#ffa94d]' : 'bg-[#66d9e8]'}
      ` }
      >
        <div className="h-full flex flex-row">
          <img src={ drawingLogo } alt="Recipes Logo" className=" max-h-[80%]" />
          <img
            src={ nameLogo }
            alt="Name Logo"
            className="w-[60%] max-h-[65%] self-end pb-2 pl-3"
          />
        </div>
        <div className="flex flex-row">
          {
            searchBtn
              && (
                <button
                  onClick={ () => {
                    setInputSearch(!searchInput);
                    const divButtons = document.getElementById('categories-div');
                    if (searchInput) divButtons.classList.remove('pt-10');
                    if (!searchInput) divButtons.classList.add('pt-10');
                  } }
                >
                  <img
                    data-testid="search-top-btn"
                    src={ searchIcon }
                    alt="search-icon"
                    className="max-h-1/2 h-1/2"
                  />
                </button>
              )
          }
          <button
            onClick={ () => history.push('/profile') }
            src={ profileIcon }
            data-testid="profile-top-btn"
          >
            <img src={ profileIcon } alt="profile-button" className="pl-3 h-1/2" />
          </button>
        </div>
      </div>
      <div
        className={ `
        h-[60%]
        w-[100%]
        flex flex-col
        justify-center
        pt-2
        items-center ${title === 'Meals' ? 'bg-[#fff4e6]' : ''}
        ${title === 'Drinks' ? 'bg-[#e3fafc]' : ''}
        ` }
      >
        <img
          src={ iconSrc }
          alt="Page Logo"
          className="h-[80%]"
        />
        <h1 data-testid="page-title">{title}</h1>
      </div>
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
