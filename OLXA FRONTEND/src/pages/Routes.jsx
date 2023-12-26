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
import IsLogin from "../components/Protection Routes/IsLogin";
import IsLogout from "../components/Protection Routes/IsLogout";
import TabsComp from "../components/Tabs/TabsComp";
import ShowOneProduct from "./ShowOneProduct/ShowOneProduct";
import Home2 from "./Home2/Home2";
import PageNotFound from "./404 Page/PageNotFound";
import ChangePassword from "./ChangePassword/ChangePassword";
import AdminPage from "./Admin Dashboard/AdminPage";

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
     
      <Route path="/search" element={<SearchPage />} />
      <Route path="/product/:id" element={<ShowOneProduct />} />

      {/* check if the user is logout to access this */}
      <Route element={<IsLogout />}>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />

      </Route>

      {/* check if the user is login to access this */}
      <Route element={<IsLogin />}>
        <Route path="/profile" element={<TabsComp/>} />
        <Route path="/home2" element={<Home2/>} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/admin" element={<AdminPage />} />
      </Route>
        <Route path="*" element={<PageNotFound/>} />
    </>
  )
);
