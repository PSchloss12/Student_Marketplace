const RegisterForm = ({username, setUsername, email, setEmail, password,setPassword, handleSubmit}) => {
    return (
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="login-form-label" htmlFor="username">
          Username:
        </label>
        <input
          className="login-form-input"
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
  
        <label className="login-form-label" htmlFor="email">
          Email:
        </label>
        <input
          className="login-form-input"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
  
        <label className="login-form-label" htmlFor="password">
          Password:
        </label>
        <input
          className="login-form-input"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
  
            <label className="login-form-label" htmlFor="confirm-password">
              Retype Password:
            </label>
            <input
              className="login-form-input"
              type="password"
              id="confirm-password"
              required
            />
  
        <button className="login-form-button" type="submit">
          Sign Up
        </button>
      </form>
    );
  };
  
  export default RegisterForm;