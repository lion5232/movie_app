import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom"; 
import "./TvShow.css";

function TvShow({ id, name, summary, poster, first_air_date, rating, genres }) {
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
    const userFavorites = favoritesFromStorage[userId] || { tvShows: [] };

    // Ensure tvShows is always defined as an array
    userFavorites.tvShows = userFavorites.tvShows || [];

    const isAlreadyFavorite = userFavorites.tvShows.some((tv) => tv.id === id);
    if (!isAlreadyFavorite) {
      userFavorites.tvShows.push({
        id,
        name,
        summary,
        poster,
        first_air_date,
        rating,
        type: "tvShows",
      });

      // 사용자별 찜 목록 업데이트
      favoritesFromStorage[userId] = userFavorites;
      sessionStorage.setItem("favorites", JSON.stringify(favoritesFromStorage));
      alert(`${name}이(가) 찜 목록에 추가되었습니다.`);
    } else {
      alert(`${name}은(는) 이미 찜 목록에 있습니다.`);
    }
  };

  const handleRemoveFromFavorites = () => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      navigate("/movie_app/login");
      return;
    }

    const favoritesFromStorage = JSON.parse(sessionStorage.getItem("favorites")) || {};
    const userFavorites = favoritesFromStorage[userId] || { tvShows: [] };

    // Ensure tvShows is always defined as an array
    userFavorites.tvShows = userFavorites.tvShows || [];

    const isFavorite = userFavorites.tvShows.some((tv) => tv.id === id);
    if (isFavorite) {
      const updatedFavorites = userFavorites.tvShows.filter((tv) => tv.id !== id);
      userFavorites.tvShows = updatedFavorites;

      // 사용자별 찜 목록 업데이트
      favoritesFromStorage[userId] = userFavorites;
      sessionStorage.setItem("favorites", JSON.stringify(favoritesFromStorage));
      alert(`${name}이(가) 찜 목록에서 삭제되었습니다.`);
    } else {
      alert(`${name}은(는) 찜 목록에 저장되지 않았습니다.`);
    }
  };

  return (
    <div className="tv-show">
      <img
        src={poster}
        alt={name}
        title={name}
        style={{ width: "300px", height: "auto", marginBottom: "-20px" }}
      />
      <br />
      {isLoggedIn ? (
        <>
          <button onClick={handleAddToFavorites}>찜하기</button>
          <button
            onClick={handleRemoveFromFavorites}
            style={{ marginLeft: "20px" }}
          >
            찜취소
          </button>
        </>
      ) : (
        <p>로그인해야 찜할 수 있습니다.</p>
      )}
      <div className="tv-show__data">
        <h3 className="tv-show__title">{name}</h3>
        <h5 className="tv-show__release">{first_air_date}</h5>
        <p className="tv-show__rating">Rating: {rating}</p>
        <p className="tv-show__genres">{genres}</p>
        <p className="tv-show__summary">{summary}</p>
      </div>
    </div>
  );
}

TvShow.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  first_air_date: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
};

export default TvShow;
