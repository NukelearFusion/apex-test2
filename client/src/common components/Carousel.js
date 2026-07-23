import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./Carousel.css";

import slide1 from "../img/carousel/slide1.jpg";
import slide2 from "../img/carousel/slide2.jpg";
import slide3 from "../img/carousel/slide3.jpg";
import slide4 from "../img/carousel/slide4.jpg";
import slide5 from "../img/carousel/slide5.jpg"; // Pievienots veikala slaida attēls

const slides = [
    {
        id: 1,
        image: slide1,
        title: "APEX MOTORS",
        subtitle: "Autoserviss ar individuālu pieeju katram klientam. Strādājam kvalitatīvi un atbildīgi. Uzskatāmi uzrādam katru bojāto detaļu, kā arī veicam foto uzskaiti. Katrs darbs vienmēr tiks iepriekš saskaņots.",
        buttonText: "SAZINĀTIES",
        buttonUrl: "/par-mums"
    },
    {
        id: 2,
        image: slide2,
        title: "CHIPTUNING",
        subtitle: "Dzinēja jaudas palielināšana uz profesionāla dyno stenda.",
        buttonText: "VISI PAKALPOJUMI",
        buttonUrl: "/pakalpojumi"
    },
    {
        id: 3,
        image: slide3,
        title: "AUTO IEVEŠANA NO ASV UN SERTIFIKĀCIJA",
        subtitle: "Varam palīdzēt Jūsu kārotu auto ievest no ASV, kā arī to sertificēt lietošanai Latvijā.",
        buttonText: "KONTAKTI",
        buttonUrl: "/kontakti"
    },
    {
        id: 4,
        image: slide4,
        title: "TEHNISKĀS APSKATES IZIEŠANA",
        subtitle: "Ja nav vēlmes vai laika auto aizdzīt uz tehnisko apskati, to varam izdarīt Jūsu vietā.",
        buttonText: "PIETEIKTIES",
        buttonUrl: "/" 
    },
    {
        id: 5, // Jaunais veikala slaids
        image: slide5,
        title: "VEIKALS",
        subtitle: "Pirkt un pārdot automašīnu. Apskatiet piedāvājumā esošos auto vai piedāvājiet savu auto uzpirkšanai mūsu servisam.",
        buttonText: "APSKATĪT",
        buttonUrl: "/veikals" // Nomaini uz savu reālo veikala saiti (piem., /shop)
    }
];

export default function Carousel() {
    const navigate = useNavigate();
    const [index, setIndex] = useState(0);

    const handleButtonClick = (url) => {
        if (url) {
            navigate(url);
        } else {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const id = setInterval(() => {
            setIndex(prev => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="hero-carousel">
            {slides.map((slide, i) => (
                <div
                    key={slide.id}
                    className={
                        "hero-slide" +
                        (i === index ? " hero-slide--active" : " hero-slide--inactive")
                    }
                    style={{ backgroundImage: `url(${slide.image})` }}
                >
                    <div className="hero-overlay" />
                    <div className="hero-content">
                        <h1 className="hero-title">{slide.title}</h1>
                        <p className="hero-subtitle">{slide.subtitle}</p>
                        <button
                            className="hero-button"
                            onClick={() => handleButtonClick(slide.buttonUrl)}
                        >
                            {slide.buttonText}
                        </button>
                    </div>
                </div>
            ))}

            <div className="hero-dots">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        className={
                            "hero-dot" + (i === index ? " hero-dot--active" : "")
                        }
                        onClick={() => setIndex(i)}
                    />
                ))}
            </div>
        </div>
    );
}