const axios = window.axios;
const DBURL = "https://stwfk8.csb.app/DB/";

// POST: add user to db (signup)
export const createUser = (id, name, email, password) => {
  return axios({
    method: "post",
    url: `${url}/users`,
    data: {
      email: {
        id,
        name,
        password,
      },
    },
    headers: {
      "Content-Type": "application/json",
    },
    json: true,
  })
    .then((response) => {
      console.log("POST response: ", response);
    })
    .catch((err) => {
      console.log("POST error: ", err);
    });
};

// GET: get a single user (login)
export function login(email, password) {
    if (!email) {
      return 0;
    }
    return axios
      .get(DBURL + "users.json")
      .then((response) => {
        const users = response.data;
        if (users[email]["password"] === password) {
          return users[email]["id"];
        } else {
          return 0;
        }
      })
      .catch((error) => {
        console.error("Error fetching favorites:", error);
      });
  }

// GET: every user from db
export const getAllUsers = () => {
  return axios
    .get(DBURL + "users.json")
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((err) => {
      console.log("GET Error: ", err);
    });
};
