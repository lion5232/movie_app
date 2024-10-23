import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./Movie.css";

function Movie({ id, title, summary, poster, release_date, rating, genres }) {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("user_id");
  const isLoggedIn = !!userId;

  const handleAddToFavorites = () => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      navigate("/movie_app/login");
      return;
    }

    const favoritesFromStorage = JSON.parse(sessionStorage.getItem("favorites")) || {};
    const userFavorites = favoritesFromStorage[userId] || { movies: [] };

    // Ensure movies is always an array
    if (!Array.isArray(userFavorites.movies)) {
      userFavorites.movies = [];
    }

    const isAlreadyFavorite = userFavorites.movies.some((movie) => movie.id === id);
    if (!isAlreadyFavorite) {
      userFavorites.movies.push({
        id,
        title,
        summary,
        poster,
        release_date,
        rating,
      });

      favoritesFromStorage[userId] = userFavorites;
      sessionStorage.setItem("favorites", JSON.stringify(favoritesFromStorage));
      alert(`${title}이(가) 찜 목록에 추가되었습니다.`);
    } else {
      alert(`${title}은(는) 이미 찜 목록에 있습니다.`);
    }
  };

  const handleRemoveFromFavorites = () => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      navigate("/movie_app/login");
      return;
    }

    const favoritesFromStorage = JSON.parse(sessionStorage.getItem("favorites")) || {};
    const userFavorites = favoritesFromStorage[userId] || { movies: [] };

    // Ensure movies is always an array
    if (!Array.isArray(userFavorites.movies)) {
      userFavorites.movies = [];
    }

    const isFavorite = userFavorites.movies.some((movie) => movie.id === id);
    if (isFavorite) {
      const updatedFavorites = userFavorites.movies.filter((movie) => movie.id !== id);
      userFavorites.movies = updatedFavorites;

      favoritesFromStorage[userId] = userFavorites;
      sessionStorage.setItem("favorites", JSON.stringify(favoritesFromStorage));
      alert(`${title}이(가) 찜 목록에서 삭제되었습니다.`);
    } else {
      alert(`${title}은(는) 찜 목록에 저장되지 않았습니다.`);
    }
  };

  return (
    <div className="movie">
      <img
        src={poster}
        alt={title}
        title={title}
        style={{ width: "300px", height: "auto", marginBottom: "-20px" }}
      />
      <br />
      {isLoggedIn ? (
        <>
          <button onClick={handleAddToFavorites}>찜하기</button>
          <button onClick={handleRemoveFromFavorites} style={{ marginLeft: "20px" }}>
            찜취소
          </button>
        </>
      ) : (
        <p>로그인해야 찜할 수 있습니다.</p>
      )}
      <div className="movie__data">
        <br />
        <h3 className="movie__title">{title}</h3>
        <h5 className="movie__release">{release_date}</h5>
        <p className="movie__rating">Rating: {rating}</p>
        <p className="movie__genres">{genres}</p>
        <p className="movie__summary">{summary}</p>
      </div>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  release_date: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
};

export default Movie;
