import Parse from "parse";

// used in auth register component
export const createUser = (newUser) => {
  const user = new Parse.User();

  user.set("username", newUser.username);
  user.set("email", newUser.email);
  user.set("password", newUser.password);

  console.log("User: ", user);
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
  user.set("password", currUser.password);

  console.log("User: ", user);
  console.log();
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
    console.log('User logged out successfully.'); // Redirect or update state to reflect the logout
    } catch (error) {
      console.error('Error logging out: ', error);    
    }
};