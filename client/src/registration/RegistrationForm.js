import * as React from 'react';
import { Box, TextField, Checkbox, FormControlLabel, Link, Dialog, DialogTitle, DialogContent } from '@mui/material';
import './RegistrationForm.css';
import { useState } from "react";

export default function CustomForm({ data, onChange }) {
    const [errors, setErrors] = useState({});
    const [open, setOpen] = useState(false);

    const validate = (field, value) => {
        if (['fullName', 'phone', 'car', 'consent'].includes(field)) {
            if (!value || value.trim() === '') {
                return 'Šis lauks ir obligāts';
            }
        }
        return '';
    };

    const handleChange = (field) => (event) => {
        const value = event.target.value;
        onChange({ ...data, [field]: value });
        
        // Optional: Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleBlur = (field) => (event) => {
        const value = event.target.value;
        const error = validate(field, value);
        setErrors(prev => ({ ...prev, [field]: error }));
    };

    const handleOpenPolicy = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setOpen(true);
    };

    const handleClosePolicy = () => setOpen(false);

    return (
        <Box className="registration-form">
            <TextField
                label="Vārds un uzvārds"
                variant="outlined"
                value={data.fullName}
                onChange={handleChange('fullName')}
                onBlur={handleBlur('fullName')}
                error={Boolean(errors.fullName)}
                // Reserve space with a blank string (' ') to prevent layout shift
                helperText={errors.fullName || ' '} 
                required
            />
            <TextField
                label="E-pasts"
                variant="outlined"
                value={data.email}
                onChange={handleChange('email')}
                onBlur={handleBlur('email')}
                // Keeping consistent height with other fields
                helperText=" " 
            />
            <TextField
                label="Telefona numurs"
                variant="outlined"
                value={data.phone}
                onChange={handleChange('phone')}
                onBlur={handleBlur('phone')}
                error={Boolean(errors.phone)}
                helperText={errors.phone || ' '}
                required
            />
            <TextField
                label="Auto reģistrācijas numurs"
                variant="outlined"
                value={data.car}
                onChange={handleChange('car')}
                onBlur={handleBlur('car')}
                error={Boolean(errors.car)}
                helperText={errors.car || ' '}
                required
            />
            <TextField
                label="Īss situācijas apraksts"
                variant="outlined"
                value={data.description}
                onChange={handleChange('description')}
                multiline
                minRows={3}
                // This one already had a constant string, so it didn't jump
                helperText={`${data.description.length}/256`}
            />
            <FormControlLabel
                control={
                    <Checkbox
                        value={data.consent}
                        onChange={handleChange('consent')}
                        required
                        sx={{
                            color: '#555',
                            '&.Mui-checked': {
                                color: '#ffc600',
                            },
                        }}
                    />
                }
                label={
                    <>
                        Es piekrītu Apexmotors.lv{' '}
                        <Link
                            component="button"
                            type="button"
                            onClick={handleOpenPolicy}
                            sx={{ textDecoration: 'underline', cursor: 'pointer', p: 0 }}
                        >
                            privātuma politikai
                        </Link>
                        . Ievadot savus kontaktdatus, es piekrītu saņemt paziņojumus par autoservisa pakalpojumiem.
                    </>
                }
            />

            <Dialog 
                open={open} 
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
        </Box>
    );
}