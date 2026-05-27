import Image from 'next/image';
import React from 'react';

const Section1 = () => {
    return (
        <div>
            <section className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 gap-10 items-center bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-md">

                    <div>
                        <h2 className="text-4xl font-bold text-zinc-800 dark:text-white mb-4">
                            Featured Startup Idea
                        </h2>

                        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                            Discover innovative startup concepts shared by entrepreneurs
                            around the world. Explore ideas, connect with creators,
                            and build something impactful.
                        </p>

                        <button className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium transition">
                            Explore Ideas
                        </button>
                    </div>

                    <div className="relative w-full h-[300px] rounded-2xl overflow-hidden">
                        <Image
                            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200"
                            alt="Startup Team"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Section1;