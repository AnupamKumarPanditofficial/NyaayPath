import React, { useState } from 'react';

interface UserRequestDetailProps {
  request: any;
}

export default function UserRequestDetail({ request }: UserRequestDetailProps) {
  const [ocrResult, setOcrResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  if (!request) return <div>Select a request to view details.</div>;

  // Helper to display all fields
  const renderFields = () => (
    <div className="mb-4">
      {Object.entries(request).map(([key, value]) => (
        key !== 'documentFile' && key !== 'documentUrl' ? (
          <div key={key}><b>{key}:</b> {String(value)}</div>
        ) : null
      ))}
    </div>
  );

  // Helper to display image/pdf
  const renderDocument = () => {
    if (request.documentFile && request.documentFile.type && request.documentFile.type.startsWith('image')) {
      // File object (image)
      return <img src={URL.createObjectURL(request.documentFile)} alt="Document" className="max-w-xs my-2" />;
    } else if (request.documentFile && request.documentFile.type && request.documentFile.type === 'application/pdf') {
      return <embed src={URL.createObjectURL(request.documentFile)} type="application/pdf" width="300" height="400" className="my-2" />;
    } else if (request.documentUrl) {
      // Fallback for URL
      if (request.documentUrl.endsWith('.pdf')) {
        return <embed src={request.documentUrl} type="application/pdf" width="300" height="400" className="my-2" />;
      } else {
        return <img src={request.documentUrl} alt="Document" className="max-w-xs my-2" />;
      }
    }
    return <div>No document uploaded.</div>;
  };

  const handleVerify = async () => {
    setLoading(true);
    setOcrResult(null);
    const formData = new FormData();
    if (request.documentFile) {
      formData.append('file', request.documentFile);
    } else if (request.documentUrl) {
      // If only URL, fetch and convert to blob
      const res = await fetch(request.documentUrl);
      const blob = await res.blob();
      formData.append('file', blob, 'document');
    } else {
      setOcrResult({ error: 'No document to verify.' });
      setLoading(false);
      return;
    }
    // Add expected fields (example: name)
    formData.append('expected_name', request.name || request.fullName || '');
    // Add more fields as needed
    try {
      const res = await fetch('http://localhost:8000/api/ocr-verify', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setOcrResult(data);
    } catch (err) {
      setOcrResult({ error: 'Verification failed.' });
    }
    setLoading(false);
  };

  return (
    <div className="p-4 border rounded max-h-96 overflow-y-auto bg-white text-black">
      <h4 className="font-bold mb-2">Request Details</h4>
      {renderFields()}
      {renderDocument()}
      <button onClick={handleVerify} className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
        {loading ? 'Verifying...' : 'Verify'}
      </button>
      {ocrResult && (
        <div className="mt-2">
          {ocrResult.error && <div className="text-red-600">{ocrResult.error}</div>}
          {ocrResult.is_verified !== undefined && (
            <div>
              <b>Status:</b> {ocrResult.is_verified ? <span className="text-green-600">Verified</span> : <span className="text-red-600">Not Verified</span>}
            </div>
          )}
          {ocrResult.extracted_text && (
            <div>
              <b>Extracted Text:</b>
              <pre className="bg-gray-100 p-2 whitespace-pre-wrap">{ocrResult.extracted_text}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
