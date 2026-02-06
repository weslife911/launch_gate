import { useAuthStoreType } from "@/types/auth/authTypes";
import { axiosInstance } from "@/utils/axiosInstance";
import { create } from "zustand"

export const useAuthStore = create<useAuthStoreType>((set) => ({
    isAuthenticated: false,
    user: null,

    checkAuth: async () => {
        // Retrieve token safely from localStorage
        const token = typeof window !== 'undefined' ? localStorage.getItem("JWT_TOKEN_LOCAL_STORAGE") : null;
        
        // If no token exists, immediately reset state and stop the request
        if (!token) {
            set({ user: null, isAuthenticated: false });
            return { success: false, message: "No token found" };
        }

        try {
            const response = await axiosInstance.get("/check-auth/", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const responseData = response.data;

            if (responseData.success) {
                // Correctly set the nested user object from the response
                set({ user: responseData.user, isAuthenticated: true });
            } else {
                set({ user: null, isAuthenticated: false });
            }

            return responseData;
        } catch (error) {
            // Handle expired tokens or server errors by resetting auth state
            set({ user: null, isAuthenticated: false });
            return { success: false, message: "Authentication failed" };
        }
    },

    signupUser: async (data) => {
    try {
        const response = await axiosInstance.post("/signup/", data);
        const responseData = response.data;

        if (responseData.success) {
            // 1. Extract the access token from the nested 'tokens' object
            const accessToken = responseData.tokens.access;
            const refreshToken = responseData.tokens.refresh;

            // 2. Save to localStorage using the key expected by checkAuth
            if (typeof window !== 'undefined') {
                localStorage.setItem("JWT_TOKEN_LOCAL_STORAGE", accessToken);
                // Optionally save refresh token if you implement token rotation later
                localStorage.setItem("JWT_REFRESH_TOKEN", refreshToken);
            }

            // 3. Update the Zustand state
            set({ isAuthenticated: true });
        }
        return responseData;
    } catch (error) {
        console.error("Signup error:", error);
        return { success: false, message: "An error occurred during signup." };
    }
},

    loginUser: async (data) => {
        try {
        const response = await axiosInstance.post("/login/", data);
        const responseData = response.data;

        if (responseData.success) {
            // 1. Extract the access token from the nested 'tokens' object
            const accessToken = responseData.tokens.access;
            const refreshToken = responseData.tokens.refresh;

            // 2. Save to localStorage using the key expected by checkAuth
            if (typeof window !== 'undefined') {
                localStorage.setItem("JWT_TOKEN_LOCAL_STORAGE", accessToken);
                // Optionally save refresh token if you implement token rotation later
                localStorage.setItem("JWT_REFRESH_TOKEN", refreshToken);
            }

            // 3. Update the Zustand state
            set({ isAuthenticated: true });
        }
        return responseData;
    } catch (error) {
        console.error("Signup error:", error);
        return { success: false, message: "An error occurred during signup." };
    }
    },
    logoutUser: async () => {
    // 1. Remove both token keys from local storage
    if (typeof window !== 'undefined') {
        localStorage.removeItem("JWT_TOKEN_LOCAL_STORAGE"); // Access token
        localStorage.removeItem("JWT_REFRESH_TOKEN");       // Refresh token
    }
    
    // 2. Reset the global auth state
    set({ 
        isAuthenticated: false, 
        user: null 
    });
},
}));