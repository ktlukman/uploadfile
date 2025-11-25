"use client";
import { useEffect, useState } from 'react';

export default function Home() {
    const [files, setFiles] = useState<{ id: string; name: string }[]>([]);
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        fetch('/api/files')
            .then((response) => response.json())
            .then((data) => {
                setFiles(data);
                console.log(data);
            });
    }, []);

    const handleFileChange = (event:any) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async (event:any) => {
        event.preventDefault();
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);

        await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        // Refresh the file list after upload
        fetch('/api/files')
            .then((response) => response.json())
            .then((data) => setFiles(data));
    };

    return (
        <div>
            <h2>Upload File</h2>
            <form onSubmit={handleUpload}>
                <input type="file" onChange={handleFileChange} required />
                <button type="submit">Upload</button>
            </form>

            <h2>Download Files</h2>
            <ul>
                {files.map((file) => (
                    <li key={file.id}>
                        <a href={`/api/download?id=${file.id}`}>{file.name} f</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}