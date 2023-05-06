import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userEmail = user ? user.email : '';
    document.querySelector('[data-testid="profile-email"]').innerHTML = userEmail;
  }, []);

  return (
    <>
      <Header title="Profile" searchBtn={ false } />
      <div>
        <p>Hello, user, this is your Profile</p>
        <p data-testid="profile-email" />
        <button data-testid="profile-done-btn">Done Recipes</button>
        <button data-testid="profile-favorite-btn">Favorite Recipes</button>
        <button data-testid="profile-logout-btn">Logout</button>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
