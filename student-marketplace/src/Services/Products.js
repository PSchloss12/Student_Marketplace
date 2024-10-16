import Parse from 'parse';
import { getAllUsers } from './Users';
// GET: all products
export const getAllProducts = () => {
  const Product = Parse.Object.extend("Product");
  const query = new Parse.Query(Product);

  return query
    .find()
    .then((results) => {
      console.log("results: ", results);
      return results;
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
};
//Get: one product by id
export const getProduct = (id) => {
  const Product = Parse.Object.extend("Product");
  const query = new Parse.Query(Product);
  return query.get(id).then((result) => {
    return result;
  
  });
};

//Post operation - create product
export const createProduct = (Price, Title, Description, Category, ImgUrl, SellerId) => {
  const Product = Parse.Object.extend("Product");
  const product = new Product();
  product.set("price", Price);
  product.set("title", Title);
  if (Description) {
    product.set("description", Description);
  }
  product.set("category", Category);

  if (ImgUrl) {
    product.set("imgUrl", ImgUrl);
  }

  const SellerPointer = new Parse.User();
  SellerPointer.id = SellerId;  // Assign the id of the user to the pointer
  product.set("sellerId", SellerPointer);

  // Return the entire product object after saving so that its ID can be used
  return product.save().then((result) => {
    return result;
  });
};

//Delete operation - remove product by ID
export const removeProduct = (id) => {
  const Product = Parse.Object.extend("Product");
  const query = new Parse.Query(Product);
  return query.get(id).then((product) => {
    product.destroy();

  });
};

//GET: get favorites of the user logged in (hardcoded right now)
export const getFavorites = (id) => {
  if (!id) {
    console.error("No id provided.");
    return Promise.resolve([]); // Return an empty array if no id is provided
  }

  // Get all users and find the one with the matching id
  return getAllUsers()
    .then((users) => {
      console.log("All users:", users);

      // Find the user that matches the  id
      const user = users.find((user) => user.id === id);

      if (!user) {
        console.warn("User not found, fetching all products instead.");
        return getAllProducts(); // Call getAllProducts if no matching user is found
      }

      // Get the 'favorites' relation for the found user
      const favoritesRelation = user.relation("favorites"); // Ensure 'favorites' relation exists
      if (!favoritesRelation) {
        throw new Error("Favorites relation not found on user.");
      }

      const favoritesQuery = favoritesRelation.query(); // Query the favorites

      return favoritesQuery.find();
    })
    .then((favoriteProducts) => {
      if (!favoriteProducts.length) {
        console.warn("No favorite products found for this user.");
      }
      console.log("Favorite products:", favoriteProducts);
      return favoriteProducts;
    })
    .catch((error) => {
      console.error("Error fetching favorites:", error);
      return getAllProducts(); // Fetch all products on error
    });
};
