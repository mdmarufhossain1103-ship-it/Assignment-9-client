'use client'
import { authClient } from '@/lib/auth-client';
import { deleteIdea, getIdeas, updateIdea } from '@/lib/data';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const MyIdea = () => {
    const [ideas,setIdeas] = useState([]);
    const [loading,setLoading] = useState(true);

    const [selectedIdea, setSelectedIdea] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        const loadIdeas = async () => {
            try {
                const session = await authClient.getSession();
                const email = session?.data?.user?.email;

                if (!email) {
                    setLoading(false);
                    return;
                }
                const data = await getIdeas(email);
                setIdeas(data || []);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        loadIdeas();
    }, []);

    const handleDelete = async() =>{
        try{
            const result = await deleteIdea(selectedIdea._id);

            if(result.deletedCount > 0){
                setIdeas((prev) => prev.filter((idea) =>idea._id !== selectedIdea._id));
                toast.success("Idea deleted successfully");
                setIsDeleteModalOpen(false);
            }
        } catch (error) {
            console.log("Failed to updated idea");
            toast.error("Failed to delete idea");
        }
    };

    const handleUpdate = async(e) =>{
        e.preventDefault();
        const form = e.target;

        const updateIdeaData = {
            ideaTitle: form.ideaTitle.value,
            shortDescription: form.shortDescription.value,
            category: form.category.value,
            targetAudience: form.targetAudience.value,
            problemStatement: form.problemStatement.value,
            proposedSolution: form.proposedSolution.value,
            detailedDescription: form.detailedDescription.value,
        };

        try {
            const result = await updateIdea(
                selectedIdea._id,
                updateIdeaData
            );

            if (result.modifiedCount > 0){
                setIdeas((prev) => prev.map((idea) => idea._id === selectedIdea._id? {
                    ...idea,
                    ...updateIdeaData,
                }: idea ));
                toast.success("Idea updated successfully")
                setIsEditModalOpen(false);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to update idea");
        }
    }

    if (loading){
        return <p>Loading...</p>;
    }
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-10">
            <div className="max-w-6xl mx-auto px-4">

                <h1 className="text-3xl font-extrabold text-zinc-800 dark:text-white mb-10">
                    My Ideas
                </h1>
            {
                    ideas.length === 0 ? (<div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-10 text-center shadow-sm">
                        <p className="text-zinc-500 dark:text-zinc-400 text-lg">No startup ideas found in your collection.</p>
                </div>) : (<div>
                    {
                        ideas.map((idea,index) => (
                            idea.imageURL && (
                                <div key={index} className='max-w-4xl mx-auto my-12 px-4'>
                                    <div className="max-w-4xl mx-auto my-12 px-4">
                                        <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.03)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
                                            <div className="relative w-full h-56 md:h-72 bg-zinc-900">
                                                <Image
                                                    src={idea.imageURL}
                                                    alt={idea.ideaTitle}
                                                    fill
                                                    priority
                                                    className="object-cover opacity-85 mix-blend-normal"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent" />
                                                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                                    ⚡ {idea.category}
                                                </div>
                                                <div className="absolute bottom-6 left-6 right-6 text-white">
                                                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                                                        {idea.ideaTitle}
                                                    </h1>
                                                    <p className="text-sm md:text-base text-zinc-200 mt-2 font-medium max-w-2xl">
                                                        {idea.shortDescription}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="p-6 md:p-8 space-y-8">
                                                <div className="flex flex-wrap gap-2">
                                                  {
                                                    Array.isArray(idea?.tags) &&
                                                    idea.tags.map((tag,index) => (
                                                        <span key={index}>#{tag}</span>
                                                    ))
                                                  }
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-zinc-50/50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800/50 rounded-2xl p-5">
                                                    <div className="space-y-1">
                                                        <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Target Audience</span>
                                                        <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                                                            {idea.targetAudience}
                                                        </p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Estimated Capital Budget</span>
                                                        <p className="text-base font-bold text-emerald-600 dark:text-emerald-400">
                                                            {
                                                                idea?.estimatedBudget ? ` ${idea.estimatedBudget.toLocaleString()} USD` : "Budget not specified"
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                                                    <div className="space-y-2 border-l-2 border-red-500/40 pl-4">
                                                        <h3 className="text-xs font-bold uppercase tracking-widest text-red-500 dark:text-red-400">
                                                            Problem Statement
                                                        </h3>
                                                        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                                                            {idea.problemStatement}
                                                        </p>
                                                    </div>

                                                    <div className="space-y-2 border-l-2 border-indigo-500/40 pl-4">
                                                        <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">
                                                            Proposed Core Solution
                                                        </h3>
                                                        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                                                            {idea.proposedSolution}
                                                        </p>
                                                    </div>
                                                </div>

                                                <hr className="border-zinc-100 dark:border-zinc-800/60" />
                                                <div className="space-y-2">
                                                    <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                                                        Detailed System Overview
                                                    </h3>
                                                    <p className="text-sm md:text-base leading-relaxed text-zinc-600 dark:text-zinc-300 whitespace-pre-line">
                                                        {idea?.detailedDescription}
                                                    </p>

                                                    <div className='flex gap-3'>
                                                        <button onClick={() =>{
                                                            setSelectedIdea(idea);
                                                            setIsEditModalOpen(true);
                                                        }} className='px-4 py-2 rounded-xl bg-indigo-600 text-white'>Update</button>

                                                        <button onClick={() =>{
                                                            setSelectedIdea(idea);
                                                            setIsDeleteModalOpen(true);
                                                        }} className='px-4 py-2 rounded-xl bg-red-600 text-white'>Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        ))
                    }
                </div>)
            }
            </div>

            {
                isEditModalOpen && selectedIdea && (
                    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
                        <div className='bg-white dark:bg-zinc-900 p-6 rounded-2xl w-full max-w-xl'>
                            <h2 className='text-2xl font-bold mb-6'>Update Idea</h2>
                            <form onSubmit={handleUpdate} className='space-y-4'>
                                <input
                                    name="ideaTitle"
                                    defaultValue={
                                        selectedIdea.ideaTitle
                                    }
                                    className="w-full border p-3 rounded-xl"
                                />

                                <input
                                    name="shortDescription"
                                    defaultValue={
                                        selectedIdea.shortDescription
                                    }
                                    className="w-full border p-3 rounded-xl"
                                />

                                <input
                                    name="category"
                                    defaultValue={
                                        selectedIdea.category
                                    }
                                    className="w-full border p-3 rounded-xl"
                                />

                                <input
                                    name="targetAudience"
                                    defaultValue={
                                        selectedIdea.targetAudience
                                    }
                                    className="w-full border p-3 rounded-xl"
                                />

                                <textarea
                                    name="problemStatement"
                                    defaultValue={
                                        selectedIdea.problemStatement
                                    }
                                    className="w-full border p-3 rounded-xl"
                                />

                                <textarea
                                    name="proposedSolution"
                                    defaultValue={
                                        selectedIdea.proposedSolution
                                    }
                                    className="w-full border p-3 rounded-xl"
                                />

                                <textarea
                                    name="detailedDescription"
                                    defaultValue={
                                        selectedIdea.detailedDescription
                                    }
                                    className="w-full border p-3 rounded-xl"
                                />

                                <div className="flex justify-end gap-3">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setIsEditModalOpen(
                                                false
                                            )
                                        }
                                        className="px-4 py-2 rounded-xl bg-zinc-300"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="px-4 py-2 rounded-xl bg-indigo-600 text-white"
                                    >
                                        Save Changes
                                    </button>

                                </div>
                            </form>
                        </div>
                    </div>
                )
            }

            {
                isDeleteModalOpen && selectedIdea && (
                    <div className='fixed inset-0 bg-black/50 items-center justify-center z-50'>
                        <div className='bg-white dark:bg-zinc-900 p-6 rounded-2xl w-full max-w-md'>
                            <h2 className='text-2xl font-bold mb-4'>Delete Idea</h2>

                            <p className='mb-6'>Are you sure want to delete this idea?</p>

                            <div className='flex justify-end gap-3'>
                                <button onClick={() => setIsDeleteModalOpen(false)} className='px-4 py-2 rounded-xl bg-zinc-300'>
                                    Cancel
                                </button>
                                <button onClick={handleDelete} className='px-4 py-2 rounded-xl bg-red-600 text-white'>Delete</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default MyIdea;