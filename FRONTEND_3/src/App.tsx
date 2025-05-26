import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'

import Showcase from './Pages/Showcase';
import SignUp from './Pages/SignUp';
import LogIn from './Pages/LogIn';

import Layout from './Pages/Layout';

import Songs from './Components/Songs';
import Tags from './Components/Tags';
import Youtube from './Components/Youtube';
import Social from './Components/Social';
import Settings from './Components/Settings';
import Page404 from './Components/Page404';
import DashboardTemp from './Pages/DashboardTemp';
import InviteAccess from './Pages/InviteAccess';
import { useEffect, useState } from 'react';
import SmallScreenPage from './Components/SmallScreenPage';

// comment

function App() {
    const [isLaptop, setIsLaptop] = useState(window.innerWidth >= 1024);

    useEffect(() => {
        const handleResize = () => {
            setIsLaptop(window.innerWidth >= 1024);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <BrowserRouter>
            {isLaptop ? (
                <Routes>
                    <Route path="/show" element={<Showcase />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/invite/:token" element={<InviteAccess />} />
                    <Route path="/" element={<Layout />}>
                        <Route index element={<DashboardTemp />} />
                        <Route path="songs" element={<Songs />} />
                        <Route path="tags" element={<Tags />} />
                        <Route path="youtube" element={<Youtube />} />
                        <Route path="social" element={<Social />} />
                        <Route path="settings" element={<Settings />} />
                    </Route>
                    <Route path="*" element={<Page404 />} />
                </Routes>
            ) : (
                <Routes>
                    <Route path="*" element={<SmallScreenPage />} />
                </Routes>
            )}
        </BrowserRouter>
    );
}

export default App
