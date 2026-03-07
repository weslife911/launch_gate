"use client";

import { CATEGORY_IMAGES, GLOBAL_FALLBACK } from "@/constants/opportunity_card_const";
import { Opportunity } from "@/types/opportunities/opportunityTypes";
import Image from 'next/image';
import { useState, useEffect } from "react";

export const OpportunityCard = ({ opp }: { opp: Opportunity }) => {
    const categoryFallback = CATEGORY_IMAGES[opp.category] || GLOBAL_FALLBACK;

    const [imgSrc, setImgSrc] = useState(opp.image_url || categoryFallback);

    useEffect(() => {
        setImgSrc(opp.image_url || categoryFallback);
    }, [opp.image_url, categoryFallback]);

    return (
        <div className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-slate-900 dark:border-slate-800">
            <div className="relative w-full aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
                <Image
                    src={imgSrc}
                    alt={opp.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={() => setImgSrc(categoryFallback)}
                />
                <div className="absolute top-3 right-3 z-10">
                    <span className="rounded-full bg-blue-600/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm shadow-sm">
                        {opp.category}
                    </span>
                </div>
            </div>

            <div className="flex flex-1 flex-col p-5">
                <h3 className="mb-2 line-clamp-2 text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    {opp.title}
                </h3>
                <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {opp.description || "View full details and application instructions for this opportunity."}
                </p>
                <div className="mt-auto">
                    <a
                        href={opp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800"
                    >
                        Apply Now
                        <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
};