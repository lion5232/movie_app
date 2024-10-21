import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import axios from "axios";
import TvShow from "../components/TvShow"; // TvShow 컴포넌트를 가져옵니다.
import "./TvShowDetail.css"; // CSS 파일 이름도 변경할 수 있습니다.
import defaultImage from '../image/default_image.png';

function TvShowDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [tvShow, setTvShow] = useState(location.state || null);
  const [genresList, setGenresList] = useState([]);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/tv/list?api_key=250604987b9bcb91e2f812b87db35ebf&language=ko`
      );
      setGenresList(response.data.genres);
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchTvShow = async () => {
      if (!tvShow) {
        const tvShowId = location.pathname.split("/tv/")[1];
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${tvShowId}?api_key=250604987b9bcb91e2f812b87db35ebf&language=ko`
        );
        setTvShow(response.data);

        const castResponse = await axios.get(
          `https://api.themoviedb.org/3/tv/${tvShowId}/credits?api_key=250604987b9bcb91e2f812b87db35ebf&language=ko`
        );
        setCast(castResponse.data.cast);
      }
    };
    fetchTvShow();
  }, [location, tvShow]);

  if (!tvShow) {
    return <div>No TV show found</div>;
  }

  const genres = tvShow.genres
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
    <div className="tv-show-detail-container">
      <button className="back-button" onClick={handleGoBack}>
        &#8592; 뒤로 가기
      </button>
      <TvShow
        key={tvShow.id}
        id={tvShow.id}
        name={tvShow.name} // 영화 제목을 TV 쇼 이름으로 변경
        summary={tvShow.overview}
        poster={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
        first_air_date={tvShow.first_air_date} // 방영일
        rating={tvShow.vote_average + "점"}
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

export default TvShowDetail;
