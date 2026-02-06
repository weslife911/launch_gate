import { useAuthStore } from "@/store/useAuthStore"
import { useQuery } from "@tanstack/react-query"

export const useCheckAuthQuery = () => {
    const { checkAuth } = useAuthStore();
    return useQuery({
        queryKey: ["check-auth"],
        queryFn: () => checkAuth(),
    });
}