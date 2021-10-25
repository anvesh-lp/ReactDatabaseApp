import React,{useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies,setMovies]=useState([])
  
  async function triggeringFucniton(){
    const response=await fetch("http://swapi.dev/api/films/");
    const  data= await response.json();

    const tranforemddata=data.results.map((moviesData)=>{
      return {
        id:moviesData.episode_id,
        title:moviesData.title,
        openingText:moviesData.opening_crawl,
        releaseDate:moviesData.release_date,
      };
    });
    setMovies(tranforemddata)
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={triggeringFucniton}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
