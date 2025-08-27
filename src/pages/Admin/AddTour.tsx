import MultipleImageUpload from "@/components/MultipleImageUpload"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { FileMetadata } from "@/hooks/use-file-upload"
import { cn } from "@/lib/utils"
import { useGetDivisionQuery } from "@/redux/features/division/division.api"
import { useAddTourMutation, useGetTourTypeQuery } from "@/redux/features/tour/tour.api"
import { format, formatISO } from "date-fns"
import { CalendarIcon, Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import { useForm, type SubmitHandler, type FieldValues, useFieldArray } from "react-hook-form"
import { toast } from "sonner"

export function AddTour() {

  const form = useForm({
    defaultValues: {
        title: "",
        location: "",
        description: "",
        division:"",
        tourType: "",
        startDate:"",
        endDate:"",
        included: [{value: ""}],
        excluded: [{value: ""}],
    }
  })

  const {data: divisionData, isLoading: divisionLoading} = useGetDivisionQuery(undefined)
  const {data: tourTypeData, isLoading: tourtypeLoading } = useGetTourTypeQuery(undefined)
  const [addTour] = useAddTourMutation()

  // for image upload

  const [ images, setImages] = useState<(File | FileMetadata)[] | []>([])

  console.log("inside add tour",images);
  


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
  
  // to set dynamically included excluded of array field

  const {fields, append, remove} = useFieldArray({
    control: form.control,
    name: "included"
  })

  const {fields: excludedFiels, append: excludedAppend, remove: excludedRemove} = useFieldArray({
    control: form.control,
    name: "excluded"
  })


  const onSubmit: SubmitHandler<FieldValues> = async (data)=>{

    const tourData = {
      ...data,
      startDate: formatISO(data.startDate),
      endDate: formatISO(data.endDate),
      included: data.included.map((item: {value: string})=> item.value),
      excluded: data.excluded.map((item: {value: string})=> item.value),

      
    }

    const formData = new FormData()

    formData.append("data", JSON.stringify(tourData))
    images.forEach((item)=> formData.append("files", item as File))
  

    const tourId = toast.loading("tour adding")

    try {

    
      
      const res = await addTour(formData).unwrap()

      if(res.success){
        toast.success("Tour added Successfully", {id: tourId})
      }
    } catch (error) {
      console.log(error);
      
    }
    
    console.log(formData);
    
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

                <div className="flex gap-5">
                <FormField
          control={form.control}
          name="division"
          render={({ field }) => (
            <FormItem className="flex-1 ">
              <FormLabel>Select Division</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={divisionLoading}  >
                <FormControl className="w-full">
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
            <FormItem className="flex-1 ">
              <FormLabel>Select Tour Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={tourtypeLoading}>
                <FormControl className="w-full">
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
                </div>
           

        <div className="flex gap-5">
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem className="flex flex-col flex-1">
              <FormLabel>Select staring Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={new Date(field.value)}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date( new Date().setDate( new Date().getDate()-1))
                    }
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem className="flex flex-col flex-1">
              <FormLabel>Select End Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={new Date(field.value)}
                    onSelect={field.onChange}
                    
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
             
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
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
                    <MultipleImageUpload onChange={setImages}/>

                <div className=" border-t border-muted-foreground mt-2"></div>


              <div>

                <div className="flex justify-between items-center">
                  <p className="font-bold text-lg">Include</p>
                  <Button type="button" className="mt-2" onClick={()=> append({value: ""})} variant="outline" size="icon"><Plus /></Button>
                </div>
                

                {
                  fields.map((item, index)=> 
                  
                  <div className="flex gap-2 items-center">

                    <FormField
                    control={form.control}
                    name={`included.${index}.value`}
                    key={item.id}
                    render={({ field }) => (
                      <FormItem className=" flex-1">
                        <FormLabel>{`include ${index + 1}`} </FormLabel>
                        <FormControl>
                          <Input  {...field} />
                        </FormControl>
                      
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                    <Button onClick={()=> remove(index)} type="button" className="mt-5" variant="destructive" size="icon"><Trash2 /></Button>
                    </div>
                     )
                }


              </div>
              <div>

                <div className="flex justify-between items-center">
                  <p className="font-bold text-lg">Exclude</p>
                  <Button type="button" className="mt-2" onClick={()=> excludedAppend({value: ""})} variant="outline" size="icon"><Plus /></Button>
                </div>
                

                {
                  excludedFiels.map((item, index)=> 
                  
                  <div className="flex gap-2 items-center">

                    <FormField
                    control={form.control}
                    name={`excluded.${index}.value`}
                    key={item.id}
                    render={({ field }) => (
                      <FormItem className=" flex-1">
                        <FormLabel>{`exclude ${index + 1}`} </FormLabel>
                        <FormControl>
                          <Input  {...field} />
                        </FormControl>
                      
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                    <Button onClick={()=> excludedRemove(index)} type="button" className="mt-5" variant="destructive" size="icon"><Trash2 /></Button>
                    </div>
                     )
                }


              </div>
               
              

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
