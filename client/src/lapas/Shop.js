import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Checkbox, FormControlLabel, Link as MuiLink } from '@mui/material';
import './Shop.css';
import buycarIcon from '../img/icons/buycar.svg';
import sellcarIcon from '../img/icons/sellcar.svg';

const Shop = () => {
    const [activeSection, setActiveSection] = useState(null);
    const [openItem, setOpenItem] = useState(null);
    const [status, setStatus] = useState('');
    const [openPolicy, setOpenPolicy] = useState(false);
    
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        carInfo: '',
        description: '',
        photo: null,
        consent: false
    });
    
    const detailsRef = useRef(null);

    useEffect(() => {
        document.title = "Veikals - Apex Motors";
    }, []);

    useEffect(() => {
        if (activeSection && detailsRef.current) {
            setTimeout(() => {
                detailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }, [activeSection]);

    const handleSectionClick = (section) => {
        if (activeSection === section) {
            setActiveSection(null);
            setOpenItem(null);
        } else {
            setActiveSection(section);
            setOpenItem(null);
            setStatus('');
        }
    };

    const toggleItem = (item) => {
        setOpenItem(openItem === item ? null : item);
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const handleCheckboxChange = (e) => {
        setFormData(prev => ({
            ...prev,
            consent: e.target.checked
        }));
    };

    const handleOpenPolicy = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setOpenPolicy(true);
    };

    const handleClosePolicy = () => setOpenPolicy(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.phone || !formData.carInfo || !formData.description || !formData.photo || !formData.consent) {
            setStatus('error');
            return;
        }

        setStatus('loading');
        
        try {
            const payload = new FormData();
            payload.append('name', formData.name);
            payload.append('phone', formData.phone);
            payload.append('carInfo', formData.carInfo);
            payload.append('description', formData.description);
            payload.append('photo', formData.photo);

            const response = await fetch('https://apex-test2.onrender.com/send-shop', {
                method: 'POST',
                body: payload
            });

            if (response.ok) {
                setStatus('success');
                setFormData({
                    name: '',
                    phone: '',
                    carInfo: '',
                    description: '',
                    photo: null,
                    consent: false
                });
                if (e.target.photo) e.target.photo.value = '';
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <div className="shop-section">
            <div className="shop-container">
                
                <div className="shop-grid">
                    <div 
                        className={`shop-card ${activeSection === 'buy' ? 'active' : ''}`}
                        onClick={() => handleSectionClick('buy')}
                    >
                        <div className="shop-icon">
                            <img src={buycarIcon} alt="Pirkt auto" />
                        </div>
                        <h3 className="shop-card-title">Pirkt un pārdot<br/>automašīnu</h3>
                        <p className="shop-card-desc">Piedāvājumā esošie auto un pirkšanas iespējas.</p>
                    </div>

                    <div 
                        className={`shop-card ${activeSection === 'sell' ? 'active' : ''}`}
                        onClick={() => handleSectionClick('sell')}
                    >
                        <div className="shop-icon">
                            <img src={sellcarIcon} alt="Pārdot auto" />
                        </div>
                        <h3 className="shop-card-title">Piedāvāt auto<br/>servisam</h3>
                        <p className="shop-card-desc">Aizpildiet formu, lai piedāvātu savu auto uzpirkšanai.</p>
                    </div>
                </div>

                {activeSection && (
                    <div className="shop-details" ref={detailsRef}>
                        <div className="shop-divider"></div>
                        <h2 className="shop-selected-title">
                            {activeSection === 'buy' ? 'PIRKT VAI PĀRDOT AUTO' : 'PIEDĀVĀT AUTO UZPIRKŠANAI'}
                        </h2>

                        {activeSection === 'buy' && (
                            <div className="shop-items-container">
                                <div className={`shop-item ${openItem === 'testauto' ? 'open' : ''}`}>
                                    <button 
                                        className="shop-item-header"
                                        onClick={() => toggleItem('testauto')}
                                    >
                                        <span>TestAuto 2024</span>
                                        <span className={`arrow ${openItem === 'testauto' ? 'open' : ''}`}>▼</span>
                                    </button>
                                    
                                    {openItem === 'testauto' && (
                                        <div className="shop-item-content">
                                            <p>Šeit atradīsies informācija par automašīnu, tehniskie dati, cena un apraksts. Pagaidām šis ir tikai vietturis (placeholder) dizaina pārbaudei.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeSection === 'sell' && (
                            <div className="shop-form-wrapper">
                                <form className="shop-form" onSubmit={handleSubmit}>
                                    
                                    <div className="shop-input-group">
                                        <input type="text" id="name" name="name" placeholder="VĀRDS UN UZVĀRDS *" required value={formData.name} onChange={handleInputChange} />
                                    </div>
                                    
                                    <div className="shop-input-group">
                                        <input type="tel" id="phone" name="phone" placeholder="TELEFONA NUMURS *" required value={formData.phone} onChange={handleInputChange} />
                                    </div>

                                    <div className="shop-input-group">
                                        <input type="text" id="carInfo" name="carInfo" placeholder="AUTO MARKA, MODELIS UN GADS *" required value={formData.carInfo} onChange={handleInputChange} />
                                    </div>

                                    <div className="shop-input-group">
                                        <textarea id="description" name="description" placeholder="ĪSS SITUĀCIJAS APRAKSTS (STĀVOKLIS, DEFEKTI) *" required value={formData.description} onChange={handleInputChange}></textarea>
                                    </div>

                                    <div className="shop-input-group file-group">
                                        <input type="file" id="photo" name="photo" accept="image/*" required onChange={handleInputChange} />
                                        {!formData.photo && <div className="file-placeholder">PIEVIENOT AUTO FOTO *</div>}
                                    </div>

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={formData.consent}
                                                onChange={handleCheckboxChange}
                                                required
                                                sx={{
                                                    color: '#555',
                                                    '&.Mui-checked': {
                                                        color: '#ffc600',
                                                    },
                                                    mt: '-3px'
                                                }}
                                            />
                                        }
                                        label={
                                            <span className="shop-checkbox-text">
                                                Es piekrītu Apexmotors.lv{' '}
                                                <MuiLink
                                                    component="button"
                                                    type="button"
                                                    onClick={handleOpenPolicy}
                                                    sx={{ 
                                                        textDecoration: 'underline', 
                                                        cursor: 'pointer', 
                                                        p: 0, 
                                                        color: '#ffc600', 
                                                        fontFamily: 'Montserrat, sans-serif',
                                                        fontWeight: 600,
                                                        fontSize: '0.9rem',
                                                        verticalAlign: 'baseline',
                                                        '&:hover': { color: '#fff', textDecorationColor: '#fff' }
                                                    }}
                                                >
                                                    privātuma politikai
                                                </MuiLink>
                                                . Ievadot savus kontaktdatus, es piekrītu saņemt paziņojumus par autoservisa pakalpojumiem. *
                                            </span>
                                        }
                                        sx={{ alignItems: 'flex-start', margin: 0, mt: 1 }}
                                    />

                                    <button type="submit" className="shop-submit-btn" disabled={status === 'loading'}>
                                        {status === 'loading' ? 'Sūta...' : 'Piedāvāt auto'}
                                    </button>

                                    {status === 'success' && (
                                        <div className="shop-form-message success">
                                            Paldies! Jūsu piedāvājums ir saņemts. Mēs ar Jums sazināsimies.
                                        </div>
                                    )}
                                    {status === 'error' && (
                                        <div className="shop-form-message error">
                                            Radās kļūda sūtot datus. Lūdzu mēģiniet vēlreiz.
                                        </div>
                                    )}
                                </form>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <Dialog 
                open={openPolicy} 
                onClose={handleClosePolicy} 
                maxWidth="md" 
                fullWidth
                PaperProps={{ className: 'policy-dialog-paper' }}
            >
                <DialogTitle>Privātuma politika</DialogTitle>
                <DialogContent dividers className='policy'>
                    {"Šī privātuma politika apraksta personas datu apstrādi, kurus jūs sniedzat, izmantojot pieraksta formu autoservisā Apex Motors. Ievadot savus datus (vārdu, tālruņa numuru, e-pasta adresi, informāciju par automašīnu un vēlamo apmeklējuma laiku), jūs apstiprināt, ka darāt to brīvprātīgi un ka dati ir precīzi un aktuāli." +
                        "\n\n" +
                        "Personas dati tiek apstrādāti šādiem mērķiem:\n" +
                        "- lai reģistrētu un apstiprinātu jūsu pierakstu automašīnas apkopei;\n" +
                        "- lai sazinātos ar jums par pierakstu, precizētu darbus, mainītu apmeklējuma laiku un nosūtītu atgādinājumus;\n" +
                        "- lai sagatavotu tāmi un noformētu darba uzdevumu;\n" +
                        "- grāmatvedības un nodokļu uzskaitei, kā arī likumdošanas prasību izpildei.\n\n" +
                        "Datu apstrādes tiesiskais pamats ir līguma izpilde (vai darbības, kas nepieciešamas līguma noslēgšanai pēc jūsu pieprasījuma), kā arī juridisko pienākumu izpilde. Atsevišķos gadījumos (piemēram, lai nosūtītu reklāmas piedāvājumus un informāciju par autoservisa akcijām) dati var tikt izmantoti tikai ar jūsu atsevišķu piekrišanu, kuru jūs jebkurā laikā varat atsaukt, izmantojot atgriezeniskās saites formu vai sazinoties ar mums, izmantojot zemāk norādītos kontaktus.\n\n" +
                        "Jūsu dati var tikt nodoti tikai tām personām, kas ir iesaistītas pakalpojumu sniegšanā un informācijas sistēmu uzturēšanā (piemēram, IT pakalpojumu sniedzējiem un hostinga pakalpojumu sniedzējiem), un tikai tādā apjomā, kāds nepieciešams iepriekš minēto mērķu sasniegšanai. Visām šīm personām ir pienākums nodrošināt personas datu konfidencialitāti un drošību.\n\n" +
                        "Dati tiek glabāti ne ilgāk, kā nepieciešams autoservisa pakalpojumu noformēšanai un izpildei, kā arī termiņos, kas noteikti likumdošanā attiecībā uz grāmatvedības un citiem obligātajiem dokumentiem. Pēc glabāšanas termiņa beigām dati tiek dzēsti vai droši anonimizēti.\n\n" +
                        "Jums ir tiesības pieprasīt piekļuvi saviem personas datiem, neprecīzu datu labošanu, to dzēšanu, apstrādes ierobežošanu, kā arī iebilst pret apstrādi un pieprasīt datu pārnesamību spēkā esošo tiesību aktu ietvaros. Lai īstenotu savas tiesības vai ja rodas jautājumi saistībā ar personas datu apstrādi, jūs varat sazināties ar mums pa e-pastu: info@apexmotors.lv."}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Shop;