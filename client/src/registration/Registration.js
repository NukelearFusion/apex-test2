import './Registration.css';
import React, { useState, useEffect } from 'react';
import DateTimePicker from './DateTimePicker';
import RegistrationForm from './RegistrationForm';
import apexBuilding from '../img/apex-building.png';
import wifi from '../img/icons/wifi.png';
import coffee from '../img/icons/coffee.png';
import sofa from '../img/icons/sofa.png';

const Registration = () => {
    useEffect(() => {
        document.title = "Pieraksts - Apex Motors";
    }, []);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        car: '',
        description: '',
        consent: false
    });

    const [dateTime, setDateTime] = useState(null);
    const [status, setStatus] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.fullName || !formData.phone || !formData.car || !formData.consent || !dateTime) {
            setStatus('error');
            setMessage('Lūdzu, aizpildiet visus obligātos laukus un izvēlieties datumu un laiku.');
            return;
        }

        setStatus('loading');
        setMessage('');

        try {
            const dateStr = new Date(dateTime).toLocaleDateString('lv-LV');
            const timeStr = new Date(dateTime).toLocaleTimeString('lv-LV', { hour: '2-digit', minute: '2-digit' });

            const payload = {
                ...formData,
                date: dateStr,
                time: timeStr
            };

            const response = await fetch('https://apex-mailer.onrender.com/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                setStatus('success');
                setMessage('Paldies! Jūsu ziņa ir veiksmīgi nosūtīta.');
                setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    car: '',
                    description: '',
                    consent: false
                });
                setDateTime(null);
            } else {
                const data = await response.json();
                setStatus('error');
                setMessage(data.error || 'Radās kļūda. Lūdzu, mēģiniet vēlreiz.');
            }
        } catch (error) {
            setStatus('error');
            setMessage('Neizdevās sazināties ar serveri.');
        }
    };

    return (
        <div className='registration-bg'>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <div className="registration-container">
                    <div className="content-wrapper container">
                        <div className="block block-calendar">
                            <h2 className="step-title"><span>1.</span> Izvēlieties datumu un laiku</h2>
                            <DateTimePicker value={dateTime} onChange={setDateTime}/>
                        </div>
                        <div className="block block-form">
                            <h2 className="step-title"><span>2.</span> Ievadiet datus</h2>
                            <RegistrationForm data={formData} onChange={setFormData}/>
                        </div>
                    </div>
                    <div className='block-img'>
                        <img src={apexBuilding} alt='Building'/>
                        <div className="img-overlay"></div>
                    </div>
                </div>
                
                <div className="registration-button-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <button type="submit" className="submit-button" disabled={status === 'loading'}>
                        {status === 'loading' ? 'Sūta...' : 'Pieteikt vizīti'}
                    </button>
                    {message && (
                        <div className={`form-message ${status}`}>
                            {message}
                        </div>
                    )}
                </div>
            </form>
            
            <div className='small-img'>
                <img src={apexBuilding} alt='Building'/>
            </div>
            
            <div className="amenities-container">
                <div className="amenities-content">
                    <div className="amenities-header">
                        <h1>Serviss ar komfortablu gaidīšanas zonu</h1>
                        <p className="subtitle">Kamēr mēs rūpējamies par jūsu automašīnu, jūs varat baudīt mūsu gaidīšanas zonas ērtības</p>
                    </div>
                    <div className="amenities">
                        <div className="amenity">
                            <div className="amenity-icon-wrapper">
                                <img src={wifi} alt="wifi icon"/>
                            </div>
                            <h2 className="amenity-title">Bezmaksas WiFi</h2>
                            <p className="amenity-description">Pastāvīgs interneta savienojums visa gaidīšanas laika</p>
                        </div>

                        <div className="amenity">
                            <div className="amenity-icon-wrapper">
                                <img src={coffee} alt="coffee icon"/>
                            </div>
                            <h2 className="amenity-title">Kafija un tēja</h2>
                            <p className="amenity-description">Bezmaksas dzērieni visiem mūsu klientiem</p>
                        </div>

                        <div className="amenity">
                            <div className="amenity-icon-wrapper">
                                <img src={sofa} alt="sofa icon"/>
                            </div>
                            <h2 className="amenity-title">Komfortabla zona</h2>
                            <p className="amenity-description">Mīksti dīvāni un mājīga atmosfēra jūsu komfortam</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;