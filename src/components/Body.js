import React from 'react'
import styles from '../shared/style.module.css'
import MovieList from './MovieList'

export default function Body() {
  return (
    <section className={styles.body}>
        <span className={styles.bodyTitle}>
            My Movies
        </span>
        <p className={styles.bodySubTitle}>Manage and organize your trailers in one place.</p>
        <MovieList/>
    </section>
  )
}
