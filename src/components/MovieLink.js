import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./Movie.css";
//MovieLink는 영화 정보를 표시하는 UI를 담당
function MovieLink({
  id,
  title,
  summary,
  poster,
  release_date,
  rating,
  genres,
}) {
  //HTML class 속성 수정: JSX에서 class는 예약어이므로 className으로 수정했습니다
  return (
    <div className="movie">
      <img
        src={poster}
        alt={title}
        title={title}
        style={{ width: "300px", height: "auto" }}
      />
      <div className="movie__data">
        <Link
          to={{
            pathname: `/movie/${id}`,
            state: {
              title,
              summary,
              poster,
              release_date,
              rating,
              genres,
            },
          }}
        >
          <h3 className="movie__title__link">{title}</h3>
        </Link>
        <h5 className="movie__release">{release_date}</h5>
        <p className="movie__rating">Rating: {rating}</p>
        <p className="movie__genres"> {genres} </p>
        <p className="movie__summary">{summary}...</p>
      </div>
    </div>
  );
}

MovieLink.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  release_date: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
};

export default MovieLink;
