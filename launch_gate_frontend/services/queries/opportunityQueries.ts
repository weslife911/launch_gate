'use client';

import { useOpportunityStore } from '@/store/useOpportunityStore';
import { axiosInstance } from '@/utils/axiosInstance';
import { useQuery } from '@tanstack/react-query';

const API_BASE_URL = process.env.NEXT_PUBLIC_FRONTEND_PROD_BASE_URL as string;

export const useOpportunities = () => {
    const { activeCategory, searchQuery, currentPage } = useOpportunityStore();

    return useQuery({
        queryKey: ['opportunities', activeCategory, searchQuery, currentPage],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (activeCategory) params.append('category', activeCategory);
            if (searchQuery) params.append('search', searchQuery);
            params.append('page', currentPage.toString());

            const { data } = await axiosInstance.get('/opportunities/', { params });
            return data;
        },
        placeholderData: (previousData) => previousData,
    });
};