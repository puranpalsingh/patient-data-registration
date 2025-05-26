
import { PGlite } from '@electric-sql/pglite';
import { live } from '@electric-sql/pglite/live';

let dbInstance: PGlite | null = null;

export async function getDb() {
  if (dbInstance) return dbInstance;

  dbInstance = await PGlite.create({
    extensions: { live }
  });

  // Create Patients table if not exists
  await dbInstance.exec(`
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
  `);

  return dbInstance;
}