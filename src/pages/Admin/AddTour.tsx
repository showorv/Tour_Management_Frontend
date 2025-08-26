import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useGetDivisionQuery } from "@/redux/features/division/division.api"
import { useGetTourTypeQuery } from "@/redux/features/tour/tour.api"
import { useForm, type SubmitHandler, type FieldValues } from "react-hook-form"

export function AddTour() {

  const form = useForm({
    defaultValues: {
        title: "",
        location: "",
        description: "",
        division:"",
        tourType: ""
    }
  })

  const {data: divisionData, isLoading: divisionLoading} = useGetDivisionQuery(undefined)
  const {data: tourTypeData, isLoading: tourtypeLoading } = useGetTourTypeQuery(undefined)


  const divisionOption = divisionData?.map((item: {_id: string, name: string})=> ({
    value: item._id,
    label: item.name
  }))


  const tourtypeOption = tourTypeData?.map((item: {_id: string, name: string})=> ({
    value: item._id,
    label: item.name
  }))

  console.log(divisionOption);
  console.log(tourtypeOption);
  
  const onSubmit: SubmitHandler<FieldValues> = async (data)=>{
    console.log(data);
    
  }
  return (
    <div className="w-full max-w-2xl mx-auto ">

    <Card >
      <CardHeader>
        <CardTitle>Create New Tour</CardTitle>
        <CardDescription>
          Add a tour to the system
        </CardDescription>
        
      </CardHeader>
      <CardContent>
          <Form {...form}>

            <form id= "add-tour" onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tour Title</FormLabel>
                      <FormControl>
                        <Input placeholder="tour title" {...field} />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is your tour name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="location" {...field} />
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
          name="division"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Division</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={divisionLoading} >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="select division" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {divisionOption?.map((item: {value: string, label: string})=> <SelectItem value={item.value}>{item.label}</SelectItem> )}
                 
                  
                </SelectContent>
              </Select>
              
              <FormMessage />
            </FormItem>
          )}
        />
           <FormField
          control={form.control}
          name="tourType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Tour Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={tourtypeLoading}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tour type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                {tourtypeOption?.map((item: {value: string, label: string})=> <SelectItem value={item.value}>{item.label}</SelectItem> )}
                </SelectContent>
              </Select>
              
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
            </form>

          </Form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button form="add-tour" type="submit" className="w-[100px] cursor-pointer">
              Create
        </Button>
        
      </CardFooter>
    </Card>
    </div>
  )
}
