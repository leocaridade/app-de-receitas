import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { setLocalStorage } from '../services/localStorage';
import recipesLogo from '../images/recipesLogo.png';

function Login() {
  const history = useHistory();
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
    history.push('/meals');
  };

  return (
    <div
      className="bg-gradient-to-b from-[#ffa94d] from-35% to-[#66d1f5] to-70%
      h-screen w-screen flex flex-col justify-evenly"
    >
      <img src={ recipesLogo } alt="Recipes Logo" className="mb-20" />
      <div className=" w-full flex justify-center">
        <form className="flex flex-col w-3/4">
          <input
            type="email"
            name="email"
            data-testid="email-input"
            placeholder="Digite seu e-mail"
            onChange={ handleFormChange }
            className="px-4 py-2 mb-4 rounded-lg"
          />
          <input
            type="text"
            name="password"
            data-testid="password-input"
            placeholder="Digite sua senha"
            onChange={ handleFormChange }
            className="px-4 py-2 mb-4 rounded-lg"
          />
          <button
            data-testid="login-submit-btn"
            disabled={ !validLogin }
            onClick={ handleLoginClick }
            className="bg-white rounded-lg py-1"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
