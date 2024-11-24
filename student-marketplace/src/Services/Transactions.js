import Parse from 'parse';

// GET: single transaction by id
export const getTransaction = (id) => {
  const Transaction = Parse.Object.extend("Transaction");
  const query = new Parse.Query(Transaction);
  return query.get(id)
    .then((result) => result)
    .catch((error) => {
      console.error("Error fetching transaction:", error);
    });
};
  
  // GET: all transactions
  export const getAllTransactions = () => {
    const Transaction = Parse.Object.extend("Transaction");
    const query = new Parse.Query(Transaction);
  
    return query
      .find()
      .then((results) => {
        console.log("transactions: ", results);
        return results;
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  };


  //Post: create new transaction
  export const createTransaction = (sellerId, productId, sellerVenmo) => {
    const Transaction = Parse.Object.extend("Transaction");
    const transaction = new Transaction();
  
    // Set sellerId (Pointer to _User)
    const SellerPointer = new Parse.User();
    SellerPointer.id = sellerId;
    transaction.set("sellerId", SellerPointer);
  
    // Set productId (Pointer to Product)
    const ProductPointer = new Parse.Object("Product");
    ProductPointer.id = productId; 
    transaction.set("productId", ProductPointer);
  
    //set sellerVenmo
    transaction.set("sellerVenmo", sellerVenmo);
    // Save the transaction
    return transaction.save().then((result) => {
      return result;
    }).catch((error) => {
      console.error("Error creating transaction:", error);
    });
  };

  // get all transactions where the current user is the seller
  export const getUserTransactions = () => {
    const currentUser = Parse.User.current();
    if (!currentUser) return Promise.resolve([]);
  
    const Transaction = Parse.Object.extend("Transaction");
    const query = new Parse.Query(Transaction);
    query.equalTo("sellerId", currentUser);
    query.include("productId");
  
    return query.find()
      .then((transactions) => transactions)
      .catch((error) => {
        console.error("Error fetching transactions:", error);
        return [];
      });
  };

  // GET: seller's Venmo by product ID
  export const getSellerVenmo = (productId) => {
    const Transaction = Parse.Object.extend("Transaction");
    const query = new Parse.Query(Transaction);
  
    // Query for transactions with the specified productId
    query.equalTo("productId", {
      __type: "Pointer",
      className: "Product",
      objectId: productId
    });
  
    query.limit(1);
  
    return query.find()
      .then((transactions) => {
        if (transactions.length > 0) {
          return transactions[0].get("sellerVenmo");
        } else {
          throw new Error("No transaction found for the product.");
        }
      })
      .catch((error) => {
        console.error("Error fetching sellerVenmo:", error);
        throw error;
      });
  };


  export const transactionBuyer = async (productId) => {
    const Transaction = Parse.Object.extend("Transaction");
    const query = new Parse.Query(Transaction);
  
    try {
      // Query for all transactions with the same productId
      query.equalTo("productId", { __type: "Pointer", className: "Product", objectId: productId });
      const transactions = await query.find(); // Fetch all matching transactions
  
      if (transactions.length === 0) {
        throw new Error("No transaction found for the given product.");
      }
  
      // Assuming we want to update the first transaction found (you could refine this logic)
      const transaction = transactions[0];
  
      const currentUser = Parse.User.current();
      if (!currentUser) {
        throw new Error("No current user found. User must be logged in to make a purchase.");
      }
  
      // Set the buyerId to the current user
      transaction.set("buyerId", currentUser);  // _User pointer for the buyer
  
      // Save the updated transaction
      await transaction.save();
  
      console.log("Transaction updated successfully:", transaction);
      return transaction;  // Return the updated transaction
    } catch (error) {
      console.error("Error updating transaction:", error);
      throw error;
    }
  };