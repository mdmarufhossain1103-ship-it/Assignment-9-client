import React from 'react';
import { Link } from "@heroui/react";
import {
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaLinkedin,
    FaGithub,
} from "react-icons/fa";


const Footer = () => {
    return (
        <div>
            <footer className="bg-black text-gray-300 border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-4">
                    <div>
                        <h2 className="text-2xl font-bold text-white">IdeaVault</h2>
                        <p className="mt-4 text-sm leading-6 text-gray-400">
                            A community-driven platform where users can share ideas,
                            discover categories, and connect with others.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">
                            Platform
                        </h3>

                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/ideas" className='text-gray-200'>
                                    Ideas
                                </Link>
                            </li>

                            <li>
                                <Link href="/categories" className='text-gray-200'>
                                    Categories
                                </Link>
                            </li>

                            <li>
                                <Link href="/trending" className='text-gray-200'>
                                    Trending
                                </Link>
                            </li>

                            <li>
                                <Link href="/community" className='text-gray-200'>
                                    Community
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">
                            Contact
                        </h3>

                        <ul className="space-y-3 text-sm">
                            <li>Email: support@ideavault.com</li>
                            <li>Phone: +880 1234-567890</li>
                            <li>Location: Dhaka, Bangladesh</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">
                            Follow Us
                        </h3>

                        <div className="flex gap-4 text-xl">
                            <Link
                                isExternal
                                href="https://facebook.com"
                                className='text-gray-200'
                            >
                                <FaFacebook />
                            </Link>

                            <Link
                                isExternal
                                href="https://twitter.com"
                                className='text-gray-200'
                            >
                                <FaTwitter />
                            </Link>

                            <Link
                                isExternal
                                href="https://instagram.com"
                                className='text-gray-200'
                            >
                                <FaInstagram />
                            </Link>

                            <Link
                                isExternal
                                href="https://linkedin.com"
                                className='text-gray-200'
                            >
                                <FaLinkedin />
                            </Link>

                            <Link
                                isExternal
                                href="https://github.com"
                                className='text-gray-200'
                            >
                                <FaGithub />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-800 py-5 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} YourPlatform. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Footer;