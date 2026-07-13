import React, { useState } from 'react'
import styles from '../shared/style.module.css'
import MovieList from './MovieList'
import NewMovieMenu from './NewMovieMenu'


export default function Body({ isNewMoviePopUp, setIsNewMoviePopUp }) {


  return (
    <section className={styles.body}>
      <span className={styles.bodyTitle}>
        My Movies
      </span>
      <p className={styles.bodySubTitle}>Manage and organize your trailers in one place.</p>
      <MovieList />
      {isNewMoviePopUp && <NewMovieMenu setIsNewMoviePopUp={setIsNewMoviePopUp} />}
    </section>
  )
}
