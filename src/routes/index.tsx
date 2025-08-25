import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";


import { About } from "@/pages/About";

import Login  from "@/pages/Login";
import Register  from "@/pages/Register";
import { Verify } from "@/pages/Verify";
import { Booking } from "@/pages/user/Booking";
import { generateSidebarRoutes } from "@/utils/generateSidebarRoutes";
import { createBrowserRouter } from "react-router";
import { AdminSidebar } from "./AdminSidebar";


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
        path: "/admin",
        Component: DashboardLayout,
        children: [
            ...generateSidebarRoutes(AdminSidebar)
        ]
    },
    {
        path: "/user",
        Component: DashboardLayout,
        children: [
            {
                Component: Booking,
                path: "booking"
            }
        ]
    },
])