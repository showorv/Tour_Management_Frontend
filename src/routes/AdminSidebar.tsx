import { AddTour } from "@/pages/Admin/AddTour";
import { Analaytics } from "@/pages/Admin/Analaytics";
import type { ISidebar } from "@/types/sidebar.type";

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
          title: "Add tour",
          url: "/admin/add-tour",
          component: AddTour
        },
       
      ],
    },
   
  
  ]