import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './site-components/Navbar';
import DocLayout from './layouts/DocLayout';
import Home from './pages/Home';
import GettingStarted from './pages/GettingStarted';
import Design from './pages/Design';
import ButtonDoc from './pages/ButtonDoc';
import InputDoc from './pages/InputDoc';
import CardDoc from './pages/CardDoc';
import SwitchDoc from './pages/SwitchDoc';
import ThemeSwitchDoc from './pages/ThemeSwitchDoc';
import WalletDoc from './pages/WalletDoc';
import TooltipDoc from './pages/TooltipDoc';
import DatePickerDoc from './pages/DatePickerDoc';
import TimelineDoc from './pages/TimelineDoc';
import Bar3DDoc from './pages/Bar3DDoc';

const App: React.FC = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/docs" element={<DocLayout />}>
        <Route index element={<Navigate to="getting-started" replace />} />
        <Route path="getting-started" element={<GettingStarted />} />
        <Route path="design" element={<Design />} />
        <Route path="button" element={<ButtonDoc />} />
        <Route path="input" element={<InputDoc />} />
        <Route path="card" element={<CardDoc />} />
        <Route path="switch" element={<SwitchDoc />} />
        <Route path="theme-switch" element={<ThemeSwitchDoc />} />
        <Route path="wallet" element={<WalletDoc />} />
        <Route path="tooltip" element={<TooltipDoc />} />
        <Route path="date-picker" element={<DatePickerDoc />} />
        <Route path="timeline" element={<TimelineDoc />} />
        <Route path="bar3d" element={<Bar3DDoc />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;
