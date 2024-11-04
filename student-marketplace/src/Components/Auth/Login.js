import React, { useEffect, useState } from "react";
import { checkUser, loginUser } from "./AuthService";
import AuthForm from "./AuthForm";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({
    // username: "",
    email: "",
    password: ""
  });

  // flags in the state to watch for isChanged/remove updates
  const [isChanged, setIsChanged] = useState(false);

  console.log('inLogin')

  // useEffect that run when changes are made to the state variable flags
  useEffect(() => {
    if (currentUser && isChanged) {
      loginUser(currentUser).then((userLoggedIn) => {
        if (userLoggedIn) {
          alert(
            `${userLoggedIn.get("firstName")}, you successfully logged in!`
          );
          navigate("/");
        }
        setIsChanged(false);
      });
    }
  }, [navigate, currentUser, isChanged]);

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
    console.log("Login submitted: ", e.target);
    setIsChanged(true);
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