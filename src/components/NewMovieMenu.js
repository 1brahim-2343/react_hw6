import React, { useState } from 'react'
import styles from '../shared/style.module.css'
import DropdownSelect from './MUI/DropdownSelect'
import { useMovies } from '../Context/MoviesContext';

const today = new Date();
const year = String(today.getFullYear());
const month = String(today.getMonth()).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");




export default function NewMovieMenu({ setIsNewMoviePopUp }) {

  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const [trailerName, setTrailerName] = useState('');
  const [description, setDescription] = useState('');
  const [genres, setGenres] = useState([]);
  const [releaseDate, setReleaseDate] = useState('');
  const [director, setDirector] = useState('');
  const [studio, setStudio] = useState('');
  const [language, setLanguage] = useState('');
  const [country, setCountry] = useState('');
  const [duration, setDuration] = useState('');
  const [rating, setRating] = useState('');
  const [videoLink, setVideoLink] = useState('');

  const [errors, setErrors] = useState({});

  const { addMovie } = useMovies();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };



  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    const formErrors = {};

    if (!trailerName.trim()) {
      formErrors.trailerName = 'Trailer name is required.';
    }

    if (!description.trim()) {
      formErrors.description = 'Description is required.';
    }

    if (!genres || genres.length === 0) {
      formErrors.genre = 'Select at least one genre.';
    }

    if (!releaseDate) {
      formErrors.releaseDate = 'Release date is required.';
    } else {
      const selected = new Date(releaseDate);
      const min = new Date('1940-01-01');
      const max = new Date(`${year}-${month}-${day}`);
      if (selected < min || selected > max) {
        formErrors.releaseDate = 'Release date must be between 1940 and today.';
      }
    }

    if (!director.trim()) {
      formErrors.director = 'Director name is required.';
    }

    if (!studio.trim()) {
      formErrors.studio = 'Studio name is required.';
    }

    if (!language.trim()) {
      formErrors.language = 'Language is required.';
    }

    if (!country.trim()) {
      formErrors.country = 'Country is required.';
    }

    if (!duration.trim()) {
      formErrors.duration = 'Duration is required.';
    } else if (!/^\d{1,2}:\d{2}$/.test(duration.trim())) {
      formErrors.duration = 'Use the format m:ss, e.g. 2:30.';
    } else {
      const [, seconds] = duration.trim().split(':');
      if (Number(seconds) > 59) {
        formErrors.duration = 'Seconds cannot be more than 59.';
      }
    }

    if (!rating.trim()) {
      formErrors.rating = 'Rating is required.';
    } else {
      const ratingNum = Number(rating);
      if (Number.isNaN(ratingNum) || ratingNum < 1 || ratingNum > 10) {
        formErrors.rating = 'Rating must be a number between 1 and 10.';
      }
    }

    if (!videoLink.trim()) {
      formErrors.videoLink = 'Video link is required.';
    } else if (!/^https?:\/\/.+/.test(videoLink.trim())) {
      formErrors.videoLink = 'Enter a valid URL starting with http:// or https://.';
    }

    if (!thumbnailPreview) {
      formErrors.thumbnail = 'Thumbnail image is required.';
    }

    return formErrors;
  };

  const handleSubmit = async (e) => {
    const formErrors = validateForm();
    setErrors(formErrors);
    console.log(formErrors);

    if (Object.keys(formErrors).length === 0) {
      console.log('Form is valid, submitting...');
      const newMovie = {
        name: trailerName,
        trailerTitle: "Official Trailer",
        description: description,
        thumbnail: thumbnailPreview,
        videoUrl: videoLink,
        duration: duration,
        releaseDate: releaseDate,
        genre: genres,
        rating: rating,
        director: director,
        language: language,
        videoResolution: "N/A",
        studio: studio,
      };
      await addMovie(newMovie);
    }
  };

  const closeNewMoviePopUp = () => {
    setIsNewMoviePopUp(false);
  }


  return (
    <section className={styles.newMovieMenuApp}>
      <div className={styles.newMovieTopBar}>
        <button className={styles.newMovieBackBtn} onClick={closeNewMoviePopUp}>
          <img src="./IMGS/arrow-left.svg" alt="left arrow" />
          <span className={styles.informationalText}>Back to Movies</span>
        </button>
      </div>

      <div className={styles.newMovieMainContent}>
        <div className={styles.newMovieHeader}>
          <div className={styles.newMoviePageHeadingContainer}>
            <img src="./IMGS/clapperboard.svg" alt="clapperboard" />
            <h1 className={styles.newMoviePageHeading}>Add new movie</h1>
          </div>
          <p className={styles.informationalText}>
            Add a new trailer and its details to your collection.
          </p>
        </div>

        <div className={styles.newMovieFormContainer}>
          <div className={styles.newMovieFormColumn}>
            <div className={styles.newMovieFormPanel}>

              <p className={styles.newMovieFormPanelTitle}>
                <img src="./IMGS/home-outline.svg" alt="home"
                  className={styles.panelTitleIcons} />
                Basic Information</p>

              <div className={styles.inputFieldContainer}>
                <label htmlFor="trailer_name"
                  className={styles.inputLabel}>
                  Trailer name
                  <span className={styles.requiredAsterisk}> *</span>
                </label>
                <input
                  type="text"
                  name="trailer_name"
                  id="trailer_name"
                  className={styles.inputField}
                  placeholder='Enter trailer name'
                  maxLength={50}
                  value={trailerName}
                  onChange={(e) => setTrailerName(e.target.value)} />
                <span className={`${styles.errorMessage} ${errors.trailerName ? styles.errorVisible : ''}`}>
                  {errors.trailerName}
                </span>
              </div>

              <div className={styles.inputFieldContainer}>
                <label htmlFor="description"
                  className={styles.inputLabel}>
                  Description
                  <span className={styles.requiredAsterisk}> *</span>
                </label>
                <textarea
                  type="text"
                  name="description"
                  id="description"
                  className={`${styles.inputField} ${styles.textAreaField}`}
                  placeholder='Add a short description about this trailer...'
                  maxLength={100}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)} />
                <span className={`${styles.errorMessage} ${errors.description ? styles.errorVisible : ''}`}>
                  {errors.description}
                </span>
              </div>

              <div className={styles.inputFieldsRow}>
                <div className={styles.inputFieldContainer}>
                  <label htmlFor="genres_select"
                    className={styles.inputLabel}>
                    Genre
                    <span className={styles.requiredAsterisk}> *</span>
                  </label>
                  <DropdownSelect value={genres} genres={genres} setGenres={setGenres} />
                  <span className={`${styles.errorMessage} ${errors.genres ? styles.errorVisible : ''}`}>
                    {errors.genres}
                  </span>
                </div>

                <div className={styles.inputFieldContainer}>
                  <label htmlFor="release_date"
                    className={styles.inputLabel}>
                    Release Date
                    <span className={styles.requiredAsterisk}> *</span>
                  </label>
                  <input
                    type="date"
                    name="release_date"
                    id="release_date"
                    className={`${styles.inputField} ${styles.dateInput}`}
                    placeholder='Select release date'
                    min="1940-01-01"
                    max={`${year}-${month}-${day}`}
                    value={releaseDate}
                    onChange={(e) => setReleaseDate(e.target.value)} />
                  <span className={`${styles.errorMessage} ${errors.releaseDate ? styles.errorVisible : ''}`}>
                    {errors.releaseDate}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.newMovieFormPanel}>

              <p className={styles.newMovieFormPanelTitle}>
                <img src="./IMGS/home-outline.svg" alt="home"
                  className={styles.panelTitleIcons} />
                Additional Details</p>

              <div className={styles.inputFieldsRow}>
                <div className={styles.inputFieldContainer}>
                  <label htmlFor="director_name"
                    className={styles.inputLabel}>
                    Director
                    <span className={styles.requiredAsterisk}> *</span>
                  </label>
                  <input
                    type="text"
                    name="director_name"
                    id="director_name"
                    className={styles.inputField}
                    placeholder='Enter director name'
                    maxLength={80}
                    value={director}
                    onChange={(e) => setDirector(e.target.value)} />
                  <span className={`${styles.errorMessage} ${errors.director ? styles.errorVisible : ''}`}>
                    {errors.director}
                  </span>
                </div>
                <div className={styles.inputFieldContainer}>
                  <label htmlFor="studio_name"
                    className={styles.inputLabel}>
                    Studio
                    <span className={styles.requiredAsterisk}> *</span>
                  </label>
                  <input
                    type="text"
                    name="studio_name"
                    id="studio_name"
                    className={styles.inputField}
                    placeholder='Enter studio name'
                    maxLength={50}
                    value={studio}
                    onChange={(e) => setStudio(e.target.value)} />
                  <span className={`${styles.errorMessage} ${errors.studio ? styles.errorVisible : ''}`}>
                    {errors.studio}
                  </span>
                </div>
              </div>

              <div className={styles.inputFieldsRow}>
                <div className={styles.inputFieldContainer}>
                  <label htmlFor="language"
                    className={styles.inputLabel}>
                    Language
                    <span className={styles.requiredAsterisk}> *</span>
                  </label>
                  <input
                    type="text"
                    name="language"
                    id="language"
                    className={styles.inputField}
                    placeholder='Enter language name'
                    maxLength={60}
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)} />
                  <span className={`${styles.errorMessage} ${errors.language ? styles.errorVisible : ''}`}>
                    {errors.language}
                  </span>
                </div>
                <div className={styles.inputFieldContainer}>
                  <label htmlFor="country_name"
                    className={styles.inputLabel}>
                    Country
                    <span className={styles.requiredAsterisk}> *</span>
                  </label>
                  <input
                    type="text"
                    name="country_name"
                    id="country_name"
                    className={styles.inputField}
                    placeholder='Enter country name'
                    maxLength={50}
                    value={country}
                    onChange={(e) => setCountry(e.target.value)} />
                  <span className={`${styles.errorMessage} ${errors.country ? styles.errorVisible : ''}`}>
                    {errors.country}
                  </span>
                </div>
              </div>

              <div className={styles.inputFieldsRow}>
                <div className={styles.inputFieldContainer}>
                  <label htmlFor="duration"
                    className={styles.inputLabel}>
                    Duration
                    <span className={styles.requiredAsterisk}> *</span>
                  </label>
                  <input
                    type="text"
                    name="duration"
                    id="duration"
                    className={`${styles.inputField} ${styles.durationInput}`}
                    placeholder='e.g. 2:30(minutes, seconds)'
                    maxLength={6}
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)} />
                  <span className={`${styles.errorMessage} ${errors.duration ? styles.errorVisible : ''}`}>
                    {errors.duration}
                  </span>
                </div>
                <div className={styles.inputFieldContainer}>
                  <label htmlFor="rating_imdb"
                    className={styles.inputLabel}>
                    Rating(IMDb)
                    <span className={styles.requiredAsterisk}> *</span>
                  </label>
                  <input
                    type="text"
                    name="rating_imdb"
                    id="rating_imdb"
                    className={styles.inputField}
                    placeholder='e.g. 8.7'
                    maxLength={50}
                    value={rating}
                    onChange={(e) => setRating(e.target.value)} />
                  <span className={`${styles.errorMessage} ${errors.rating ? styles.errorVisible : ''}`}>
                    {errors.rating}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.newMovieFormColumn}>
            <div className={styles.newMovieFormPanel}>

              <p className={styles.newMovieFormPanelTitle}>
                <img src="./IMGS/video.svg" alt="video icon"
                  className={styles.panelTitleIcons} />
                Trailer Video</p>

              <div className={styles.inputFieldContainer}>
                <label htmlFor="trailer_link"
                  className={styles.inputLabel}>
                  Video Link
                  <span className={styles.requiredAsterisk}> *</span>
                </label>
                <input
                  type="text"
                  name="trailer_link"
                  id="trailer_link"
                  className={styles.inputField}
                  placeholder='Paste YouTube or video link here'
                  value={videoLink}
                  onChange={(e) => setVideoLink(e.target.value)}
                />
                <span className={`${styles.errorMessage} ${errors.videoLink ? styles.errorVisible : ''}`}>
                  {errors.videoLink}
                </span>
                <span className={styles.informationalText} style={{
                  fontSize: "14px"
                }}>
                  Example: https://www.youtube.com/watch?v=XXXXXXXX
                </span>
              </div>

              <div className={styles.inputFieldContainer}>
                <label htmlFor="videoUpload" className={styles.inputLabel}>
                  Trailer Video
                </label>

                <div className={styles.dropzoneDisabled} aria-disabled="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>
                    <line x1="8" y1="8" x2="16" y2="16"></line>
                    <line x1="16" y1="8" x2="8" y2="16"></line>
                  </svg>
                  <span className={styles.ddTitleDisabled}>Video upload is unavailable</span>
                  <span className={styles.maintenanceBadge}>Under Maintenance</span>
                  <span className={styles.ddSubDisabled}>
                    We're working on this feature — check back soon
                  </span>
                  <input type="file" id="videoUpload" accept="video/mp4,video/webm" disabled hidden />
                </div>
              </div>
            </div>

            <div className={styles.newMovieFormPanel}>

              <p className={styles.newMovieFormPanelTitle}>
                <img src="./IMGS/image.svg" alt="landscape icons"
                  className={styles.panelTitleIcons} />
                Thumbnail Image
                <span className={styles.requiredAsterisk}> *</span>
              </p>

              <div className={styles.gridDropzone}>
                <div className={`${styles.dropzone} ${isDragging ? styles.dragActive : ''}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                  <span className={styles.ddTitle}>Drag & drop image here</span>
                  <span className={styles.ddSub}>or</span>
                  <label className={styles.browseBtn}>
                    Browse Image
                    <input type="file" accept="image/jpeg,image/png" hidden onChange={handleThumbnailChange} />
                  </label>
                </div>

                <div>
                  <div className={styles.previewBox}>
                    {thumbnailPreview ? (
                      <img src={thumbnailPreview} alt="Thumbnail preview" className={styles.previewImg} />
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="6" width="18" height="14" rx="2"></rect>
                          <path d="M7 6l2-3h6l2 3"></path>
                          <polygon points="10 10 15 12.5 10 15"></polygon>
                        </svg>
                        <span className={styles.previewLabel}>No image selected</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <span className={`${styles.errorMessage} ${errors.thumbnail ? styles.errorVisible : ''}`}>
                {errors.thumbnail}
              </span>
            </div>

            <button type="button" className={`${styles.btn} ${styles.cancel}`} onClick={closeNewMoviePopUp}>
              Cancel
            </button>
            <button type="submit" className={`${styles.btn} ${styles.save}`} onClick={handleSubmit}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
              </svg>
              Save Movie
            </button>
          </div>
        </div>
      </div>

    </section>
  )
}