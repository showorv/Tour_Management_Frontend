import type { ISidebar } from "@/types/sidebar.type";



export const generateSidebarRoutes = (sidebar: ISidebar[])=>{
    return sidebar.flatMap((section)=> // flat map for not nested array. its convert nested array to single array
    section.items.map((item)=> ({
        path: item.url,
        Component: item.component
    })));
}