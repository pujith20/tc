import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AboutMe from "./components/AboutMe";
import Login from "./components/Login";
import MyOrders from "./components/MyOrders";
import Signup from "./components/Signup";
import Admin from "./components/Admin";
import { UserProvider } from "./components/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <ToastContainer
          position="top-center"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/admin" element={<Admin />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about-me" element={<AboutMe />} />
          <Route exact path="/my-orders" element={<MyOrders />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
