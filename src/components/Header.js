import React from 'react'
import styles from '../shared/style.module.css'
export default function Header() {
    return (
        <section className={styles.header}>
            <div className={styles.headerTitleContainer}>
                <img src="./IMGS/clapperboard.svg" alt="clapperboard" className={styles.headerLogo} />
                <span className={styles.headingTitle}>Movie<span>Vault</span></span>
            </div>
            <button className={styles.headerNewMovieBtn}>
                <img src="./IMGS/add-rounded.svg" alt="" />
                Create New Movie
                </button>
        </section>
    )
}
