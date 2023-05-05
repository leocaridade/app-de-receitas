import React, { useState } from 'react';
import { setLocalStorage } from '../services/localStorage';

function Login() {
  const [validLogin, setValidLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    const magicNumber = 6;
    return password.length >= magicNumber;
  };

  const handleFormChange = ({ target }) => {
    const { name, value } = target;
    setUserInfo((oldState) => ({
      ...oldState,
      [name]: value,
    }));
    if (isValidEmail(userInfo.email) && isValidPassword(userInfo.password)) {
      setValidLogin(true);
    } else {
      setValidLogin(false);
    }
  };

  const handleLoginClick = () => {
    setLocalStorage('user', { email: userInfo.email });
  };

  return (
    <div>
      <form>
        <input
          type="email"
          name="email"
          data-testid="email-input"
          placeholder="Digite seu e-mail"
          onChange={ handleFormChange }
        />
        <input
          type="text"
          name="password"
          data-testid="password-input"
          placeholder="Digite sua senha"
          onChange={ handleFormChange }
        />
        <button
          data-testid="login-submit-btn"
          disabled={ !validLogin }
          onClick={ handleLoginClick }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
