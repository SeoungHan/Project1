import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MovieList() {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [posters, setPosters] = useState({});
    const [genres, setGenres] = useState({});
    const [directors, setDirectors] = useState({});
    const [summaries, setSummaries] = useState({});
    const [selectedMovie, setSelectedMovie] = useState(null);

    const fetchMovies = async () => {
        const kobisApiKey = 'e244b0b3bda984310baf9be3cf13aa97'; // KOBIS API 키
        const tmdbApiKey = 'd961a3c924d140f63d761b0648d7e1fe'; // TMDb API 키
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate() - 1).padStart(2, '0');
        const targetDate = `${year}${month}${day}`;

        const kobisDailyUrl = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${kobisApiKey}&targetDt=${targetDate}`;
        const kobisWeeklyUrl = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=${kobisApiKey}&targetDt=${targetDate}`;

        try {
            const [dailyResponse, weeklyResponse] = await Promise.all([
                axios.get(kobisDailyUrl),
                axios.get(kobisWeeklyUrl),
            ]);

            const dailyMovies = dailyResponse.data.boxOfficeResult.dailyBoxOfficeList || [];
            const weeklyMovies = weeklyResponse.data.boxOfficeResult.weeklyBoxOfficeList || [];
            const combinedMovies = [...dailyMovies, ...weeklyMovies];

            const sortedMovies = combinedMovies
                .filter((movie) => movie.openDt)
                .sort((a, b) => new Date(b.openDt) - new Date(a.openDt))
                .slice(0, 20);

            setMovies(sortedMovies);

            const fetchedPosters = {};
            const fetchedGenres = {};
            const fetchedDirectors = {};
            const fetchedSummaries = {};

            for (const movie of sortedMovies) {
                const tmdbUrl = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&query=${encodeURIComponent(
                    movie.movieNm
                )}`;
                const tmdbResponse = await axios.get(tmdbUrl);
                const tmdbMovie = tmdbResponse.data.results[0];

                if (tmdbMovie) {
                    if (tmdbMovie.poster_path) {
                        fetchedPosters[movie.movieCd] = `https://image.tmdb.org/t/p/w200${tmdbMovie.poster_path}`;
                    }

                    fetchedGenres[movie.movieCd] = tmdbMovie.genre_ids;

                    const creditsUrl = `https://api.themoviedb.org/3/movie/${tmdbMovie.id}/credits?api_key=${tmdbApiKey}`;
                    const creditsResponse = await axios.get(creditsUrl);
                    const director = creditsResponse.data.crew.find(
                        (person) => person.job === 'Director'
                    );
                    fetchedDirectors[movie.movieCd] = director ? director.name : '정보 없음';

                    const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${tmdbMovie.id}?api_key=${tmdbApiKey}&language=ko-KR`;
                    const movieDetailsResponse = await axios.get(movieDetailsUrl);
                    fetchedSummaries[movie.movieCd] = movieDetailsResponse.data.overview || '정보 없음';
                } else {
                    fetchedPosters[movie.movieCd] = null;
                    fetchedGenres[movie.movieCd] = [];
                    fetchedDirectors[movie.movieCd] = '정보 없음';
                    fetchedSummaries[movie.movieCd] = '정보 없음';
                }
            }

            const genreMapping = {
                28: '액션',
                12: '모험',
                16: '애니메이션',
                35: '코미디',
                80: '범죄',
                99: '다큐멘터리',
                18: '드라마',
                27: '공포',
                10402: '음악',
                9648: '미스터리',
                10749: '로맨스',
                878: 'SF',
                10770: 'TV 영화',
                53: '스릴러',
                10752: '전쟁',
                37: '서부',
            };

            for (const movieCd in fetchedGenres) {
                fetchedGenres[movieCd] = fetchedGenres[movieCd].map(
                    (id) => genreMapping[id] || '기타'
                );
            }

            setPosters(fetchedPosters);
            setGenres(fetchedGenres);
            setDirectors(fetchedDirectors);
            setSummaries(fetchedSummaries);
            setError(null);
        } catch (error) {
            setMovies([]);
            setError('영화 정보를 가져오는 도중 오류가 발생했습니다.');
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    const toggleDetails = (movie) => {
        setSelectedMovie(selectedMovie === movie ? null : movie);
    };

    return (
        <div style={{ padding: '20px' }}>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {movies.length > 0 ? (
                // 24.10.04 손성한 (수정)
                <div style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'inline-block' }}>
                        {movies.map((movie) => (
                            <li key={movie.movieCd} style={{ display: 'inline-block', marginRight: '20px' }}>
                                <h3 style={{ fontSize: '1rem', margin: '0' }}>{movie.movieNm}</h3>
                                <button
                                    onClick={() => toggleDetails(movie)}
                                    style={{
                                        cursor: 'pointer',
                                        background: 'none',
                                        border: 'none',
                                        padding: 0,
                                    }}
                                >
                                    {posters[movie.movieCd] ? (
                                        <img
                                            src={posters[movie.movieCd]}
                                            alt={`${movie.movieNm} 포스터`}
                                            style={{ width: '150px', height: '150px' }}
                                        />
                                    ) : (
                                        <div
                                            style={{
                                                width: '150px',
                                                height: '150px',
                                                border: '1px solid #ccc',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#888',
                                                marginBottom: '10px',
                                            }}
                                        >
                                            포스터 없음
                                        </div>
                                    )}
                                </button>

                                {selectedMovie === movie && (
                                    <div
                                        style={{
                                            marginTop: '10px',
                                            border: '1px solid #ccc',
                                            padding: '10px',
                                        }}
                                    >
                                        <p>
                                            <b>개봉일:</b> {movie.openDt || '정보 없음'}
                                        </p>
                                        <p>
                                            <b>감독:</b> {directors[movie.movieCd] || '정보 없음'}
                                        </p>
                                        <p>
                                            <b>줄거리:</b> {summaries[movie.movieCd] || '정보 없음'}
                                        </p>
                                        <p>
                                            <b>장르:</b>{' '}
                                            {genres[movie.movieCd]
                                                ? genres[movie.movieCd].length > 0
                                                    ? genres[movie.movieCd].join(', ')
                                                    : '정보 없음'
                                                : '정보 없음'}
                                        </p>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>영화 정보를 불러오는 중입니다...</p>
            )}
        </div>
    );
}

export default MovieList;