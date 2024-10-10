const LoginForm = ({ isLogin }) => {
    return (
      <form class="login-form">
        <label class="login-form-label" for="email">Email:</label>
        <input class="login-form-input" type="email" id="email" required />
  
        <label class="login-form-label" for="password">Password:</label>
        <input class="login-form-input" type="password" id="password" required />
  
        {!isLogin && (
          <>
            <label class="login-form-label" for="confirm-password">Retype Password:</label>
            <input
              class="login-form-input"
              type="password"
              id="confirm-password"
              required
            />
          </>
        )}
  
        <button class="login-form-button" type="submit">
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
    );
  };