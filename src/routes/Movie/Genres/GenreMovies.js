import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import MovieLink from "../../../components/MovieLink"; // MovieLink 컴포넌트 가져오기
import "./Home.css";

const GenreMovies = ({ genreId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const sectionRef = useRef(null);
  const isFirstLoad = useRef(true); // 첫 페이지 로딩을 추적하기 위한 ref

  // 장르 목록 가져오기
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const { data } = await axios.get(
          "https://api.themoviedb.org/3/genre/movie/list",
          {
            params: {
              language: "ko",
              api_key: '250604987b9bcb91e2f812b87db35ebf',
            },
          }
        );
        setGenres(data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  // 영화 목록 가져오기
  const fetchMovies = async (newPage = page) => {
    if (!hasMore) return; // 더 이상 가져올 영화가 없으면 종료

    setIsLoading(true);
    try {
      const { data: { results, total_pages } } = await axios.get(
        "https://api.themoviedb.org/3/discover/movie",
        {
          params: {
            with_genres: genreId,
            language: "ko",
            region: "kr",
            api_key: '250604987b9bcb91e2f812b87db35ebf',
            sort_by: "vote_count.desc",
            page: newPage,
          },
        }
      );

      setMovies((prevMovies) => [
        ...prevMovies,
        ...results.filter(result => !prevMovies.some(prev => prev.id === result.id)),
      ]);

      setHasMore(newPage < total_pages);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsLoading(false);
      if (newPage === 1) isFirstLoad.current = false; // 첫 페이지 로딩 완료
    }
  };

  // 장르 이름 가져오기
  const getGenreNames = (genreIds) => {
    return genreIds.map((id) => {
      const genre = genres.find((g) => g.id === id);
      return genre ? genre.name : '';
    }).join(", ");
  };

  // 장르가 변경되면 첫 페이지로 초기화하고 첫 페이지만 불러옴
  useEffect(() => {
    setMovies([]); // 영화 목록 초기화
    setPage(1); // 페이지를 1로 리셋
    setHasMore(true); // 추가 페이지 로딩 가능 상태 초기화
    isFirstLoad.current = true; // 첫 페이지 로딩 상태 초기화
    sectionRef.current?.scrollIntoView({ behavior: "smooth" }); // 스크롤을 최상단으로

    // 첫 페이지만 로딩
    fetchMovies(1); // 첫 페이지를 불러옴
  }, [genreId]);

  // 페이지 변경에 따른 영화 목록 불러오기
  useEffect(() => {
    if (page > 1) {
      fetchMovies(page);
    }
  }, [page]);

  const handleLoadMore = () => {
    if (hasMore && !isLoading) {
      setPage((prevPage) => prevPage + 1); // 페이지 번호 증가
    }
  };

  if (isLoading && page === 1) {
    return <div className="loader">Loading...</div>; // 처음 로딩 중 표시
  }

  return (
    <section ref={sectionRef} className="container">
      {movies.length > 0 ? (
        <div className="movies">
          {movies.map((movie) => (
            <MovieLink
              key={movie.id} // 고유 ID 사용
              id={movie.id}
              title={movie.title}
              summary={movie.overview.slice(0, 100)}
              poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              release_date={movie.release_date}
              rating={`${movie.vote_average}점`}
              genres={getGenreNames(movie.genre_ids)}
            />
          ))}
          {/** 버튼 */}
          {hasMore && (
            <div className="load-more-container">
              <button onClick={handleLoadMore} className="load-more">
                더보기
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>해당 장르의 영화가 없습니다.</div> // 영화가 없을 때 메시지
      )}
    </section>
  );
};

GenreMovies.propTypes = {
  genreId: PropTypes.number.isRequired,
};

export default GenreMovies;
