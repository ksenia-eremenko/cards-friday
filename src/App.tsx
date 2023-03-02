import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import "./styles/main.scss";
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import NewPassword from './components/NewPassword/NewPassword';
import NotFound from './components/NotFound/NotFound';
import Profile from './components/Profile/Profile';
import RecoveryPassword from './components/RecoveryPassword/RecoveryPassword';
import Registration from './components/Registration/Registration';
import BgOverlay from './components/common/BgOverlay/BgOverlay';

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
