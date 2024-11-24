import Parse from 'parse';
import { getAllUsers } from './Users';
// GET: all products
export const getAllProducts = () => {
  const Product = Parse.Object.extend("Product");
  const query = new Parse.Query(Product);

  return query
    .find()
    .then((results) => {
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
export const createProduct = (Price, Title, Description, Category, imgUrls, SellerId, SellerUsername) => {
  const Product = Parse.Object.extend("Product");
  const product = new Product();
  product.set("price", Price);
  product.set("title", Title);
  product.set("description", Description);
  product.set("category", Category);

  if (imgUrls && imgUrls.length > 0) {
    product.set("imgUrls", imgUrls);
  }

  const SellerPointer = new Parse.User();
  SellerPointer.id = SellerId;
  product.set("sellerId", SellerPointer);

  //sellerUsername
  product.set("sellerUsername", SellerUsername);

  return product.save().then((result) => result);
};


//Delete operation - remove product by ID
export const removeProduct = (id) => {
  const Product = Parse.Object.extend("Product");
  const query = new Parse.Query(Product);
  return query.get(id).then((product) => {
    product.destroy();

  });
};

//GET: get favorites of the user logged in 
export const getFavorites = (id) => {
  if (!id) {
    return Promise.resolve([]); // Return an empty array if no id is provided
  }

  // Get all users and find the one with the matching id
  return getAllUsers()
    .then((users) => {
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
        console.warn("No favorite products found for this user. Returning all available products.");
        return getAllProducts().then((allProducts) => 
          allProducts.filter((product) => product.get("isAvailable") === true)
        );
      }
    
      // Filter favorite products to include only available ones
      return favoriteProducts.filter((product) => product.get("isAvailable") === true);
    })
    .catch((error) => {
      console.error("Error fetching favorites:", error);
      return getAllProducts(); // Fetch all products on error
    });
};

// set isAvailable to false when someone buys a product
export const updateAvailable = async (productId) => {
  try {
    const product = await getProduct(productId); // Fetch the product by ID
    product.set("isAvailable", false); // Update the isAvailable attribute
    await product.save(); // Save
    console.log("Product availability updated successfully.");
  } catch (error) {
    console.error("Error updating product availability:", error);
    throw error; 
  }
};

// gets all products that are available
export const getAvailableProducts = async () => {
  const Product = Parse.Object.extend("Product");
  const query = new Parse.Query(Product);
  query.equalTo("isAvailable", true); // Filter products where isAvailable is true
  return query.find().then((results) => results);
};