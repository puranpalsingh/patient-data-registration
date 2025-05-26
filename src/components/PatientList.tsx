import React, { useEffect, useState } from 'react';





const PatientList: React.FC = () => {
  
  const [patients, setPatients] = useState<PatientFormData[]>([]);

  
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