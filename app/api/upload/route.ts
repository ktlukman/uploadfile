import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import db from '../../../db';

export async function POST(request: Request) {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string') {
        return NextResponse.json({ error: 'File is required' }, { status: 400 });
    }

    const filename = file.name;
    const uploadDir = path.join(process.cwd(), 'uploads');
    const filePath = path.join(uploadDir, filename);

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    } 

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    const stmt = db.prepare("INSERT INTO files (name, path) VALUES (?, ?)");
    stmt.run(filename, filePath);
    stmt.finalize();

    return NextResponse.json({ message: 'File uploaded successfully' });
}