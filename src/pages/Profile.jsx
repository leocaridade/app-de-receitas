import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const [userEmail, setUserEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const email = user ? user.email : '';
    setUserEmail(email);
  }, []);

  const handleLogoutClick = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div className="h-screen bg-[#FAF6F4]">
      <Header title="Profile" searchBtn={ false } />
      <div
        className="flex flex-col h-[75%] items-center justify-between py-20"
      >
        <div className="flex flex-col justify-center items-center">
          <p>Your e-mail: </p>
          <p data-testid="profile-email">{userEmail}</p>
        </div>
        <div className="flex flex-col justify-items-start items-center w-2/3 h-3/5">
          <button
            data-testid="profile-done-btn"
            className="py-1 px-2 rounded-md my-2 w-full bg-white teste-shadow"
            onClick={ () => history.push('/done-recipes') }
          >
            Done Recipes
          </button>
          <button
            data-testid="profile-favorite-btn"
            className="py-1 px-2 rounded-md my-2 w-full bg-white teste-shadow"
            onClick={ () => history.push('/favorite-recipes') }
          >
            Favorite Recipes
          </button>
          <button
            data-testid="profile-logout-btn"
            onClick={ handleLogoutClick }
            className="py-1 px-2 rounded-md my-2 w-full bg-white teste-shadow"
          >
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
