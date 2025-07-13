import { useEffect, useState } from 'react';

interface UserRequest {
  id?: string;
  [key: string]: any;
}

export default function UserRequestsList({ onSelect }: { onSelect: (req: UserRequest) => void }) {
  const [requests, setRequests] = useState<UserRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    try {
      const data = JSON.parse(localStorage.getItem('user_requests') || '[]');
      setRequests(data);
    } catch {
      setRequests([]);
    }
    setLoading(false);
  }, []);

  if (loading) return <div>Loading user requests...</div>;
  if (!requests.length) return <div>No user requests found.</div>;

  return (
    <div>
      <h3 className="font-bold mb-4 text-xl">User Requests</h3>
      <div className="flex flex-col gap-4">
        {requests.map((req, idx) => (
          <div
            key={req.id || req.trackingId || idx}
            className="p-4 bg-[#181c2a] rounded-2xl shadow-lg border-2 border-pink-400 flex items-center gap-4 cursor-pointer hover:scale-[1.02] transition-transform"
            onClick={() => onSelect(req)}
          >
            <div className="bg-gradient-to-tr from-pink-400 via-yellow-300 to-purple-400 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold shadow-lg text-white">
              {req.name?.[0] || 'U'}
            </div>
            <div className="flex-1">
              <div className="text-lg font-bold text-pink-200">{req.name || req.fullName || req.email || req.id || req.trackingId}</div>
              <div className="text-sm text-yellow-300 font-semibold">Tracking ID: {req.trackingId}</div>
              <div className="text-gray-200 text-sm">Mobile: {req.mobileNo}</div>
              <div className="text-gray-400 text-xs">Applied: {req.createdAt && new Date(req.createdAt).toLocaleString()}</div>
            </div>
            <span className="px-3 py-1 rounded-full bg-green-600 text-white font-bold text-sm shadow">Received</span>
          </div>
        ))}
      </div>
    </div>
  );
}
