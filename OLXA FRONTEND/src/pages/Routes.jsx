import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
  } from "react-router-dom";
import Home from "./Home/Home";
import SearchPage from "./SearchPage/SearchPage";
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import ForgetPassword from "./ForgetPassword/ForgetPassword";


  export const routes = createBrowserRouter(
    createRoutesFromElements(
        <>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        </>
    
    )
  );