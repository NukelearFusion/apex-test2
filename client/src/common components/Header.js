import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import logo from '../img/logo.png';
import facebook from '../img/icons/facebook.svg';
import youtube from '../img/icons/youtube.svg';
import instagram from '../img/icons/instagram.svg';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    const toggleMobileMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isMenuOpen &&
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
            <div className="logo">
                <button
                    ref={buttonRef}
                    className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`}
                    onClick={toggleMobileMenu}
                    aria-label="Atvērt navigācijas izvēlni"
                >
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                </button>
                <img src={logo} alt="logo" />
            </div>

            <nav
                ref={menuRef}
                className={`nav-menu ${isMenuOpen ? 'active' : ''}`}
            >
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}
                    onClick={handleLinkClick}
                >
                    Pieraksts
                </NavLink>

                <NavLink
                    to="/par-mums"
                    className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}
                    onClick={handleLinkClick}
                >
                    Par mums
                </NavLink>

                <NavLink
                    to="/kontakti"
                    className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}
                    onClick={handleLinkClick}
                >
                    Kontakti
                </NavLink>

                <NavLink
                    to="/pakalpojumi"
                    className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}
                    onClick={handleLinkClick}
                >
                    Pakalpojumi
                </NavLink>
            </nav>

            <div className="header-right">
                <div className='contact'>
                    <a
                        href='https://maps.app.goo.gl/vTcrTg3Vwf8ZH1zn8'
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Google Maps"
                    >
                        Jūrmalas gatve 136, Rīga
                    </a>
                    <div id='phone'>+371 256-56-666</div>
                </div>

                <div className="social-icons">
                    <a
                        href="https://www.facebook.com/LVapexmotors"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                        className="social-link"
                    >
                        <img src={facebook} alt='facebook' />
                    </a>
                    <a
                        href="https://www.youtube.com/channel/UC3k18sFy8fmaWFTeZjaBFWA"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="YouTube"
                        className="social-link"
                    >
                        <img src={youtube} alt='youtube' />
                    </a>
                    <a
                        href="https://www.instagram.com/apexmotors.lv/?hl=en"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="social-link"
                    >
                        <img src={instagram} alt='instagram' />
                    </a>
                </div>
            </div>
        </header>
    );
}

export default Header;