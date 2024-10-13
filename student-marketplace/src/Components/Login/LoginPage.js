// This page will handle logins and signups
  import {useState} from "react";
  import { createUser } from "../../Services/Users";
  import LoginForm from "./LoginForm/LoginForm.js";
  import './styles.css';

 const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Toggle between login and signup forms
  const toggleForm = (event) => {
    event.preventDefault();
    setIsLogin(!isLogin);
    console.log("Form toggled");
  };

  // Handle form submission for login or signup
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLogin) {
      // TODO: Add login service
      console.log("Login form submitted");
    } else {
      // Call signup service
      try {
        const response = await createUser(username, email, password);
        console.log("Signup successful:", response);
      } catch (error) {
        console.error("Error during signup:", error);
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">{isLogin ? "Login" : "Sign Up"}</h1>
        <LoginForm
          isLogin={isLogin}
          username={username}
          setUsername={setUsername}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
        />
        <p className="login-toggle-text">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <a className="login-toggle-link" href="#" onClick={toggleForm}>
            {isLogin ? "Sign Up" : "Login"}
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;