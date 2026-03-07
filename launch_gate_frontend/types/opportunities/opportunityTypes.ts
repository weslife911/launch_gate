export interface Opportunity {
    id: number;
    title: string;
    link: string;
    description: string;
    image_url: string | null;
    category: 'scholarship' | 'internship' | 'fellowship' | 'contest' | 'other';
    date_scraped: string;
}

export interface OpportunityStoreState {
    activeCategory: string;
    searchQuery: string;
    viewMode: 'grid' | 'list';
}

export interface OpportunityStoreActions {
    setActiveCategory: (category: string) => void;
    setSearchQuery: (query: string) => void;
    toggleViewMode: () => void;
    resetFilters: () => void;
}

export interface OpportunityStore {
    activeCategory: string;
    searchQuery: string;
    currentPage: number;
    setActiveCategory: (cat: string) => void;
    setSearchQuery: (query: string) => void;
    setCurrentPage: (page: number) => void;
}