import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <div
      data-testid="footer"
      style={ {
        bottom: 0,
        position: 'fixed',
      } }
    >
      <Link to="/drinks">
        <img src={ drinkIcon } alt="drink icon" data-testid="drinks-bottom-btn" />
      </Link>
      <Link to="/meals">
        <img src={ mealIcon } alt="drink icon" data-testid="meals-bottom-btn" />
      </Link>
    </div>
  );
}

export default Footer;
