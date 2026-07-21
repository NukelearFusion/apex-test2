import { ThemeProvider, CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import theme from './theme';
import './App.css';

import appointmentIcon from './img/icons/appointment.png'
import carIcon from './img/icons/car-service.png'
import addressIcon from './img/icons/address.png'
import toolsIcon from './img/icons/tools.png'

import Header from './common components/Header';
import Banner from './common components/Banner';
import Registration from './registration/Registration';
import Footer from './common components/Footer';

import Home from './lapas/Home'; 
import About from "./lapas/About";
import Contacts from "./lapas/Contacts";
import Services from "./lapas/Services";
import Shop from "./lapas/Shop";

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            
            <div className="app-wrapper">
                <Header />

                <main className='main-content'>
                    <Routes>
                        {/* 1. ГЛАВНАЯ СТРАНИЦА: Открывает только Home (где лежит твоя карусель) */}
                        <Route path="/" element={<Home />} />

                        {/* 2. СТРАНИЦА ЗАПИСИ: Открывает форму и её баннер */}
                        <Route path="/pieraksts" element={
                            <>
                                <Banner title="ONLINE PIERAKSTS" icon={appointmentIcon} />
                                <Registration />
                            </>
                        } />

                        <Route path="/par-mums" element={
                            <>
                                <Banner title="PAR MUMS" icon={carIcon} />
                                <About />
                            </>
                        } />

                        <Route path="/kontakti" element={
                            <>
                                <Banner title="KONTAKTI" icon={addressIcon} />
                                <Contacts />
                            </>
                        } />

                        <Route path="/pakalpojumi" element={
                            <>
                                <Banner title="VISI PAKALPOJUMI" icon={toolsIcon} />
                                <Services />
                            </>
                        } />
                        <Route path="/veikals" element={
    <>
        <Banner title="AUTO TIRDZNIECĪBA" icon={carIcon} />
        <Shop />
    </>
} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </ThemeProvider>
    );
};

export default App;