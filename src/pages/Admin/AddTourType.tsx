import { DeleteConfirm } from "@/components/layout/DeleteConfirm";
import { TourtypeModal } from "@/components/modules/admin/tour-type/TourtypeModal";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDeleteTourtypeMutation, useGetTourTypeQuery } from "@/redux/features/tour/tour.api";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export const AddTourType = () => {
  const { data, isLoading } = useGetTourTypeQuery(undefined);

  const [deleteTourType] = useDeleteTourtypeMutation()

  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleDelete = async(tourId: string)=>{

    const toastId = toast.loading("deleting..")
    try {

      const res = await deleteTourType(tourId)

      if(res.data.success){
        toast.success("Delete successfully",{id: toastId})
      }

      // console.log(res);
      
      
    } catch (error) {
      console.error(error)
    }
  }

  

  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <div className="flex justify-between py-5 items-center">
      <h2 className="text-2xl md:text-4xl text-chart-5 font-bold">A list of tour type</h2>
     <TourtypeModal />
      </div>
       
      <div className="border border-muted rounded-md">
      
      <Table>
      
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item: { _id: string; name: string }) => (
            <TableRow key={item._id}>
              <TableCell className="font-medium w-full">{item.name}</TableCell>
              <TableCell>
              

               <DeleteConfirm onConfirm={()=> handleDelete(item._id)}>
               <Button variant="destructive" size="sm" className="cursor-pointer">
                  <Trash2 />
                </Button>
               </DeleteConfirm>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    </div>
  );
};
