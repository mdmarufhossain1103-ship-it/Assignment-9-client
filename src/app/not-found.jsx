import React from 'react';
import Link from 'next/link';


const NotFoundPage = () => {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
            <h1 className="text-9xl font-extrabold text-gray-200 tracking-widest">
                404
            </h1>
            <div className="bg-indigo-600 px-2 text-sm rounded mb-5">
                Page Not Found
            </div>
            <button className="mt-5">
                <Link
                    href="/"
                    className="relative inline-block text-sm font-medium text-indigo-600 group active:text-indigo-500 focus:outline-none focus:ring"
                >
                    <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-indigo-600 group-hover:translate-y-0 group-hover:translate-x-0"></span>
                    <span className="relative block px-8 py-3 bg-indigo-600 text-white border border-current">
                        Go Home
                    </span>
                </Link>
            </button>
        </div>
    );
};

export default NotFoundPage;