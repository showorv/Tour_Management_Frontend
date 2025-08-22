import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Link, useNavigate } from "react-router"
import { useLoginMutation } from "@/redux/features/auth/auth.api"
import { useForm, type SubmitHandler, type FieldValues } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import PasswordShow from "@/components/ui/PasswordShow"
import { toast } from "sonner"





export function LoginForm({
  className,

}: React.ComponentProps<"form">) {

  const [login] = useLoginMutation()

  const form = useForm()

  const navigate = useNavigate()

  const onSubmit: SubmitHandler<FieldValues> = async (data)=>{
   

    try {
      const res = await login(data).unwrap()
      toast.success("Login successfull")
      
      console.log(res);
      
    } catch (err) {
      // toast.error(data.message)
      const message = err.data?.message;
      console.log(message);
      if(message==="password doesnot match"){
        toast.error("invalid email or password")
      }
      if(message === "user isnot verified"){
        toast.error("You are not verified")
        navigate("/verify" , {state: data.email})
      }
    
    
      
    }
    
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="hello@gmail.com" {...field} />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                  <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                       <PasswordShow {...field}/>
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                    <Button type="submit">Login</Button>
          </form>
        </Form>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
          <path fill="#4285F4" d="M24 9.5c3.94 0 6.61 1.71 8.13 3.14l6-5.82C34.88 3.8 29.88 1.5 24 1.5 14.64 1.5 6.7 7.92 3.65 16.35l7.45 5.79C12.45 15.89 17.73 9.5 24 9.5z"/>
          <path fill="#34A853" d="M46.5 24c0-1.57-.14-3.08-.41-4.5H24v8.52h12.64c-.54 2.78-2.18 5.13-4.64 6.72l7.27 5.63C43.87 36.39 46.5 30.64 46.5 24z"/>
          <path fill="#FBBC05" d="M11.1 28.14a14.46 14.46 0 0 1-.76-4.14c0-1.44.27-2.81.76-4.14l-7.45-5.79A22.46 22.46 0 0 0 1.5 24c0 3.64.87 7.08 2.4 10.11l7.2-6z"/>
          <path fill="#EA4335" d="M24 46.5c6.48 0 11.92-2.13 15.9-5.81l-7.27-5.63c-2.1 1.41-4.77 2.24-8.63 2.24-6.27 0-11.55-6.39-12.9-11.64l-7.2 6C6.7 40.08 14.64 46.5 24 46.5z"/>
        </svg>

          Login with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}

        <Link to="/register"  className="underline underline-offset-4">
        Register Now
        </Link>
   
      
     
      </div>
    </div>
  )
}
