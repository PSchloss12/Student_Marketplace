import React, { useEffect, useState } from "react";
import { createUser } from "./AuthService";
import AuthForm from "./AuthForm";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: ""
  });
  
  // flags in the state to watch for add/remove updates
  const [readyToSubmit, setReadyToSubmit] = useState(false);

  // register changes
  useEffect(() => {
    if (newUser && readyToSubmit) {
      createUser(newUser).then((userCreated) => {
        if (userCreated) {
          alert(
            `${userCreated.get("username")}, you successfully registered!`
          );
          navigate("/");
        }
        setReadyToSubmit(false);
      });
    }
  }, [navigate, newUser, readyToSubmit]);

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value: newValue } = e.target;
    setNewUser({
      ...newUser,
      [name]: newValue
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setReadyToSubmit(true);
  };
  
  return (
    <div>
      <AuthForm
        user={newUser}
        isLogin={false}
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
      />
    </div>
    );
  };
  
  export default Register;