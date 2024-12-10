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
  const currentUser = Parse.User.current(); // Get the current user

  if (!currentUser) {
    throw new Error("No user is logged in.");
  }

  try {
    // Get the favorites array  from the current user
    const currentFavorites = currentUser.get("favorites") || []; 

    // If no favorites are found, return all available products
    if (currentFavorites.length === 0) {
      console.log("No favorites found for this user.");
      
      // get all available products
      const query = new Parse.Query("Product");
      try {
        const allProducts = await query.find();
        return allProducts; // Return all products
      } catch (error) {
        console.error("Error fetching all products:", error);
        return []; 
      }
    }

    const productPromises = currentFavorites.map((productId) => getProduct(productId));
    const favoriteProducts = await Promise.all(productPromises);

    // Filter and return only available products 
    return favoriteProducts.filter((product) => product.get("isAvailable") === true);
    
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return []; // Return an empty array on error
  }
};

// UPDATE: set isAvailable to false when someone buys a product
export const updateAvailable = async (productId) => {
  try {
    const product = await getProduct(productId); // get the product by ID
    product.set("isAvailable", false); // Update  isAvailable attribute
    await product.save();
    console.log("Product availability updated successfully.");
  } catch (error) {
    console.error("Error updating product availability:", error);
    throw error; 
  }
};

// GET: gets all products that are available
export const getAvailableProducts = async () => {
  const Product = Parse.Object.extend("Product");
  const query = new Parse.Query(Product);
  query.equalTo("isAvailable", true); // Filter products where isAvailable is true
  return query.find().then((results) => results);
};

// UPDATE: add a product to the current  user's favorite array 
export const addToFavorites = async (productId) => {
  const currentUser = Parse.User.current();  // Get the current user
  if (!currentUser) {
    throw new Error("User is not logged in.");
  }

  try {
    const user = currentUser; // Use the logged-in user
    const currentFavorites = user.get("favorites") || []; 


    // If product is already in favorites, return without doing anything
    if (currentFavorites.includes(productId)) {
      console.log("Product is already in favorites.");
      return; 
    }

    // Add the product to the array
    currentFavorites.push(productId);
    user.set("favorites", currentFavorites);

    // Save the updated user object
    await user.save();
    console.log("Product added to favorites successfully.");
  } catch (error) {
    console.error("Error adding product to favorites:", error);
    throw error; 
  }
};