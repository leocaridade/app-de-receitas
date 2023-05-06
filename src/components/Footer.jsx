import React from 'react';
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
      <img src={ drinkIcon } alt="drink icon" data-testid="drinks-bottom-btn" />
      <img src={ mealIcon } alt="drink icon" data-testid="meals-bottom-btn" />
    </div>
  );
}

export default Footer;
