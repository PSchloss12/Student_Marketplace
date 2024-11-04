const LoginForm = ({username, setUsername, email, setEmail, password,setPassword, handleSubmit}) => {
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

      <button className="login-form-button" type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;