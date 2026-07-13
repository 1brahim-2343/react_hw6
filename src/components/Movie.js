import React, { useState } from 'react'
import styles from '../shared/style.module.css'
import DetailsPopup from './DetailsPopUp';
import { useMovies } from '../Context/MoviesContext';

function formatLongDescription(desc) {
    const initialDesc = new String(desc).split(" ");
    let resultDesc = "";
    for (let i = 0; i <= 10; i++) {
        const element = initialDesc[i];
        resultDesc += element
        i !== 10 ? resultDesc += " " : resultDesc += "";
    }
    return resultDesc;
}



export default function Movie({ movie }) {
    const formattedDesc = formatLongDescription(movie.description);

    const [popUpShow, setPopUpShow] = useState(false);

    const { removeMovie } = useMovies();

    const showDetails = () => {
        setPopUpShow(false);
        setTimeout(() => {

            setPopUpShow(true);
        }, 20);
    }
    const hideDetails = () => {
        setPopUpShow(false);
    }
    const toEmbedUrl = (url) => {
        const { hostname, pathname, search } = new URL(url);

        if (hostname === "youtu.be") {
            const videoId = pathname.slice(1);
            return `https://www.youtube.com/embed/${videoId}${search}`;
        }

        if (hostname.includes("youtube.com")) {
            if (pathname.startsWith("/embed/")) {
                return url;
            }
            if (pathname === "/watch") {
                const params = new URLSearchParams(search);
                const videoId = params.get("v");
                params.delete("v");
                const rest = params.toString();
                return `https://www.youtube.com/embed/${videoId}${rest ? "?" + rest : ""}`;
            }
        }

        return url; 
    }
    return (
        <>
            <section className={styles.movieCard}>
                <div className={styles.movieCardThumbnailContainer}>
                    <iframe className={styles.thumbnailImage} width="560" height="315" src={toEmbedUrl(movie.videoUrl)} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    
                    <button className={styles.thumbnailCloseBtn} onClick={() => { removeMovie(movie.name) }}>
                        <img src="./IMGS/close.svg" alt="close" />
                    </button>
                </div>
                <div className={styles.movieDetails}>
                    <p className={styles.movieTitle}>{movie.name}</p>
                    <p className={styles.movieDesc}>{formattedDesc}...</p>
                </div>
                <div className={styles.movieBottomDetails}>
                    <div className={styles.movieCardIconContainer}>
                        <img src="./IMGS/clock.svg" alt="clock" />
                        <span>{movie.duration}</span>
                    </div>
                    <img src="./IMGS/dot.svg" alt="dot" />
                    <span>{movie.releaseDate}</span>
                </div>
                <button className={styles.movieDetailsBtn} onClick={showDetails}>View Details</button>
            </section>
            {popUpShow && <DetailsPopup movie={movie} hideDetails={hideDetails} />}
            {popUpShow && <div className={styles.overlay}></div>}

        </>
    )
}
