import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Link 컴포넌트 추가
import "./MyPage.css"; // 스타일 파일을 따로 생성해주면 좋습니다.

const MyPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const userId = sessionStorage.getItem("user_id");
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    // 사용자 ID가 존재하면 로그인 상태를 true로 설정
    if (userId) {
      setIsLogin(true);
      const favoritesFromStorage = JSON.parse(sessionStorage.getItem("favorites")) || [];
      setMovies(favoritesFromStorage.filter(item => item.type === "movie")); // 영화만 필터링
      setTvShows(favoritesFromStorage.filter(item => item.type === "tvShows")); // TV 프로그램만 필터링
    }
  }, [userId]);

  return (
    <div>
      <h1>마이페이지</h1>
      
      <p>{isLogin ? " " : "로그인 후 사용해주세요"}</p>

      {isLogin && (
        <>
        <div>
            <h2>찜한 영화 목록</h2>
            {movies.length > 0 ? (
                <div className="favorites-container">
                {movies.map((movie, index) => (
                    <div key={index} className="movie-item">
                    <Link to={`/movie/${movie.id}`}> {/* 상세 페이지로 이동하는 링크 */}
                    <h3>{movie.title}</h3>
                    </Link> 
                    <img src={movie.poster} alt={movie.title} className="movie-poster" /> 
                    </div>
                ))}
                </div>
            ) : (
                <p>찜한 영화가 없습니다.</p>
            )}
        </div>

        <div>
        <h2>찜한 TV 목록</h2>
            {tvShows.length > 0 ? (
                <div className="favorites-container">
                {tvShows.map((tv, index) => (
                    <div key={index} className="movie-item">
                    <Link to={`/tv/${tv.id}`}> {/* 상세 페이지로 이동하는 링크 */}
                    <h3>{tv.name}</h3>
                    </Link> 
                    <img src={tv.poster} alt={tv.name} className="movie-poster" /> 
                    </div>
                ))}
                </div>
            ) : (
                <p>찜한 TV 프로그램이 없습니다.</p>
            )}
        </div>
          
        </>
      )}
    </div>
  );
};

export default MyPage;
