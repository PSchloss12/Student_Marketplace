import React, { useEffect, useState, useRef } from "react";
import { checkUser, loginUser } from "./AuthService";
import AuthForm from "./AuthForm";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({
    email: "",
    password: ""
  });

  // flags in the state to watch for readyToSubmit/remove updates
  const readyToSubmit = useRef(false);

  // useEffect that run when changes are made to the state variable flags
  useEffect(() => {
    if (currentUser && readyToSubmit.current) {
      console.log("hello ",currentUser);
      loginUser(currentUser).then((userLoggedIn) => {
        if (userLoggedIn) {
          alert(
            `${userLoggedIn.get("firstName")}, you successfully logged in!`
          );
          navigate("/");
        }
        readyToSubmit.current = false;
      });
    }
  }, [navigate, currentUser, readyToSubmit]);

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value: newValue } = e.target;
    setCurrentUser({
      ...currentUser,
      [name]: newValue
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log('hello world')
    if (currentUser?.email.slice(-4) !== ".edu"){
      alert("Please use your .edu email!");
      return;
    };
    readyToSubmit.current = true;
  };

  return (
    <div>
      <AuthForm
        user={currentUser}
        isLogin={true}
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
      />
    </div>
  );
};

export default Login;