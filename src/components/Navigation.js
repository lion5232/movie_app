// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "./Navigation.css";

// function Navigation() {
//   const [isVisible, setIsVisible] = useState(false); // 사이드바 보이기/숨기기 상태

//   const handleMouseEnter = () => {
//     setIsVisible(true); // 마우스가 들어오면 사이드바 열기
//   };

//   const handleMouseLeave = () => {
//     setIsVisible(false); // 마우스가 나가면 사이드바 닫기
//   };

//   return (
//     <div>
//       <div
//         className="toggle-button"
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//       >
//         {/* 클릭 시 사이드바 토글 */}
//         <span>Menu</span>
//       </div>
//       <div
//         className={`sidebar ${isVisible ? "visible" : ""}`}
//         onMouseEnter={handleMouseEnter} // 사이드바에도 마우스 오버 시 열리도록
//         onMouseLeave={handleMouseLeave} // 사이드바에서 나가면 닫기
//       >
//         <div className="nav">
//           <Link to="/">HOME</Link>
//           <Link to="/about">About</Link>
//           {/* 다른 링크 추가 가능 */}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navigation;