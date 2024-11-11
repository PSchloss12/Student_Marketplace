import Parse from 'parse';

// GET: single transaction by id
export const getTransaction = (id) => {
    const Transaction = Parse.Object.extend("Transaction");
    const query = new Parse.Query(Transaction);
    return query.get(id).then((result) => {
      return result;
    }).catch((error) => {
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
  export const createTransaction = (sellerId, productId) => {
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