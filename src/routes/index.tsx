import App from "@/App";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

import { About } from "@/pages/About";
import { Analaytics } from "@/pages/Admin/Analaytics";
import Login  from "@/pages/Login";
import Register  from "@/pages/Register";
import { Verify } from "@/pages/Verify";
import { Booking } from "@/pages/user/Booking";
import { createBrowserRouter } from "react-router";


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
            {
                Component: Analaytics,
                path: "analaytics"
            }
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