import { create } from "zustand";
import Cookies from "js-cookie";
import { axiosInstance } from "@/utils/axiosInstance";
import { TrackClickReturnType, useReferralStoreType } from "@/types/referral/referralTypes";

export const useReferralStore = create<useReferralStoreType>((set) => ({
    referralCount: 0,
    clickLogs: [],
    chartData: [],

    trackClick: async (username: string): Promise<TrackClickReturnType> => {
        try {
            // No token needed for tracking public clicks
            const response = await axiosInstance.post(`/track-click/${username}/`);
            return response.data;
        } catch (error) {
            return { success: false, message: "Failed to track click" };
        }
    },

    fetchReferralData: async () => {
        const token = Cookies.get("access_token");
        if (!token) return;

        try {
            const response = await axiosInstance.get("/check-auth/", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (response.data.success) {
                set({ referralCount: response.data.user.referral_count });
            }
        } catch (error) {
            console.error("Error fetching referral count", error);
        }
    },

    fetchChartData: async () => {
        const token = Cookies.get("access_token");
        if (!token) return [];

        try {
            const response = await axiosInstance.get("/stats/", {
                headers: { "Authorization": `Bearer ${token}` }
            });
            
            const data = response.data;
            set({ chartData: data });
            return data;
        } catch (error) {
            console.error("Failed to fetch chart data", error);
            return [];
        }
    },
}));