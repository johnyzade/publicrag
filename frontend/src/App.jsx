import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Registration from './components/Registration';
import EmailVerification from './components/EmailVerification';
import MFASetup from './components/MFASetup';
import Login from './components/Login';
import Chat from './Chat';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Registration />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/email-verification" element={<EmailVerification />} />
      <Route path="/mfa-setup" element={<MFASetup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;