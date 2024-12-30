import React from "react";
import Body from "./Components/Body/Body"
import Header from "./Components/Header/Header";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 

import LandingPage from './pages/LandingPage';
import Account from './Components/Account';
import CoverLetterHelp from './Components/CoverLetterHelp';
import CoverLetterBuilder from './Components/CoverLetterBuilder';
import Contact from './Components/Contact';
import HowToCoverLetter from './Components/HowToCoverLetter';
import CoverLetter from './Components/CoverLetter';
import Payment from './Components/Payment';
import Navbar from "./Components/Nav/Navbar";
import DashboardPage from './Components/DashboardPage';
import Signup from './Components/Signup';
import Login from './Components/Login/Login';
import TemplatePage from './Components/TemplatePage';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
<Router>
<div className="App">
<Navbar/>
  <Routes>
  <Route path="/account" element={<Account />} />
          <Route path="/cover-letter-help" element={<CoverLetterHelp />} />
          <Route path="/cover-letter-builder" element={<CoverLetterBuilder />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/how-to-cover-letter" element={<HowToCoverLetter />} />
          <Route path="/cover-letter" element={<CoverLetter />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/resume" element={<Body />} />
          <Route path="/template" element={<TemplatePage />} />
  </Routes>
</div>
</Router>
  );
}

export default App;