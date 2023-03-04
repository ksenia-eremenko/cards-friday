import React from 'react';
import { Route, Routes } from 'react-router-dom';
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


function App() {
  return (
    <div className="App">
      <BgOverlay />
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/home" element={<Profile />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recovery-password" element={<RecoveryPassword />} />
          <Route path="/new-password" element={<NewPassword />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
