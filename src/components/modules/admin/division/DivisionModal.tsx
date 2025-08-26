import SingleImageUpload from "@/components/SingleImageUpload"
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
import { Textarea } from "@/components/ui/textarea"
import { useAddDivisionMutation } from "@/redux/features/division/division.api"
import { useState } from "react"


import { useForm, type SubmitHandler, type FieldValues } from "react-hook-form"
import { toast } from "sonner"


export function DivisionModal() {

    const form = useForm({
        defaultValues: {
            name: "",
            description: ""
        }
    })

    const [image, setImage] = useState<File | null>(null) // to get file in form from singleuploader. we can manually preview image by fileReaderurl or objectreaderurl from doc
   const [open, isOpen] = useState(false)
    // console.log("inside division", image);
    const [addDivison] = useAddDivisionMutation()
    

    const onSubmit : SubmitHandler<FieldValues> = async(data)=>{
       
        // console.log(data)

        const formData = new FormData()

        formData.append("data", JSON.stringify(data))
        formData.append("file", image as File)

        console.log(formData.get("data"));
        console.log(formData.get("file"));

        const toasId = toast.loading("Divsion Adding")

        try {
            const res = await addDivison(formData).unwrap()

            if(res.success){
                toast.success("Division added", {id: toasId})
                isOpen(false)
            }
            console.log(res);
            
        } catch (error) {
            console.log(error);
            
        }
        
        
    }
  return (
    <Dialog open={open} onOpenChange={isOpen}>
      
        <DialogTrigger asChild>
          <Button variant="default" className="cursor-pointer">Add Division</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
         
         <Form {...form}>
            <form id="add-division" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="division name" {...field} />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is your division name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="write description" {...field} />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is your description.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <SingleImageUpload onChange={setImage}/>
            </form>

            
         </Form>
       
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button form="add-division" type="submit">Add</Button>
          </DialogFooter>
        </DialogContent>
    
    </Dialog>
  )
}
