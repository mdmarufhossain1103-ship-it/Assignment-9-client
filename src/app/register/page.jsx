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

const RegisterPage = () => {
    const onSubmit = async(e) =>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());
        const {data,error} = await authClient.signUp.email({
            name: user.name,
            email: user.email,
            image: user.photo,
            password: user.password,
        })
        
        if(data){
            toast.success("Registration Successfull!");
            redirect('/login');
        }
        if(error){
            toast.error(error.message);
        }
    }
    return (
        <div className='flex justify-center items-center my-10'>
            <Form onSubmit={onSubmit} className="flex max-w-2xl flex-col gap-4 shadow-lg p-10 rounded-2xl">
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
                        </TextField>
                    </FieldGroup>
                </Fieldset>
            </Form>
        </div>
    );
};

export default RegisterPage;