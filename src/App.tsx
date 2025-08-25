import { Outlet } from "react-router"
import { CommonLayout } from "./components/layout/CommonLayout"
import { generateSidebarRoutes } from "./utils/generateSidebarRoutes";
import { AdminSidebar } from "./routes/AdminSidebar";


function App() {

  console.log(generateSidebarRoutes(AdminSidebar));
  

  return (
   <CommonLayout>
    <Outlet />
   </CommonLayout>
      
  )
}

export default App
