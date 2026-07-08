import React from 'react'
import styles from '../shared/style.module.css'

export default function Movie() {
    return (
        <>
            <section className={styles.movieCard}>
                <div className={styles.movieCardThumbnailContainer}>
                    <img src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba" alt="thumbnail" className={styles.thumbnailImage} />
                    <button className={styles.thumbnailPlayBtn}>
                        <img src="./IMGS/play-filled.svg" alt="play" />
                    </button>
                    <button className={styles.thumbnailCloseBtn}>
                        <img src="./IMGS/close.svg" alt="close" />
                    </button>
                </div>
                <div className={styles.movieDetails}>
                    <p className={styles.movieTitle}>Inception Trailer</p>
                    <p className={styles.movieDesc}>A mind blending masterpiece</p>
                </div>
                <div className={styles.movieBottomDetails}>
                    <div className={styles.movieCardIconContainer}>
                        <img src="./IMGS/clock.svg" alt="clock" />
                        <span>2:30</span>
                    </div>
                    <img src="./IMGS/dot.svg" alt="dot" />
                    <span>May 16, 2024</span>
                </div>
                <button className={styles.movieDetailsBtn}>View Details</button>
            </section>
            <section className={styles.movieCard}>
                <div className={styles.movieCardThumbnailContainer}>
                    <img src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba" alt="thumbnail" className={styles.thumbnailImage} />
                    <button className={styles.thumbnailPlayBtn}>
                        <img src="./IMGS/play-filled.svg" alt="play" />
                    </button>
                    <button className={styles.thumbnailCloseBtn}>
                        <img src="./IMGS/close.svg" alt="close" />
                    </button>
                </div>
                <div className={styles.movieDetails}>
                    <p className={styles.movieTitle}>Inception Trailer</p>
                    <p className={styles.movieDesc}>A mind blending masterpiece</p>
                </div>
                <div className={styles.movieBottomDetails}>
                    <div className={styles.movieCardIconContainer}>
                        <img src="./IMGS/clock.svg" alt="clock" />
                        <span>2:30</span>
                    </div>
                    <img src="./IMGS/dot.svg" alt="dot" />
                    <span>May 16, 2024</span>
                </div>
                <button className={styles.movieDetailsBtn}>View Details</button>
            </section>
            <section className={styles.movieCard}>
                <div className={styles.movieCardThumbnailContainer}>
                    <img src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba" alt="thumbnail" className={styles.thumbnailImage} />
                    <button className={styles.thumbnailPlayBtn}>
                        <img src="./IMGS/play-filled.svg" alt="play" />
                    </button>
                    <button className={styles.thumbnailCloseBtn}>
                        <img src="./IMGS/close.svg" alt="close" />
                    </button>
                </div>
                <div className={styles.movieDetails}>
                    <p className={styles.movieTitle}>Inception Trailer</p>
                    <p className={styles.movieDesc}>A mind blending masterpiece</p>
                </div>
                <div className={styles.movieBottomDetails}>
                    <div className={styles.movieCardIconContainer}>
                        <img src="./IMGS/clock.svg" alt="clock" />
                        <span>2:30</span>
                    </div>
                    <img src="./IMGS/dot.svg" alt="dot" />
                    <span>May 16, 2024</span>
                </div>
                <button className={styles.movieDetailsBtn}>View Details</button>
            </section>

        </>
    )
}
