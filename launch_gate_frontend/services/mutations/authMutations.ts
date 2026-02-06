"use client"

import { useAuthStore } from "@/store/useAuthStore"
import { loginDetailsType, loginReturnType, signupUserDetailsType, signupUserResponseType } from "@/types/auth/authTypes";
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner";

export const useSignupMutation = () => {
    const { signupUser } = useAuthStore();
    return useMutation({
        mutationKey: ["signup-user"],
        mutationFn: (data: signupUserDetailsType) => signupUser(data),
        onError: (data: signupUserResponseType) => {
            if(!data.success) {
                toast.error(data.message);
            }
        },
        onSuccess: (data: signupUserResponseType) => {
            if(data.success) {
                toast.success("User Signed up successfully");
            }
        },
    });
}

export const useLoginMutation = () => {
    const { loginUser } = useAuthStore();
    return useMutation({
        mutationKey: ["slogin-user"],
        mutationFn: (data: loginDetailsType) => loginUser(data),
        onError: (data: loginReturnType) => {
            if(!data.success) {
                toast.error(data.message);
            }
        },
        onSuccess: (data: loginReturnType) => {
            if(data.success) {
                toast.success("User logged in up successfully");
            }
        },
    });
}

export const useLogoutMutation = () => {
    const { logoutUser } = useAuthStore();
    return useMutation({
        mutationKey: ["logout-user"],
        mutationFn: () => logoutUser(),
        onSuccess: () => {
            toast.success("Logged out successfully");
        },
    });
}