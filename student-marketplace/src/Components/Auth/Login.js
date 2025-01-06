import React, { useEffect, useState } from "react";
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
  const [readyToSubmit, setReadyToSubmit] = useState(false);

  // useEffect that run when changes are made to the state variable flags
  useEffect(() => {
    if (currentUser && readyToSubmit) {
      loginUser(currentUser).then((userLoggedIn) => {
        if (userLoggedIn) {
          alert(
            `${userLoggedIn.get("username")}, you successfully logged in!`
          );
          navigate("/");
        }
        setReadyToSubmit(false);
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
    // if (currentUser?.email.slice(-4) !== ".edu"){
    //   alert("Please use your .edu email!");
    //   return;
    // };
    setReadyToSubmit(true);
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