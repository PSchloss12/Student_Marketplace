import Parse from 'parse';

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

//Create operation - create product
export const createProduct = (Price, Title, Description, Category, Venmo, ImgUrl, SellerId) => {
  const Product = Parse.Object.extend("Product");
  const product = new Product();
  product.set("price", Price);
  product.set("title", Title);
  if (Description) {
    product.set("description", Description);
  }
  product.set("category", Category);
  product.set("venmo", Venmo);

  if (ImgUrl) {
    product.set("imgUrl", ImgUrl);
  }

  const SellerPointer = new Parse.User();
  SellerPointer.id = SellerId;  // Assign the id of the user to the pointer
  product.set("sellerId", SellerPointer);

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


export const getFavorites = (username) => {
  if (!username) {
    console.error("No username provided.");
    return Promise.resolve([]); // Return an empty array if no username is provided
  }
  const query = new Parse.Query(Parse.User); 
  query.equalTo("username", username); // Exact match for username

  return query.find() // Use find() to get all matching results 
    .then((users) => {
      console.log("Users found:", users); // Log the users array
      if (!users.length) {
        console.warn("User not found, fetching all products instead.");
        return getAllProducts(); // Call getAllProducts if no user is found
      }

      const user = users[0]; // Get the first user from the results

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
