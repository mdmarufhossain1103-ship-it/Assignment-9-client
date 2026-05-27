'use client'
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import React from 'react';

const ProfilePage = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    return (
        <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 flex justify-center items-center px-4">
            <div className="w-full max-w-xl bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-8">
                <div className="flex flex-col items-center">
                    <Image src={user?.image} width={120} height={120} alt='profile' className='rounded-full border-4 border-indigo-500'></Image>
                    <h1 className="mt-4 text-3xl font-bold text-zinc-800 dark:text-white">{user?.name}</h1>
                    <p className="text-zinc-500 dark:text-zinc-400">{user?.email}</p>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;