import { baseApi } from "@/redux/baseApi";



export const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder)=>({
        createBooking: builder.mutation({
            query:(bookingData)=>({
                url: "/booking/create",
                method:"POST",
               data: bookingData

    
                
            }),
            invalidatesTags: ["BOOKING"]
        }),

        

        getDivision: builder.query({
            query:()=>({
                url:"/division",
                method:"GET",
              
            }),
            providesTags: ["DIVISION"],

            transformResponse: ((response)=> response.data)  // tahole shudhu data dekhabe . message success eshb dekhabe na
           
        }),
      

       
    })
})


export const {useCreateBookingMutation} = bookingApi