import React, { useState, useEffect } from 'react';
import './About.css';
import youtubeIcon from '../img/icons/youtube-simple.png';
import youtubeLarge from '../img/icons/youtube-100.png';

const About = () => {
    useEffect(() => {
        document.title = "Par Mums - Apex Motors";
    }, []);

    const [paragraphs, setParagraphs] = useState([]);
    const [isInteracting, setIsInteracting] = useState(false);
    
    // Новое состояние для отслеживания открытого видео в модальном окне
    const [activeVideoId, setActiveVideoId] = useState(null);

    const [videos] = useState([
        { id: "4dhUvEoIRMw" },
        { id: "CvI4F_chg98" },
        { id: "xmJbbCtMUu8" },
        { id: "O5fgYjPKyNw" },
        { id: "Whb-h2EeLzo" },
        { id: "WGWoj_NDjCY" }
    ]);

    const handlePlayVideo = (id) => {
        setActiveVideoId(id);
    };

    const closeVideo = () => {
        setActiveVideoId(null);
    };

    useEffect(() => {
        fetch('../editable/About.txt')
            .then(response => response.text())
            .then(text => {
                const lines = text.split('\n').filter(line => line.trim() !== '');
                setParagraphs(lines);
            })
            .catch(err => console.error(err));
    }, []);

    const renderVideoGroup = () => (
        <div className="video-group">
            {videos.map((video, index) => (
                <div 
                    className="video-wrapper" 
                    key={index} 
                    onClick={() => handlePlayVideo(video.id)}
                >
                    <div className="video-thumbnail">
                        <img
                            src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                            alt={`Video Thumbnail ${index + 1}`}
                        />
                        <div className="play-button-overlay">
                            <img src={youtubeLarge} alt="YouTube" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <section className="about-section">
            <div className="about-container">
                <div className="about-content">
                    {paragraphs.length > 0 ? (
                        paragraphs.map((para, index) => {
                            let className = "about-description";
                            if (index === 0) className = "about-title";
                            else if (index === 1) className = "about-subtitle-handwritten";
                            
                            return (
                                <p key={index} className={className}>
                                    {para}
                                </p>
                            );
                        })
                    ) : (
                        <p className="about-description">Loading...</p>
                    )}
                </div>
            </div>

            <div 
                className="about-media-wide"
                onMouseEnter={() => setIsInteracting(true)}
                onMouseLeave={() => setIsInteracting(false)}
            >
                {/* Останавливаем анимацию, если пользователь навел мышь ИЛИ открыто видео */}
                <div className={`videos-track ${isInteracting || activeVideoId ? 'paused' : ''}`}>
                    {renderVideoGroup()}
                    {renderVideoGroup()}
                </div>
            </div>

            <div className="about-container btn-bottom-container">
                <div className="youtube-btn-wrapper">
                    <a
                        href="https://www.youtube.com/channel/UC3k18sFy8fmaWFTeZjaBFWA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="youtube-btn"
                    >
                        SEKOT <img src={youtubeIcon} alt='YouTube' className='youtube-icon' />
                    </a>
                </div>
            </div>

            {/* Модальное окно для видео */}
            {activeVideoId && (
                <div className="video-modal-overlay" onClick={closeVideo}>
                    <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal-btn" onClick={closeVideo}>&times;</button>
                        <iframe
                            src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </section>
    );
};

export default About;