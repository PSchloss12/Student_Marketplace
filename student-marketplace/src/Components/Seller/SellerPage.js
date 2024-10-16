// this page will allow users to add products the want to sell
import './styles.css';
import {useState} from "react";
import {createProduct} from '../../Services/Products';
import { createTransaction } from '../../Services/Transactions';
// import {getUser} from '../../Services/Users';
// import { updateUser } from '../../Services/Users';
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
  const [successMessage, setSuccessMessage] = useState(''); // message to tell the user that the form submitted

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

  // the Code below is set up to update the seller's sellerVenmo attribute in the db but it will not work until Auth is implemented
  // to avoid errors, it is commented out for now

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   const { listingTitle, price, description, categories, venmo, picture } = formData;
  
  //   // Change categories to string to match the database
  //   const selectedCategories = Object.keys(categories)
  //     .filter((category) => categories[category])
  //     .join(", ");
  
  //   // Convert price to Number because database expects it as number
  //   const priceAsNumber = parseFloat(price);
  
  //   if (isNaN(priceAsNumber)) {
  //     console.error("Invalid price. Please enter a valid number for the price.");
  //     return;
  //   }
  
  //   let imgUrl = null;
  //   if (picture) {
  //     const parseFile = new Parse.File(picture.name, picture);
  //     await parseFile.save()
  //       .then(() => {
  //         imgUrl = parseFile.url();
  //       })
  //       .catch((error) => {
  //         console.error("Image upload failed:", error);
  //       });
  //   }
  
  //   // TODO: Hardcoded for now - need to get current user id in future
  //   const sellerId = "dJcfo4qvL2";
  
  //   // Fetch the current user by sellerId
  //   getUser(sellerId)
  //     .then(async (user) => {
  //       // Update the user's Venmo information
  //       await updateUser(user, venmo);
  
  //       createProduct(priceAsNumber, listingTitle, description, selectedCategories, imgUrl, sellerId)
  //         .then((product) => {
  //           const productId = product.id; // Get the ID of the newly created product
  
  //           // create the transaction
  //           createTransaction(sellerId, productId)
  //             .then((transaction) => {
  //               console.log("Transaction created successfully:", transaction);
  //               // Show success message
  //               setSuccessMessage("Product Listing created successfully!");
  //               // Reset form data
  //               setFormData(initialFormData);
  //             })
  //             .catch((error) => {
  //               console.error("Error creating transaction:", error);
  //             });
  //         })
  //         .catch((error) => {
  //           console.error("Error creating product:", error);
  //         });
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching user:", error);
  //     });
  // };

  // the below code will be removed when auth is implemented and we are able to use the above code
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { listingTitle, price, description, categories, picture } = formData;  // Removed venmo
  
    // Change categories to string to match the database
    const selectedCategories = Object.keys(categories)
      .filter((category) => categories[category])
      .join(", ");
  
    // Convert price to Number because database expects it as a number
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
  
    // TODO: Hardcoded for now - need to get current user id in future
    const sellerId = "dJcfo4qvL2";
  
    createProduct(priceAsNumber, listingTitle, description, selectedCategories, imgUrl, sellerId)
      .then((product) => {
        const productId = product.id; // Get the ID of the newly created product
  
        // Create the transaction
        createTransaction(sellerId, productId)
          .then((transaction) => {
            console.log("Transaction created successfully:", transaction);
  
            // Show success message
            setSuccessMessage("Product Listing created successfully!");
  
            // Reset form data
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
          Picture of Item (If Applicable) - Note: will not work until we implement auth!:
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