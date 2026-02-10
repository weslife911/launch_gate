import { create } from "zustand";
import Cookies from "js-cookie";
import { axiosInstance } from "@/utils/axiosInstance";
import { TrackClickReturnType, useReferralStoreType } from "@/types/referral/referralTypess";

export const useReferralStore = create<useReferralStoreType>((set) => ({
    referralCount: 0,
    clickLogs: [],
    isLoading: false,

    fetchReferralData: async () => {
        const token = Cookies.get("access_token");
        if (!token) return;

        set({ isLoading: true });
        try {
            // Re-using the check-auth endpoint which returns user data including referral_count
            const response = await axiosInstance.get("/check-auth/", {
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (response.data.success) {
                set({ 
                    referralCount: response.data.user.referral_count,
                    clickLogs: response.data.user.click_logs || [] 
                });
            }
        } catch (error) {
            console.error("Error fetching referral data", error);
        } finally {
            set({ isLoading: false });
        }
    },

    trackClick: async (username: string): Promise<TrackClickReturnType> => {
        try {
            // No token needed for tracking public clicks
            const response = await axiosInstance.post(`/track-click/${username}/`);
            return response.data;
        } catch (error) {
            return { success: false, message: "Failed to track click" };
        }
    },
}));