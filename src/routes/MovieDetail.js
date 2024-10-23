import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import axios from "axios";
import Movie from "../components/Movie";
import "./MovieDetail.css";
import defaultImage from '../image/default_image.png';

function MovieDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(location.state || null);
  const [genresList, setGenresList] = useState([]);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=250604987b9bcb91e2f812b87db35ebf&language=ko`
      );
      setGenresList(response.data.genres);
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!movie) {
        const movieId = location.pathname.split("/movie/")[1];
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=250604987b9bcb91e2f812b87db35ebf&language=ko`
        );
        setMovie(response.data);

        const castResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=250604987b9bcb91e2f812b87db35ebf&language=ko`
        );
        setCast(castResponse.data.cast);
      }
    };
    fetchMovie();
  }, [location, movie]);

  if (!movie) {
    return <div>No movie found</div>;
  }

  const genres = movie.genres
    .map((genre) => {
      const genreObj = genresList.find((g) => g.id === genre.id);
      return genreObj ? genreObj.name : "";
    })
    .filter(Boolean)
    .join(", ");

  const handleGoBack = () => {
    navigate(-1);
  };



  return (
    <div className="movie-detail-container">
      <button className="back-button" onClick={handleGoBack}>
        &#8592; 뒤로 가기
      </button>
      <Movie
        key={movie.id}
        id={movie.id}
        title={movie.title}
        summary={movie.overview}
        poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        release_date={movie.release_date}
        rating={movie.vote_average + "점"}
        genres={genres}
      />

      <div className="cast-container">
        {cast.map((actor) => (
          <div className="cast-member" key={actor.id}>
            <img
              src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : defaultImage}
              className="cast-image"
              alt={actor.name}
            />
            <p>{actor.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieDetail;
