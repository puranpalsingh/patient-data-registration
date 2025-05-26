import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, AlertCircle } from 'lucide-react';
import type { PatientFormData } from '../types/patientTypes';

const STORAGE_KEY = 'patientFormData';

const PatientRegistrationForm: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<PatientFormData>(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      email: '',
      phone: '',
      address: '',
      emergencyName: '',
      emergencyPhone: '',
      allergies: '',
      medications: ''
    };
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    ['firstName', 'lastName', 'dateOfBirth', 'email', 'phone', 'emergencyName', 'emergencyPhone'].forEach(field => {
      if (!formData[field as keyof PatientFormData]) {
        newErrors[field] = 'Required';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  };

  if (submitted) {
    return (
      <div className="success-container">
        <CheckCircle className="success-icon" />
        <h2 className="success-title">Registration Complete!</h2>
        <p>Thank you for registering, {formData.firstName}.</p>
        <p className="success-text">Redirecting to patients list...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1 className="form-title">Patient Registration</h1>
      
      <div className="form-grid">
        <div className="form-group">
          <label className="form-label" style={{ color: 'white' }}>
            First Name <span className="required-mark">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={`form-input ${errors.firstName ? 'error' : ''}`}
          />
          {errors.firstName && <span className="error-message">{errors.firstName}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" style={{ color: 'white' }}>
            Last Name <span className="required-mark">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className={`form-input ${errors.lastName ? 'error' : ''}`}
          />
          {errors.lastName && <span className="error-message">{errors.lastName}</span>}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" style={{ color: 'white' }}>
          Date of Birth <span className="required-mark">*</span>
        </label>
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleInputChange}
          className={`form-input ${errors.dateOfBirth ? 'error' : ''}`}
        />
        {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label className="form-label" style={{ color: 'white' }}>
            Email <span className="required-mark">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`form-input ${errors.email ? 'error' : ''}`}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" style={{ color: 'white' }}>
            Phone <span className="required-mark">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={`form-input ${errors.phone ? 'error' : ''}`}
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" style={{ color: 'white' }}>Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          className="form-input"
        />
      </div>

      <div className="emergency-section">
        <h2 className="emergency-title">Emergency Contact</h2>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label" style={{ color: 'black' }}>
              Name <span className="required-mark">*</span>
            </label>
            <input
              type="text"
              name="emergencyName"
              value={formData.emergencyName}
              onChange={handleInputChange}
              className={`form-input ${errors.emergencyName ? 'error' : ''}`}
            />
            {errors.emergencyName && <span className="error-message">{errors.emergencyName}</span>}
          </div>

          <div className="form-group">
            <label className="form-label" style={{ color: 'black' }}>
              Phone <span className="required-mark">*</span>
            </label>
            <input
              type="tel"
              name="emergencyPhone"
              value={formData.emergencyPhone}
              onChange={handleInputChange}
              className={`form-input ${errors.emergencyPhone ? 'error' : ''}`}
            />
            {errors.emergencyPhone && <span className="error-message">{errors.emergencyPhone}</span>}
          </div>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" style={{ color: 'white' }}>Allergies</label>
        <textarea
          name="allergies"
          value={formData.allergies}
          onChange={handleInputChange}
          className="form-textarea"
          rows={2}
          placeholder="List any allergies, or type 'None'"
        />
      </div>

      <div className="form-group">
        <label className="form-label" style={{ color: 'white' }}>Current Medications</label>
        <textarea
          name="medications"
          value={formData.medications}
          onChange={handleInputChange}
          className="form-textarea"
          rows={2}
          placeholder="List current medications, or type 'None'"
        />
      </div>

      {Object.keys(errors).length > 0 && (
        <div className="error-alert">
          <AlertCircle className="error-alert-icon" />
          Please fill in all required fields
        </div>
      )}

      <button type="submit" className="submit-button">
        Submit Registration
      </button>
    </form>
  );
};

export default PatientRegistrationForm;
