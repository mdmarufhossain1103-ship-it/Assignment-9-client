import React from 'react';

const Section2 = () => {
    return (
        <div>
            <section className="bg-zinc-50 dark:bg-zinc-950 py-16">
                <div className="max-w-7xl mx-auto px-4">

                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-zinc-800 dark:text-white">
                            Why Choose Us
                        </h2>

                        <p className="mt-4 text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                            We help entrepreneurs showcase their startup ideas and
                            connect with future collaborators and investors.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">

                        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm text-center">
                            <div className="text-5xl mb-4">🚀</div>
                            <h3 className="text-xl font-semibold mb-2 text-zinc-800 dark:text-white">
                                Innovation
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                Share groundbreaking startup ideas with a growing community.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm text-center">
                            <div className="text-5xl mb-4">🤝</div>
                            <h3 className="text-xl font-semibold mb-2 text-zinc-800 dark:text-white">
                                Collaboration
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                Connect with developers, designers, and entrepreneurs.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm text-center">
                            <div className="text-5xl mb-4">📈</div>
                            <h3 className="text-xl font-semibold mb-2 text-zinc-800 dark:text-white">
                                Growth
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                Turn your startup vision into a scalable business opportunity.
                            </p>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default Section2;