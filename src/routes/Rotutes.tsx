import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Index";
import Login from "../pages/login/Index";
import Register from "../pages/register/Index";

const Rotutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Rotutes;
