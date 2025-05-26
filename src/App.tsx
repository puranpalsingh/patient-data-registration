import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PGlite, IdbFs } from '@electric-sql/pglite';
import { live } from '@electric-sql/pglite/live';
import type { PGliteWithLive } from '@electric-sql/pglite/live';
import { PGliteProvider } from '@electric-sql/pglite-react';

import Navigation from './components/Navigation';
import PatientRegistrationForm from './components/PatientRegistration';
import PatientList from './components/PatientList';

import './styles/main.css';
import ExecuteQuery from './components/ExecuteQuery';


function App() {
  const [db, setDb] = useState<PGliteWithLive | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
       
        const dbInstance = await PGlite.create({
          fs: new IdbFs('patient-db'),
          extensions: { live },
         
          dataDir: 'patient-db',
          debug: 0
        }) as unknown as PGliteWithLive;

        
        await dbInstance.exec('SELECT 1');

        
        await dbInstance.exec(`
          CREATE TABLE IF NOT EXISTS Patients (
            id SERIAL PRIMARY KEY,
            firstName TEXT NOT NULL,
            lastName TEXT NOT NULL,
            dateOfBirth TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            address TEXT,
            emergencyName TEXT NOT NULL,
            emergencyPhone TEXT NOT NULL,
            allergies TEXT,
            medications TEXT
          );
        `);

        setDb(dbInstance);
      } catch (error) {
        console.error('Failed to initialize database:', error);
      }
    };

    init();
  }, []);

  if (!db) {
    return <div>Initializing database...</div>;
  }

  return (
    <PGliteProvider db={db}>
      <BrowserRouter>
        <div>
          <Navigation />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<PatientRegistrationForm />} />
              <Route path="/patients" element={<PatientList />} />
             <Route path='/query' element= {<ExecuteQuery/>}/>
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </PGliteProvider>
  );
}

export default App;