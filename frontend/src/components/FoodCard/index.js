import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios";
import "./index.css";

const FoodCard = ({title,image,reviews,description,productId,price,rating,}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardRef = useRef(null);
  const navigate = useNavigate();
  const jwtToken = Cookies.get("jwt_token");

  const handleClick = () => {
    if (!jwtToken) {
      navigate("/login", { replace: true });
    } else {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isModalOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // Stop observing once it’s visible
          }
        });
      },
      {
        threshold: 0.1, // Adjust this value as needed
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const onAddCart = async () => {
    try {
      const response = await axios.post(
        "https://tastycorner.onrender.com/cart/add",
        { productId, title, price, rating },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      console.log("Add to cart response:", response.data); // Log the response message
      toast.success("Product added successfully");
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error("Error adding product to cart");
    }
  };

  return (
    <>
      <div
        className="flip-card"
        ref={cardRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="hover-overlay"></div>
        <div className={`overlay ${isHovered ? "hovered" : ""}`}>
          <h2>{title}</h2>
          <button className="btn add-to-order outline-none text-white" onClick={handleClick}>
            Click here
          </button>
        </div>
      </div>
      {isModalOpen && (
        <>
          <div className="modal-backdrop show"></div>
          <div className="modal show" style={{ display: "block" }}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title mt-2">{title}</h5>
                  <button
                    type="button"
                    className="close"
                    aria-label="Close"
                    onClick={handleCloseModal}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body" style={{ height: "40%" }}>
                  <img
                    src={image}
                    alt={title}
                    style={{ width: "90%", height: "400px" }}
                    className="mb-2"
                  />
                  <p>{description}</p>
                  <h3>Reviews</h3>
                  <div className="reviews-container">
                    {reviews && reviews.length > 0 ? (
                      <ul>
                        {reviews.map((review, index) => (
                          <li key={index}>{review}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>
                        {reviews
                          ? "No reviews available"
                          : "Loading reviews..."}
                      </p>
                    )}
                  </div>
                </div>
                <button className="btn" onClick={onAddCart}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FoodCard;
