"use client"

import { useAuthStore } from "@/store/useAuthStore"
import { useQuery } from "@tanstack/react-query"

export const useCheckAuthQuery = () => {
    const { checkAuth } = useAuthStore();
    return useQuery({
        queryKey: ["check-auth"],
        queryFn: () => checkAuth(),
    });
}

export const useVerifyAmbassadorQuery = (username: string) => {
    const { verifyAmbassador } = useAuthStore();
    return useQuery({
        queryKey: ["verify-ambassador"],
        queryFn: () => verifyAmbassador(username)
    });
}