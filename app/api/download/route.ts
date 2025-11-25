// ...existing code...
import { NextResponse } from 'next/server';
import db from '../../../db';
import fs from 'fs';
import path from 'path';

interface FileRecord {
    id: number;
    name: string;
    path: string;
    // add other fields as needed
}

export async function GET(request: Request) {
    const url = new URL(request.url);
    const idParam = url.searchParams.get('id');
    const id = idParam ? parseInt(idParam, 10) : NaN;

    if (isNaN(id)) {
        return NextResponse.json({ error: "Invalid file ID." }, { status: 400 });
    }

    const stmt = db.prepare("SELECT * FROM files WHERE id = ?");
    const result = stmt.get(id) as FileRecord | undefined;

    if (!result) {
        return NextResponse.json({ error: "File not found." }, { status: 404 });
    }

    // Helpful debug: inspect what path is stored in DB (view server console)
    console.log('DB stored path for id', id, ':', result.path);

    // Build candidate paths to handle absolute, relative, and "uploads" or "public" placements
    const candidates = [
        result.path,
        path.resolve(result.path),
        path.join(process.cwd(), result.path),
        path.resolve(process.cwd(), result.path),
        path.join(process.cwd(), 'uploads', path.basename(result.path)),
        path.join(process.cwd(), 'public', result.path),
        path.join(process.cwd(), 'public', 'uploads', path.basename(result.path)),
    ];

    let filePath: string | null = null;
    for (const p of candidates) {
        try {
            if (p && fs.existsSync(p)) {
                filePath = p;
                break;
            }
        } catch (e) {
            // ignore invalid candidate
        }
    }

    if (!filePath) {
        // return candidate list to help debug where app is looking
        return NextResponse.json({ error: "File not found on disk.", checked: candidates }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    return new NextResponse(fileBuffer, {
        headers: {
            'Content-Disposition': `attachment; filename="${path.basename(filePath)}"`,
            'Content-Type': 'application/octet-stream',
        },
    });
}
// ...existing code...