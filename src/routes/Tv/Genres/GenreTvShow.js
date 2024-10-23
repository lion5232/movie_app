import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import TvLink from "../../../components/TvLink";
import "./Home.css";

const GenreTvShows = ({ genreId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [tvShows, setTvShows] = useState([]);
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
          "https://api.themoviedb.org/3/genre/tv/list",
          {
            params: {
              language: "ko",
              api_key: "250604987b9bcb91e2f812b87db35ebf",
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

  // TV 쇼 목록 가져오기
  const fetchTvShows = async (newPage = page) => {
    if (!hasMore) return; // 더 가져올 TV 쇼가 없으면 종료

    setIsLoading(true);
    try {
      const {
        data: { results, total_pages },
      } = await axios.get("https://api.themoviedb.org/3/discover/tv", {
        params: {
          with_genres: genreId,
          language: "ko",
          region: "kr",
          api_key: "250604987b9bcb91e2f812b87db35ebf",
          sort_by: "vote_count.desc",
          page: newPage,
        },
      });

      setTvShows((prev) => [
        ...prev,
        ...results.filter(
          (result) => !prev.some((prev) => prev.id === result.id)
        ),
      ]);

      setHasMore(newPage < total_pages);
    } catch (error) {
      console.error("Error fetching TV shows:", error);
    } finally {
      setIsLoading(false);
      if (newPage === 1) isFirstLoad.current = false; // 첫 페이지 로딩 완료
    }
  };

  const getGenreNames = (genreIds) =>
    genreIds
      .map((id) => genres.find((g) => g.id === id)?.name || "")
      .join(", ");

  // 장르가 변경되면 첫 페이지로 초기화하고 첫 페이지만 불러옴
  useEffect(() => {
    setTvShows([]); // TV 쇼 목록 초기화
    setPage(1); // 페이지를 1로 리셋
    setHasMore(true); // 추가 페이지 로딩 가능 상태 초기화
    isFirstLoad.current = true; // 첫 페이지 로딩 상태 초기화
    sectionRef.current?.scrollIntoView({ behavior: "smooth" }); // 스크롤을 최상단으로

    // 첫 페이지만 로딩
    fetchTvShows(1); // 첫 페이지를 불러옴
  }, [genreId]);

  // 페이지 변경에 따른 TV 쇼 목록 불러오기
  useEffect(() => {
    if (page > 1) {
      fetchTvShows(page);
    }
  }, [page]);

  const handleLoadMore = () => {
    if (hasMore && !isLoading) {
      setPage((prev) => prev + 1); // 페이지 번호 증가
    }
  };

  if (isLoading && page === 1) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <section ref={sectionRef} className="container">
      {tvShows.length > 0 ? (
        <div className="tv-shows">
          {tvShows.map((tvShow) => (
            <div key={tvShow.id}>
              <TvLink
                id={tvShow.id}
                name={tvShow.name}
                summary={tvShow.overview.slice(0, 100)}
                poster={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                release_date={tvShow.first_air_date}
                rating={`${tvShow.vote_average}점`}
                genres={getGenreNames(tvShow.genre_ids)}
              />
            </div>
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
        <div>결과가 없습니다.</div>
      )}
    </section>
  );
};

GenreTvShows.propTypes = {
  genreId: PropTypes.number.isRequired,
};

export default GenreTvShows;
