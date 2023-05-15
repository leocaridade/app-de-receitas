import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();
  const [footerColor, setFooterColor] = useState('');
  const pathname = history.location.pathname.split('/')[1];
  console.log(pathname);

  useEffect(() => {
    switch (pathname) {
    case 'meals':
      setFooterColor('bg-[#A15D30]');
      break;
    case 'drinks':
      setFooterColor('bg-[#A15D30]');
      break;
    default:
      setFooterColor(
        'bg-gradient-to-r from-[#A15D30] to-[#A15D30] ',
      );
    }
  }, [pathname]);

  return (
    <div
      data-testid="footer"
      className={ `
      bottom-0
      fixed
      flex
      flex-row
      justify-between
      w-full px-[20px]
      py-5 rounded-t-md ${footerColor}` }
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
