import { AdminSidebar } from "@/routes/AdminSidebar";
import { UserSidebar } from "@/routes/UserSidebar";
import { IRole } from "@/types/sidebar.type";


export const sidebarByRole = (roles: IRole) =>{
    console.log(roles);
    
    switch(roles){
        case IRole.SUPER_ADMIN:
        return [...AdminSidebar]

        case IRole.ADMIN:
        return [...AdminSidebar]

        case IRole.USER:
        return [...UserSidebar]

        default:
            return []
    }
}