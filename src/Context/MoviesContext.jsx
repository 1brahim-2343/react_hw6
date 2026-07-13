import { createContext, useContext, useEffect, useState } from "react";
import { movieApi } from "../API/movieApi";

const MoviesContext = createContext();

export default function MoviesProvider({ children }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await movieApi.getAll();
      setMovies(data);
    };
    fetchMovies();
  }, []);

  const  addMovie = async (movie) => {
    console.log(movies);
    const alreadyExists = movies.some((m) => m.name === movie.name);

    console.log("Already " + alreadyExists);

    if (alreadyExists) {
      alert(`Movie ${movie.name} already exists`);
      return;
    }

    const newMovie = {
      name: movie.name,
      trailerTitle: movie.trailerTitle,
      description: movie.description,
      thumbnail: movie.thumbnail,
      videoUrl: movie.videoUrl,
      duration: movie.duration,
      releaseDate: movie.releaseDate,
      genre: movie.genre,
      rating: movie.rating,
      director: movie.director,
      language: movie.language,
      videoResolution: movie.videoResolution,
      studio: movie.studio,
    };
    const saved = await movieApi.addMovie(newMovie);
    setMovies((prev) => [...prev, saved]);
    alert("Success");
  };

  const removeMovie = (name) => {
    console.log(movies);

    setMovies(
      movies.filter((movie) => {
        console.log(movie.name + "VS" + name);
        return movie.name !== name;
      }),
    );
    const myMovie = movies.find((m) => m.name === name);
    console.log("Movie to delete" + myMovie.name);
    movieApi.removeByName(myMovie);
  };

  return (
    <MoviesContext.Provider
      value={{
        movies,
        addMovie,
        removeMovie,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}

export function useMovies() {
  return useContext(MoviesContext);
}
