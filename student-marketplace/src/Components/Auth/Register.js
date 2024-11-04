import React, { useEffect, useState } from "react";
import { checkUser, createUser } from "./AuthService";
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
  const [isChanged, setIsChanged] = useState(false);

  // register changes
  useEffect(() => {
    if (newUser && isChanged) {
      createUser(newUser).then((userCreated) => {
        if (userCreated) {
          alert(
            `${userCreated.get("username")}, you successfully registered!`
          );
          navigate("/");
        }
        setIsChanged(false);
      });
    }
  }, [navigate, newUser, isChanged]);

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value: newValue } = e.target;
    setNewUser({
      ...newUser,
      [name]: newValue
    });
    console.log(newUser)
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("Register submitted: ", e.target);
    setIsChanged(true);
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