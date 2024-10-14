import Parse from 'parse';

// POST: add user to db (when they signup)
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

// GET: get a single user (login) - update this when we do auth
// export function login(email, password) {
//     if (!email) {
//       return 0;
//     }
//     return axios
//       .get(DBURL + "users.json")
//       .then((response) => {
//         const users = response.data;
//         if (users[email]["password"] === password) {
//           return users[email]["id"];
//         } else {
//           return 0;
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching favorites:", error);
//       });
//   }

// GET: every user from db
export const getAllUsers = () => {
  const User = Parse.Object.extend("User");
  const query = new Parse.Query(User);
  return query.find().then((results) => {
    console.log("results: ", results);
    return results;
  })
  .catch((error) => {
    console.log("error getting users: ", error);
  });
};
