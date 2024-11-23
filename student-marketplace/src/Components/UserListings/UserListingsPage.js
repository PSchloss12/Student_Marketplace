// Dashboard to display all of user's current and past listings
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserTransactions } from '../../Services/Transactions';
import { getProduct } from '../../Services/Products';
import './styles.css';

const UserListingsPage = () => {
  const [unsoldListings, setUnsoldListings] = useState([]);
  const [soldListings, setSoldListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserListings = async () => {
      try {
        const transactions = await getUserTransactions(); // get all the transactions that the user listed 
        const unsold = [];
        const sold = [];
        // for each listing, get the product from the product table
        for (const transaction of transactions) {
          const product = await getProduct(transaction.get("productId").id);
          const listing = {
            id: product.id,
            title: product.get("title"),
            price: product.get("price"),
            dateListed: product.get("createdAt").toLocaleDateString(),
            imgUrls: product.get("imgUrls"),
            sellerId: transaction.get("sellerId"),
            isSold: transaction.get("isSold"),
          };

          listing.isSold ? sold.push(listing) : unsold.push(listing);
        }

        setUnsoldListings(unsold);
        setSoldListings(sold);
      } catch (error) {
        console.error("Error fetching user listings:", error);
      }
    };

    fetchUserListings();
  }, []);

  const handleClick = (listing) => {
    navigate(`/product/${listing.id}`, { state: listing });
  };

  return (
    <div className="user-listings">
      <h1>Your Listings</h1>

      <div className="listings-section">
        <h2>Current Listings</h2>
        {unsoldListings.length === 0 ? (
          <p>No current listings</p>
        ) : (
          unsoldListings.map((listing) => (
            <div key={listing.id} className="listing-item" onClick={() => handleClick(listing)}>
              <h3>{listing.title}</h3>
              <p>Price: ${listing.price}</p>
              <p>Date Listed: {listing.dateListed}</p>
              <p>Status: {listing.isSold ? "Sold" : "Available"}</p>
            </div>
          ))
        )}
      </div>

      <div className="listings-section">
        <h2>Sold Listings</h2>
        {soldListings.length === 0 ? (
          <p>No sold listings</p>
        ) : (
          soldListings.map((listing) => (
            <div key={listing.id} className="listing-item" onClick={() => handleClick(listing)}>
              <h3>{listing.title}</h3>
              <p>Price: ${listing.price}</p>
              <p>Date Listed: {listing.dateListed}</p>
              <p>Status: Sold</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserListingsPage;