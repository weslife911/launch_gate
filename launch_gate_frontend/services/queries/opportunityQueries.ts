import { useOpportunityStore } from '@/store/useOpportunityStore';
import { Opportunity } from '@/types/opportunities/opportunityTypes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_FRONTEND_PROD_BASE_URL as string;

export const useOpportunities = () => {
    const activeCategory = useOpportunityStore((state) => state.activeCategory);
    const searchQuery = useOpportunityStore((state) => state.searchQuery);

    return useQuery({
        queryKey: ['opportunities', activeCategory, searchQuery],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (activeCategory) params.append('category', activeCategory);
            if (searchQuery) params.append('search', searchQuery);

            const { data } = await axios.get<Opportunity[]>(API_BASE_URL, { params });
            return data;
        },
        placeholderData: (previousData) => previousData,
    });
};