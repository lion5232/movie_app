import React, { useEffect, useState } from "react";
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

  // 장르 목록 가져오기
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list`,
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
  useEffect(() => {
    const fetchMovies = async () => {
      if (!hasMore) return; // 더 이상 가져올 영화가 없으면 종료

      setIsLoading(true);
      try {
        const { data: { results, total_pages } } = await axios.get(
          `https://api.themoviedb.org/3/discover/movie`,
          {
            params: {
              with_genres: genreId,
              language: "ko",
              region: "kr",
              api_key: '250604987b9bcb91e2f812b87db35ebf',
              sort_by: "vote_count.desc",
              page,
            },
          }
        );

        setMovies((prevMovies) => {
          const newMovies = results.filter(result => !prevMovies.some(prev => prev.id === result.id));
          return [...prevMovies, ...newMovies];
        });

        setHasMore(page < total_pages); // 다음 페이지가 있는지 확인
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [genreId, page]);

  // 장르 이름 가져오기
  const getGenreNames = (genreIds) => {
    return genreIds.map((id) => {
      const genre = genres.find((g) => g.id === id);
      return genre ? genre.name : '';
    }).join(", ");
  };

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.body.offsetHeight;

    // 페이지의 끝에 도달했을 때 다음 페이지 로드
    if (scrollPosition >= documentHeight - 200 && hasMore && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore, isLoading]);

  // genreId 변경 시 영화 목록 초기화 및 페이지 리셋
  useEffect(() => {
    // 장르 변경 시 상태 초기화
    setMovies([]); // 영화 목록 초기화
    setPage(1); // 페이지를 1로 리셋
    setHasMore(true); // 더 가져올 수 있는 영화가 있다고 설정
    window.scrollTo(0, 0); // 스크롤을 최상단으로 이동

    // API에서 새로운 영화 목록을 즉시 불러오기
    fetchMovies(); // 새로운 장르에 맞는 영화 목록을 불러옴
  }, [genreId]);

  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      const { data: { results, total_pages } } = await axios.get(
        `https://api.themoviedb.org/3/discover/movie`,
        {
          params: {
            with_genres: genreId,
            language: "ko",
            region: "kr",
            api_key: '250604987b9bcb91e2f812b87db35ebf',
            sort_by: "vote_count.desc",
            page: 1, // 항상 페이지 1로 설정
          },
        }
      );

      setMovies(results); // 새 영화 목록 설정
      setHasMore(1 < total_pages); // 다음 페이지가 있는지 확인
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && page === 1) {
    return <div className="loader">Loading...</div>; // 처음 로딩 중 표시
  }

  return (
    <section className="container">
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
