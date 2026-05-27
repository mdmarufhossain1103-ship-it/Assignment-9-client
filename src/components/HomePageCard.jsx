import { getUsers } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const HomePageCard = async() => {
    const ideas = await getUsers();
    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {ideas.slice(0,3).map((idea) => {
                    return (
                        <div
                            key={idea._id}
                            className="flex flex-col justify-between p-6 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div>
                                <div className="flex items-start gap-4">
                                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-zinc-100 flex-shrink-0">
                                        <Image
                                            src={idea.imageURL || "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=200"}
                                            alt={idea.ideaTitle || "Startup Pitch Cover"}
                                            fill
                                            sizes="64px"
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 transition-colors">
                                            {idea.ideaTitle}
                                        </h2>
                                    </div>
                                </div>

                                <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400 line-clamp-3">
                                    {idea.shortDescription}
                                </p>
                            </div>
                            <div className="mt-6">
                                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between mb-4">
                                    <span className="text-[11px] uppercase tracking-wider font-semibold text-zinc-400">Target Market</span>
                                    <div className="px-3 py-1 rounded-full text-xs font-medium text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 dark:text-indigo-400">
                                        {idea.targetAudience}
                                    </div>
                                </div>
                                <Link
                                    href={`/ideas/${idea._id}`}
                                    className="block text-center w-full py-2.5 px-4 rounded-xl bg-blue-500 hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700/80 text-sm font-medium text-zinc-700 dark:text-zinc-200 transition-colors"
                                >
                                    Show Details
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HomePageCard;