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


export const router = createBrowserRouter([
    {
        path:"/",
        Component: App,
        children: [
            {
                path: "about",
                Component: About
            }
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