import React from 'react';

function Login() {
  return (
    <div>
      <form>
        <input
          type="email"
          data-testid="email-input"
          placeholder="Digite seu e-mail"
        />
        <input
          type="text"
          data-testid="password-input"
          placeholder="Digite sua senha"
        />
        <button
          data-testid="login-submit-btn"
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
