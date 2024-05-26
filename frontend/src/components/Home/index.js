import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import logo from "../assets/logo3.png";
import img1 from "../assets/convenientorder.png";
import img2 from "../assets/ingredients.png";
import img3 from "../assets/fastdelivery.png";
import search from "../assets/search.png";
import "./index.css";
import FoodCardContainer from "../FoodCardContainer";

const Home = () => {
  const navigate = useNavigate();
  const [foodItems, setFoodItems] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const jwtToken = Cookies.get("jwt_token");
  useEffect(() => {
    if (!jwtToken) {
      navigate("/login", { replace: true });
    }
  }, [jwtToken, navigate]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const result = await axios.get("https://tastycorner.onrender.com/products/");
        setFoodItems(result.data.products);
      } catch (err) {
        console.log("Error fetching products: ", err);
      }
    };
    getProducts();
  }, []);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const onLogOut = () => {
    Cookies.remove("jwt_token");
    navigate("/login", { replace: true });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredFoodItems = foodItems.filter((foodItem) =>
    foodItem.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home">
      <section className={`banner ${isActive ? "active" : ""}`}>
        <header>
          <Link to="/" className="logo">
            <img src={logo} alt="logo" className="logo-img" />
          </Link>
          <div
            className={`toggle ${isActive ? "active" : ""}`}
            onClick={toggleMenu}
          ></div>
        </header>
        <div className="content">
          <div className="inside-content">
            <h2>
              Yum2Go: <span>Order, Eat, Repeat</span> with BiteJoy Delivery
            </h2>
            <p>
              Savor the flavors with Yum2Go: BiteJoy Delivery at your service,
              bringing deliciousness straight to your doorstep!
            </p>
            <Link to="/about-me">Know More</Link>
          </div>
          <div className="slider"></div>
        </div>
      </section>
      <div className={`navigation ${isActive ? "active" : ""}`}>
        <ul className="navigation-list-con">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about-me">About me</Link>
          </li>
          <li>
            <Link to="/my-orders">Orders</Link>
          </li>
          <li onClick={onLogOut}>
            <Link>Logout</Link>
          </li>
        </ul>
      </div>
      <div className="card-container">
        <div className="card">
          <img src={img1} alt="img1" className="card-img" />
          <h3>Convenient Ordering</h3>
          <p>
            Order your favorite meals with just a few clicks. Enjoy hassle-free
            delivery right to your doorstep.
          </p>
        </div>
        <div className="card">
          <img src={img2} alt="img2" className="card-img" />
          <h3>Fresh Ingredients</h3>
          <p>
            Indulge in dishes made with the freshest ingredients sourced from
            local farms and trusted suppliers.
          </p>
        </div>
        <div className="card">
          <img src={img3} alt="img3" className="card-img" />
          <h3>Fast Delivery</h3>
          <p>
            Experience lightning-fast delivery times. Get your food delivered
            piping hot and ready to enjoy.
          </p>
        </div>
      </div>
      <div className="food-items-container mt-5">
        <span className="text-center">Pick your favourite eatables here!</span>
        <div className="search-bar">
        <input
          type="search"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for food items"
        />
        <img src={search} alt="search" />
        </div>
        <FoodCardContainer foodItems={filteredFoodItems} />
      </div>
      <footer>
        <div className="footerContainer">
          <div className="socialIcons">
            <a href="/">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="https://www.instagram.com/pujith_2004/">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="https://x.com/PujithNaga">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="/">
              <i className="fa-brands fa-google-plus"></i>
            </a>
            <a href="https://www.youtube.com/channel/UCsrMmJbpLS4nhHXboEFkSRw">
              <i className="fa-brands fa-youtube"></i>
            </a>
          </div>
          <div className="footerNav">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about-me">About</Link>
              </li>
              <li>
                <Link to="/contact-us">Contact Us</Link>
              </li>
              <li>
                <Link to="/our-team">Our Team</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footerBottom">
          <p>
            Copyright &copy;2024; Designed by
            <span className="designer">Pujith</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
