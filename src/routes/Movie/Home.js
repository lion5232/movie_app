import React, { useState, useEffect } from "react"; //React 및 필요한 Hooks인 useEffect와 useState를 임포트
import axios from "axios";
import MovieLink from "../../components/MovieLink";
import "./Home.css";


// Home은 데이터 fetching 및 상태 관리를 담당
// 여기는 메인 홈페이지 입니다. 인기 있는 영화 목록을 보여 줍니다.
const Home = () => {
  // Home 이라는 이름의 함수형 컴포넌트를 정의
  // 상태 관리 -> 상태란 컴포넌트 랜더링시 사용할 데이터의 현재 값, React에서는 상태가 변경될 때마다 해당 컴포넌트를 최신상태로 만들어주기 위함
  const [isLoading, setIsLoading] = useState(true); // isLoading 상태를 초기값 true로 설정하며, 데이터 로딩 여부를 관리
  const [movies, setMovies] = useState([]); // movies 상태를 초기값으로 빈 배열을 설정하여 영화 목록을 저장
  const [genres, setGenres] = useState({}); // genres 상태를 초기값으로 빈 객체를 설정하여 장르 정보를 저장

  const getGenres = async () => {
    //비동기 함수 getGenres를 정의하여 API로부터 영화 장르 목록을 가져옴
    const { //비구조화 할당 좌측 변수 우측 객체또는 배열
      data: { genres }, //장르 경로 data->genres-> id...
    } = await axios.get(
      //API 요청을 통해 장르 데이터(promise 객체)를 가져와 genres 변수에 저장
      "https://api.themoviedb.org/3/genre/movie/list?api_key=250604987b9bcb91e2f812b87db35ebf&language=ko"
    ); // genres는 API 응답에서 영화 장르 목록을 담고 있는 배열이 된다.

    const genreMap = {}; //장르 ID와 이름의 매핑을 저장할 빈 객체를 초기화
    genres.forEach((genre) => {
      //각 장르를 반복하면서 genreMap에 ID와 이름을 추가
      genreMap[genre.id] = genre.name;
    });
    setGenres(genreMap); //genreMap을 genres 상태에 저장하여 컴포넌트의 상태를 업데이트
 
  };

  const getMovies = async () => {
    // 장르가 준비되었는지 확인 추가(장르가 비어있다면 장르를 먼저 가져오도록 수정.)
    if (Object.keys(genres).length === 0) {
      await getGenres(); // 장르를 먼저 가져옴
    }
    //비동기 함수 getMovies를 정의하여 인기 영화를 API로부터 가져옴.
    const {
      data: { results },
    } = await axios.get(
      //API 요청을 통해 인기 영화 목록을 가져와 results 변수에 저장
      "https://api.themoviedb.org/3/movie/popular?language=ko&region=kr&api_key=250604987b9bcb91e2f812b87db35ebf"
    );

    const moviesWithGenres = results.map((movie) => ({ //각 영화 객체에 장르 이름을 추가하여 새로운 배열 moviesWithGenres를 만들었음
      ...movie, //...은 나머지 데이터 값을 몯두 할당 가능
      genres: movie.genre_ids.map((id) => genres[id] || id).join(", "), // 장르 ID를 장르 이름으로 변환
    }));

    setMovies(moviesWithGenres); //업데이트된 영화 목록을 movies 상태에 저장
    setIsLoading(false); //데이터 로딩이 완료되었으므로 isLoading을 false로 업데이트
  };

  useEffect(() => {
    //컴포넌트가 마운트될 때(시작) getGenres와 getMovies를 호출하여 데이터를 가져옴
    const fetchData = async () => {
      //데이터 로딩을 위한 비동기 함수를 정의하여 장르와 영화를 순차적으로 가져옴
      await getGenres();
      await getMovies();
    };
    fetchData(); //컴포넌트가 마운트될 때 fetchData를 호출하여 데이터를 가져옴
  }, []); // 컴포넌트가 처음 마운트될 때만 실행 & genres가 변경될때 마다 실행

    useEffect(() => {
    //genres의 키 길이를 체크하여 장르 데이터가 성공적으로 업데이트되었는지 확인합니다. 만약 genres가 비어 있지 않다면, 즉 장르 데이터가 존재한다면 다음 단계로 진행합니다.
    if (Object.keys(genres).length > 0) { 
      getMovies(); // genres가 업데이트되면 영화 데이터도 가져오기
    }
  }, [genres]); // genres가 변경될 때마다 실행

  return (
    //JSX를 반환하여 UI를 구성
    <section className="container">
      {isLoading ? ( //isLoading 상태에 따라 로딩 중이면 로딩 메시지를, 그렇지 않으면 영화 목록을 표시 (삼항연산자 사용했음. (? A:B) )
        <div className="loader">
          <span className="loader_text">Loading...</span>
        </div>
      ) : (
        <div className="movies">
          {movies.map((movie) => ( //movies 배열을 반복하여 각 영화에 대한 MovieLink 컴포넌트를 생성
              <MovieLink
                key={movie.id}
                id={movie.id}
                title={movie.title}
                summary={movie.overview.slice(0, 100)}
                poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                release_date={movie.release_date}
                rating={movie.vote_average + "점"}
                genres={movie.genres}
              />
            )
          )}
        </div>
      )}
    </section>
  );
};

