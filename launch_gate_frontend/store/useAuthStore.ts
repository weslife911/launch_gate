import { useAuthStoreType } from "@/types/auth/authTypes";
import { axiosInstance } from "@/utils/axiosInstance";
import { create } from "zustand"

export const useAuthStore = create<useAuthStoreType>((set) => ({
    isAuthenticated: false,
    user: null,
    checkAuth: async() => {
        const JWT_TOKEN_LOCAL_STORAGE = typeof window !== 'undefined' ? localStorage.getItem("JWT_TOKEN_LOCAL_STORAGE") : null;
        if(JWT_TOKEN_LOCAL_STORAGE === null) {
            set({ user: null, isAuthenticated: false });
        }
        const response = await axiosInstance.get("/check-auth", {
            headers: {
                "Authorization": `Bearer ${JWT_TOKEN_LOCAL_STORAGE}`
            }
        });
        const responseData = response.data;
        if(responseData.success) {
            set({ user: responseData, isAuthenticated: true });
        }
        console.log(responseData);
        return responseData;
    },
    loginUser: async(data) => {
        return axiosInstance.post("/login/", data);
    }
}));