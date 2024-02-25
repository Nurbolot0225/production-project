import React, {Suspense} from 'react';
import {Link, Route, Routes} from 'react-router-dom';
import {AboutPageAsync} from './pages/AboutPage/AboutPage.async';
import {MainPageAsync} from './pages/MainPage/MainPage.async';
import './styles/index.scss'
import {useTheme} from './theme/useTheme';


const App = () => {
    const {theme, toggleTheme} = useTheme()

    return (
        <div className={`app ${theme}`}>
            <button onClick={toggleTheme}>TOGGLE</button>
            <Link to='/'>main</Link>
            <Link to='/about'>about</Link>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route
                        path={'/'}
                        element={<MainPageAsync />}
                    />
                    <Route
                        path={'/about'}
                        element={<AboutPageAsync />}
                    />
                </Routes>
            </Suspense>
        </div>
    );
};

export default App;