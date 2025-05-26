import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserCircle,Terminal } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  
  return (
    <header className="nav-header">
      <div className="nav-container">
        <div className="nav-content">
          <Link to="/" className="nav-brand">
            <UserCircle className="nav-brand-icon" />
            <h1 className="nav-brand-text">MediRegister</h1>
          </Link>
          
          <nav className="nav-links">
            <Link
              to="/"
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Register Patient
            </Link>
            <Link
              to="/patients"
              className={`nav-link ${location.pathname === '/patients' ? 'active' : ''}`}
            >
              View Patients
            </Link>
            <Link
              to="/query"
              className={`nav-link ${location.pathname === '/query' ? 'active' : ''}`}
            >
               <Terminal size={18} />
               <span>Execute Query</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navigation;