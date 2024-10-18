// GenreTvShows.js
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import MovieLink from "../../../components/MovieLink"; // MovieLink 컴포넌트 가져오기
import "./Home.css";

const GenreTvShows = ({ genreId }) => { // 컴포넌트 이름 변경
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const [tvShows, setTvShows] = useState([]); // TV 쇼 목록 상태
  const [genres, setGenres] = useState([]); // 장르 목록 상태

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/genre/tv/list`,
          {
            params: {
              language: "ko",
              api_key: '250604987b9bcb91e2f812b87db35ebf',
            },
          }
        );
        setGenres(data.genres); // 장르 목록 업데이트
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres(); // 장르 목록 가져오기
  }, []); // 컴포넌트가 마운트될 때만 호출

  useEffect(() => {
    const fetchTvShows = async () => {
      try {
        const { data: { results } } = await axios.get(
          `https://api.themoviedb.org/3/discover/tv`,
          {
            params: {
              with_genres: genreId,
              language: "ko",
              region: "kr",
              page: 1,
              sort_by: "vote_count.desc",
              api_key: '250604987b9bcb91e2f812b87db35ebf',
            },
          }
        );

        setTvShows(results); // TV 쇼 목록 업데이트
      } catch (error) {
        console.error("Error fetching TV shows:", error);
      } finally {
        setIsLoading(false); // 로딩 완료
      }
    };

    fetchTvShows(); // TV 쇼 목록 가져오기
  }, [genreId]); // genreId가 변경될 때마다 호출

  const getGenreNames = (genreIds) => {
    return genreIds.map((id) => {
      const genre = genres.find((g) => g.id === id);
      return genre ? genre.name : '';
    }).join(", "); // 장르 이름을 쉼표로 구분하여 반환
  };

  if (isLoading) {
    return <div className="loader">Loading...</div>; // 로딩 중 표시
  }

  return (
    <section className="container">
      {tvShows.length > 0 ? (
        <div className="movies">
          {tvShows.map((tvShow) => ( // tvShow로 변수 이름 변경
            <MovieLink
              key={tvShow.id}
              id={tvShow.id}
              title={tvShow.name} // 제목을 tvShow.name으로 수정
              summary={tvShow.overview.slice(0, 100)}
              poster={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
              release_date={tvShow.first_air_date} // 첫 방영일로 수정
              rating={`${tvShow.vote_average}점`}
              genres={getGenreNames(tvShow.genre_ids)} // 장르 ID를 장르 이름으로 변환
            />
          ))}
        </div>
      ) : (
        <div>결과가 없습니다.</div> // TV 쇼가 없는 경우
      )}
    </section>
  );
};

GenreTvShows.propTypes = {
  genreId: PropTypes.number.isRequired, // genreId prop 타입 설정
};

export default GenreTvShows;