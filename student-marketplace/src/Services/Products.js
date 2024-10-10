const axios = window.axios;
const DBURL = "https://stwfk8.csb.app/DB/";

// GET: all products
export function getProducts() {
  return axios
    .get(DBURL + "products.json")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
}

// GET: selected products from db
export function getFavorites(userID) {
    if (!userID) {
      return [];
    }
    userID = String(userID);
  
    return axios
      .get(DBURL + "products.json")
      .then((response) => {
        const products = response.data;
  
        return axios.get(DBURL + "favorites.json").then((response) => {
          let favoritesList = response.data[userID];
          return products.filter((product) => favoritesList.includes(product.id));
        });
      })
      .catch((error) => {
        console.error("Error fetching favorites:", error);
      });
  }