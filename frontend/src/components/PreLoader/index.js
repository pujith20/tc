import { useEffect } from "react";
import "./index.css"; // Make sure this path is correct for your project

const Preloader = () => {
  useEffect(() => {
    const preloaderElement = document.getElementById("preloader");
    if (preloaderElement) {
      // After 5 seconds, hide the PreLoader
      setTimeout(() => {
        preloaderElement.style.opacity = 0;
        setTimeout(() => {
          preloaderElement.style.display = "none";
        }, 1000); // Wait for fade out animation to complete (1 second)
      }, 5000); // 5 seconds
    }
  }, []);

  return (
    <div id="preloader" className="preloader">
      <div className="p">LOADING</div>
      <div className="progress-container">
        <div className="progress-bar"></div>
      </div>
    </div>
  );
};

export default Preloader;
