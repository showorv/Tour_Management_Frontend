import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types/auth.type";
import type { ITour } from "@/types/tour.type";



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

        addTour: builder.mutation({
            query:(tourInfo)=>({
                url: "/tour/create",
                method:"POST",
               data: tourInfo

    
                
            }),
            invalidatesTags: ["TOUR"]
        }),

        

        getTourType: builder.query({
            query:(params)=>({
                url:"/tour/tour-type",
                method:"GET",
                params
               
            }),
            providesTags: ["TOUR"],

            transformResponse: ((response)=> response.data)  // tahole shudhu data dekhabe . message success eshb dekhabe na
           
        }),

        getTour: builder.query<ITour[], unknown>({
            query:()=>({
                url:"/tour",
                method:"GET",
               
               
            }),
            providesTags: ["TOUR"],

            transformResponse: ((response : IResponse<ITour[]> )=> response.data)  
           
        }),

        getSingleTour: builder.query<ITour, string>({
            query:(slug)=>({
                url:`/tour/${slug}`,
                method:"GET",
               
               
            }),
            providesTags: ["TOUR"],

            transformResponse: ((response: IResponse<ITour>  )=> response.data)  
           
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


export const {useGetTourTypeQuery, useAddTourtypeMutation, useDeleteTourtypeMutation, useAddTourMutation, useGetTourQuery, useGetSingleTourQuery} = tourApi