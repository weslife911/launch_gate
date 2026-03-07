import { OpportunityCard } from "@/components/opportunities/OpportunityCard";
import { useOpportunities } from "@/services/queries/opportunityQueries";
import { useState } from "react";
import { CATEGORIES } from "@/constants/opportunity_categories"

export const OpportunitiesPage = () => {
    const [activeCategory, setActiveCategory] = useState('');
    const { data: opportunities, isLoading, isError } = useOpportunities();

    return (
        <div className="min-h-screen bg-slate-50 p-6 dark:bg-slate-950">
            <div className="mx-auto max-w-7xl">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                        Latest <span className="text-blue-600">Opportunities</span>
                    </h1>
                    <p className="mt-4 text-slate-600 dark:text-slate-400">Discover handpicked global funding and career openings.</p>
                </header>

                {/* Filter Bar */}
                <div className="mb-10 flex flex-wrap justify-center gap-3">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.value}
                            onClick={() => setActiveCategory(cat.value)}
                            className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${activeCategory === cat.value
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                : 'bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300'
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-80 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
                        ))}
                    </div>
                ) : isError ? (
                    <div className="text-center text-red-500">Failed to load opportunities.</div>
                ) : (
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {opportunities?.map((opp) => (
                            <OpportunityCard key={opp.id} opp={opp} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};