"use client"

import { useReferralStore } from "@/store/useReferralStore";
import { useQuery } from "@tanstack/react-query";

export const useReferralDataQuery = () => {
    const { fetchReferralData } = useReferralStore();
    return useQuery({
        queryKey: ["referral-data"],
        queryFn: async () => {
            await fetchReferralData();
            return true;
        },
    });
};

export const useReferralChartQuery = () => {
    const { fetchChartData } = useReferralStore();
    return useQuery({
        queryKey: ["referral-chart"],
        queryFn: async () => {
            await fetchChartData();
            return true;
        },
    });
};