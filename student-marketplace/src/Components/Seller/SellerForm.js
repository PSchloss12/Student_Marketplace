// this page will allow users to add products the want to sell
import {useState} from "react";
  const SellerForm = () => {
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      listingTitle: "",
      categories: {
        dormEssentials: false,
        tickets: false,
        electronics: false,
        books: false,
      },
      price: "",
      description: "",
      venmo: "",
    });
  
    // track form data being changed
    const handleChange = (e) => {
      const { name, value, type, checked, files } = e.target;
      if (type === "checkbox") {
        setFormData((prev) => ({
          ...prev,
          categories: {
            ...prev.categories,
            [name]: checked,
          },
        }));
      } else if (type === "file") {
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
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Form Data:", formData);
      // TODO: Handle form submission
    };
  
    return (
      <div class="page">
        <div class="container">
          <h1>List Your Item</h1>
          <h3>Fill out this form to list your item for sale</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onInput={handleChange}
              required
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onInput={handleChange}
              required
            />
          </label>
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
            <label>
              <input
                type="checkbox"
                name="dormEssentials"
                checked={formData.categories.dormEssentials}
                onChange={handleChange}
              />
              Dorm Essentials
            </label>
            <label>
              <input
                type="checkbox"
                name="tickets"
                checked={formData.categories.tickets}
                onChange={handleChange}
              />
              Tickets
            </label>
            <label>
              <input
                type="checkbox"
                name="electronics"
                checked={formData.categories.electronics}
                onChange={handleChange}
              />
              Electronics
            </label>
            <label>
              <input
                type="checkbox"
                name="books"
                checked={formData.categories.books}
                onChange={handleChange}
              />
              Books
            </label>
            <label>
              <input
                type="checkbox"
                name="miscellaneous"
                checked={formData.categories.miscellaneous}
                onChange={handleChange}
              />
              Miscellaneous
            </label>
          </fieldset>
          <label>
            Picture of Item (If Applicable):
            <input
              type="file"
              name="picture"
              accept="image/*"
              onChange={handleChange}
            />
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
              placeholder="Include description of item (details, condition, etc.) "
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
  