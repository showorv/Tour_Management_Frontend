
import { Booking } from "@/pages/user/Booking";
import type { ISidebar } from "@/types/sidebar.type";

export const UserSidebar: ISidebar[] = [
    {
      title: "Dashboard",
      items: [
        {
          title: "Bookings",
          url: "/user/booking",
          component: Booking
        },
       
      ],
    },
    
   
  
  ]