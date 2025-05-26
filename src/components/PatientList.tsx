import React, { useEffect, useState } from 'react';
import { usePGlite } from '@electric-sql/pglite-react';

export interface PatientFormData {
  id?: number;
  firstname: string;
  lastname: string;
  dateofbirth: string;
  email: string;
  phone: string;
  address?: string;
  emergencyname: string;
  emergencyphone: string;
  allergies?: string;
  medications?: string;
}


const PatientList: React.FC = () => {
  const db = usePGlite();
  const [patients, setPatients] = useState<PatientFormData[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const results = await db.query(`SELECT * FROM Patients`);
        if (results.rows) {
          console.log('Fetched patients:', results.rows);
          setPatients(results.rows as PatientFormData[]);
        } else {
          console.log('No patients fetched.');
          setPatients([]);
        }
      } catch (error) {
        console.error('Failed to fetch patients:', error);
      }
    };

    fetchPatients();
  }, [db]);

  return (
    <div className="patient-list">
      <h2 className="patient-list-title">Registered Patients</h2>
      {patients.length === 0 ? (
        <div className="empty-state">
          <p className="empty-state-text">No patients registered yet.</p>
        </div>
      ) : (
        <div className="patient-grid">
          {patients.map(patient => (
            <div key={patient.id} className="patient-card">
              <div className="patient-card-content">
                <div>
                  <h3 className="patient-name" style={{ color: 'white' }}>
                    {patient.firstname} {patient.lastname}
                  </h3>
                  <p className="patient-dob" style={{ color: 'white' }}>DOB: {patient.dateofbirth}</p>
                </div>
                <div className="patient-contact">
                  <p style={{ color: 'white' }}>{patient.email}</p>
                  <p style={{ color: 'white' }}>{patient.phone}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientList;
