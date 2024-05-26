import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./index.css";

const Signup = () => {
  const [mail, setGmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onAddCredentials = (e) => {
    e.preventDefault();
    axios
      .post("https://tastycorner.onrender.com/user/add-user", { mail, username, password })
      .then((res) => {
        console.log("Data uploaded successfully !!");
        setGmail("");
        setUsername("");
        setPassword("");
        navigate("/login", { replace: true });
      })
      .catch((err) => console.log(err));
  };

  const handleLoginClick = () => {
    navigate("/login", { replace: true });
  };

  return (
    <div className="signup-form">
      <div className="signup-form-border-con">
        <form
          className="d-flex flex-column justify-content-center"
          onSubmit={onAddCredentials}
        >
          <input
            type="text"
            placeholder="MAIL ID"
            className="signup-input-field mb-3"
            value={mail}
            onChange={(e) => setGmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="NEW USERNAME"
            className="signup-input-field mb-3"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password" // Change to password type for password input
            placeholder="NEW PASSWORD"
            className="signup-input-field mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn btn-dark w-30 align-self-center signup-btn">
            SIGN UP
          </button>
        </form>
        <p className="align-self-center mt-4">
          Already have an account?
          <span className="login-text" onClick={handleLoginClick}>
            Log In
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
