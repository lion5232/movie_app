import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); 

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://192.168.0.9:8080/api/signup', {
                email,
                password,
                name,
            });

            // 서버에서 반환된 데이터 출력
            console.log(response.data);
            setMessage('회원가입 성공: ' + response.data.message);

            // 1초 후에 '/'로 이동
            setTimeout(() => {
                navigate('/movie_app');
            }, 1000);
        } catch (error) {
            setMessage('회원가입 실패: ' + error.response.data.message);
        }
    };

    return (
        <div>
            <h2>회원가입</h2>
            <form onSubmit={handleSignup}>
                <div>
                    <label>이메일:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>비밀번호:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>이름:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">회원가입</button>
            </form>
            {message && <p>{message}</p>}
            <button onClick={() => navigate(-1)}>이전 페이지로 돌아가기</button> {/* 이전 페이지로 돌아가는 버튼 */}
        </div>
    );
};

export default Signup;