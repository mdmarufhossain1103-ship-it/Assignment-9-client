import { Button } from '@heroui/react';
import React from 'react';


const slides = [
    {
        id: 1,
        title: "Launch Your Startup Idea",
        description: "Turn innovative concepts into successful startups with community support and collaboration.",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1400&auto=format&fit=crop",
    },
    {
        id: 2,
        title: "Discover Creative Innovations",
        description: "Explore groundbreaking ideas, trending technologies, and startup opportunities.",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1400&auto=format&fit=crop",
    },
    {
        id: 3,
        title: "Build the Future Together",
        description: "Connect with entrepreneurs, developers, and creators to bring ideas to life.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1400&auto=format&fit=crop",
    },
];

const Banner = () => {
    return (
        <section className='relative w-full overflow-hidden my-15'>
            <div className='carousel w-full h-[100vh]'>
                {slides.map((slide, index) => (
                    <div key={slide.id} id={`slide${slide.id}`} className='carousel-item relative w-full'>
                        <img src={slide.image} alt={slide.title} className='w-full object-cover' />
                        <div className='absolute inset-0 bg-black/60'></div>
                        <div className='absolute inset-0 flex items-center justify-center px-6'>
                            <div className='max-w-3xl text-center text-white'>
                                <h1 className='text-4xl md:text-6xl font-bold leading-tight'>{slide.title}</h1>
                                <p className='mt-6 text-lg md:text-xl text-gray-200'>{slide.description}</p>
                                <div className='mt-8'>
                                    <Button size="lg" color="primary" className='font-semibold px-8'>Explore Ideas</Button>
                                </div>
                            </div>
                        </div>
                        <div className='absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between'>
                            <a href={`#slide${index === 0 ? slides.length : index}`} className="btn btn-circle text-white">❮</a>
                            <a href={`#slide${index === slides.length - 1 ? 1 : index + 2}`} className='btn btn-circle text-white'>❯</a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Banner;