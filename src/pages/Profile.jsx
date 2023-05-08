import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const email = user ? user.email : '';
    setUserEmail(email);
  }, []);

  const handleLogoutClick = () => {
    localStorage.clear();
  };

  return (
    <>
      <Header title="Profile" searchBtn={ false } />
      <div>
        <p>Hello, user, this is your Profile</p>
        <p data-testid="profile-email">{ userEmail }</p>
        <Link to="/done-recipes">
          <button data-testid="profile-done-btn">Done Recipes</button>
        </Link>
        <Link to="/favorite-recipes">
          <button data-testid="profile-favorite-btn">Favorite Recipes</button>
        </Link>
        <Link to="/">
          <button
            data-testid="profile-logout-btn"
            onClick={ handleLogoutClick }
          >
            Logout
          </button>
        </Link>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
