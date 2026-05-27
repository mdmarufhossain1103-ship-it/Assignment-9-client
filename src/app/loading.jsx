import React from 'react';

const LoadingPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
            <div className="absolute w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl animate-pulse top-10 left-10"></div>
            <div className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse bottom-10 right-10"></div>

            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            <div className="relative z-10 text-center">
                <div className="relative flex items-center justify-center mb-6">
                    <div className="w-20 h-20 border-4 border-white/10 border-t-indigo-500 rounded-full animate-spin"></div>
                    <div className="absolute w-10 h-10 bg-indigo-500/30 rounded-full animate-ping"></div>
                </div>

                <h1 className="text-2xl font-semibold text-white tracking-widest">
                    Loading
                    <span className="inline-flex ml-1">
                        <span className="animate-bounce [animation-delay:0ms]">.</span>
                        <span className="animate-bounce [animation-delay:150ms]">.</span>
                        <span className="animate-bounce [animation-delay:300ms]">.</span>
                    </span>
                </h1>
                <p className="mt-3 text-gray-400 text-sm">
                    Preparing your experience
                </p>
                <div className="mt-10 space-y-3 w-64 mx-auto">
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse"></div>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full animate-pulse"></div>
                    <div className="h-3 bg-white/10 rounded-full w-3/4 animate-pulse"></div>
                </div>

            </div>
        </div>
    );
};

export default LoadingPage;