import { useState, useEffect } from "react";
import axios from "axios";
import del from "../assets/delete.png";
import AddProduct from "../AddProduct";
import "./index.css";

const Admin = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const result = await axios.get("http://localhost:5000/products/");
        setFoodItems(result.data.products);
      } catch (err) {
        console.log("Error fetching products: ", err);
      }
    };
    getProducts();
  }, []);

  const deleteItem = (id) => {
    const updatedItems = foodItems.filter((item) => item.id !== id);
    setFoodItems(updatedItems);
  };

  return (
    <div className="admin-con">
      <div className="sidbar">
        <h4 className="mb-5 admin-nav-title">TastyCorner.</h4>
        <ul className="menu-list">
          <li className="mb-5" onClick={() => setShowAddProduct(true)}>
            Add Product
          </li>
          <li className="mb-5">Order Tracking</li>
          <li onClick={() => setShowAddProduct(false)}>History</li>
        </ul>
      </div>
      <div className="main-content">
        {showAddProduct ? (
          <AddProduct />
        ) : (
          <>
            <h2>Food Items</h2>
            <div className="item-container">
              <ul className="item-list">
                {foodItems.map((item) => (
                  <li key={item.id} className="item">
                    <div>
                      <h3>{item.title}</h3>
                      <p>Price: ${item.price}</p>
                      <p>Rating: {item.rating}</p>
                    </div>
                    <img
                      src={del}
                      alt="Delete"
                      onClick={() => deleteItem(item.id)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Admin;
