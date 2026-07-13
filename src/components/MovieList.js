import React from 'react'
import Movie from './Movie';
import styles from '../shared/style.module.css'
import { useMovies } from '../Context/MoviesContext';



export default function MovieList() {
    const { movies } = useMovies();
    console.log(movies)
    return (
        <section className={styles.movieList}>
            {movies.map((movie, index) => (
                <Movie key={index} movie={movie} />
            ))}
        </section>
    )
}
