import React from "react";
import axios from "axios";
import Movie from "./Movie";
import "./App.css";

 
class App extends React.Component {
  state = {
    isLoading: true,
    movies: [],
  };

  getGenres = async () => {
    const {
      data: { genres },
    } = await axios.get(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=250604987b9bcb91e2f812b87db35ebf&language=ko"
    );
    const genreMap = {};
    genres.forEach(genre => {
      genreMap[genre.id] = genre.name;
    });
    this.setState({ genres: genreMap });
  };

  getMovies = async () => {
    const movies = await axios.get("https://api.themoviedb.org/3/movie/popular?language=ko&region=kr&api_key=250604987b9bcb91e2f812b87db35ebf");
    // const movies1 = await axios.get("https://yts-proxy.nomadcoders1.now.sh/list_movies.json");
    // console.log(movies1);
     

    const {
      data: {
        results
      },
    } = await axios.get(
        "https://api.themoviedb.org/3/movie/popular?language=ko&region=kr&api_key=250604987b9bcb91e2f812b87db35ebf"
      // "https://yts-proxy.nomadcoders1.now.sh/list_movies.json"
    );
    console.log(results);


    const moviesWithGenres = results.map(movie => ({
      ...movie,
      genres: movie.genre_ids.map(id => this.state.genres[id] || id).join(", "), // 장르 ID를 장르 이름으로 변환
    }));

    this.setState({ movies: moviesWithGenres, isLoading: false });

 
  };

  componentDidMount() {
     this.getGenres().then(this.getMovies); // 장르를 먼저 가져온 후 영화 데이터를 가져옴
  }

  render() {
    const { isLoading, movies } = this.state;
    return (
      <section className="container"> {/* className으로 수정 */}
        {isLoading ? (
          <div className="loader"> {/* className으로 수정 */}
            <span className="loader_text">Loading...</span>
          </div>  
        ) : (
          <div className="movies">
            {/* map 함수의 중괄호: movies.map을 중괄호 {}로 감싸서 Movie 컴포넌트 배열이 제대로 렌더링되도록 수정.
             이는 JSX에서 JavaScript 표현식을 사용할 때 필요하기 때문입니다.  안쓰면 단순한 텍스트로 해석됨*/}
             {movies.map((movie) => {
            return (
              <Movie
                key={movie.id} //각각 child에 필요한 유일한 키prop 정보 부여
                id={movie.id}
                title={movie.title}
                summary={movie.overview}
                poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // 영화 포스터
                release_date={movie.release_date} // 영화 개봉일
                rating={movie.vote_average + "점"} // 영화 평점
                genres={movie.genres} // 장르 추가
              />
            );
          })}
          </div>
         
        )}
      </section>
    );
  }
}

export default App;


//React에서 class 대신에 className을 쓰는 이유
/**
 React는 JSX를 사용하여 JavaScript 코드에서 HTML 구조를 표현하는데, 
 JSX는 JavaScript와 매우 유사한 문법을 따른다. 
 따라서 class를 사용하면 문법적으로 혼동이 생길 수 있다.

 대신, React에서 className을 사용하면, React는 이를 실제 DOM에 렌더링할 때 
 자동으로 HTML의 class 속성으로 변환해 줍니다.
 */