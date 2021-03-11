import './home.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Movie from "../components/movie.js"

function Home() {
  const [isLoading, setLoad] = useState(true);
  const [movies, setmovies] = useState([]);

  //비동기 처리를 방지하기 위해 await를 넣음
  //axios가 느리기 때문
  
  const getMovies = async () => {
    const {
      data: {
        data : {
          movies: movies
         }
      }
    } = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
    setmovies(movies);
    setLoad(false);
  };

  useEffect(() => {
    if(isLoading !== false){
      getMovies();
      console.log(movies)
    }
    
  });

  return (
    <section className="container">
      {isLoading ? (
      <div className = "loader">
        <span className="loader__text">Loading...</span>
      </div>
      ) : (
        <div className="movies">
          {movies.map(movie => (
            <Movie
              id = {movie.id}
              key = {movie.key}
              year = {movie.year}
              title = {movie.title}
              summary = {movie.summary}
              poster = {movie.medium_cover_image}
              genres = {movie.genres}
            />
          ))};
        </div>
      )}
    </section>
  );
}

export default Home;
