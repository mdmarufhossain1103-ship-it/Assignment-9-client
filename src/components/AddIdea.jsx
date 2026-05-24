'use client';

import React, { useEffect, useState } from 'react';
import { Check } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, ListBox, Select, SelectItem, TextArea, Textarea, TextField } from "@heroui/react";
import { authClient } from '@/lib/auth-client';

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

    return (
        <div className='flex justify-center items-center my-10'>
            <Form action={createUserAction} className="flex w-2xl flex-col gap-4 shadow-2xl rounded-2xl p-10">
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
                    <Input placeholder="One-sentence elevator pitch" />
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
                    <Input placeholder="Who is this product for?" />
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
                    <Input placeholder="https://example.com/image.png" />
                    <FieldError />
                </TextField>
                <TextField name="estimatedBudget" type="number">
                    <Label>Estimated Budget ($)</Label>
                    <Input placeholder="e.g. 50000 (Optional)" />
                    <FieldError />
                </TextField>
                <TextField name="tags" type="text">
                    <Label>Tags</Label>
                    <Input placeholder="saas, ai, automation" />
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