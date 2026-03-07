'use client';

import { OpportunityCard } from "@/components/opportunities/OpportunityCard";
import { CATEGORIES } from "@/constants/opportunity_categories";
import { useOpportunities } from "@/services/queries/opportunityQueries";
import { useOpportunityStore } from "@/store/useOpportunityStore";

export default function OpportunitiesPage() {
    const { activeCategory, setActiveCategory, searchQuery, setSearchQuery } = useOpportunityStore();
    const { data, isLoading, isError } = useOpportunities();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <header className="text-center mb-16">
                    <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-4">
                        The <span className="text-blue-600">Opportunity</span> Feed
                    </h1>
                    <div className="max-w-xl mx-auto relative">
                        <input
                            type="text"
                            placeholder="Search by keyword..."
                            className="w-full p-4 rounded-xl shadow-lg dark:bg-slate-900 outline-none ring-2 ring-transparent focus:ring-blue-500 transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </header>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.value}
                            onClick={() => setActiveCategory(cat.value)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat.value
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400'
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="h-80 animate-pulse bg-slate-200 dark:bg-slate-800 rounded-2xl" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {data?.map((opp: any) => (
                            <OpportunityCard key={opp.id} opp={opp} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}