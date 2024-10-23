import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './search.css';

const API_KEY = '250604987b9bcb91e2f812b87db35ebf';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searchType, setSearchType] = useState('movie');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sortBy, setSortBy] = useState('popularity.desc'); // 기본 정렬 기준
  const navigate = useNavigate();

  // 검색 함수
  const searchContent = async (pageNum = 1) => {
    if (!query) return;

    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/${searchType}`, {
        params: {
          api_key: API_KEY,
          query: query,
          include_adult: false,
          language: 'ko-KR',
          region: 'KR',
          page: pageNum,
        },
      });
      setResults((prev) => pageNum === 1 ? response.data.results : [...prev, ...response.data.results]);
      setHasMore(response.data.total_pages > pageNum);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // 페이지 로드 시 검색 수행
  useEffect(() => {
    searchContent(page);
  }, [query, searchType]); // 페이지가 바뀌지 않는 한 계속 같은 페이지에서 검색

  // 더보기 기능
  const loadMore = () => {
    const newPage = page + 1;
    searchContent(newPage);
    setPage(newPage);
  };

  const handleTitleClick = (id) => {
    const basePath = searchType === 'movie' ? `/movie/${id}` : `/tv/${id}`;
    navigate(basePath);
  };

  // 클라이언트 측 정렬
  const sortedResults = () => {
    return results.sort((a, b) => {
      if (searchType === 'movie') {
        switch (sortBy) {
          case 'release_date.desc':
            return new Date(b.release_date) - new Date(a.release_date);
          case 'release_date.asc':
            return new Date(a.release_date) - new Date(b.release_date);
          case 'popularity.desc':
            return b.popularity - a.popularity;
          case 'vote_average.desc':
            return b.vote_average - a.vote_average;
          default:
            return 0;
        }
      } else { // TV 프로그램
        switch (sortBy) {
          case 'popularity.desc':
            return b.popularity - a.popularity;
          case 'vote_average.desc':
            return b.vote_average - a.vote_average;
          case 'first_air_date.desc':
            return new Date(b.first_air_date) - new Date(a.first_air_date);
          case 'first_air_date.asc':
            return new Date(a.first_air_date) - new Date(b.first_air_date);
          default:
            return 0;
        }
      }
    });
  };

  return (
    <div style={{paddingLeft: "80px",paddingRight: "90px" , backgroundColor: "gray" }}>
      <form onSubmit={(e) => { e.preventDefault(); searchContent(); setPage(1); }}>
        <button disabled style={{color : "white"}} >검색</button>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="영화 또는 TV 프로그램 검색"
        />
        
      </form>
      <div>
        <button onClick={() => setSearchType('movie')}>영화</button>
        <button onClick={() => setSearchType('tv')}>TV 프로그램</button>
      </div>
      <div>
        <label htmlFor="sort-by">정렬 기준:</label>
        <select
          id="sort-by"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          {searchType === 'movie' ? (
            <>
              <option value="release_date.desc">최신순</option>
              <option value="release_date.asc">오래된 순</option>
              <option value="popularity.desc">인기순</option>
              <option value="vote_average.desc">평점 높은 순</option>
            </>
          ) : (
            <>
              <option value="popularity.desc">인기순</option>
              <option value="vote_average.desc">평점 높은 순</option>
              <option value="first_air_date.desc">최신 TV 프로그램</option>
              <option value="first_air_date.asc">오래된 TV 프로그램</option>
            </>
          )}
        </select>
      </div>
      <div className="SearchContainer">
        {sortedResults().map((item) => (
          <div key={item.id} className="result-item">
            <h3 className="title" onClick={() => handleTitleClick(item.id)}>
              {item.title || item.name}
            </h3>
            <p>시작 날짜: {item.release_date || item.first_air_date}</p>
            {item.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                alt={item.title || item.name}
              />
            )}
          </div>
        ))}
      </div>
      {hasMore && (
        <button onClick={loadMore} style={{backgroundColor: "black"}}>더보기</button>
      )}
    </div>
  );
};

export default MovieSearch;
