'use client';

import { useState } from 'react';

export default function TestUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      setResult({ success: false, error: 'Error al subir' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Upload</h1>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        accept=".pdf,.jpg,.jpeg,.png"
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
      >
        {uploading ? 'Subiendo...' : 'Subir Archivo'}
      </button>

      {result && (
        <pre className="mt-4 p-4 bg-gray-100 rounded">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
