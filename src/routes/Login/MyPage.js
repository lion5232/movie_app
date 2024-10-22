import React from 'react';

const MyPage = () => {
  const userId = sessionStorage.getItem("user_id");
  return (
    <div>
      <h1>마이페이지</h1>
      <p>사용자 ID: {userId}</p>
    </div>
  );
};

export default MyPage;