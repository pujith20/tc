import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import logo from "../assets/logo3.png";
import "./index.css";

const NavBar = () => {
  const navigate = useNavigate();
  const showSideBar = () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "flex";
  };
  const hideSideBar = () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "none";
  };
  const onLogOut = () => {
    Cookies.remove("jwt_token");
    navigate("/login", { replace: true });
  };
  return (
    <nav>
      <ul className="sidebar">
        <li onClick={hideSideBar}>
          <a>
            <i className="fa-solid fa-xmark"></i>
          </a>
        </li>
        <Link to="/">
          <li>
            <a>Home</a>
          </li>
        </Link>
        <Link to="/about-me">
          <li>
            <a>About Me</a>
          </li>
        </Link>
        <Link to="/my-orders">
          <li>
            <a>My Orders</a>
          </li>
        </Link>
        <Link>
          <li onClick={onLogOut}>
            <a>Logout</a>
          </li>
        </Link>
      </ul>
      <ul>
        <li>
          <Link to="/">
            <img src={logo} alt="logo" className="nav-logo-img" />
          </Link>
        </li>
        <Link to="/">
          <li className="hideOnMobile">
            <a>Home</a>
          </li>
        </Link>
        <Link to="/about-me">
          <li className="hideOnMobile">
            <a>About Team</a>
          </li>
        </Link>
        <Link to="/my-orders">
          <li className="hideOnMobile">
            <a>My Orders</a>
          </li>
        </Link>
        <Link>
          <li className="hideOnMobile" onClick={onLogOut}>
            <a>Logout</a>
          </li>
        </Link>
        <li className="menu-button" onClick={showSideBar}>
          <a href="#">
            <i className="fa-solid fa-bars"></i>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
