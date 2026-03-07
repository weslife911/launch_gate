import { OpportunityStore } from '@/types/opportunities/opportunityTypes';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export const useOpportunityStore = create<OpportunityStore>()(
    devtools(
        persist(
            (set) => ({
                activeCategory: '',
                searchQuery: '',
                viewMode: 'grid',

                setActiveCategory: (category) => set({ activeCategory: category }),
                setSearchQuery: (query) => set({ searchQuery: query }),
                toggleViewMode: () =>
                    set((state) => ({ viewMode: state.viewMode === 'grid' ? 'list' : 'grid' })),
                resetFilters: () => set({ activeCategory: '', searchQuery: '' }),
            }),
            { name: 'opportunity-storage' }
        )
    )
);