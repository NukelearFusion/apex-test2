import './Footer.css';

function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-text">
                    Copyright © {currentYear} <span>Apex Motors SIA</span>. Visas tiesības paturētas.
                </div>
            </div>
        </footer>
    );
}

export default Footer;