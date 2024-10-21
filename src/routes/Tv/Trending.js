import React, { useState, useEffect } from "react"; //React 및 필요한 Hooks인 useEffect와 useState를 임포트
import axios from "axios";
import TvLink from "../../components/TvLink"; // MovieLink를 TvLink로 변경
import "./Home.css";

// Home은 데이터 fetching 및 상태 관리를 담당
// 여기는 메인 홈페이지 입니다. 인기 있는 TV 쇼 목록을 보여 줍니다.
const Home = () => {
  // Home 이라는 이름의 함수형 컴포넌트를 정의
  const [isLoading, setIsLoading] = useState(true); // isLoading 상태를 초기값 true로 설정하며, 데이터 로딩 여부를 관리
  const [tvShows, setTvShows] = useState([]); // movies 상태를 초기값으로 빈 배열을 설정하여 TV 쇼 목록을 저장
  const [genres, setGenres] = useState({}); // genres 상태를 초기값으로 빈 객체를 설정하여 장르 정보를 저장

  const getGenres = async () => {
    // 비동기 함수 getGenres를 정의하여 API로부터 TV 장르 목록을 가져옴
    const { 
      data: { genres }, 
    } = await axios.get(
      // API 요청을 통해 장르 데이터(promise 객체)를 가져와 genres 변수에 저장
      "https://api.themoviedb.org/3/genre/tv/list?api_key=250604987b9bcb91e2f812b87db35ebf&language=ko"
    );

    const genreMap = {}; // 장르 ID와 이름의 매핑을 저장할 빈 객체를 초기화
    genres.forEach((genre) => {
      // 각 장르를 반복하면서 genreMap에 ID와 이름을 추가
      genreMap[genre.id] = genre.name;
    });
    setGenres(genreMap); // genreMap을 genres 상태에 저장하여 컴포넌트의 상태를 업데이트
  };

  const getTvShows = async () => {
    // 장르가 준비되었는지 확인 추가
    if (Object.keys(genres).length === 0) {
      await getGenres(); // 장르를 먼저 가져옴
    }
    // 비동기 함수 getTvShows를 정의하여 인기 TV 쇼를 API로부터 가져옴
    const {
      data: { results },
    } = await axios.get(
      // API 요청을 통해 인기 TV 쇼 목록을 가져와 results 변수에 저장
      "https://api.themoviedb.org/3/trending/tv/day?api_key=250604987b9bcb91e2f812b87db35ebf&language=ko&region=ko"
    );

    const tvShowsWithGenres = results.map((show) => ({ // 각 TV 쇼 객체에 장르 이름을 추가하여 새로운 배열 tvShowsWithGenres를 만들었음
      ...show,
      genres: show.genre_ids.map((id) => genres[id] || id).join(", "), // 장르 ID를 장르 이름으로 변환
    }));

    setTvShows(tvShowsWithGenres); // 업데이트된 TV 쇼 목록을 tvShows 상태에 저장
    setIsLoading(false); // 데이터 로딩이 완료되었으므로 isLoading을 false로 업데이트
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때(시작) getGenres와 getTvShows를 호출하여 데이터를 가져옴
    const fetchData = async () => {
      await getGenres();
      await getTvShows();
    };
    fetchData(); // 컴포넌트가 마운트될 때 fetchData를 호출하여 데이터를 가져옴
  }, [genres]); // 컴포넌트가 처음 마운트될 때만 실행 & genres가 변경될 때마다 실행

  return (
    // JSX를 반환하여 UI를 구성
    <section className="container">
      {isLoading ? ( // isLoading 상태에 따라 로딩 중이면 로딩 메시지를, 그렇지 않으면 TV 쇼 목록을 표시
        <div className="loader">
          <span className="loader_text">Loading...</span>
        </div>
      ) : (
        <div className="tv-shows"> {/* 클래스 이름을 movies에서 tv-shows로 변경 */}
          {tvShows.map((show) => ( // tvShows 배열을 반복하여 각 TV 쇼에 대한 TvLink 컴포넌트를 생성
            <TvLink
              key={show.id}
              id={show.id}
              name={show.name} // title을 name으로 변경
              summary={show.overview.slice(0, 100)}
              poster={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
              first_air_date={show.first_air_date} // release_date를 first_air_date로 변경
              rating={show.vote_average + "점"}
              genres={show.genres}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Home;
