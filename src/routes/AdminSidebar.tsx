// import { AddTour } from "@/pages/Admin/AddTour";
// import { Analaytics } from "@/pages/Admin/Analaytics";
import { AddDivision } from "@/pages/Admin/AddDivision";
import { AddTourType } from "@/pages/Admin/AddTourType";
import type { ISidebar } from "@/types/sidebar.type";
import { lazy } from "react";

// lazy loading for not import this file for user until hit this routes

// const Analaytics = lazy(()=> import("@/pages/Admin/Analaytics")); //for default export

const Analaytics = lazy(() =>
  import("@/pages/Admin/Analaytics").then((module) => ({
    default: module.Analaytics, // 👈 mapping named export -> default
  }))
) // for named export


const AddTour = lazy(() =>
  import("@/pages/Admin/AddTour").then((module) => ({
    default: module.AddTour, // 👈 mapping named export -> default
  }))
) // for named export

export const AdminSidebar: ISidebar[] = [
    {
      title: "Dashboard",
      items: [
        {
          title: "Analytics",
          url: "/admin/analaytics",
          component: Analaytics
        },
       
      ],
    },
    {
      title: "Tour Management",
      items: [
        
        {
          title: "Add tour type",
          url: "/admin/add-tour-type",
          component: AddTourType
        },
        {
          title: "Add division",
          url: "/admin/add-division",
          component: AddDivision
        },

        {
          title: "Add tour",
          url: "/admin/add-tour",
          component: AddTour
        },
       
      ],
    },
   
  
  ]