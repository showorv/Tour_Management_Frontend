import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";


import { About } from "@/pages/About";

import Login  from "@/pages/Login";
import Register  from "@/pages/Register";
import { Verify } from "@/pages/Verify";

import { generateSidebarRoutes } from "@/utils/generateSidebarRoutes";
import { Navigate, createBrowserRouter } from "react-router";
import { AdminSidebar } from "./AdminSidebar";
import { UserSidebar } from "./UserSidebar";
import { AuthCheck } from "@/utils/AuthCheck";
import { IRole } from "@/types/sidebar.type";
import { Unauthorized } from "@/pages/Unauthorized";
import { Tours } from "@/pages/Tours";
import { SingleTour } from "@/pages/SingleTour";

import { Home } from "@/pages/Home";
import CreateBooking from "@/pages/CreateBooking";



export const router = createBrowserRouter([
    {
        path:"/",
        Component: App,
        children: [
            {
                Component: Home,
                index: true
            },
            {
                path: "about",
                Component: About
            },
            {
                path:"/tours",
                Component: Tours
            },
            {
                path:"/tours/:id",
                Component: SingleTour
            },
            {
                path:"/booking/:id",
                Component: CreateBooking
            },
        ]
    },
    
    {
        path: "/admin",
        Component: AuthCheck(DashboardLayout, [IRole.SUPER_ADMIN, IRole.ADMIN]) ,
        children: [
            { index: true, element: <Navigate to="/admin/analaytics"/>}, // for default in admin dashboard
            ...generateSidebarRoutes(AdminSidebar)
        ]
    },
    {
        path: "/user",
        Component: AuthCheck(DashboardLayout, IRole.USER) ,
        children: [
            { index: true, element: <Navigate to="/user/booking"/>}, // for default in user dashboard

            ...generateSidebarRoutes(UserSidebar)
        ]
    },

    {
        path:"/login",
        Component: Login
    },
    {
        path:"/register",
        Component:Register
    },
    {
        path:"/verify",
        Component:Verify
    },
    {
        path:"/unauthorized",
        Component: Unauthorized
    },

])