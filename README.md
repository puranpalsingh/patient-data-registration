# Patient Data Query Interface

A modern, user-friendly interface for executing SQL queries against patient data using PGlite.

## Features

- **Interactive SQL Query Editor**
  - Syntax highlighting
  - Keyboard shortcuts (Ctrl+Enter to execute)
  - Copy query functionality
  - Query parameter support

- **Sample Queries**
  - Pre-built queries for common operations
  - Easy to use with one-click execution
  - Examples include:
    - View all patients
    - Get patient count
    - Find patient by ID

- **Query Parameters**
  - Support for parameterized queries
  - Input validation
  - JSON array format support

- **Results Display**
  - Clean, tabular results view
  - Success/error status indicators
  - Detailed error messages
  - Sortable columns

## Database Schema

The application uses PGlite with the following schema:

```sql
CREATE TABLE IF NOT EXISTS Patients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
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
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:5713`

## Usage

1. **Writing Queries**
   - Use the query editor to write your SQL
   - Use `$1`, `$2`, etc. for parameters
   - Example: `SELECT * FROM patients WHERE id = $1`

2. **Adding Parameters**
   - Enter parameters as comma-separated values
   - Example: `1` or `[1, 'test']`
   - Parameters will be automatically bound to the query

3. **Executing Queries**
   - Click the "Execute Query" button
   - Or use Ctrl+Enter keyboard shortcut
   - Results will appear below the editor

## Development

Built with:
- React
- TypeScript
- PGlite for SQL execution
- Modern CSS with CSS variables

### Database Setup

The application uses PGlite with live query support. The database is initialized in `src/lib/db.ts` and includes:
- Automatic table creation
- Live query capabilities
- SQLite-compatible syntax

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
