

import React from 'react';
import ReactDOM from 'react-dom/client';
 
import App from './App';
import Test from './Test'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    {/* <Test /> */}
    <App />

    {/** 메인 컴포넌트는 개별 페이지를 구성한 최상위 라우팅적용 JSX
     *  - 로그인
     *  - 대시보드
     *    - 장바구니
     *    - 게시판
     *    - ...
     * 
     */}
     
  </React.StrictMode>
);

 
