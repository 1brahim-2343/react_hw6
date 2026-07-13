import React, { useState } from 'react'
import styles from '../shared/style.module.css'
import AlertMessage from '../utils/SuccessMessage';
import { useMovies } from '../Context/MoviesContext';


function stringToDate(stringDate) {
    const date = new Date(stringDate).toDateString().slice(4);
    return date;
}



export default function DetailsPopup({ movie, hideDetails }) {

    const [successMessageVisible, setSuccessMessageVisible] = useState(false);
    const formattedDate = stringToDate(movie.releaseDate);
    const { removeMovie } = useMovies();

    const copyLink = (link) => {
        navigator.clipboard.writeText(link);
        setSuccessMessageVisible(true);
        setTimeout(() => {
            setSuccessMessageVisible(false);
        }, 1800);
    }

    return (
        <section className={styles.popUpContainer}>
            <button className={styles.thumbnailCloseBtn} onClick={hideDetails}>
                <img src="./IMGS/close.svg" alt="close" />
            </button>
            <div className={styles.detailsPopUp}>
                <div className={styles.popUpLeftPart}>
                    <img src={movie.thumbnail} alt={`${movie.name}`} className={styles.popUpImage} />
                    <h3>About this trailer</h3>
                    <p className={styles.popUpDetailsText}>{movie.description}</p>
                    <div className={styles.popUpAdditionalInfoContainer}>
                        <div className={styles.popUpAdditionalInfoSubContainer}>
                            <div className={styles.popUpAdditionalInfo}>
                                <img src="./IMGS/clock.svg" alt="clock" className={styles.popUpAdditionalInfoIcon} />
                                <div>
                                    <p className={styles.popUpAdditionalInfoTitle}>Duration</p>
                                    <p className={styles.popUpAdditionalInfoValue}>{movie.duration}</p>
                                </div>
                            </div>
                            <div className={styles.popUpAdditionalInfo}>
                                <img src="./IMGS/add.svg" alt="add" className={styles.popUpAdditionalInfoIcon} />
                                <div>
                                    <p className={styles.popUpAdditionalInfoTitle}>Added ON</p>
                                    <p className={styles.popUpAdditionalInfoValue}>{formattedDate}</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.popUpAdditionalInfoSubContainer}>
                            <div className={styles.popUpAdditionalInfo}>
                                <img src="./IMGS/date.svg" alt="calendar" className={styles.popUpAdditionalInfoIcon} />
                                <div>
                                    <p className={styles.popUpAdditionalInfoTitle}>Release Date</p>
                                    <p className={styles.popUpAdditionalInfoValue}>{formattedDate}</p>
                                </div>
                            </div>
                            <div className={styles.popUpAdditionalInfo}>
                                <img src="./IMGS/create-outline.svg" alt="create" className={styles.popUpAdditionalInfoIcon} />
                                <div>
                                    <p className={styles.popUpAdditionalInfoTitle}>Last Updated</p>
                                    <p className={styles.popUpAdditionalInfoValue}>{formattedDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.popUpRightPart}>
                    <div className={styles.genrePill}>
                        {movie.genre.map((genre, index) => (
                            <span key={index} className={styles.genreText}>{genre}</span>
                        ))}
                    </div>
                    <p className={styles.popUpMovieName}>{movie.name}</p>
                    <div className={styles.movieRatingContainer}>
                        <img src="./IMGS/star.svg" alt="star" className={styles.ratingIcon} />
                        <span className={styles.movieRating}>{movie.rating}/10</span>
                    </div>
                    <div className={styles.popUpRightTextContainer}>
                        <p className={styles.popUpDescriptionName}>Description</p>
                        <p className={styles.popUpDescriptionText}>{movie.description}</p>
                    </div>
                    <p className={styles.popUpDescriptionName}>Details</p>

                    <div className={styles.popUpRightDetailsContainer}>
                        <div className={styles.popUpRightDetailsElement}>
                            <span className={styles.elementTitle}>Genre</span>
                            <div className={styles.genresList}>
                                {movie.genre.map((genre, index) => (
                                    <span
                                        key={index}
                                        className={`${styles.elementValue} ${styles.elementGenre}`}>{genre}</span>
                                ))}
                            </div>
                        </div>
                        <div className={styles.popUpRightDetailsElement}>
                            <span className={styles.elementTitle}>Director</span>
                            <span className={styles.elementValue}>{movie.director}</span>
                        </div>
                        <div className={styles.popUpRightDetailsElement}>
                            <span className={styles.elementTitle}>Studio</span>
                            <span className={styles.elementValue}>{movie.studio}</span>
                        </div>
                        <div className={styles.popUpRightDetailsElement}>
                            <span className={styles.elementTitle}>Language</span>
                            <span className={styles.elementValue}>{movie.language}</span>
                        </div>
                        <div className={styles.popUpRightDetailsElement}>
                            <span className={styles.elementTitle}>Resolution</span>
                            <p className={styles.elementValue}>{movie.videoResolution}</p>
                        </div>
                    </div>
                    <p className={styles.popUpDescriptionName}>Trailer Link</p>
                    <div className={styles.urlInputContainer}>
                        <input type="text" value={movie.videoUrl} disabled />
                        <img src="./IMGS/copy.svg" alt="copy" className={styles.copyBtn} onClick={() => {
                            copyLink(movie.videoUrl)
                        }} />
                    </div>

                </div>
            </div>
            <div className={styles.popUpControlContainer}>
                <button className={styles.deleteTrailerBtn} onClick={()=>{removeMovie(movie.name)}}>
                    <img src="./IMGS/bin.svg" alt="bin" />
                    Delete Trailer
                </button>
                <button className={styles.closeBtn} onClick={hideDetails}>
                    <img src="./IMGS/close-outlined.svg" alt="clsoe" />
                    Close
                </button>
            </div>
            {successMessageVisible && <AlertMessage message={"Success"} />}

        </section>

    )
}
