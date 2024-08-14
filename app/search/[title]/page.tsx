'use client';
import React, { useEffect, useState } from 'react';
import MovieCard, { Movie } from "@/components/MovieCard/index";

export default function Search({ params }: { params: { title: string } }) {
    const [list, setList] = useState([]);

    useEffect(() => {
        fetch(`/api/movies?title=${params.title}`).then(response => response.json())
            .then(data => setList(data));
    }, []);

    return (
        <div className='pb-8'>
           <span className='text-3xl'>Search {params.title} </span> 
            <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 pt-8">
                {
                    list.length ? list.map((item: Movie) => <MovieCard key={item.id} data={item} />) : 'No Data ...'
                }
            </div>
        </div>
    );
}
