import axios from "axios";

const url = "http://localhost:3000/movies";


export const movieApi = {
    getAll: async () => {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            alert("ERROR getting movies from API");
        }
    },
    removeByName: async (movie) => {
        try {
            console.log(movie.id);
            await axios.delete(`${url}/${movie.id}`);
        } catch (error) {
            alert("Movie remove error")
        }
    },
    addMovie: async (movie) => {
        try {
            const response = await axios.post(url, movie);
            return response.data;
        }
        catch (error) {
            alert("Movie add error")
        }
    }
}