import { DeleteConfirm } from "@/components/layout/DeleteConfirm";
import { TourtypeModal } from "@/components/modules/admin/tour-type/TourtypeModal";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDeleteTourtypeMutation, useGetTourTypeQuery } from "@/redux/features/tour/tour.api";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useState } from "react";

export const AddTourType = () => {

  const [currentPage, setCurrentPage] = useState(1)

  console.log(currentPage);
  
  const { data, isLoading } = useGetTourTypeQuery({page: currentPage});

  const [deleteTourType] = useDeleteTourtypeMutation()

  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const totalPage = data?.metaData?.totalPage
  console.log(totalPage);
  

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
          {data?.data?.map((item: { _id: string; name: string }) => (
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
            {totalPage > 1 && 
          <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={()=> setCurrentPage(prev=> prev -1)} className={ currentPage === 1 ? "pointer-events-none opacity-50": "cursor-pointer"} />
        </PaginationItem>

        {Array.from({length: totalPage}, (_,value)=> value+1 ).map(page =>  
           <PaginationItem key={page} onClick={()=> setCurrentPage(page)}>
          <PaginationLink isActive={currentPage===page}>{page}</PaginationLink>
        </PaginationItem> )}
      
       
        <PaginationItem>
          <PaginationNext onClick={()=> setCurrentPage(prev=> prev +1)} className={ currentPage === totalPage ? "pointer-events-none opacity-50": "cursor-pointer"}/>
        </PaginationItem>
      </PaginationContent>
    </Pagination>}
    </div>
  );
};
