'use client';
import { useOpportunityStore } from '@/store/useOpportunityStore';

export const OpportunityPagination = ({ totalCount }: { totalCount: number }) => {
    const { currentPage, setCurrentPage } = useOpportunityStore();
    const pageSize = 12;
    const totalPages = Math.ceil(totalCount / pageSize);

    if (totalPages <= 1) return null;

    return (
        <>
            {totalPages > 1 && (
                <div className="mt-16 flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => {
                                setCurrentPage(currentPage - 1);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="rounded-xl px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-semibold text-slate-700 dark:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-all"
                        >
                            Previous
                        </button>

                        <div className="px-4 py-2 text-sm font-bold text-slate-900 dark:text-white bg-slate-200 dark:bg-slate-800 rounded-lg">
                            {currentPage} / {totalPages}
                        </div>

                        <button
                            disabled={currentPage >= totalPages}
                            onClick={() => {
                                setCurrentPage(currentPage + 1);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="rounded-xl px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-semibold text-slate-700 dark:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-all"
                        >
                            Next
                        </button>
                    </div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">
                        {totalCount} total opportunities found
                    </p>
                </div>
            )}
        </>
    );
};