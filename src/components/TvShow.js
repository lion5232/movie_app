import React from "react";
import PropTypes from "prop-types";
import "./TvShow.css"; // CSS 파일 이름도 변경할 수 있습니다

function TvShow({ id, name, summary, poster, first_air_date, rating, genres }) { // id는 필요 없을 것 같음
  return (
    <div className="tv-show">
      <img src={poster} alt={name} title={name} style={{ width: '300px', height: 'auto' }} />
      <button> 찜하기 </button>
      <div> 
        ddddssssssssssssssssssssssssssssssssssss
      </div>
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
  rating: PropTypes.string.isRequired
};

export default TvShow;
