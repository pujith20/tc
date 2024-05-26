import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useUser } from "../UserContext";
import Preloader from "../PreLoader";
import "./index.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const {setEmail} = useUser();

  const onSubmitForm = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("http://localhost:5000/user/login", { username, password })
      .then((response) => {
        const { token,email } = response.data;
        console.log(response.data);
        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          Cookies.set("jwt_token", token, { expires: 1/24 });
          setEmail(email);
          setUsername("");
          setPassword("");
          toast.success("Login successful");
          navigate("/",{replace: true});
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          toast.error("Wrong username or password")
        } else {
          console.log(err);
        }
      })
      .finally(() =>{
        setLoading(false);
      })
  };

  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken) {
    navigate("/",{replace: true})
  }

  const handleSignupClick = () => {
    navigate("/signup",{replace: true});
  };

  return (
    <div className="login-form">
      {loading && <Preloader />}
      <div className="login-form-border-con">
        <p className="login-form-heading">LOGIN FORM</p>
        <form
          className="d-flex flex-column justify-content-center"
          onSubmit={onSubmitForm}
        >
          <input
            type="text"
            placeholder="USERNAME(Eg: dummy123)"
            className="input-field mt-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
          <input
            type="password"
            placeholder="PASSWORD(Eg: Dummy@123)"
            className="input-field mt-4 mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <button className="btn btn-dark w-30 align-self-center login-btn" disabled={loading}>
            {loading ? "Loading..." : "LOGIN"}
          </button>
        </form>
        <p className="align-self-center mt-4">
          Don't have an account?
          <span className="signup-text" onClick={handleSignupClick}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
