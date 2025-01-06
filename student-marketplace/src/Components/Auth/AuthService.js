import Parse from "parse";

// used in auth register component
export const createUser = (newUser) => {
  const user = new Parse.User();

  // user.set("username", newUser.username);
  user.set("username", newUser.email);
  user.set("email", newUser.email);
  user.set("password", newUser.password);

  if (newUser?.venmo){
    user.set("venmo", newUser.venmo);
  }

  return user
    .signUp()
    .then((newUserSaved) => {
      return newUserSaved;
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};

// used in auth login component
export const loginUser = (currUser) => {
  const user = new Parse.User();

  user.set("username", currUser.email);
  user.set("email", currUser.email);
  user.set("password", currUser.password);

  return user
    .logIn(user.email, user.password)
    .then((currUserSaved) => {
      return currUserSaved;
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};

export const isLoggedIn = () => {
  return Parse.User.current()?.authenticated;
};

export const logoutUser = async () => {
  try { 
    await Parse.User.logOut();
    } catch (error) {
      console.error('Error logging out: ', error);    
    }
};