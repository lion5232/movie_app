import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import TvLink from "../../../components/TvLink"; // MovieLink 컴포넌트 가져오기
import "./Home.css";

const GenreTvShows = ({ genreId }) => {
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const [tvShows, setTvShows] = useState([]); // TV 쇼 목록 상태
  const [genres, setGenres] = useState([]); // 장르 목록 상태
  const [page, setPage] = useState(1); // 페이지 상태
  const [hasMore, setHasMore] = useState(true); // 더 가져올 수 있는지 여부
  const observer = useRef(); // Intersection Observer를 위한 ref
  const sectionRef = useRef(null); // 섹션을 위한 ref
  // 장르 목록 가져오기
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

  // TV 쇼 목록 가져오기
  const fetchTvShows = async () => {
    
    if (!hasMore) return; // 더 이상 가져올 TV 쇼가 없으면 종료

    setIsLoading(true); // 로딩 시작
    try {
      const { data: { results, total_pages } } = await axios.get(
        `https://api.themoviedb.org/3/discover/tv`,
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

      setTvShows((prevTvShows) => [
        ...prevTvShows,
        ...results.filter(result => !prevTvShows.some(prev => prev.id === result.id)),
      ]); // 중복된 TV 쇼 제거 후 업데이트

      setHasMore(page < total_pages); // 다음 페이지가 있는지 확인
    } catch (error) {
      console.error("Error fetching TV shows:", error);
    } finally {
      setIsLoading(false); // 로딩 완료
    }
  };

  // 장르 이름 가져오기
  const getGenreNames = (genreIds) => {
    return genreIds.map((id) => {
      const genre = genres.find((g) => g.id === id);
      return genre ? genre.name : '';
    }).join(", "); // 장르 이름을 쉼표로 구분하여 반환
  };

  // Intersection Observer 설정
  const lastTvShowRef = useRef();
  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect(); // 기존 옵저버를 해제
    }

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !isLoading) {
        setPage(prevPage => prevPage + 1); // 페이지 증가
      }
    });

    if (lastTvShowRef.current) {
      observer.current.observe(lastTvShowRef.current); // 마지막 TV 쇼 요소 감지
    }
  }, [hasMore, isLoading]);


  
  // 1.컴포넌트가 마운트될 때 상태 초기화
  useEffect(() => {
    
    setTvShows([]); // TV 쇼 목록 초기화
    setPage(1); // 페이지를 1로 리셋
    setHasMore(true); // 더 가져올 수 있는 TV 쇼가 있다고 설정
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" }); // 부드럽게 스크롤
    }
    
    //fetchTvShows(); // 초기 데이터 로드
  }, [genreId]);

  //2. 페이지가 변경될 때 TV 쇼 목록 불러오기
  useEffect(() => {
    
    fetchTvShows(); // TV 쇼 목록 가져오기
  }, [page]); // 페이지가 변경될 때마다 호출

  // 3.genreId 변경 후 TV 쇼 목록 불러오기
  useEffect(() => {
     
    if (page === 1) {
      
      fetchTvShows(); // genreId 변경 후 처음 데이터 로드
    }
  }, [genreId]);

  

  if (isLoading && page === 1) {
    return <div className="loader">Loading...</div>; // 처음 로딩 중 표시
  }

  return (
    <section ref={sectionRef} className="container">
      {tvShows.length > 0 ? (
        <div className="tv-shows">
          {tvShows.map((tvShow, index) => {
            if (tvShows.length === index + 1) {
              return (
                <div ref={lastTvShowRef} key={tvShow.id}>
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
              );
            }
            return (
              <TvLink
                key={tvShow.id}
                id={tvShow.id}
                name={tvShow.name}
                summary={tvShow.overview.slice(0, 100)}
                poster={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                release_date={tvShow.first_air_date}
                rating={`${tvShow.vote_average}점`}
                genres={getGenreNames(tvShow.genre_ids)}
              />
            );
          })}
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
