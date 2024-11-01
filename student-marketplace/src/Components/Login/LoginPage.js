// This page will handle logins and signups
  import {useState} from "react";
  import { useLocation } from "react-router-dom";

  // import { createUser } from "../../Services/Users";
  import LoginForm from "./LoginForm/LoginForm.js";
  import './styles.css';
  const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    // Get unauthorized message 
    const location = useLocation();
    const message = location.state?.message;
  
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
        console.log("Login form submitted");
      } else {
        // Sign-up service
      }
    };
  
    return (
      <div className="login-page">
        <div className="login-container">
          <h1 className="login-title">{isLogin ? "Login" : "Sign Up"}</h1>
          
          {/* Display the unauthorized access message if present */}
          {message && <p className="error-message">{message}</p>}
          
          <h3>Note: submitting won't work until auth is implemented in next feature </h3>
          
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