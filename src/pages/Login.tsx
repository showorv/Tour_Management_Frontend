
import { Logo } from "@/assets/icons/Logo"
import { LoginForm } from "@/components/modules/authentication/LoginForm"
import { Link } from "react-router"
import loginImage from "../assets/images/login.image.jpg"


export default function Login() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
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
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src={loginImage}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.8] dark:grayscale"
        />
      </div>
    </div>
  )
}
