import * as React from 'react';
import { Button, Box, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return (
        <MuiAlert 
            elevation={6} 
            ref={ref} 
            variant="filled" 
            {...props} 
            sx={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                borderRadius: '4px',
                fontSize: '0.95rem',
                backgroundColor: props.severity === 'success' ? '#1e4620' : '#2c1c1c', // Темный благородный фон для алертов
                color: props.severity === 'success' ? '#4caf50' : '#f44336',
                border: `1px solid ${props.severity === 'success' ? '#4caf50' : '#f44336'}`,
                '& .MuiAlert-icon': {
                    color: props.severity === 'success' ? '#4caf50' : '#f44336'
                }
            }}
        />
    );
});

export default function SubmitButton({ formData, dateTime }) {
    const API_URL = "https://apex-co33.onrender.com/send-email";
    const [snackbar, setSnackbar] = React.useState({ open: false, message: '', severity: 'info' });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbar({ ...snackbar, open: false });
    };

    const showSnackbar = (message, severity = 'error') => {
        setSnackbar({ open: true, message, severity });
    };

    const handleClick = async () => {
        if (!dateTime?.time) {
            showSnackbar('Lūdzu, izvēlieties laiku.', 'error');
            return;
        }

        if (!formData?.fullName || !formData?.phone || !formData?.car) {
            showSnackbar('Lūdzu, ievadiet datus.', 'error');
            return;
        }

        if (!formData?.consent) {
            showSnackbar('Ja jūs neesat piekritis datu apstrādes noteikumiem, diemžēl mēs nevarēsim apstrādāt jūsu pieprasījumu.', 'error');
            return;
        }

        try {
            const response = await fetch(`${API_URL}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName: formData?.fullName ?? '',
                    email: formData?.email ?? '',
                    phone: formData?.phone ?? '',
                    car: formData?.car ?? '',
                    description: formData?.description ?? '',
                    date: dateTime?.date ? dateTime.date.toLocaleDateString() : '',
                    time: dateTime?.time ?? ''
                }),
            });

            const data = await response.json();

            if (response.ok) {
                showSnackbar('Jūs esat pierakstīts! Gaidām jūs Apex Motors!', 'success');
            } else {
                showSnackbar('Kaut kas nogāja greizi. Zvaniet mums, lai pierakstītos!\n ' + (data.error || ''), 'error');
            }
        } catch (err) {
            showSnackbar('Kaut kas nogāja greizi. Zvaniet mums, lai pierakstītos!', 'error');
        }
    };

    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
            <Button
                onClick={handleClick}
                disableElevation
                sx={{
                    backgroundColor: '#ffc600',
                    color: '#000000',
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 700,
                    fontSize: '1.25rem',
                    letterSpacing: '1.5px',
                    padding: '14px 60px', // Широкая и солидная кнопка, как на макете
                    borderRadius: '6px',
                    textTransform: 'uppercase',
                    transition: 'all 0.2s ease-in-out',
                    boxShadow: '0 4px 15px rgba(255, 198, 0, 0.3)',
                    '&:hover': {
                        backgroundColor: '#e6b200',
                        boxShadow: '0 6px 20px rgba(255, 198, 0, 0.5)',
                        transform: 'translateY(-1px)'
                    },
                    '&:active': {
                        transform: 'translateY(1px)'
                    }
                }}
            >
                PIETEIKTIES
            </Button>
            
            <Snackbar
                open={snackbar.open}
                autoHideDuration={5000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Box>
                    <Alert onClose={handleClose} severity={snackbar.severity}>
                        {snackbar.message}
                    </Alert>
                </Box>
            </Snackbar>
        </Box>
    );
}