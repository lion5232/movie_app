import React from "react";
import PropTypes from "prop-types";
import "./Movie.css";

function Movie({ id, title, summary, poster, release_date, rating, genres }) { // id는 필요 없을 것 같음
  return (
    <div className="movie">
      <img src={poster} alt={title} title={title} style={{ width: '300px', height: 'auto' }} />
      <button> 찜하기 </button>
      <div className="movie__data">
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
  rating: PropTypes.string.isRequired
};

export default Movie;