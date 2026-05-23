import CommentSection from '@/components/CommentSection';
import { getUserById } from '@/lib/data';
import Image from 'next/image';
import React from 'react';

const DetailsPage = async({params}) => {
    const {id} = await params;
    const idea = await getUserById(id);
    return (
        <div className="max-w-4xl mx-auto my-12 px-4">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
                <div className="relative w-full h-56 md:h-72 bg-zinc-900">
                    <Image
                        src={idea.imageURL}
                        alt={idea.ideaTitle}
                        fill
                        priority
                        className="object-cover opacity-85 mix-blend-normal"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent" />
                    <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        ⚡ {idea.category}
                    </div>
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                            {idea.ideaTitle}
                        </h1>
                        <p className="text-sm md:text-base text-zinc-200 mt-2 font-medium max-w-2xl">
                            {idea.shortDescription}
                        </p>
                    </div>
                </div>
                <div className="p-6 md:p-8 space-y-8">
                    <div className="flex flex-wrap gap-2">
                        {idea?.tags?.map((tag, index) => (
                            <span
                                key={index}
                                className="text-xs font-semibold px-3 py-1 bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-lg border border-zinc-200/60 dark:border-zinc-700/50"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-zinc-50/50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800/50 rounded-2xl p-5">
                        <div className="space-y-1">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Target Audience</span>
                            <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                                {idea.targetAudience}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Estimated Capital Budget</span>
                            <p className="text-base font-bold text-emerald-600 dark:text-emerald-400">
                               {
                                    idea?.estimatedBudget ? ` ${idea.estimatedBudget.toLocaleString()} USD` : "Budget not specified"
                               }
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        <div className="space-y-2 border-l-2 border-red-500/40 pl-4">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-red-500 dark:text-red-400">
                                Problem Statement
                            </h3>
                            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                                {idea.problemStatement}
                            </p>
                        </div>

                        <div className="space-y-2 border-l-2 border-indigo-500/40 pl-4">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">
                                Proposed Core Solution
                            </h3>
                            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                                {idea.proposedSolution}
                            </p>
                        </div>
                    </div>

                    <hr className="border-zinc-100 dark:border-zinc-800/60" />
                    <div className="space-y-2">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                            Detailed System Overview
                        </h3>
                        <p className="text-sm md:text-base leading-relaxed text-zinc-600 dark:text-zinc-300 whitespace-pre-line">
                            {idea.detailedDescription}
                        </p>
                    </div>
                    <CommentSection ideaId={id}></CommentSection>
                </div>
            </div>
        </div>
    );
};

export default DetailsPage;