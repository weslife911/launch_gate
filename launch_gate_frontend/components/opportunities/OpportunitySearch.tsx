"use client";

import { useEffect, useState } from "react";
import { useOpportunityStore } from "@/store/useOpportunityStore";

export const OpportunitySearch = () => {
    const { searchQuery, setSearchQuery } = useOpportunityStore();
    const [localQuery, setLocalQuery] = useState(searchQuery);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchQuery(localQuery);
        }, 500);

        return () => clearTimeout(timer);
    }, [localQuery, setSearchQuery]);

    return (
        <div className="relative max-w-2xl mx-auto mb-8">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            <input
                type="text"
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                placeholder="Search scholarships, internships, or keywords..."
                className="block w-full pl-11 pr-4 py-4 rounded-2xl bg-white dark:bg-slate-900 border-none ring-1 ring-slate-200 dark:ring-slate-800 focus:ring-2 focus:ring-blue-500 shadow-xl transition-all outline-none"
            />
            {localQuery && (
                <button
                    onClick={() => setLocalQuery('')}
                    className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-slate-600"
                >
                    Clear
                </button>
            )}
        </div>
    );
};