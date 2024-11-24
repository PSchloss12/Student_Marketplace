import Parse from 'parse';
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
export const getFavorites = async () => {
  const currentUser = Parse.User.current(); // Get the current logged-in user

  if (!currentUser) {
    throw new Error("No user is logged in.");
  }

  try {
    // Get the favorites array (which contains product IDs) from the current user
    const currentFavorites = currentUser.get("favorites") || []; // Default to an empty array if favorites is not set

    // Ensure currentFavorites is an array
    if (!Array.isArray(currentFavorites)) {
      throw new Error("Favorites should be an array.");
    }

    // If no favorites are found, return an empty array or all available products
    if (currentFavorites.length === 0) {
      console.warn("No favorites found for this user.");
      return []; // Or you could return all available products if needed
    }

    // Fetch the full product details for each favorite product ID
    const productPromises = currentFavorites.map((productId) => getProduct(productId));
    const favoriteProducts = await Promise.all(productPromises);

    // Filter and return only available products (assuming each product is an object with an 'isAvailable' property)
    return favoriteProducts.filter((product) => product.get("isAvailable") === true);
    
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return []; // Return an empty array on error
  }
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

// add a product to the current  user's favorite array 
export const addToFavorites = async (productId) => {
  const currentUser = Parse.User.current();  // Get the current logged-in user
  if (!currentUser) {
    throw new Error("User is not logged in.");
  }

  try {
    const user = currentUser; // Use the logged-in user
    const currentFavorites = user.get("favorites") || []; // Get current favorites (or an empty array if not set)

    // Ensure currentFavorites is an array
    if (!Array.isArray(currentFavorites)) {
      throw new Error("Favorites should be an array.");
    }

    // If product is already in favorites, just return without doing anything
    if (currentFavorites.includes(productId)) {
      console.log("Product is already in favorites.");
      return; // Just return, no need to add the product again
    }

    // Add the product to the array
    currentFavorites.push(productId);
    user.set("favorites", currentFavorites);

    // Save the updated user object
    await user.save();
    console.log("Product added to favorites successfully.");
  } catch (error) {
    console.error("Error adding product to favorites:", error);
    throw error; // Re-throw the error to propagate it up
  }
};