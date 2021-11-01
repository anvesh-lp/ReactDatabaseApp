import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from "./components/AddMovie";

function App() {

    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)
    
    function addMovieHandler(movie){
        console.log(movie);
    }

    async function triggeringFucniton() {

        try {
            const response = await fetch("https://react-database-16425-default-rtdb.firebaseio.com/movies.json");
            if (!response.ok){
                throw new Error("Invalid error")
            }
            const data = await response.json();

            const tranforemddata = data.results.map((moviesData) => {
                return {
                    id: moviesData.episode_id,
                    title: moviesData.title,
                    openingText: moviesData.opening_crawl,
                    releaseDate: moviesData.release_date,
                };
            });
            setMovies(tranforemddata)
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <React.Fragment>
            <section>
                <AddMovie onAddMovie={addMovieHandler}/>
            </section>
            <section>
                <button onClick={triggeringFucniton}>Fetch Movies</button>
            </section>
            <section>
                {!error && <MoviesList movies={movies}/>}
                {error && <p>Cant load movies,invalid error</p>}
            </section>
        </React.Fragment>
    );
}

export default App;
