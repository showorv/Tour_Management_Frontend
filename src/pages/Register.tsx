
import { Logo } from "@/assets/icons/Logo"

import { RegisterForm } from "@/components/modules/authentication/RegisterForm"
import { Link } from "react-router"

import registerImage from "../assets/images/register.image.jpg"


export default function Register() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">

        <div className="bg-muted relative hidden lg:block">
        <img
          src={registerImage}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.6] dark:grayscale"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
     
        <div className="flex justify-center gap-2 md:justify-start">
            <Link to="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-foreground flex size-6 items-center justify-center ">
              <Logo />
            </div>
           Desh Travel
            </Link>
        
        </div>
       
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm />
          </div>
        </div>
      </div>
    
    </div>
  )
}
