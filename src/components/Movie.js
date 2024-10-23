import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom"; // useNavigate 임포트
import "./Movie.css";

function Movie({ id, title, summary, poster, release_date, rating, genres }) {
  // id는 필요 없을 것 같음
  const navigate = useNavigate(); // useNavigate 훅 사용
  const isLoggedIn = !!sessionStorage.getItem("user_id"); // 로그인 상태 확인
  //getItem("user_id") : user_id라는 키에 저장된 값을 가져옵니다. 없으면 null 반환
  /**!! (Double Negation) : 자바스크립트에서 boolean으로 변환하는 방법으로
   * 첫번째 !는 not연산자으로 결과가 null이면 !null이 true가 되고 값이 있으면 !는 false가 됨.
   * 두번째 !는 그결과를 반전시킨다. 따라서 user_id가 존재하면 true, 없으면 false가 됨.
   * 즉, 사용자가 로그인하면 "user_id"가 세션 스토리지에 저장되고, isLoggendIn은 true가 됨
   * 로그인 하지 않으면 false가 됨.
  */

  const handleAddToFavorites = () => {

    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      navigate("/movie_app/login"); // 로그인 페이지로 이동
      return;
    }

    const favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];
    // 중복된 영화를 추가하지 않도록 확인 (조건은 id가 같은지 그리고 타입이 movie인지)
    const isAlreadyFavorite = favorites.some(
      (movie) => movie.id === id && movie.type === "movie"
    );
    if (!isAlreadyFavorite) {
      favorites.push({
        id,
        title,
        summary,
        poster,
        release_date,
        rating,
        type: "movie",
      });
      sessionStorage.setItem("favorites", JSON.stringify(favorites));
      alert(`${title}이(가) 찜 목록에 추가되었습니다.`);
    } else {
      alert(`${title}은(는) 이미 찜 목록에 있습니다.`);
    }
  };

  const handleRemoveFromFavorites = () => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      navigate("/movie_app/login"); // 로그인 페이지로 이동
      return;
    }

    const favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];
    // 영화가 찜 목록에 있는지 확인
    const isFavorite = favorites.some(
      (movie) => movie.id === id && movie.type === "movie"
    );
    if (isFavorite) {
      const updatedFavorites = favorites.filter((movie) => movie.id !== id);
      sessionStorage.setItem("favorites", JSON.stringify(updatedFavorites));
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
        style={{ width: "300px", height: "auto", marginBottom: "-20px"   }}
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
      <div className="movie__data">
        <br />
        <h3 className="movie__title">{title}</h3>
        <h5 className="movie__release">{release_date}</h5>
        <p className="movie__rating">Rating: {rating}</p>
        <p className="movie__genres"> {genres} </p>
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
