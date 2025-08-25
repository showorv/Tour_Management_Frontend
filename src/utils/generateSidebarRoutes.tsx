import type { ISidebar } from "@/types/sidebar.type";



export const generateSidebarRoutes = (sidebar: ISidebar[])=>{
    return sidebar.flatMap((section)=> 
    section.items.map((item)=> ({
        path: item.url,
        Component: item.component
    })));
}