"use client";
import React, { useState } from 'react';
import { Check } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import Link from 'next/link';
import { FaGoogle, FaToggleOff, FaToggleOn } from 'react-icons/fa';
import { authClient } from '@/lib/auth-client';
import { redirect } from 'next/navigation';
import toast from 'react-hot-toast';

const LoginPage = () => {
    const [rememberMe, setRememberMe] = useState(false);

     const onSubmit = async(e) =>{
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const user = Object.fromEntries(formData.entries());
            const {data,error} = await authClient.signIn.email({
                email: user.email,
                password: user.password,
            })
            
            if(data){
                toast.success("Login successfull!");
                redirect('/');
            }
            if(error){
                toast.error(error.message);
            }
        }

    const handleGoogleSignin = async () => {
        await authClient.signIn.social({
            provider: "google",
        });
    }
    return (
        <div className='flex justify-center items-center my-10'>
            <Form onSubmit={onSubmit} className="flex max-w-2xl flex-col gap-4 shadow-lg p-10 rounded-2xl" >
                <TextField
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) => {
                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                            return "Please enter a valid email address";
                        }
                        return null;
                    }}
                >
                    <Label>Email</Label>
                    <Input placeholder="Enter your email" />
                    <FieldError />
                </TextField>
                <TextField
                    isRequired
                    minLength={8}
                    name="password"
                    type="password"
                    validate={(value) => {
                        if (value.length < 8) {
                            return "Password must be at least 8 characters";
                        }
                        if (!/[A-Z]/.test(value)) {
                            return "Password must contain at least one uppercase letter";
                        }
                        if (!/[0-9]/.test(value)) {
                            return "Password must contain at least one number";
                        }
                        return null;
                    }}
                >
                    <Label>Password</Label>
                    <Input placeholder="Enter your password" />
                    <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                    <FieldError />
                    <div className="flex gap-2">
                        <Button type="submit" className='px-5 py-2 w-full text-sm font-semibold text-white bg-linear-to-r from-indigo-500 to-purple-600 my-3'>
                            Login
                        </Button>
                    </div>
                </TextField>
                <div className="w-full  mx-auto space-y-6">
                    <div className="flex items-center justify-between text-sm">
                        <button
                            type="button"
                            onClick={() => setRememberMe(!rememberMe)}
                            className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors focus:outline-none select-none font-medium"
                        >
                            {rememberMe ? (
                                <FaToggleOn className="text-2xl text-indigo-600 dark:text-indigo-400 transition-all duration-200" />
                            ) : (
                                <FaToggleOff className="text-2xl text-zinc-400 dark:text-zinc-600 transition-all duration-200" />
                            )}
                            Remember me
                        </button>
                        <Link
                            href="/forgot-password"
                            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors underline-offset-4 hover:underline"
                        >
                            Forgot password?
                        </Link>
                    </div>
                    <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800"></div>
                        <span className="flex-shrink mx-4 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                            Or continue with
                        </span>
                        <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800"></div>
                    </div>
                    <div>
                        <button
                            type="button" onClick={handleGoogleSignin}
                            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 text-sm font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 shadow-sm transition-all duration-200 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-zinc-950"
                        >
                            <FaGoogle className="text-lg text-red-500 dark:text-red-400" />
                            Sign in with Google
                        </button>
                    </div>
                    <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
                        Don't have an account?{' '}
                        <Link
                            href="/register"
                            className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors underline-offset-4 hover:underline"
                        >
                            Sign up free
                        </Link>
                    </p>

                </div>
            </Form>
        </div>
    );
};

export default LoginPage;