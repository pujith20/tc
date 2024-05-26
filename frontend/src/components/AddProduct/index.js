import React, { useState } from "react";
import axios from "axios";
import "./index.css";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "Veg",
    discount: "",
    description: "",
    thumbnail: null,
  });
  const [thumbnailImage, setThumbnailImage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleThumbnailChange = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setThumbnailImage(reader.result);
      setFormData((prevData) => ({
        ...prevData,
        thumbnail: reader.result,
      }));
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    axios
      .post("https://tastycorner.onrender.com/products/add-product", formData)
      .then((res) => {
        console.log("Data uploaded successfully !!");
        alert("Uploaded successfully!!")
        setFormData({
          title: "",
          price: "",
          category: "Veg",
          discount: "",
          description: "",
          thumbnail: null,
        });
        setThumbnailImage("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="form-container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Product Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="Veg">Veg</option>
            <option value="Non-veg">Non-veg</option>
            <option value="Desserts">Desserts</option>
            <option value="Appetizers">Appetizers</option>
          </select>
        </div>
        <div>
          <label htmlFor="discount">Discount:</label>
          <input
            type="number"
            id="discount"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="thumbnail">Thumbnail:</label>
          <input
            type="file"
            id="thumbnail"
            name="thumbnail"
            onChange={handleThumbnailChange}
            accept="image/*"
            required
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
      {thumbnailImage && (
        <div className="thumbnail-preview">
          <img
            width={100}
            height={100}
            src={thumbnailImage}
            alt="Thumbnail Preview"
          />
        </div>
      )}
    </div>
  );
};

export default AddProduct;
