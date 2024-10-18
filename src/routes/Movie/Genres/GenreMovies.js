import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import MovieLink from "../../../components/MovieLink"; // MovieLink 컴포넌트 가져오기
import "./Home.css";

const GenreMovies = ({ genreId }) => { // genreId로 변경
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const [movies, setMovies] = useState([]); // 영화 목록 상태
  const [genres, setGenres] = useState([]); // 장르 목록 상태

  // 장르 목록 fetch
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
        setGenres(data.genres); // 장르 목록 업데이트
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres(); // 장르 목록 가져오기
  }, []); // 컴포넌트가 마운트될 때만 호출

  // 영화 목록 fetch
  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true); // 로딩 시작
      try {
        const { data: { results } } = await axios.get(
          `https://api.themoviedb.org/3/discover/movie`,
          {
            params: {
              with_genres: genreId, // genreId를 사용
              language: "ko",
              api_key: '250604987b9bcb91e2f812b87db35ebf',
            },
          }
        );

        setMovies(results); // 영화 목록 업데이트
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setIsLoading(false); // 로딩 완료
      }
    };

    fetchMovies(); // 영화 목록 가져오기
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
      {movies.length > 0 ? (
        <div className="movies">
          {movies.map((movie) => ( // movie로 변수 이름 수정
            <MovieLink
              key={movie.id}
              id={movie.id}
              title={movie.title} // 제목을 movie.title로 수정
              summary={movie.overview.slice(0, 100)}
              poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              release_date={movie.release_date}
              rating={`${movie.vote_average}점`}
              genres={getGenreNames(movie.genre_ids)} // 장르 ID를 장르 이름으로 변환
            />
          ))}
        </div>
      ) : (
        <div>해당 장르의 영화가 없습니다.</div> // 영화가 없는 경우
      )}
    </section>
  );
};

GenreMovies.propTypes = {
  genre: PropTypes.number.isRequired, // genre prop 타입 설정
};

export default GenreMovies;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import MovieLink from '../../../components/MovieLink';
// import "./Home.css";

// const GenreMovies = ({ genre }) => {
//   const [movies, setMovies] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [genres, setGenres] = useState([]);

//   // 장르 목록 fetch
//   useEffect(() => {
//     const fetchGenres = async () => {
//       try {
//         const { data } = await axios.get(`https://api.themoviedb.org/3/genre/movie/list`, {
//           params: {
//             language: "ko",
//             api_key: '250604987b9bcb91e2f812b87db35ebf',
//           },
//         });
//         setGenres(data.genres);
//       } catch (error) {
//         console.error('Error fetching genres:', error);
//       }
//     };

//     fetchGenres();
//   }, []);

//   // 영화 목록 fetch
//   useEffect(() => {
//     const fetchMovies = async () => {
//       setIsLoading(true);
//       try {
//         const { data: { results } } = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
//           params: {
//             with_genres: genre,
//             api_key: '250604987b9bcb91e2f812b87db35ebf',
//             language: 'ko'
//           },
//         });
//         setMovies(results);
//       } catch (error) {
//         console.error('Error fetching movies:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchMovies();
//   }, [genre]);

//   const getGenreNames = (genreIds) => {
//     return genreIds.map((id) => {
//       const genre = genres.find((g) => g.id === id);
//       return genre ? genre.name : '';
//     }).join(", ");
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>{genre} 장르 영화 목록</h2>
//       {movies.length === 0 ? (
//         <p>해당 장르의 영화가 없습니다.</p>
//       ) : (
//         movies.map(movie => (
//           <MovieLink
//             key={movie.id}
//             id={movie.id}
//             title={movie.title}
//             summary={movie.overview.slice(0, 100)}
//             poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//             release_date={movie.release_date}
//             rating={movie.vote_average + "점"}
//             genres={getGenreNames(movie.genre_ids)} // 장르 정보 추가
//           />
//         ))
//       )}
//     </div>
//   );
// };

// export default GenreMovies;
