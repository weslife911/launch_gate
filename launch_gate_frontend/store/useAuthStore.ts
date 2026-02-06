import { useAuthStoreType } from "@/types/auth/authTypes";
import { axiosInstance } from "@/utils/axiosInstance";
import { create } from "zustand"

const JWT_TOKEN_LOCAL_STORAGE = localStorage.getItem("JWT_TOKEN_LOCAL_STORAGE");

export const useAuthStore = create<useAuthStoreType>((set) => ({
    isAuthenticated: false,
    user: null,
    checkAuth: async() => {
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
        return responseData;
    },
    loginUser: async(data) => {
        return axiosInstance.post("/login/", data);
    }
}));