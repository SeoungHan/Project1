// 24.10.04 손성한
// 추천 영화 클릭 시 뜨는 화면

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieList from './MovieList';

const Recommendation = () => {
    const boxStyle = {
        padding: '20px',
        border: '1px solid #ccc',
        margin: '20px 0', // 위 아래 간격을 주기 위해 margin 설정
        borderRadius: '5px', // 약간 둥글게
        backgroundColor: '#f9f9f9', // 배경색 추가
    };

    const [selectedGenre, setSelectedGenre] = useState(''); // 선택된 장르 상태 초기화
    const [movies, setMovies] = useState([]); // 영화 목록 초기화

    // 장르 목록
    const genres = [
        // TMDB API에서 사용하는 장르 id
        { id: '28', name: '액션' },
        { id: '35', name: '코미디' },
        { id: '10749', name: '로맨스' },
        { id: '27', name: '공포' },
        { id: '16', name: '애니메이션' },
    ];

    const fetchMoviesByGenre = async (genreId) => {
        if (!genreId) return; // 장르가 선택되지 않았을 경우

        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/discover/movie?api_key=YOUR_API_KEY&with_genres=${genreId}`
            );
            setMovies(response.data.results); // 영화 목록 설정
        } catch (error) {
            console.error('Error fetching movies: ', error);
        }
    };

    useEffect(() => {
        fetchMoviesByGenre(selectedGenre); // 선택된 장르에 따라 영화 목록 가져오기
    }, [selectedGenre]);

    return (
        <div>
            <h2>최신 영화</h2>
            <div style={boxStyle}>
                {/* 최신 영화 목록을 여기에 추가 */}
                {/* 10.04 이진수 무비리스트 추가 */}
                <MovieList /> {/* MovieList 컴포넌트 추가 */}
            </div>
            <h2>추천 영화</h2>
            <div style={boxStyle}>
                {/* 추천 영화 목록을 여기에 추가 */}
                <p>추천 영화 1</p>
                <p>추천 영화 2</p>
                <p>추천 영화 3</p>
            </div>

            {/* 장르 선택 박스 */}
            <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
                <h2 style={{ marginRight: '10px', fontSize: '1.5rem' }}>장르 선택</h2>
                <select
                    id="genre-select"
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)} // 선택된 장르 상태 업데이트
                    style={{ width: '120px', marginLeft: '10px' }} // 선택 박스 크기 조정
                >
                    <option value="">-- 장르 선택 --</option>
                    {genres.map((genre) => (
                        <option key={genre.id} value={genre.id}>
                            {genre.name}
                        </option>
                    ))}
                </select>
            </div>

            <div style={boxStyle}>
                <div style={{ marginTop: '20px' }}>
                    {movies.length > 0 ? (
                        movies.map((movie) => (
                            <p key={movie.id}>{movie.title}</p> // 영화 제목 출력
                        ))
                    ) : (
                        <p>영화 목록이 없습니다.</p> // 영화가 없을 경우 메시지
                    )}
                </div>
            </div>
        </div>
    );
};

export default Recommendation;
