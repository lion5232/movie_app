import React from "react";
import PropTypes from "prop-types";
import "./TvShow.css"; // CSS 파일 이름도 변경할 수 있습니다

function TvShow({ id, name, summary, poster, first_air_date, rating, genres }) {
  // id는 필요 없을 것 같음
  const handleAddToFavorites = () => {
    const favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];
    // 중복된 영화를 추가하지 않도록 확인 (조건은 id가 같은지 그리고 타입이 TvShows인지)
    const isAlreadyFavorite = favorites.some(
      (tvShows) => tvShows.id === id && tvShows.type === "tvShows"
    );
    if (!isAlreadyFavorite) {
      favorites.push({
        id,
        name,
        summary,
        poster,
        first_air_date,
        rating,
        type: "tvShows",
      });
      sessionStorage.setItem("favorites", JSON.stringify(favorites));
      alert(`${name}이(가) 찜 목록에 추가되었습니다.`);
    } else {
      alert(`${name}은(는) 이미 찜 목록에 있습니다.`);
    }
  };

  const handleRemoveFromFavorites = () => {
    const favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];
    // TV 프로그램이 찜 목록에 있는지 확인
    const isFavorite = favorites.some(
      (tvShows) => tvShows.id === id && tvShows.type === "tvShows"
    );
    if (isFavorite) {
      const updatedFavorites = favorites.filter((tv) => tv.name !== name);
      sessionStorage.setItem("favorites", JSON.stringify(updatedFavorites));
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
        style={{ width: "300px", height: "auto" }}
      />
      <button onClick={handleAddToFavorites}>찜하기</button>
      <button
        onClick={handleRemoveFromFavorites}
        style={{ marginLeft: "20px" }}
      >
        찜취소
      </button>

      <div className="tv-show__data">
        <h3 className="tv-show__title">{name}</h3>
        <h5 className="tv-show__release">{first_air_date}</h5>
        <p className="tv-show__rating">Rating: {rating}</p>
        <p className="tv-show__genres"> {genres} </p>
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
  first_air_date: PropTypes.string.isRequired, // 변경된 프로퍼티
  rating: PropTypes.string.isRequired,
};

export default TvShow;
