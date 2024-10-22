import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  // Input data handler
  const handleInputId = (e) => setInputId(e.target.value);
  const handleInputPw = (e) => setInputPw(e.target.value);

  // Login function
  const onClickLogin = () => {
    console.log("click login");
    console.log("ID : ", inputId);
    console.log("PW : ", inputPw);

    if (!inputId || !inputPw) {
      alert("이메일과 비밀번호를 입력하세요.");
      return;
    }

    axios.post("http://localhost:8080/api/login", {
      email: inputId,
      password: inputPw,
    })
    .then((res) => {
      console.log(res);
      if (res.data.email === undefined) {
        alert("입력하신 ID가 일치하지 않습니다.");
      } else if (res.data.email === null) {
        alert("입력하신 비밀번호가 일치하지 않습니다.");
      } else {
        console.log("로그인 성공");
        sessionStorage.setItem("user_id", inputId);
        sessionStorage.setItem("name", res.data.name);
        setIsLogin(true); // 로그인 상태 업데이트
        window.location.reload(); // 페이지 새로고침
      }
    })
    .catch((error) => {
      console.error("로그인 오류:", error);
      alert("서버와의 통신 중 오류가 발생했습니다.");
    });
  };

  // Check login status on component mount
  useEffect(() => {
    if (sessionStorage.getItem("name")) {
      setIsLogin(true);
    }
  }, []);

  // Navigate to signup
  const goToSignup = () => {
    navigate("/movie_app/signup"); // 회원가입 페이지로 이동
  };

  // Logout function
  const logout = () => {
    sessionStorage.removeItem("user_id");
    sessionStorage.removeItem("name");
    setIsLogin(false); // 로그인 상태 변경
    window.location.reload(); // 페이지 새로고침
  };

  return (
    <div className="login-container"> 
      <h2>{isLogin ? "로그아웃 페이지" : "로그인 페이지"}</h2>
      <form>
        {isLogin ? (
          <p>환영합니다, {sessionStorage.getItem("name")}님!</p>
        ) : (
          <>
            <label htmlFor='input_id'>ID : </label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              name="input_id"
              value={inputId}
              onChange={handleInputId}
            />
            <br/><br/>
            
            <label htmlFor='input_pw'>PW : </label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              name="input_pw"
              value={inputPw}
              onChange={handleInputPw}
            />   
            <br/><br/>
          </>
        )}

        {!isLogin ? (
          <>
            <button     
              type="button"
              onClick={onClickLogin}
              style={{marginRight: '20px'}} 
            >
              로그인 
            </button>   
            <button     
              type="button"
              onClick={goToSignup}
            >
              회원가입
            </button> 
          </>
        ) : (
          <button     
            type="button"
            onClick={logout}
            style={{marginLeft: '20px'}} 
          >
            로그아웃
          </button>  
        )}
      </form>
    </div>
  );
};

export default Login;


  
 
/**
 * 코드 설명:
상태 관리:

useState를 사용하여 이메일과 비밀번호 입력값을 상태로 관리합니다.
입력 핸들러:

handleInputId와 handleInputPw 함수를 통해 입력값을 업데이트합니다.
로그인 처리:

handleLogin 함수는 폼 제출 시 호출됩니다. fetch API를 사용하여 백엔드에 POST 요청을 보냅니다.
요청에 대한 응답에 따라 로그인 성공/실패를 처리합니다.
렌더링:

기본적인 로그인 폼이 렌더링됩니다. 이메일과 비밀번호 입력 필드, 그리고 로그인 버튼이 포함되어 있습니다.
 */


/**
 * const handleLogin = async (e) => {
    e.preventDefault(); //폼이 제출될 때 페이지가 새로 고침되는 기본 동작을 방지합니다.
    
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST", //fetch API를 사용하여 백엔드 서버(localhost:8080)에 POST 요청을 보냅니다.
        headers: { //요청 헤더에 Content-Type을 application/json으로 설정하여 JSON 형식의 데이터를 보내겠다고 알립니다.
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ //body에는 사용자가 입력한 이메일(inputId)과 비밀번호(inputPw)를 JSON 문자열로 변환하여 포함시킵니다
          id: inputId,
          email: inputId,
          password: inputPw,
        }),
      });

      if (response.ok) { //response.ok는 HTTP 응답 상태가 200-299 범위에 있으면 true를 반환합니다. 이는 로그인 요청이 성공했음을 의미합니다.
        // 로그인 성공 시 처리
        const data = await response.json();
        console.log("로그인 성공:", data);
        sessionStorage.setItem("userId", data.userId); // 예시로 사용자 ID 저장
        navigate('/'); // 메인 페이지로 리다이렉션

        // 세션 저장 등의 작업
      } else {
        // 로그인 실패 시 처리
        console.error("로그인 실패");
      }

    } catch (error) {
      console.error("에러 발생:", error);
    }
  };
 */