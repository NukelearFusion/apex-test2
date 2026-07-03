import React, { useEffect } from 'react';
import './Contacts.css';

const Contacts = () => {
    useEffect(() => {
        document.title = "Kontakti - Apex Motors";
    }, []);

    return (
        <section className="contacts-section">
            <div className="contacts-container">
                <div className="contacts-content">
                    
                    <div className="contacts-info">
                        <div className="info-block">
                            <h3>Adrese</h3>
                            <p>Rīga, Jūrmalas gatve 136</p>
                        </div>
                        
                        <div className="info-block">
                            <h3>Telefons</h3>
                            <p>+371 256 56 666</p>
                        </div>
                        
                        <div className="info-block">
                            <h3>Darba laiks</h3>
                            <p>Darba dienās no 8:00 līdz 19:00</p>
                        </div>
                        
                        <div className="info-block">
                            <h3>E-pasts</h3>
                            <p>info@apexmotors.lv</p>
                        </div>
                    </div>

                    <div className="contacts-map">
                        <iframe
                            title="Apex Motors Map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2175.768132646636!2d24.01509137666275!3d56.95286597355152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46eed0160249c339%3A0xc622634d40237937!2sJ%C5%ABrmalas%20gatve%20136%2C%20Kurzemes%20rajons%2C%20R%C4%ABga%2C%20LV-1029!5e0!3m2!1sen!2slv!4v1701955000000!5m2!1sen!2slv"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                    
                </div>
            </div>
        </section>
    );
};

export default Contacts;