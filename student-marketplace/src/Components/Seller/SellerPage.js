// this page will allow users to add products the want to sell

import './styles.css';
import { useState, useEffect } from "react";
import { createProduct } from '../../Services/Products';
import { createTransaction } from '../../Services/Transactions';
import { getUser } from '../../Services/Users'; // Import the getUser service
import Parse from 'parse';

const SellerForm = () => {
  const initialFormData = {
    listingTitle: '',
    categories: {
      dormEssentials: false,
      tickets: false,
      electronics: false,
      books: false,
      miscellaneous: false,
    },
    price: '',
    description: '',
    venmo: '',
    pictures: [], // Array to hold selected pictures
  };

  const [formData, setFormData] = useState(initialFormData);
  const [successMessage, setSuccessMessage] = useState('');
  const [sellerUsername, setSellerUsername] = useState(''); // Store the username

  useEffect(() => {
    const fetchUsername = async () => {
      const currentUser = Parse.User.current();
      if (currentUser) {
        try {
          const user = await getUser(currentUser.id); // Fetch the user by ID
          setSellerUsername(user.get("username")); // Set the sellerUsername
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };

    fetchUsername();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        categories: {
          ...prev.categories,
          [name]: checked,
        },
      }));
    } else if (type === 'file') {
      setFormData((prev) => ({
        ...prev,
        pictures: [...prev.pictures, ...Array.from(files)], // Append new files
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { listingTitle, price, description, categories, pictures, venmo } = formData;
    const currentUser = Parse.User.current();

    if (!currentUser || !sellerUsername) {
      console.error("User is not authenticated or username is missing");
      return;
    }

    const selectedCategories = Object.keys(categories)
      .filter((category) => categories[category])
      .join(", ");

    const priceAsNumber = parseFloat(price);

    if (isNaN(priceAsNumber)) {
      console.error("Invalid price. Please enter a valid number for the price.");
      return;
    }

    let uploadedFiles = [];
    if (pictures.length > 0) {
      try {
        uploadedFiles = await Promise.all(
          pictures.map(async (file) => {
            const parseFile = new Parse.File(file.name, file);
            await parseFile.save();
            return parseFile;
          })
        );
      } catch (error) {
        console.error("Image upload failed:", error);
        return;
      }
    }

    createProduct(priceAsNumber, listingTitle, description, selectedCategories, uploadedFiles, currentUser.id, sellerUsername)
      .then((product) => {
        const productId = product.id;

        createTransaction(currentUser.id, productId, venmo)
          .then((transaction) => {
            console.log("Transaction created successfully:", transaction);
            setSuccessMessage("Product Listing created successfully!");

            setFormData(initialFormData);
          })
          .catch((error) => {
            console.error("Error creating transaction:", error);
          });
      })
      .catch((error) => {
        console.error("Error creating product:", error);
      });
  };

  const removePicture = (index) => {
    setFormData((prev) => ({
      ...prev,
      pictures: prev.pictures.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="page">
      <div className="container">
        <h1>List Your Item</h1>
        <h3>Fill out this form to list your item for sale</h3>
      </div>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Listing Title:
          <input
            type="text"
            name="listingTitle"
            value={formData.listingTitle}
            onInput={handleChange}
            placeholder="Enter title that buyers will see"
            required
          />
        </label>
        <fieldset>
          <legend>Category:</legend>
          {Object.keys(formData.categories).map((category) => (
            <label key={category}>
              <input
                type="checkbox"
                name={category}
                checked={formData.categories[category]}
                onChange={handleChange}
              />
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </label>
          ))}
        </fieldset>
        <label>
          Pictures of Item (If Applicable):
          <input type="file" name="pictures" accept="image/*" multiple onChange={handleChange} />
        </label>
        <div>
          {formData.pictures.map((file, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
              <span>{file.name}</span>
              <button type="button" onClick={() => removePicture(index)} style={{ marginLeft: '10px' }}>
                Remove
              </button>
            </div>
          ))}
        </div>
        <label>
          Listing Price of the Item($):
          <input
            type="number"
            name="price"
            value={formData.price}
            onInput={handleChange}
            placeholder="Enter Price"
            required
          />
        </label>
        <label>
          Description of Item:
          <textarea
            name="description"
            value={formData.description}
            onInput={handleChange}
            placeholder="Include details and condition of the item"
            required
          ></textarea>
        </label>
        <label>
          Your Venmo Username:
          <input
            type="text"
            name="venmo"
            value={formData.venmo}
            onInput={handleChange}
            placeholder="@your-username"
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SellerForm;