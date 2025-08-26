import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

import type { ReactNode } from "react"

  interface IProps{
    children: ReactNode
    onConfirm: ()=> void
  }
  
  export function DeleteConfirm( {children, onConfirm}: IProps) {

    const handleDelete = ()=>{
        onConfirm()  // for dynamic handling
        // console.log("delete clicked");
        
    }
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          {/* <Button variant="outline">Show Dialog</Button> */}
          {children}  
          {/* for dynamic button. we can add delete button here but itsnot dynamic. */}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  