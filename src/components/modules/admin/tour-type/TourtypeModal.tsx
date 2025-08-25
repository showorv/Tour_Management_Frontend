import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,

  DialogFooter,
 
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAddTourtypeMutation } from "@/redux/features/tour/tour.api"

import { useForm, type SubmitHandler, type FieldValues } from "react-hook-form"
import { toast } from "sonner"

export function TourtypeModal() {

    const form = useForm()

    const [addTourtype] = useAddTourtypeMutation()

    
    

    const onSubmit : SubmitHandler<FieldValues> = async(data)=>{
       const res = await addTourtype({name: data.name}).unwrap()

        if(res.success){
            toast.success("tour type added")
        }
        console.log(data)
        
    }
  return (
    <Dialog>
      
        <DialogTrigger asChild>
          <Button variant="default" className="cursor-pointer">Add Tour Type</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
         
         <Form {...form}>
            <form id="add" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="tour type name" {...field} />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is your tour type name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </form>
         </Form>
       
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button form="add" type="submit">Add</Button>
          </DialogFooter>
        </DialogContent>
    
    </Dialog>
  )
}
