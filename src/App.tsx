import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Navigation from './components/Navigation';

import PatientList from './components/PatientList';
import PatientRegistrationForm from './components/PatientRegistrationForm';

import './styles/main.css';


function App() {
  

  return (
    
      <BrowserRouter>
        <div>
          <Navigation />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<PatientRegistrationForm />} />
              <Route path="/patients" element={<PatientList />} />
              
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    
  );
}

export default App;