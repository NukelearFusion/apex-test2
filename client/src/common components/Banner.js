import React from 'react';
import './Banner.css';

const Banner = ({ title, icon }) => {
    return (
        <div className="banner-bg">
            <div className="banner-container">
                <div className="banner-icon">
                    <img src={icon} alt='icon'/>
                </div>
                <div className="banner-text">
                    {title}
                </div>
            </div>
        </div>
    );
};

export default Banner;