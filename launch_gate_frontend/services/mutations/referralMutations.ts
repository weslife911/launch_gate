"use client"

import { useReferralStore } from "@/store/useReferralStore";
import { TrackClickReturnType } from "@/types/referral/referralTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useTrackClickMutation = () => {
    const { trackClick } = useReferralStore();
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["track-click"],
        mutationFn: (username: string) => trackClick(username),
        onSuccess: (data: TrackClickReturnType) => {
            if (data.success) {
                // Invalidate auth-related queries to refresh the referral count globally
                queryClient.invalidateQueries({ queryKey: ["check-auth"] });
            }
        },
        onError: (error: any) => {
            console.error("Tracking Error:", error);
        },
    });
};

export const useFetchReferralDataMutation = () => {
    const { fetchReferralData } = useReferralStore();
    
    return useMutation({
        mutationKey: ["fetch-referral-data"],
        mutationFn: () => fetchReferralData(),
        onError: (error: any) => {
            toast.error("Failed to update referral stats");
        },
    });
};