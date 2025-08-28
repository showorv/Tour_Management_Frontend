import { baseApi } from "@/redux/baseApi";



export const divisionApi = baseApi.injectEndpoints({
    endpoints: (builder)=>({
        addDivision: builder.mutation({
            query:(divisionData)=>({
                url: "/division/create",
                method:"POST",
               data: divisionData

    
                
            }),
            invalidatesTags: ["DIVISION"]
        }),

        

        getDivision: builder.query({
            query:()=>({
                url:"/division",
                method:"GET",
              
            }),
            providesTags: ["DIVISION"],

            transformResponse: ((response)=> response.data)  // tahole shudhu data dekhabe . message success eshb dekhabe na
           
        }),
        getSingleDivision: builder.query({
            query:(slug)=>({
                url:`/division/${slug}`,
                method:"GET",
            
            }),
            providesTags: ["DIVISION"],

            transformResponse: ((response)=> response.data)  // tahole shudhu data dekhabe . message success eshb dekhabe na
           
        }),

       
    })
})


export const {useAddDivisionMutation, useGetDivisionQuery,useGetSingleDivisionQuery} = divisionApi