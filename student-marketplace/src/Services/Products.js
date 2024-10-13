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


export const getFavorites = (id) => {
  if (!id) {
    return [];
  }

  // Fetch the user by their ID
  const User = Parse.Object.extend("_User");
  const query = new Parse.Query(User);
  
  return query
  .get(id) // Get the user by userID
  .then((user) => {
    const favoritesRelation = user.relation("favorites"); // Access the 'favorites' relation
    const favoritesQuery = favoritesRelation.query(); // Get the query for the products

    return favoritesQuery.find(); // Execute  query to get favorite products
  })
  .then((favoriteProducts) => {

    return favoriteProducts; // Return the list of favorite products
  })
  .catch((error) => {
    console.error("Error fetching favorites:", error);
    return [];
  });
};