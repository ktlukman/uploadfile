import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

const dbDir = path.join(process.cwd(), 'uploads');
const dbPath = path.join(dbDir, 'files.db');

// ensure uploads directory exists
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// open SQLite DB (synchronous, safe to use in server routes)
const db = new Database(dbPath);

// initialize table
db.exec(`
  CREATE TABLE IF NOT EXISTS files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    path TEXT NOT NULL
  )
`);

export default db;