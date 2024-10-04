import React, { useState } from 'react';
import backgroundImage from '../images/backgroundmovie.jpg'; // 이미지 경로를 수정하여 import

const Home = () => {
    const [activeTab, setActiveTab] = useState('background'); // 기본 설정 값을 background로

    return (
        <div style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <button onClick={() => setActiveTab('recommendations')}
                    style={{
                        flex: 1, padding: '10px', backgroundColor: activeTab === 'recommendations' ? '#007bff' : '#f8f9fa',
                        color: activeTab === 'recommendations' ? '#fff' : '#000', border: '1px solid #ccc', cursor: 'pointer'
                    }}>
                    추천 영화
                </button>
                <button onClick={() => setActiveTab('rented')}
                    style={{
                        flex: 1, padding: '10px', backgroundColor: activeTab === 'rented' ? '#007bff' : '#f8f9fa', color: activeTab === 'rented' ? '#fff' : '#000',
                        border: '1px solid #ccc', cursor: 'pointer',
                    }}>
                    대여중인 영화
                </button>
                <button onClick={() => setActiveTab('purchased')}
                    style={{
                        flex: 1, padding: '10px', backgroundColor: activeTab === 'purchased' ? '#007bff' : '#f8f9fa',
                        color: activeTab === 'purchased' ? '#fff' : '#000', border: '1px solid #ccc',
                        cursor: 'pointer',
                    }}>
                    구매한 영화
                </button>
            </div>

            {/* 기본 배경화면 */}
            {activeTab === 'background' && (
                <div style={{
                    backgroundImage: `url(${backgroundImage})`,
                    height: '400px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}></div>
            )}

            {/* Active Tab Content */}
            {activeTab === 'recommendations' && <div style={{ padding: '20px' }}>추천 영화 목록</div>}
            {activeTab === 'rented' && <div style={{ padding: '20px' }}>대여중인 영화 목록</div>}
            {activeTab === 'purchased' && <div style={{ padding: '20px' }}>구매한 영화 목록</div>}
        </div>
    );
};

export default Home;