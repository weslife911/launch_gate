import { CATEGORIES } from "@/constants/opportunity_categories";
import { useOpportunityStore } from "@/store/useOpportunityStore";

export const OpportunityFilters = () => {
    const { activeCategory, setActiveCategory, searchQuery, setSearchQuery } = useOpportunityStore();

    return (
        <div className="space-y-6 mb-12">
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
                <input
                    type="text"
                    placeholder="Search opportunities (e.g. Google, Oxford, Africa...)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-2xl border-none bg-white px-6 py-4 shadow-lg ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 dark:bg-slate-900 dark:ring-slate-800 outline-none transition-all"
                />
                <div className="absolute right-4 top-4 text-slate-400">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat.value}
                        onClick={() => setActiveCategory(cat.value)}
                        className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat.value
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                            : 'bg-white text-slate-600 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800'
                            }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>
        </div>
    );
};