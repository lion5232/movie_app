import React from "react";
import {HashRouter, Route, Routes} from "react-router-dom";
import Home from "./routes/Movie/Home";
import MovieDetail from "./routes/MovieDetail";
import TvDetail from "./routes/TvDetail";
import Navigation from "./components/Navigation";
import Dashboard from "./layout/Dashboard";

function App() {
  return(
    <HashRouter>
      {/* <Navigation /> */}

      <Routes>
        {/* React Router v6에서는 Route의 component 속성이 아닌 element 속성을 사용, exact 제거 */}
        {/* exact는 오로지 url이 작성한 그대로 인식하는데 
        v6에서는 모든 경로가 기본적으로 정확하게 일치하므로 exact 속성이 필요 없음. */}
      
      <Route path="/" element={<Dashboard />} /> 
      {/* 해시 라우터를 사용함으로 해시가 없으면 React Router는 Dashboard 컴포넌트를 렌더링합니다.
          즉, 브라우저는  URL을 /로 해석하고 기본적으로 설정된 DAshboard가 표시된다. 
          예1) localhost:3000/2 => localhost:3000/#/
          예2) localhost:3000/ => localhost:3000/#/
      */}

      <Route path="/2"  element={<Home/>} />

      <Route path="/movie/:id" element={<MovieDetail/>} />
      <Route path="/tv/:id" element={<TvDetail/>} />
    
      </Routes>
      </HashRouter>
  ); 
}

export default App;