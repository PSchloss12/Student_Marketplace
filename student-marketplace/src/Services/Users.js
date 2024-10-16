import Parse from 'parse';

// POST: add user to db (when they signup) - fix when we do auth?
export const createUser = (Username, Email, Password) => {
  const User = Parse.Object.extend("User");
  const user = new User();
  user.set("email", Email);
  user.set("password", Password);
  user.set("username", Username)
  return user.save().then((result) => {
    return result;
  });
};

// GET: get a single user (login) - update this when we do auth if needed
export const getUser = (id) => {
  if (!id) {
    console.error("No id provided.");
    return Promise.reject(new Error("No id provided."));
  }
  const query = new Parse.Query(Parse.User);
  return query.get(id)
    .then((user) => {
      console.log("User found:", user);
      return user;
    })
    .catch((error) => {
      // Handle any errors
      console.error("Error fetching user by id:", error);
      throw error;
    });
};

// GET: every user from db
export const getAllUsers = () => {
  const query = new Parse.Query(Parse.User);

  // check query
  if (!query) {
    console.error("Parse.Query is undefined or not initialized correctly.");
    return Promise.resolve([]); // Return empty array if something goes wrong
  }

  // Now attempt the query
  return query.find()
    .then((results) => {
      console.log("Found users: ", results);
      return results;
    })
    .catch((error) => {
      console.error("Error querying users: ", error);
      return [];
    });
};