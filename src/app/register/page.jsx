"use client";
import { authClient } from "@/lib/auth-client";
import { FloppyDisk } from "@gravity-ui/icons";
import {
    Button,
    Description,
    FieldError,
    FieldGroup,
    Fieldset,
    Form,
    Input,
    Label,
    TextArea,
    TextField,
} from "@heroui/react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";

const RegisterPage = () => {
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());
        const { data, error } = await authClient.signUp.email({
            name: user.name,
            email: user.email,
            image: user.photo,
            password: user.password,
        })

        if (data) {
            toast.success("Registration Successfull!");
            redirect('/login');
        }
        if (error) {
            toast.error(error.message);
        }
    }
       const handleGoogleSignin = async () => {
            await authClient.signIn.social({
                provider: "google",
            });
        }
    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-100 dark:bg-zinc-950 px-4 my-10">
            <div className="w-full max-w-md bg-white dark:bg-zinc-900 shadow-lg rounded-2xl p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-zinc-800 dark:text-white">Create Account</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-2">Register your new account</p>
                </div>
                 <Form onSubmit={onSubmit} className="flex max-w-2xl flex-col gap-4  p-10 rounded-2xl">
                <Fieldset>
                    <FieldGroup>
                        <TextField
                            isRequired
                            name="name"
                            validate={(value) => {
                                if (value.length < 3) {
                                    return "Name must be at least 3 characters";
                                }
                                return null;
                            }}
                        >
                            <Label>Name</Label>
                            <Input placeholder="Enter your name" />
                            <FieldError />
                        </TextField>
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
                        <TextField isRequired name="photo" type="text">
                            <Label>Photo URL</Label>
                            <Input placeholder="Enter your photo url" />
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
                                    Register
                                </Button>
                            </div>
                                <div className="relative flex py-2 items-center">
                                    <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800"></div>
                                    <span className="flex-shrink mx-4 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                                        Or continue with
                                    </span>
                                    <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800"></div>
                                </div>
                            <button
                                type="button" onClick={handleGoogleSignin}
                                className="w-full cursor-pointer flex itew-full flex items-center justify-center gap-3 px-4 py-3 border border-zinc-200 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-900 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transitionms-center justify-center gap-3 px-4 py-3 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 text-sm font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 shadow-sm transition-all duration-200 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-zinc-950"
                            >
                                <FaGoogle className="text-lg text-red-500 dark:text-red-400" />
                                Sign in with Google
                            </button>
                        </TextField>
                    </FieldGroup>
                </Fieldset>
            </Form>
            </div>
        </div>
    );
};

export default RegisterPage;