export default Home;

//클래스 컴포넌트 버전
// class Home extends React.Component {
//   state = {
//     isLoading: true,
//     movies: [],
//   };

//   getGenres = async () => {
//     const {
//       data: { genres },
//     } = await axios.get(
//       "https://api.themoviedb.org/3/genre/movie/list?api_key=250604987b9bcb91e2f812b87db35ebf&language=ko"
//     );
//     const genreMap = {};
//     genres.forEach(genre => {
//       genreMap[genre.id] = genre.name;
//     });
//     this.setState({ genres: genreMap });
//   };

//   getMovies = async () => {
//     // const movies = await axios.get("https://api.themoviedb.org/3/movie/popular?language=ko&region=kr&api_key=250604987b9bcb91e2f812b87db35ebf");
//     // // const movies1 = await axios.get("https://yts-proxy.nomadcoders1.now.sh/list_movies.json");
//     // // console.log(movies1);

//     const {
//       data: {
//         results
//       },
//     } = await axios.get(
//         "https://api.themoviedb.org/3/movie/popular?language=ko&region=kr&api_key=250604987b9bcb91e2f812b87db35ebf"
//          // 인기순으로 영화 가져오기 지역은 한국이거 언어는 한국어
//          //"https://yts-proxy.nomadcoders1.now.sh/list_movies.json" // 노마드 코더 용
//     );
//     console.log(results);

//     const moviesWithGenres = results.map(movie => ({
//       ...movie,
//       genres: movie.genre_ids.map(id => this.state.genres[id] || id).join(", "), // 장르 ID를 장르 이름으로 변환
//     }));

//     this.setState({ movies: moviesWithGenres, isLoading: false });

//   };

//   componentDidMount() {
//      this.getGenres().then(this.getMovies); // 장르를 먼저 가져온 후 영화 데이터를 가져옴
//   }

//   render() {
//     const { isLoading, movies } = this.state;
//     return (
//       <section className="container"> {/* className으로 수정 */}
//         {isLoading ? (
//           <div className="loader"> {/* className으로 수정 */}
//             <span className="loader_text">Loading...</span>
//           </div>
//         ) : (
//           <div className="movies">
//             {/* map 함수의 중괄호: movies.map을 중괄호 {}로 감싸서 Movie 컴포넌트 배열이 제대로 렌더링되도록 수정.
//              이는 JSX에서 JavaScript 표현식을 사용할 때 필요하기 때문입니다.  안쓰면 단순한 텍스트로 해석됨*/}
//              {movies.map((movie) => {
//             return (
//               <MovieLink
//                 key={movie.id} //각각 child에 필요한 유일한 키prop 정보 부여
//                 id={movie.id}
//                 title={movie.title}
//                 summary={movie.overview.slice(0,100)}
//                 poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // 영화 포스터
//                 release_date={movie.release_date} // 영화 개봉일
//                 rating={movie.vote_average + "점"} // 영화 평점
//                 genres={movie.genres} // 장르 추가
//               />
//             );
//           })}
//           </div>

//         )}
//       </section>
//     );
//   }
// }

// export default Home;

//React에서 class 대신에 className을 쓰는 이유
/**
 React는 JSX를 사용하여 JavaScript 코드에서 HTML 구조를 표현하는데, 
 JSX는 JavaScript와 매우 유사한 문법을 따른다. 
 따라서 class를 사용하면 문법적으로 혼동이 생길 수 있다.

 대신, React에서 className을 사용하면, React는 이를 실제 DOM에 렌더링할 때 
 자동으로 HTML의 class 속성으로 변환해 줍니다.
 */
