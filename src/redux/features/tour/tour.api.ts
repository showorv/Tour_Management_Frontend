import { baseApi } from "@/redux/baseApi";



export const tourApi = baseApi.injectEndpoints({
    endpoints: (builder)=>({
        addTourtype: builder.mutation({
            query:(tourName)=>({
                url: "/tour/create-tour-type",
                method:"POST",
               data: tourName

    
                
            })
        }),

        

        getTourType: builder.query({
            query:()=>({
                url:"/tour/tour-type",
                method:"GET"
               
            }),

            transformResponse: ((response)=> response.data)  // tahole shudhu data dekhabe . message success eshb dekhabe na
           
        }),
    })
})


export const {useGetTourTypeQuery, useAddTourtypeMutation} = tourApi