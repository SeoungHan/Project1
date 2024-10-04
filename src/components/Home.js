// 24.10.04 손성한
import React, { useState } from 'react';
import backgroundImage from '../images/backgroundmovie.jpg';
import Recommendation from './Recommendations';

const Home = () => {
    const [activeTab, setActiveTab] = useState('background'); // 기본값을 background로 설정
    const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가

    return (
        <div style={{ width: "100%", height: "100%", position: "relative", padding: "10px", boxSizing: "border-box" }}>
            {/* 배경 이미지 */}
            {activeTab === 'background' && (
                <div style={{
                    backgroundImage: `url(${backgroundImage})`,
                    height: '100%',
                    width: '100%',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: -1
                }}></div>
            )}

            {/* 버튼 컨테이너 */}
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '20px', position: 'relative', zIndex: 1 }}>
                <button onClick={() => setActiveTab('recommendations')}
                    style={{
                        flex: 'none', padding: '10px', backgroundColor: activeTab === 'recommendations' ? '#007bff' : '#f8f9fa',
                        color: activeTab === 'recommendations' ? '#fff' : '#000', border: '1px solid #ccc', cursor: 'pointer', marginRight: '10px'
                    }}>
                    추천 영화
                </button>
                <button onClick={() => setActiveTab('rented')}
                    style={{
                        flex: 'none', padding: '10px', backgroundColor: activeTab === 'rented' ? '#007bff' : '#f8f9fa', color: activeTab === 'rented' ? '#fff' : '#000',
                        border: '1px solid #ccc', cursor: 'pointer', marginRight: '10px'
                    }}>
                    대여중인 영화
                </button>
                <button onClick={() => setActiveTab('purchased')}
                    style={{
                        flex: 'none', padding: '10px', backgroundColor: activeTab === 'purchased' ? '#007bff' : '#f8f9fa',
                        color: activeTab === 'purchased' ? '#fff' : '#000', border: '1px solid #ccc',
                        cursor: 'pointer',
                    }}>
                    구매한 영화
                </button>
            </div>

            {/* 검색창을 우측 상단에 위치 */}
            <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1 }}>
                <input
                    type="text"
                    placeholder="검색" // 검색 입력 필드
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)} // 이벤트 객체를 'event'로 명시적으로 사용
                    style={{
                        padding: '10px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        width: '200px', // 너비를 설정
                    }}
                />
            </div>

            {/* Active Tab Content */}
            {activeTab === 'recommendations' && <Recommendation />}
            {activeTab === 'rented' && <div style={{ padding: '20px', position: 'relative', zIndex: 1 }}>대여중인 영화 목록</div>}
            {activeTab === 'purchased' && <div style={{ padding: '20px', position: 'relative', zIndex: 1 }}>구매한 영화 목록</div>}
        </div>
    );
};

export default Home;