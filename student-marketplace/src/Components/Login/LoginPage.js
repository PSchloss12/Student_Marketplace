// This page will handle logins and signups
import {useState} from "react";
  import { createUser } from "../../Services/createUser.js";
  import LoginForm from "./LoginForm/LoginForm.js";
  
  const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
  
    // method to change between sign up and log-in form
    const toggleForm = (event) => {
      event.preventDefault(); // Prevent default link behavior
      setIsLogin(!isLogin);
      console.log("change");
    };
  
    // TODO: add method in future for handling login and sign-up
    // const handleSubmit = async (event) => {
    //   event.preventDefault();
    //   if (isLogin) {
    //     // TODO: add login service
    //   } else {
    //     // TODO: signup service
    //     // const response = await createUser(email, password);
    //   }
    //   if (response.ok) {
    //     // Handle successful login or sign-up
    //     console.log("Success:", await response.json());
    //   } else {
    //     // Handle errors
    //     console.error("Error:", await response.json());
    //   }
    // };
    return html`
      <div class="login-page">
        <div class="login-container">
          <h1 class="login-title">${isLogin ? "Login" : "Sign Up"}</h1>
          <${LoginForm} isLogin=${isLogin} />
          <!-- Correctly rendering LoginForm -->
          <p class="login-toggle-text">
            ${isLogin ? "Don't have an account? " : "Already have an account? "}
            <a class="login-toggle-link" href="#" onClick=${toggleForm}>
              ${isLogin ? "Sign Up" : "Login"}
            </a>
          </p>
        </div>
      </div>
    `;
  };
  
  export default LoginPage;
  