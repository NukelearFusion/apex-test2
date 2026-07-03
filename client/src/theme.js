import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#000000',
            paper: '#111111',
        },
        text: {
            primary: '#ffffff',
        },
        primary: {
            main: '#ffd800',
        },
    },
    components: {
        // 1. Стили для самого квадратика (Checkbox)
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: 'whitesmoke', // Цвет пустой рамки
                    '&.Mui-checked': {
                        color: '#ffd800', // Цвет галочки и рамки при выборе (ваше золото)
                        fontSize: '0.7rem',
                    },
                },
            },
        },

        // 2. Стили для текста-подписи (FormControlLabel)
        MuiFormControlLabel: {
            styleOverrides: {
                label: {
                    color: 'whitesmoke', // Цвет текста
                    fontSize: '0.8rem',  // Чуть меньший размер шрифта (удобно для длинных согласий)
                    lineHeight: 1.4,     // Межстрочный интервал для читаемости
                },
                root: {
                    // Отступ справа, если нужно выравнивание
                    marginRight: 0,
                }
            },
        },
        MuiPickersDay: {
            styleOverrides: {
                root: {
                    color: 'whitesmoke',
                    '&.Mui-disabled': {
                        color: '#777777',
                    },
                    '&.Mui-selected': {
                        backgroundColor: '#ffd800',
                        color: '#000000',
                        fontWeight: 'bold',
                    },
                    '&.Mui-selected:hover': {
                        backgroundColor: '#ffd800',
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                outlined: {
                    minWidth: 0,
                    padding: '4px 12px',
                    fontSize: '0.9rem',
                    borderRadius: '6px',
                    borderWidth: '2px',
                    borderColor: 'whitesmoke',
                    color: 'whitesmoke',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    '&.timeButton-selected': {
                        backgroundColor: '#ffd800',
                        color: '#000000',
                    },
                },
            },
            variants: [
                {
                    props: { variant: 'primaryCta' },
                    style: {
                        backgroundColor: '#ffd800',
                        color: '#111',
                        fontWeight: 'bold',
                        fontSize: '1.3rem',
                        borderRadius: '8px',
                        boxShadow: '0px 4px 8px rgba(0,0,0,0.12)',
                        padding: '12px 36px',
                        letterSpacing: '0.5px',
                        textTransform: 'none',
                        '&:hover': {
                            backgroundColor: '#ffc800',
                        },
                    },
                },
            ],
        },
        MuiTextField: {
            defaultProps: {
                fullWidth: true,        // все TextField по умолчанию на 100%
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    width: '100%',
                    color: 'whitesmoke',
                    '& fieldset': {
                        borderColor: 'whitesmoke',
                    },
                    '&:hover fieldset': {
                        borderColor: 'whitesmoke',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#ffd800',
                    },
                },
                input: {
                    color: 'whitesmoke',
                    '&::placeholder': {
                        color: 'whitesmoke',
                        opacity: 1,
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: 'whitesmoke',
                },
                outlined: {
                    '&.Mui-focused': {
                        color: '#ffd800',
                    },
                },
            },
        },
    },
});

export default theme;
