import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Movie from './Movie';
import styles from '../shared/style.module.css'

const url = 'http://localhost:3000/movies';


export default function MovieList() {
    const [movies, setMovies] = useState();

    const getAllMovies = () => {
        axios.get(url).then((data) => {
            setMovies(data.data)
        })
    }

    useEffect(() => {
        getAllMovies();
    }, [])
    return (
        <section className={styles.movieList}>
            <Movie/>
        </section>
    )
}
