import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  return (
    <>
      <Header title="Profile" searchBtn={ false } />
      <div>Profile</div>
      <Footer />
    </>
  );
}

export default Profile;
