

function OpportunitySkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
                <div key={i} className="h-80 animate-pulse bg-slate-200 dark:bg-slate-800 rounded-2xl" />
            ))}
        </div>
    )
}

export default OpportunitySkeleton
