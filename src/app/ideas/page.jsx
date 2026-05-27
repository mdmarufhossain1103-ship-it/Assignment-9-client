'use client'
import UserCard from '@/components/UserCard';
import { getIdeas } from '@/lib/data';
import React, { useEffect, useState } from 'react';

const AllIdea = () => {
    const [ideas,setIdeas] = useState([]);
    const [search,setSearch] = useState("");
    const [category,setCategory] = useState("");
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        const fetchIdeas = async () =>{
            try {
                setLoading(true);

                const data = await getIdeas({
                    search,
                    category,
                });

                setIdeas(data || []);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchIdeas();
    }, [search,category]);

    return (
        <div className="max-w-7xl mx-auto p-5">
            <h1 className="text-3xl font-bold mb-8 text-center">All Ideas</h1>
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <input type="text" placeholder='Search by idea title...' value={search} onChange={(e) => setSearch(e.target.value)} className='border border-gray-300 p-3 rounded-lg w-full outline-none focus:ring-2 focus:ring-blue-500' />
                <select value={category} onChange={(e) => setCategory(e.target.value)} className='border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500'>
                    <option value="">All Categories</option>
                    <option value="Technology">Technology</option>
                    <option value="Business">Business</option>
                    <option value="Education">Education</option>
                    <option value="Health">Health</option>
                    <option value="Finance">Finance</option>
                </select>
            </div>
            {
                loading && (
                    <div className='text-center text-lg font-medium'>Loading ideas...</div>
                )
            }
            {
                !loading && ideas.length === 0 && (
                    <div className='text-center text-gray-500 text-lg'>No ideas found</div>
                )
            }
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                   !loading && 
                   ideas.map((idea) =>(
                       <UserCard key={idea._id} idea={idea}></UserCard>
                   ))
                }
            </div>
        </div>
    );
};

export default AllIdea;