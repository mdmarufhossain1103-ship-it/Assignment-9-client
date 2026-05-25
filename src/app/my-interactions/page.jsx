import { auth } from '@/lib/auth';
import { getIdeas, getUserByComments } from '@/lib/data';
import { headers } from 'next/headers';
import React from 'react';

const MyInteractionPage = async() => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    const email = session?.user?.email;
    const ideas = await getIdeas(email);
    const comments = await getUserByComments(email);
    console.log(comments);
    return (
        <div className='max-w-6xl mx-auto p-6'>
            <h1 className='text-4xl font-bold mb-10'>My Activities</h1>
            <div className='mb-12'>
                <h2 className='text-2xl font-semibold mb-6'>Commented Ideas</h2>
                {
                    comments?.length > 0 ? (
                        <div className='grid gap-4'>
                            {
                                comments.map((comment) => (
                                    <div key={comment._id} className='border rounded-xl p-5 shadow-sm bg-white'>
                                        <p className='text-gray-800'>{comment.text}</p>
                                        <div className='mt-3 text-sm text-gray-500'>
                                            <p>Idea ID: {comment.ideaId}</p>
                                            <p>
                                                {new Date(
                                                    comment.createdAt
                                                ).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    ) : (
                        <p className='text-gray-500'>
                            No comments found.
                        </p>
                    )
                }
            </div>
            <div>
                <h2 className='text-2xl font-semibold mb-6'>
                    My Posted Ideas
                </h2>
                {
                    ideas?.length > 0 ? (
                        <div className='grid md:grid-cols-2 gap-6'>
                            {
                                ideas.map((idea) => (
                                    <div key={idea._id} className='border rounded-xl p-5 shadow-sm bg-white'>
                                        <h3 className='text-xl font-bold mb-3'>{idea.title}</h3>
                                        <p className='text-gray-700 mb-4'>{idea.description}</p>

                                        {
                                            idea.tags?.length > 0 && (
                                                <div className='flex flex-wrap gap-2'>
                                                    {
                                                        idea.tags.map((tag, index) => (
                                                            <span key={index} className='bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm'>
                                                                #{tag}
                                                            </span>
                                                        ))
                                                    }
                                                </div>
                                            )
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    ) : (
                        <p className='text-gray-500'>
                            No ideas posted yet.
                        </p>
                    )
                }
            </div>
        </div>
    );
};

export default MyInteractionPage;