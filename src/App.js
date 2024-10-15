import React from "react";
import axios from "axios";
import Movie from "./Movie";

 
class App extends React.Component {
  state = {
    isLoading: true,
    movies: [],
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
    this.setState({ movies: results, isLoading: false });

    // const { // 예제용 
    //   data: {
    //     data: { movies },
    //   },
    // } = await axios.get(
    //   // "https://yts-proxy.nomadcoders1.now.sh/list_movies.json"
    // );
    // console.log(movies);
    // this.setState({ movies: movies, isLoading: false });
  };

  componentDidMount() {
    this.getMovies();
  }

  render() {
    const { isLoading, movies } = this.state;
    return (
      <section class="container"> {/* className으로 수정 */}
        {isLoading ? (
          <div class="loader"> {/* className으로 수정 */}
            <span class="loader_text">Loading...</span>
          </div>  
        ) : (
          movies.map((movie) => {
            return (
              <Movie
                key={movie.id}
                id={movie.id}
                title={movie.title}
                summary={movie.overview}
                poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // 영화 포스터
                release_date={movie.release_date} // 영화 개봉일
                rating={movie.vote_average + "점"} // 영화 평점
              />
            );
          })
        )}
      </section>
    );
  }
}

export default App;