// This page will handle logins and signups
  import react, {useState,useEffect} from "react";
  import { useLocation, useNavigate } from "react-router-dom";
  import LoginForm from "./Login/Login.js";
  import RegisterForm from "./Register/Register.js";
  import { isLoggedIn } from "./AuthService";
  import './styles.css';

  const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // redirect already authenticated users back to home
    const navigate = useNavigate();
    useEffect(() => {
      if (isLoggedIn()) {
        alert("You are already logged in");
        navigate("/");
      }
    }, [navigate]);
  
    // Get unauthorized message 
    const location = useLocation();
    const message = location.state?.message;

    const handleSubmit = () => {

    };

    const toggleForm = () => {
      setIsLogin(!isLogin);
    };

    if (isLogin) {
      return (
        <div className="login-page">
        <div className="login-container">
          <h1 className="login-title">{isLogin ? "Login" : "Sign Up"}</h1>
          <LoginForm
            username={username}
            setUsername={setUsername}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
          />
          <p className="login-toggle-text">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <a className="login-toggle-link" href="#" onClick={toggleForm}>
              {isLogin ? "Sign Up" : "Login"}
            </a>
          </p>
        </div>
        </div>
      )
    };
    return (
      <div className="login-page">
        <div className="login-container">
          <h1 className="login-title">{isLogin ? "Login" : "Sign Up"}</h1>
          
          {/* Display the unauthorized access message if present */}
          {message && <p className="error-message">{message}</p>}
                    
          <RegisterForm
            username={username}
            setUsername={setUsername}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
          />
          
          <p className="login-toggle-text">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <a className="login-toggle-link" href="#" onClick={toggleForm}>
              {isLogin ? "Sign Up" : "Login"}
            </a>
          </p>
        </div>
      </div>
    );
  };
  
  export default AuthPage;