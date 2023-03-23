import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import BgOverlay from '../components/common/BgOverlay/BgOverlay';
import Header from '../components/Header/Header';
import Login from '../pages/Login/Login';
import NewPassword from '../pages/NewPassword/NewPassword';
import NotFound from '../pages/NotFound/NotFound';
import Registration from '../pages/Registration/Registration';
import Profile from '../pages/Profile/Profile';
import './App.scss';
import "../styles/main.scss";
import RecoveryPassword from '../pages/RecoveryPassword/RecoveryPassword';
import CheckEmail from '../pages/CheckEmail/CheckEmail';
import {useAppDispatch, useAppSelector} from '../store/store';
import {me} from '../store/auth-reducer';
import Preloader from '../components/common/Preloader/Preloader';
import Packs from '../pages/Packs/Packs';
import Cards from '../pages/Cards/Cards';
import {Learn} from "../pages/Learn/Learn";


function App() {
    const dispatch = useAppDispatch();
    const isInitialized = useAppSelector(state => state.app.isInitialized);

    useEffect(() => {
        dispatch(me())
    }, [dispatch])


    return (
        <div className="App">
            <BgOverlay/>
            <Header/>

            {!isInitialized
                ? <Preloader/>
                : <div className="content">
                    <Routes>
                        <Route path="/" element={<Profile/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/registration" element={<Registration/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/recovery-password" element={<RecoveryPassword/>}/>
                        <Route path="/set-new-password/:token" element={<NewPassword/>}/>
                        <Route path="/check-email" element={<CheckEmail/>}/>
                        <Route path="/packs" element={<Packs/>}/>
                        <Route path="/cards" element={<Cards/>}/>
                        <Route path="/learn" element={<Learn/>}/>
                        <Route path="/*" element={<NotFound/>}/>
                    </Routes>
                </div>
            }
        </div>
    );
}

export default App;
