import { baseApi } from "@/redux/baseApi";



export const tourApi = baseApi.injectEndpoints({
    endpoints: (builder)=>({
        addTourtype: builder.mutation({
            query:(tourName)=>({
                url: "/tour/create-tour-type",
                method:"POST",
               data: tourName

    
                
            }),
            invalidatesTags: ["TOUR"]
        }),

        

        getTourType: builder.query({
            query:()=>({
                url:"/tour/tour-type",
                method:"GET"
               
            }),
            providesTags: ["TOUR"],

            transformResponse: ((response)=> response.data)  // tahole shudhu data dekhabe . message success eshb dekhabe na
           
        }),

        deleteTourtype: builder.mutation({
            query:(tourId)=>({
                url: `/tour/tour-type/${tourId}`,
                method:"DELETE",
             

    
                
            }),
            invalidatesTags: ["TOUR"]
        }),
    })
})


export const {useGetTourTypeQuery, useAddTourtypeMutation, useDeleteTourtypeMutation} = tourApi