import { useGetMeInfoQuery } from "@/redux/features/auth/auth.api"
import type { IRole } from "@/types/sidebar.type"
import type { ComponentType } from "react"
import { Navigate } from "react-router"


export const AuthCheck = (Component: ComponentType, checkRole?: IRole | IRole [])=>{
    return function authWrapper() {  // without component we cannot call redux state
        

        const {data, isLoading} = useGetMeInfoQuery(undefined)
        if(isLoading){
            return <div>Loading...</div>
        }

        // if(checkRole && !isLoading && checkRole !== data.data.role){
        //     return <Navigate  to= "/unauthorized"/>
        // }

        if(!isLoading){


            if(checkRole){
                const allowedRole = Array.isArray(checkRole) ?  checkRole : [checkRole]
                if(!allowedRole.includes(data.data.role)){
                    return <Navigate  to= "/unauthorized"/>
                }
            }


            if(!data.data.email){
                return <Navigate  to= "/login"/>   // for authentication
            }
        }

       
       

        console.log(data);
        

        return <Component />
    }
}