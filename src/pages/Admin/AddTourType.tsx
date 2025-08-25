import { useGetTourTypeQuery } from "@/redux/features/tour/tour.api"


export const AddTourType = () => {

    const {data} = useGetTourTypeQuery(undefined)

    console.log(data);
    
  return (
    <div>AddTourType</div>
  )
}
