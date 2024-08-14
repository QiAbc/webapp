'use client';
import React, { useEffect, useState } from 'react';
import MovieCard, { Movie } from "@/components/MovieCard/index";

export default function Home() {
    const [list, setList] = useState([]);

    useEffect(() => {
        fetch('/api/movies').then(response => response.json())
            .then(data => setList(data));
    }, []);

    return (
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
            {
                list.map((item: Movie) => <MovieCard key={item.id} data={item} />)
            }
        </div>
    );
}
