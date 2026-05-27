'use client';

import React, { useEffect, useState } from 'react';
import { Check } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, ListBox, Select, SelectItem, TextArea, Textarea, TextField } from "@heroui/react";
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';

const AddIdea = ({ createUserAction }) => {
    const [email, setEmail] = useState(null)
    useEffect(() => {
        const fetchSession = async () => {
            const session = await authClient.getSession()
            const email = session?.data?.user?.email
            setEmail(email)
        }
        fetchSession()
    }, [])

    const handleSubmit = async(e) =>{
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);

        try {
            await createUserAction(formData);

            toast.success("Idea submitted successfully!");
            e.target.reset();
        } catch (error) {
            toast.error("Something went wrong!");
        } 
    };

    return (
        <div  className="min-h-screen bg-zinc-100 dark:bg-zinc-950 flex justify-center items-center px-4 py-10">
            <Form onSubmit={handleSubmit} action={createUserAction} className="w-full max-w-3xl bg-white dark:bg-zinc-900 shadow-lg rounded-2xl p-8 flex flex-col gap-5">
                <div className="mb-4">
                    <h1 className="text-3xl font-bold text-zinc-800 dark:text-white">Submit Your Startup Idea</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-1">Share your innovative startup concept with the community.</p>
                </div>
                {email ? <input type="hidden" name="email" value={email} /> : null}
                <TextField
                    isRequired
                    name="ideaTitle"
                    type="text"
                    validate={(value) => value.length < 3 ? "Title must be at least 3 characters" : null}
                >
                    <Label>Idea Title</Label>
                    <Input placeholder="Enter startup name or title" />
                    <FieldError />
                </TextField>
                <TextField
                    isRequired
                    name="shortDescription"
                    type="text"
                    validate={(value) => value.length < 10 ? "Short description must be at least 10 characters" : null}
                >
                    <Label>Short Description</Label>
                    <Input placeholder="Enter short description for your idea" />
                    <FieldError />
                </TextField>
                <TextField
                    isRequired
                    type="email"
                    value={email ?? ""}
                >
                    <Label>Email</Label>
                    <Input value={email ?? ""} placeholder="User email" readOnly />
                    <FieldError />
                </TextField>
                <Select className='w-full' name='category' placeholder="Select one">
                    <Label>State</Label>
                    <Select.Trigger>
                        <Select.Value />
                        <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                        <ListBox>
                            <ListBox.Item id="florida" textValue="Florida">
                                Tech
                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="delaware" textValue="Delaware">
                                Health
                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="california" textValue="California">
                                AI
                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="texas" textValue="Texas">
                                Education
                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                            <ListBox.Item id="new-york" textValue="New York">
                                Other
                                <ListBox.ItemIndicator />
                            </ListBox.Item>
                        </ListBox>
                    </Select.Popover>
                </Select>

                <TextField isRequired name="targetAudience" type="text">
                    <Label>Target Audience</Label>
                    <Input placeholder="Enter targetAudience for your idea" />
                    <FieldError />
                </TextField>
                <div className="flex flex-col gap-1">
                    <Label className="text-sm font-medium">Problem Statement</Label>
                    <TextArea
                        name='problemStatement'
                        aria-label="Quick project update"
                        className="h-32 w-96"
                        placeholder="Share your problem statement"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <Label className="text-sm font-medium">Proposed Solution</Label>
                    <TextArea
                        name='proposedSolution'
                        aria-label="Quick project update"
                        className="h-32 w-96"
                        placeholder="Share your proposed solution"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <Label className="text-sm font-medium">Detailed Description</Label>
                    <TextArea
                        name='detailedDescription'
                        aria-label="Quick project update"
                        className="h-32 w-96"
                        placeholder="Share your description"
                    />
                </div>
                <TextField
                    isRequired
                    name="imageURL"
                    type="url"
                    validate={(value) => {
                        if (value && !/^https?:\/\/.+/i.test(value)) {
                            return "Please enter a valid URL starting with http:// or https://";
                        }
                        return null;
                    }}
                >
                    <Label>Image URL</Label>
                    <Input placeholder="Enter a image url" />
                    <FieldError />
                </TextField>
                <TextField name="estimatedBudget" type="number">
                    <Label>Estimated Budget ($)</Label>
                    <Input placeholder="Enter setimated Budget" />
                    <FieldError />
                </TextField>
                <TextField name="tags" type="text">
                    <Label>Tags</Label>
                    <Input placeholder="Enter tags" />
                    <Description>Separate multiple tags using commas</Description>
                    <FieldError />
                </TextField>
                <div className="flex gap-2 mt-2">
                    <Button type="submit" isDisabled={!email}>
                        <Check />
                        Submit
                    </Button>
                    <Button type="reset" variant="secondary">
                        Reset
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default AddIdea;