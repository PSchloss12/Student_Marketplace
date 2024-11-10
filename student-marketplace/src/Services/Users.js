import Parse from 'parse';

// POST: add user to db (when they signup) - fix when we do auth?
export const createUser = (Username, Email, Password, Venmo) => {
  const User = Parse.Object.extend("User");
  const user = new User();
  user.set("email", Email);
  user.set("password", Password);
  user.set("username", Username)
  if (Venmo) {
    user.set("sellerVenmo", Venmo);
  }
  return user.save().then((result) => {
    return result;
  });
};

// GET: get a single user (login)
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
      return results;
    })
    .catch((error) => {
      console.error("Error querying users: ", error);
      return [];
    });
};

// UPDATE: update a user
export const updateUser = async (userId, venmoUsername) => {
  try {
    const userQuery = new Parse.Query(Parse.User);
    const user = await userQuery.get(userId);

    user.set("sellerVenmo", venmoUsername);
    await user.save();

    console.log("User Venmo updated successfully");
    return user;
  } catch (error) {
    console.error("Failed to update user Venmo:", error);
    throw error;
  }
};

// function to return if user is authenticated
export const userAuthenticated = () => {
  const currentUser = Parse.User.current();
  return currentUser ? currentUser.authenticated() : false;
};

export const getSellerVenmo = async (sellerId) => {
  try {
    const userQuery = new Parse.Query(Parse.User);
    const user = await userQuery.get(sellerId.id);  
    const sellerVenmo = user.get("sellerVenmo") || "Venmo username not available";
    return sellerVenmo;

  } catch (error) {
    console.error("Failed to retrieve seller's Venmo:", error);
    throw error;
  }
};