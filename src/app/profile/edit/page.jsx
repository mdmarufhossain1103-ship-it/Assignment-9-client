'use client'
import { authClient } from '@/lib/auth-client';
import { updateUser } from '@/lib/data';
import { Form, Input, Label, TextField } from '@heroui/react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const EditProfilePage = () => {
    const {data: session} = authClient.useSession();
        const user = session?.user;


        const [name,setName] = useState('');
        const [image,setImage] = useState('');

        useEffect(() => {
            if(user) {
                setName(user?.name || '');
                setImage(user?.image || '');
            }
        }, [user]);

        const handleUpdate = async(e) =>{
            e.preventDefault();

            try{
                const result = await updateUser(user.email, {
                   name: name,
                    image: image,
                });

                console.log(result)

                if(result){
                    toast.success("Profile updated succssfully!");
                } else {
                    toast.error("No changes made!");
                }
            } catch (error){
                toast.error("Something went wrong!");
            }
        }
    return (
        <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 flex justify-center items-center px-4">
            <Form onSubmit={handleUpdate} className="w-full max-w-xl bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-8 flex flex-col gap-5">
                <h1 className="text-2xl font-bold">Edit Profile</h1>
                <TextField>
                    <Label>Name</Label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter your name'></Input>
                </TextField>
                <TextField>
                    <Label>Image URL</Label>
                    <Input value={image} onChange={(e) => setImage(e.target.value)} placeholder='Enter image URL'></Input>
                </TextField>
                
                    <button type='submit' className="bg-indigo-600 text-white rounded-xl cursor-pointer p-2">Save Changes</button>
            </Form>
        </div>
    );
};

export default EditProfilePage;