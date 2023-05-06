import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userEmail = user ? user.email : '';
    document.querySelector('[data-testid="profile-email"]').innerHTML = userEmail;
  }, []);

  const handleLogoutClick = () => {
    localStorage.clear();
  };

  return (
    <>
      <Header title="Profile" searchBtn={ false } />
      <div>
        <p>Hello, user, this is your Profile</p>
        <p data-testid="profile-email" />
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
