import React from "react";
import PropTypes from "prop-types";
import "./Movie.css";

function Movie({title, summary, poster, release_date, rating, genres}) { //HTML class 속성 수정: JSX에서 class는 예약어이므로 className으로 수정했습니다
    return(
    <div className="movie">
        <img src={poster} alt={title} title={title} style={{ width: '300px', height: 'auto' }} />
        <div className="movie__data">
          <h3 className="movie__title">{title}</h3>
          <h5 className="movie__release">{release_date}</h5>
          <p className="movie__rating">Rating: {rating}</p>
          <p className="movie__genres"> {genres} </p>
          <p className="movie__summary">{summary.slice(0,140)}...</p>
        </div>
    </div>
    );
}

Movie.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    release_date:PropTypes.string.isRequired,
    rating:PropTypes.string.isRequired
};

export default Movie;