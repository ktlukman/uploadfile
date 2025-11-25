// ...existing code...
import { NextResponse } from 'next/server';
import db from '../../../db';

export function GET() {
  try {
    const rows = db.prepare('SELECT * FROM files').all();
    return NextResponse.json(rows);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
// ...existing code...