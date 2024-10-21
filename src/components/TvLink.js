import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./tv.css"; // CSS 파일 이름도 변경할 수 있습니다

// TvShowLink는 TV 쇼 정보를 표시하는 UI를 담당
function TvShowLink({
  id,
  name,
  summary,
  poster,
  first_air_date,
  rating,
  genres,
}) {
  return (
    <div className="tv-show">
      <img
        src={poster}
        alt={name}
        title={name}
        style={{ width: "300px", height: "auto" }}
      />
      <div className="tv-show__data">
        <Link
          to={{
            pathname: `/tv/${id}`,
            state: {
              name,
              summary,
              poster,
              first_air_date,
              rating,
              genres,
            },
          }}
        >
          <h3 className="tv-show__title__link">{name}</h3>
        </Link>
        <h5 className="tv-show__release">{first_air_date}</h5>
        <p className="tv-show__rating">Rating: {rating}</p>
        <p className="tv-show__genres">{genres}</p>
        <p className="tv-show__summary">{summary}...</p>
      </div>
    </div>
  );
}

TvShowLink.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired,
  first_air_date: PropTypes.string.isRequired, // 변경된 프로퍼티
  rating: PropTypes.string.isRequired,
};

export default TvShowLink;
