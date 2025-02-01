import { createBrowserRouter } from "react-router";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home/Home";
import Error from "../pages/Error";
import Membership from "../pages/Membership";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgetPassword from "../pages/Auth/ForgetPassword";
import PrivateRoutes from "./PrivateRoutes";
import Profile from "../pages/Profile/Profile";
import UpdateProfile from "../pages/Profile/UpdateProfile";
import Services from "../pages/Services/Services";
import AddService from "../pages/Services/AddService";
import ServiceDetails from "../pages/Services/ServiceDetails";
import MyServices from "../pages/Services/MyServices";
import UpdateService from "../pages/Services/UpdateService";
import MyReviews from "../pages/MyReviews";

const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: "/membership",
                Component: Membership,
            },
            {
                path:"/login",
                Component: Login,
            },
            {
                path: "/register",
                Component: Register,
            },
            {
                path: "/forget-password",
                Component: ForgetPassword,
            },
            {
                path: "/my-profile",
                element: <PrivateRoutes><Profile></Profile></PrivateRoutes>
            },
            {
                path: "/update-profile",
                element: <PrivateRoutes><UpdateProfile></UpdateProfile></PrivateRoutes>
            },
            {
                path: "/services",
                Component: Services,
            },
            {
                path: "/add-service",
                element: <PrivateRoutes><AddService></AddService></PrivateRoutes>,
            },
            {
                path: "/service-details/:id",
                element: <PrivateRoutes><ServiceDetails></ServiceDetails></PrivateRoutes>
            },
            {
                path: "/my-services",
                element: <PrivateRoutes><MyServices></MyServices></PrivateRoutes>
            },
            {
                path: "/update-service/:id",
                element: <PrivateRoutes><UpdateService></UpdateService></PrivateRoutes>
            },
            {
                path: "/my-reviews",
                element: <PrivateRoutes><MyReviews></MyReviews></PrivateRoutes>
            }
        ]
    },
    {
        path: "/*",
        Component: Error
    }
], { basename });
