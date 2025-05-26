import React, { useState } from 'react';
import '../styles/ExecuteQuery.css';
import { Play, Copy, Check, HelpCircle } from 'lucide-react';
import { usePGlite } from '@electric-sql/pglite-react';

interface QueryResult {
  status: 'success' | 'error';
  message: string;
  data?: any[];
  error?: string;
}

const sampleQueries = {
  'All Patients': 'SELECT * FROM patients',
  'Patient Count': 'SELECT COUNT(*) as total FROM patients',
  'Patient by ID': 'SELECT * FROM patients WHERE id=$1'
};

const ExecuteQuery: React.FC = () => {
  const [query, setQuery] = useState('');
  const [parameters, setParameters] = useState('');
  const [result, setResult] = useState<QueryResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const db = usePGlite();

  const handleExecute = async () => {
    if (!query.trim()) {
      setResult({
        status: 'error',
        message: 'Query cannot be empty',
      });
      return;
    }
  
    try {
      let params: any[] = [];
      try {
        if (parameters.trim()) {
          params = JSON.parse(`[${parameters}]`);
        }
      } catch (e) {
        setResult({
          status: 'error',
          message: 'Invalid parameters format',
          error: 'Parameters must be comma-separated values or a valid JSON array',
        });
        return;
      }
  
      const resultData = await db.query(query, params);
  
      setResult({
        status: 'success',
        message: 'Query executed successfully',
        data: resultData.rows || [],
      });
    } catch (error) {
      setResult({
        status: 'error',
        message: 'Error executing query',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };
  

  const handleCopy = () => {
    navigator.clipboard.writeText(query);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSampleQuery = (queryText: string) => {
    setQuery(queryText);
    setResult(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'Enter') {
      handleExecute();
    }
  };

  const renderResultTable = (data: any[]) => {
    if (!data.length) return null;

    const columns = Object.keys(data[0]);

    return (
      <div className="result-table-container">
        <table className="result-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column}>{row[column]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="execute-query">
      <div className="sample-queries">
        <h3>Sample Queries:</h3>
        <div className="query-buttons">
          {Object.entries(sampleQueries).map(([name, queryText]) => (
            <button
              key={name}
              className="sample-query-button"
              onClick={() => handleSampleQuery(queryText)}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <div className="query-editor">
        <div className="editor-header">
          <div className="header-left">
            <h2>SQL Query</h2>
            <span className="keyboard-hint">(Ctrl+Enter to execute)</span>
          </div>
          <div className="editor-actions">
            <button
              className="action-button"
              onClick={() => setShowHelp(!showHelp)}
              title="Show help"
            >
              <HelpCircle size={16} />
            </button>
            <button
              className="action-button"
              onClick={handleCopy}
              title="Copy query"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
        </div>
        
        {showHelp && (
          <div className="help-panel">
            <h4>Query Guidelines:</h4>
            <ul>
              <li>Use SELECT queries to retrieve data</li>
              <li>Parameters can be used with :paramName syntax</li>
              <li>Results are limited to 1000 rows by default</li>
            </ul>
          </div>
        )}

        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter your SQL query here..."
          spellCheck={false}
        />

        <div className="parameters-section">
          <label htmlFor="parameters">Query Parameters</label>
          <input
            id="parameters"
            type="text"
            value={parameters}
            onChange={(e) => setParameters(e.target.value)}
            placeholder="e.g., 1, 'test', true or [1, 'test', true]"
          />
        </div>

        <button className="execute-button" onClick={handleExecute}>
          <Play size={16} />
          Execute Query
        </button>
      </div>

      {result && (
        <div className={`query-result ${result.status}`}>
          <div className="result-header">
            <h3>Query Results</h3>
            <span className={`status-badge ${result.status}`}>
              {result.status === 'success' ? 'Success' : 'Error'}
            </span>
          </div>
          <p className="result-message">{result.message}</p>
          {result.error && <pre className="error-details">{result.error}</pre>}
          {result.data && renderResultTable(result.data)}
        </div>
      )}
    </div>
  );
};

export default ExecuteQuery;