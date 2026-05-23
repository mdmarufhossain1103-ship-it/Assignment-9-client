"use client";

import Image from "next/image";
import React, { useState } from "react";
import logo from "../../public/logo.png";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import ThemeToggle from "./ThemeToggle";


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const handleSignout = async () => {
        await authClient.signOut();
    };

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/ideas", label: "Ideas" },
        { href: "/add-idea", label: "Add Idea" },
        { href: "/my-ideas", label: "My Ideas" },
        { href: "/my-interactions", label: "My Interactions" },
    ];

    return (
        <div className="relative">
            <div className="flex items-center justify-between px-6 py-3 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md rounded-2xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] transition-all duration-300">
                <div className="flex items-center gap-3">

                    <div className="hidden md:flex items-center hover:scale-105 transition-transform duration-200">
                        <Image
                            className="object-contain"
                            src={logo}
                            alt="logo"
                            width={100}
                            height={20}
                            priority
                        />
                    </div>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? (
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </button>
                </div>
                <nav className="hidden md:block">
                    <ul className="flex items-center gap-1 font-medium text-sm text-zinc-600 dark:text-zinc-300">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="px-4 py-2 rounded-full hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white transition-all duration-200"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="flex items-center gap-4">
                    <ThemeToggle></ThemeToggle>
                    {user ? (
                        <div className="flex items-center gap-4">
                            <Image src={user?.image} width={50} height={50} alt="image" className="rounded-full"></Image>
                            <Button
                                onClick={handleSignout}
                                className="px-5 py-2 text-sm font-semibold text-white bg-red-500 rounded-full hover:shadow-[0_4px_14px_0_rgba(239,68,68,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                            >
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link
                                href="/login"
                                className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full hover:shadow-[0_4px_14px_0_rgba(99,102,241,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full hover:shadow-[0_4px_14px_0_rgba(99,102,241,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 p-4 mx-6 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl md:hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <nav>
                        <ul className="flex flex-col gap-2 font-medium text-sm text-zinc-600 dark:text-zinc-300">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="block px-4 py-3 rounded-xl hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white transition-all duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    );
};

export default Navbar;