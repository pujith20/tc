import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import NavBar from "../NavBar";
import image from "../assets/author.png";
import "./index.css";

const AboutMe = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const jwtToken = Cookies.get("jwt_token");
    if (!jwtToken) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <>
      <NavBar />
      <div className="about-me">
        <div className="about-me-card">
          <div className="lines"></div>
          <div className="imgBx">
            <img src={image} alt="author" />
          </div>
          <div className="content">
            <div className="details">
              <h2>P. Naga Pujith Kumar</h2>
              <span>An Aspiring Full Stack Developer</span>
              <div className="data">
                <div className="data-1">
                  <h3>Frontend</h3>
                  <ul>
                    <li>HTML</li>
                    <li>CSS</li>
                    <li>JavaScript</li>
                    <li>Bootstrap</li>
                    <li>React JS</li>
                  </ul>
                </div>
                <div className="data-2">
                  <h3>Backend</h3>
                  <ul>
                    <li>MongoDB</li>
                    <li>Express JS</li>
                    <li>Node JS</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutMe;
