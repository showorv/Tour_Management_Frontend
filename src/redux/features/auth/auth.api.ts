import { baseApi } from "@/redux/baseApi";
import type { IOtp, IResponse, IVerifyOtp } from "@/types/auth.type";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder)=>({
        register: builder.mutation({
            query:(userInfo)=>({
                url: "/user/register",
                method:"POST",
               data: userInfo

    
                
            })
        }),

        login: builder.mutation({
            query:(loginInfo)=>({
                url:"/auth/login",
                method:"POST",
                data:loginInfo
            })
        }),


        sendOtp: builder.mutation<IResponse<null>, IOtp>({
            query:(otpInfo)=>({
                url:"/otp/send",
                method:"POST",
                data:otpInfo
            })
        }),
        verifyOtp: builder.mutation<IResponse<null>, IVerifyOtp>({
            query:(otpInfo)=>({
                url:"/otp/verify",
                method:"POST",
                data:otpInfo
            })
        }),
    })
})


export const {useRegisterMutation, useLoginMutation, useSendOtpMutation, useVerifyOtpMutation} = authApi