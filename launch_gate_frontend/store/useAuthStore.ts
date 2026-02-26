import { useAuthStoreType } from "@/types/auth/authTypes";
import { axiosInstance } from "@/utils/axiosInstance";
import { create } from "zustand";
import Cookies from "js-cookie";

export const useAuthStore = create<useAuthStoreType>((set) => ({
    isAuthenticated: false,
    user: null,

    checkAuth: async () => {
        const token = Cookies.get("access_token");

        if (!token) {
            set({ user: null, isAuthenticated: false });
            return { success: false, message: "No session found" };
        }

        try {
            const response = await axiosInstance.get("/check-auth/", {
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (response.data.success) {
                set({ user: response.data.user, isAuthenticated: true });
            }
            return response.data;
        } catch (error) {
            set({ user: null, isAuthenticated: false });
            return { success: false };
        }
    },

    signupUser: async (data) => {
        try {
            const response = await axiosInstance.post("/signup/", data);
            if (response.data.success) {
                const { access, refresh } = response.data.tokens;

                Cookies.set("access_token", access, { expires: 1 / 288, secure: true, sameSite: 'strict' }); // 5 mins
                Cookies.set("refresh_token", refresh, { expires: 50, secure: true, sameSite: 'strict' });

                set({ isAuthenticated: true });
            }
            return response.data;
        } catch (error) {
            return { success: false, message: "Signup failed" };
        }
    },

    loginUser: async (data) => {
        try {
            const response = await axiosInstance.post("/login/", data);
            if (response.data.success) {
                const { access, refresh } = response.data.tokens;

                Cookies.set("access_token", access, { expires: 1 / 288, secure: true });
                Cookies.set("refresh_token", refresh, { expires: 50, secure: true });

                set({ isAuthenticated: true });
            }
            return response.data;
        } catch (error) {
            return { success: false };
        }
    },

    logoutUser: async () => {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        set({ isAuthenticated: false, user: null });
    },

    profileUpdate: async (data) => {
        const response = await axiosInstance.put("/profile/update/");
        return response.data;
    }
}));