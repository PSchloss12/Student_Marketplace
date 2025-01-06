import React, { useEffect, useState } from "react";
import { createUser } from "./AuthService";
import AuthForm from "./AuthForm";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    venmo: "",
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

  // const onChangeHandler = (e) => {
  //   e.preventDefault();
  //   const { name, value: newValue } = e.target;
  //   setNewUser({
  //     ...newUser,
  //     [name]: newValue
  //   });
  // };

  // NB: I'm just going to remove the username field and set it to email (it will be copied on the bakcend)
  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value: newValue } = e.target;
  
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: newValue,
      ...(name === "email" && { username: newValue }), // Automatically set username to email
    }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (newUser.password !== newUser.confirmPassword) {
      alert("Passwords do not match!");
      return;
    } else if (newUser?.email.slice(-4) !== ".edu"){
      alert("Please use your .edu email!");
      return;
    };
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