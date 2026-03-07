import { OpportunityStore } from '@/types/opportunities/opportunityTypes';
import { create } from 'zustand';

export const useOpportunityStore = create<OpportunityStore>((set) => ({
    activeCategory: '',
    searchQuery: '',
    currentPage: 1,
    setActiveCategory: (activeCategory) => set({ activeCategory, currentPage: 1 }),
    setSearchQuery: (searchQuery) => set({ searchQuery, currentPage: 1 }),
    setCurrentPage: (currentPage) => set({ currentPage }),
}));