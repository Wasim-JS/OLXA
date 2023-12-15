import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "./Home/Home";
import SearchPage from "./SearchPage/SearchPage";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ForgetPassword from "./ForgetPassword/ForgetPassword";
import Profile from "./Profile/Profile";
import IsLogin from "../components/Protection Routes/IsLogin";
import IsLogout from "../components/Protection Routes/IsLogout";
import TabsComp from "../components/Tabs/TabsComp";
import ShowOneProduct from "./ShowOneProduct/ShowOneProduct";

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/product/:id" element={<ShowOneProduct />} />

      {/* check if the user is logout to access this */}
      <Route element={<IsLogout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
      </Route>

      {/* check if the user is login to access this */}
      <Route element={<IsLogin />}>
        <Route path="/profile" element={<TabsComp/>} />
      </Route>
    </>
  )
);
