import React, { useEffect } from 'react';
import Carousel from '../common components/Carousel';

const Home = () => {
    useEffect(() => {
        document.title = "Sākums - Apex Motors";
        
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div style={{ 
            height: '100vh', 
            width: '100vw', 
            overflow: 'hidden', 
            position: 'relative' 
        }}>
            <Carousel />
        </div>
    );
};

export default Home;