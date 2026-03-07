'use client';

import { OpportunityCard } from "@/components/opportunities/OpportunityCard";
import { OpportunityPagination } from "@/components/opportunities/OpportunityPagination";
import { OpportunitySearch } from "@/components/opportunities/OpportunitySearch";
import OpportunitySkeleton from "@/components/skeletons/opportunitySkeleton";
import { CATEGORIES } from "@/constants/opportunity_categories";
import { useOpportunities } from "@/services/queries/opportunityQueries";
import { useOpportunityStore } from "@/store/useOpportunityStore";

export default function OpportunitiesPage() {
    const {
        activeCategory,
        setActiveCategory,
    } = useOpportunityStore();

    const { data, isLoading, isError } = useOpportunities();

    const opportunities = data?.results || [];
    const totalCount = data?.count || 0;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <header className="text-center mb-16">
                    <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-4">
                        The <span className="text-blue-600">Opportunity</span> Feed
                    </h1>
                    <OpportunitySearch />
                </header>

                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.value}
                            onClick={() => setActiveCategory(cat.value)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat.value
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {isLoading ? (
                    <OpportunitySkeleton />
                ) : isError ? (
                    <div className="text-center py-20 text-red-500">Failed to load opportunities.</div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {opportunities.map((opp: any) => (
                                <OpportunityCard key={opp.id} opp={opp} />
                            ))}
                        </div>

                        <OpportunityPagination totalCount={totalCount} />
                    </>
                )}
            </div>
        </div>
    );
}