import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar";
import ClipLoader from "react-spinners/ClipLoader";
import del from "../assets/delete.png";
import Confetti from "react-confetti";
import { useUser } from "../UserContext";
import "./index.css";

const MyOrders = () => {
  const [cart, setCart] = useState(new Map());
  const [isLoading, setIsLoading] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [imageUrls, setImageUrls] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();
  const { email } = useUser();
  const jwtToken = Cookies.get("jwt_token");

  useEffect(() => {
    if (!jwtToken) {
      navigate("/login", { replace: true });
    }
  }, [jwtToken, navigate]);

  useEffect(() => {
    const fetchCart = async () => {
      const token = Cookies.get("jwt_token");
      if (token) {
        // Fetch user cart items
        const response = await axios.get(
          "http://localhost:5000/cart/get-items",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCart(new Map(Object.entries(response.data.cart)));
        console.log(response.data.cart);
        // Fetch image URLs for products in the cart
        const productIds = Object.keys(response.data.cart);
        const imageResponse = await axios.get(
          "http://localhost:5000/products/pics",
          {
            params: {
              ids: productIds,
            },
          }
        );
        setImageUrls(imageResponse.data);
      }
    };
    fetchCart();
  }, []);

  const updateCartQuantity = async (id, quantityChange) => {
    const token = Cookies.get("jwt_token");
    if (token) {
      const item = cart.get(id);
      if (item) {
        const newQuantity = item.quantity + quantityChange;
        if (newQuantity > 0) {
          await axios.put(
            `http://localhost:5000/cart/update/${id}`,
            { quantity: newQuantity },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setCart((prevCart) => {
            const newCart = new Map(prevCart);
            newCart.set(id, { ...item, quantity: newQuantity });
            return newCart;
          });
        }
      }
    }
  };

  const removeFromCart = async (id) => {
    const token = Cookies.get("jwt_token");
    if (token) {
      await axios.delete("http://localhost:5000/cart/remove", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { productId: id },
      });
      setCart((prevCart) => {
        const newCart = new Map(prevCart);
        newCart.delete(id);
        return newCart;
      });
    }
  };

  const incrementQuantity = (id) => {
    updateCartQuantity(id, 1);
  };

  const decrementQuantity = (id) => {
    updateCartQuantity(id, -1);
  };

  const getEstimatedShopping = () => {
    return Array.from(cart.values()).reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  };

  const getTotal = () => {
    const estimatedShopping = getEstimatedShopping();
    return estimatedShopping + 0;
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const token = Cookies.get("jwt_token");
      if (token) {
        await axios.post(
          "http://localhost:5000/confirm/checkout",
          { email },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsOrderPlaced(true);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      {isLoading && (
        <div className="spinner-container">
          <ClipLoader color={"#36D7B7"} loading={isLoading} size={150} />
        </div>
      )}
      {isOrderPlaced ? (
        <>
          {showConfetti && <Confetti />}
          <div className="order-confirmation">
            <h2>
              Your delivery is successfully placed. Get your confirmation in
              Mail
            </h2>
          </div>
        </>
      ) : (
        <>
          <h2>Welcome back !!</h2>
          <div className="my-orders">
            <div className="orders-con">
              {Array.from(cart.entries()).map(([id, item]) => (
                <div className="order" key={id}>
                  <div className="order-details">
                    <div className="order-image-quantity mt-4">
                      <div className="order-image">
                        <img src={imageUrls[id]} alt="Loading..." />
                      </div>
                      <div className="quantity-controls">
                        <button
                          type="button"
                          onClick={() => decrementQuantity(id)}
                        >
                          -
                        </button>
                        <p>{item.quantity}</p>
                        <button
                          type="button"
                          onClick={() => incrementQuantity(id)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="order-info">
                      <h6>{item.title}</h6>
                      <p>
                        Price: ${item.price * item.quantity} ({item.quantity} *{" "}
                        {item.price})
                      </p>
                      <p>Order ID: {id}</p>
                    </div>
                    <div className="order-delete">
                      <button
                        className="delete-btn"
                        onClick={() => removeFromCart(id)}
                      >
                        <img src={del} alt="delete" className="delete-img" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="checkout-con">
              <p className="summary-title">ORDER SUMMARY</p>
              <div className="pl-2 py-2">
                <div className="d-flex">
                  <p className="width-box">Estimated Shopping: </p>
                  <p>${getEstimatedShopping().toFixed(2)}</p>
                </div>
                <div className="d-flex">
                  <p className="width-box">Discount: </p>
                  <p>$0</p>
                </div>
                <hr />
                <div className="d-flex">
                  <p className="width-box">SubTotal: </p>
                  <p>${getTotal().toFixed(2)}</p>
                </div>
              </div>
              <button className="btn btn-success" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MyOrders;
