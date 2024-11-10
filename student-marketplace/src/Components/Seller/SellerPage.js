// this page will allow users to add products the want to sell
import './styles.css';
import {useState} from "react";
import {createProduct} from '../../Services/Products';
import { createTransaction } from '../../Services/Transactions';
import { updateUser } from '../../Services/Users';
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
    picture: null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [successMessage, setSuccessMessage] = useState('');

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
        picture: files[0],
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

    const { listingTitle, price, description, categories, picture, venmo } = formData;
    const currentUser = Parse.User.current();

    if (!currentUser) {
      console.error("User is not authenticated");
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

    let imgUrl = null;
    if (picture) {
      const parseFile = new Parse.File(picture.name, picture);
      await parseFile.save()
        .then(() => {
          imgUrl = parseFile.url();
        })
        .catch((error) => {
          console.error("Image upload failed:", error);
        });
    }

    const sellerId = currentUser.id;

    createProduct(priceAsNumber, listingTitle, description, selectedCategories, imgUrl, sellerId)
      .then((product) => {
        const productId = product.id;

        createTransaction(sellerId, productId)
          .then((transaction) => {
            console.log("Transaction created successfully:", transaction);

            updateUser(sellerId, venmo)
              .then(() => {
                setSuccessMessage("Product Listing created successfully!");

                setFormData(initialFormData);
              })
              .catch((error) => {
                console.error("Error updating user Venmo:", error);
              });
          })
          .catch((error) => {
            console.error("Error creating transaction:", error);
          });
      })
      .catch((error) => {
        console.error("Error creating product:", error);
      });
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
          Picture of Item (If Applicable):
          <input type="file" name="picture" accept="image/*" onChange={handleChange} />
        </label>
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
            placeholder="@your_username"
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SellerForm;