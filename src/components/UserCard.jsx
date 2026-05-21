import { getUsers } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const UserCard = async () => {
    const users = await getUsers();

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {users.map((user) => {
                    return (
                        <Link
                            href={`/ideas/${user._id}`}
                            key={user._id}
                            className="group block relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80 p-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                        >
                            <div>
                                <div className="flex items-start gap-4">
                                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-zinc-100">
                                        <Image
                                            src={user.imageURL || "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=200"}
                                            alt={user.ideaTitle}
                                            fill
                                            sizes="64px"
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 group-hover:text-indigo-600 transition-colors">
                                            {user.ideaTitle}
                                        </h2>
                                    </div>
                                </div>
                                <p className="mt-4 text-sm text-zinc-500 line-clamp-3">
                                    {user.shortDescription}
                                </p>
                            </div>

                            <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between">
                                <span className="text-[11px] uppercase tracking-wider font-semibold text-zinc-400">Target Market</span>
                                <div className="px-3 py-1 rounded-full text-xs font-medium text-indigo-600 bg-indigo-50 dark:bg-indigo-950">
                                    {user.targetAudience}
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default UserCard;