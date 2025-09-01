import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetDivisionQuery } from "@/redux/features/division/division.api";
import { useGetTourTypeQuery } from "@/redux/features/tour/tour.api";
import { useState } from "react";
import { useSearchParams } from "react-router";


export default function TourFilter() {


    // const [selectedDivision, setSelectedDivision] = useState<string | undefined>(undefined)
    // const [selectedTourtype, setSelectedtourtype] = useState<string | undefined>(undefined)

    // console.log(selectedDivision); // use state diye set na kore searchparams diye korbo

    const [searchParams, setSearchParams] = useSearchParams()
    
    console.log(searchParams);
    
    const selectedDivision = searchParams.get("division") || undefined
    const selectedTourtype = searchParams.get("tourType") || undefined

  const { data: divisionData, isLoading: divisionIsLoading } =
    useGetDivisionQuery(undefined);

  const { data: tourTypeData, isLoading: tourTypeIsLoading } =
   useGetTourTypeQuery({limit: 100});

   console.log(tourTypeData);
   
  const divisionOption = divisionData?.map(
    (item: { _id: string; name: string }) => ({
      label: item.name,
      value: item._id,
    })
  );

  const tourTypeOptions = tourTypeData?.data?.map(
    (item: { _id: string; name: string }) => ({
      label: item.name,
      value: item._id,
    })
  );

  console.log("tour option",tourTypeOptions);
  

  const handleDivisionSearch = (value: string)=>{

    const params = new URLSearchParams(searchParams)
    params.set("division", value)
    setSearchParams(params)
    // console.log(value);
    
  }
  const handleTourTypeSearch = (value: string)=>{

    const params = new URLSearchParams(searchParams)
    params.set("tourType", value)
    setSearchParams(params)
    // console.log(value);
    
  }


  const handleClearFilter = () => {
    
    const params = new URLSearchParams(searchParams)

    params.delete("division")
    params.delete("tourType")
    setSearchParams(params)
    
  };

  return (
    <div className="col-span-3 w-full h-[500px] border border-muted rounded-md p-5 space-y-4">
      <div className="flex justify-between items-center">
        <h1>Filters</h1>
        <Button size="sm" variant="outline" onClick={handleClearFilter}>
          Clear Filter
        </Button>
      </div>
      <div>
        <Label className="mb-2">Division to visit</Label>
        <Select
          onValueChange={handleDivisionSearch}
         value={selectedDivision? selectedDivision : ""}
          disabled={divisionIsLoading}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Divisions</SelectLabel>
              {divisionOption?.map((item: { value: string; label: string }) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="mb-2">Tour Type</Label>
        <Select
        onValueChange={handleTourTypeSearch}
        value={selectedTourtype ? selectedTourtype : ""}
          disabled={tourTypeIsLoading}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Divisions</SelectLabel>
              {tourTypeOptions?.map(
                (item: { value: string; label: string }) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                )
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}