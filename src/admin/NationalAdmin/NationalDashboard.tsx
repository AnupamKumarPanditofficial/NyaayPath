import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, FileText, CheckCircle, Bell, KeyRound, LogOut, Eye, EyeOff } from 'lucide-react';

// PolymorphicCard: reusable, animated 3D flip card
interface PolymorphicCardProps {
  icon: React.ElementType;
  value: string;
  label: string;
  change?: string;
  backContent?: React.ReactNode;
  color?: string;
}
function PolymorphicCard({ icon: Icon, value, label, change, backContent, color = 'text-pink-400' }: PolymorphicCardProps) {
  return (
    <div style={{ perspective: '1200px' }}>
      <div className="relative w-full h-36 transition-transform duration-500" style={{ transformStyle: 'preserve-3d' }}>
        <div
          className="absolute inset-0 cursor-pointer group"
          style={{ zIndex: 2 }}
          tabIndex={0}
          onMouseEnter={e => {
            (e.currentTarget.parentElement as HTMLElement).style.transform = 'rotateY(180deg)';
          }}
          onMouseLeave={e => {
            (e.currentTarget.parentElement as HTMLElement).style.transform = 'rotateY(0deg)';
          }}
        >
          {/* Front */}
          <div className="absolute inset-0 bg-[#232946] rounded-2xl p-6 shadow-lg flex flex-col gap-2 border border-[#393e5c]" style={{ backfaceVisibility: 'hidden' }}>
            <div className="flex items-center gap-3 mb-2">
              <Icon className={`w-7 h-7 ${color}`} />
              <span className="text-2xl font-bold">{value}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300 font-semibold">{label}</span>
              {change && <span className={`text-sm font-bold ${change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{change}</span>}
            </div>
          </div>
          {/* Back */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 rounded-2xl flex items-center justify-center text-white text-lg font-bold" style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}>
            {backContent || <Icon className="w-10 h-10 opacity-70" />}
          </div>
        </div>
      </div>
    </div>
  );
}

function LinkedStatesCard() {
  const [states, setStates] = useState<string[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const { db } = await import('../../firebaseConfig');
        const { collection, getDocs } = await import('firebase/firestore');
        const snap = await getDocs(collection(db, 'stateAdmins'));
        const stateNames = Array.from(new Set(snap.docs.map(doc => doc.data().state)));
        setStates(stateNames);
      } catch (e) {
        setStates([]);
      }
    })();
  }, []);
  return (
    <div className="bg-[#232946] rounded-2xl p-6 shadow-lg border border-[#393e5c]">
      <h3 className="text-lg font-bold mb-4 text-white">Linked States</h3>
      <div className="mb-2 text-2xl font-bold text-pink-400">{states.length}</div>
      <div className="text-gray-300 text-sm mb-2">Total states linked</div>
      <div className="flex flex-wrap gap-2">
        {states.map((s, i) => (
          <span key={i} className="bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full text-xs font-semibold">{s}</span>
        ))}
      </div>
    </div>
  );
}

function MonthlyOverviewCard() {
  // Placeholder data, replace with Firestore aggregation if available
  const data = [
    { state: 'Bihar', pending: 120, fraud: 3, completed: 400 },
    { state: 'UP', pending: 80, fraud: 1, completed: 350 },
    { state: 'West Bengal', pending: 60, fraud: 0, completed: 300 },
  ];
  return (
    <div className="bg-[#232946] rounded-2xl p-6 shadow-lg border border-[#393e5c] overflow-x-auto">
      <h3 className="text-lg font-bold mb-4 text-white">Monthly Overview</h3>
      <table className="min-w-full text-sm text-left">
        <thead>
          <tr className="text-gray-400">
            <th className="py-2 px-3">State</th>
            <th className="py-2 px-3">Pending</th>
            <th className="py-2 px-3">Fraud</th>
            <th className="py-2 px-3">Completed</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-t border-[#393e5c]">
              <td className="py-2 px-3 font-semibold text-pink-300">{row.state}</td>
              <td className="py-2 px-3">{row.pending}</td>
              <td className="py-2 px-3">{row.fraud}</td>
              <td className="py-2 px-3">{row.completed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TopRequestStatesCard() {
  // Placeholder data, replace with Firestore aggregation if available
  const data = [
    { state: 'Bihar', district: 'Patna', month: 'July', requests: 320 },
    { state: 'UP', district: 'Lucknow', month: 'July', requests: 210 },
    { state: 'West Bengal', district: 'Kolkata', month: 'July', requests: 180 },
  ];
  return (
    <div className="bg-[#232946] rounded-2xl p-8 shadow-lg border border-[#393e5c] mt-10">
      <h3 className="text-2xl font-bold mb-6 text-white">Top Request States & Districts</h3>
      <table className="min-w-full text-sm text-left">
        <thead>
          <tr className="text-gray-400">
            <th className="py-2 px-3">State</th>
            <th className="py-2 px-3">District</th>
            <th className="py-2 px-3">Month</th>
            <th className="py-2 px-3">Requests</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-t border-[#393e5c]">
              <td className="py-2 px-3 font-semibold text-pink-300">{row.state}</td>
              <td className="py-2 px-3">{row.district}</td>
              <td className="py-2 px-3">{row.month}</td>
              <td className="py-2 px-3 font-bold text-pink-400">{row.requests}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-gray-400 text-xs">(Filters for half-yearly/yearly can be added here)</div>
    </div>
  );
}

function DashboardSection() {
  // Example metrics (replace with real data as needed)
  const metrics = [
    { icon: Users, label: 'Total Requests', value: '42.5K', change: '+12.5%', color: 'text-pink-400', backContent: 'All requests processed' },
    { icon: Users, label: 'Active Users', value: '97.4K', change: '+8.2%', color: 'text-yellow-400', backContent: 'Currently active users' },
    { icon: FileText, label: 'Pending Reviews', value: '1.2K', change: '-3.1%', color: 'text-purple-400', backContent: 'Reviews awaiting action' },
    { icon: CheckCircle, label: 'Resolved Today', value: '856', change: '+15.3%', color: 'text-green-400', backContent: 'Resolved today' },
  ];
  return (
    <>
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <span className="text-3xl font-bold bg-gradient-to-r from-pink-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent drop-shadow">National level admin <span className="text-yellow-400">- India</span></span>
          <span className="ml-2"><svg width="32" height="32" fill="none"><circle cx="16" cy="16" r="16" fill="#232946"/><path d="M22 12l-6 8-4-4" stroke="#ff6ac1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
        </div>
        <p className="text-lg text-gray-300">Here's what's happening with your admin panel today.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {metrics.map((m, i) => (
          <div key={i} className="group">
            <PolymorphicCard {...m} />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <MonthlyOverviewCard />
        <LinkedStatesCard />
      </div>
      <TopRequestStatesCard />
    </>
  );
}

function AdminRequestSection() {
  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-4">Admin Requests</h2>
      <div>[Real-time state admin requests will appear here]</div>
    </div>
  );
}

function NoticesSection() {
  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-4">Notices</h2>
      <div>[Real-time notices and send notice form will appear here]</div>
    </div>
  );
}

function ReviewRequestSection() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    let unsub: any;
    (async () => {
      try {
        const { db } = await import('../../firebaseConfig');
        const { collection, onSnapshot, query } = await import('firebase/firestore');
        const q = query(collection(db, 'stateAdminRequests'));
        unsub = onSnapshot(q, (snap: any) => {
          setRequests(snap.docs.map((doc: any) => ({ id: doc.id, ...doc.data() })));
          setLoading(false);
        });
      } catch (e) {
        setError('Failed to fetch requests');
        setLoading(false);
      }
    })();
    return () => { if (unsub) unsub(); };
  }, []);

  const handleApprove = async (req: any) => {
    setActionLoading(req.id);
    setError('');
    setSuccess('');
    try {
      const { getAuth, createUserWithEmailAndPassword, sendPasswordResetEmail } = await import('firebase/auth');
      const { db } = await import('../../firebaseConfig');
      const { doc, setDoc, updateDoc } = await import('firebase/firestore');
      const auth = getAuth();
      // Create user in Firebase Auth with a random password (for security)
      const randomPassword = Math.random().toString(36).slice(-10) + 'A1!';
      const userCredential = await createUserWithEmailAndPassword(auth, req.email, randomPassword);
      // Add to stateAdmins collection
      await setDoc(doc(db, 'stateAdmins', userCredential.user.uid), {
        email: req.email,
        state: req.state,
        createdAt: new Date().toISOString(),
      });
      // Mark request as approved
      await updateDoc(doc(db, 'stateAdminRequests', req.id), { status: 'approved' });
      // Send password reset email
      await sendPasswordResetEmail(auth, req.email);
      setSuccess('Request approved! Password reset email sent to the user. They must set their password before logging in.');
    } catch (err: any) {
      setError(err.message || 'Failed to approve request');
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (req: any) => {
    setActionLoading(req.id);
    setError('');
    setSuccess('');
    try {
      const { db } = await import('../../firebaseConfig');
      const { doc, updateDoc } = await import('firebase/firestore');
      await updateDoc(doc(db, 'stateAdminRequests', req.id), { status: 'rejected' });
      setSuccess('Request rejected.');
    } catch (err: any) {
      setError(err.message || 'Failed to reject request');
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="text-white max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-8">Review State Admin Requests</h2>
      {error && <div className="text-red-400 font-semibold text-center mb-2">{error}</div>}
      {success && <div className="text-green-400 font-semibold text-center mb-2">{success}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : requests.length === 0 ? (
        <div className="text-gray-400 text-center">No pending requests.</div>
      ) : (
        <div className="flex flex-col gap-8">
          {requests.map(req => (
            <div
              key={req.id}
              className={`relative bg-gradient-to-br from-[#232946] via-[#393e5c] to-[#232946] rounded-3xl shadow-2xl border border-pink-400/40 p-8 flex flex-col gap-4 items-start transition-transform hover:scale-[1.025] hover:shadow-pink-400/30 ${req.status === 'approved' ? 'border-green-400/60' : req.status === 'rejected' ? 'border-red-400/60' : ''}`}
              style={{
                boxShadow: '0 8px 32px 0 rgba(255,106,193,0.15), 0 1.5px 8px 0 rgba(57,62,92,0.12)',
                borderRadius: '2rem',
                perspective: '1200px',
                borderWidth: 2,
              }}
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="bg-gradient-to-tr from-pink-400 via-yellow-300 to-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-lg font-bold text-pink-300">{req.email}</div>
                  <div className="text-sm text-gray-300 font-semibold">State: <span className="text-yellow-300">{req.state}</span></div>
                </div>
              </div>
              {/* Status badge or action buttons */}
              {req.status === 'approved' ? (
                <div className="px-4 py-2 rounded-xl bg-green-600/80 text-white font-bold text-lg shadow border border-green-400/60">Approved</div>
              ) : req.status === 'rejected' ? (
                <div className="px-4 py-2 rounded-xl bg-red-600/80 text-white font-bold text-lg shadow border border-red-400/60">Rejected</div>
              ) : (
                <div className="flex gap-4 mt-2">
                  <button
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-green-500 to-green-400 text-white font-bold text-lg shadow hover:from-green-600 hover:to-green-500 transition-all duration-200 disabled:opacity-60"
                    onClick={() => handleApprove(req)}
                    disabled={actionLoading === req.id}
                  >
                    {actionLoading === req.id ? 'Approving...' : 'Approve'}
                  </button>
                  <button
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-red-400 text-white font-bold text-lg shadow hover:from-pink-600 hover:to-red-500 transition-all duration-200 disabled:opacity-60"
                    onClick={() => handleReject(req)}
                    disabled={actionLoading === req.id}
                  >
                    {actionLoading === req.id ? 'Rejecting...' : 'Reject'}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const SECTIONS = [
  { key: 'dashboard', label: 'Dashboard', icon: (
    <span className=""><svg width="20" height="20" fill="none"><rect width="20" height="20" rx="6" fill="#232946"/><rect x="3" y="3" width="14" height="14" rx="4" fill="#fff"/><rect x="6" y="6" width="8" height="8" rx="2" fill="#232946"/></svg></span>) },
  { key: 'admin-request', label: 'Admin Request', icon: <Users className="w-5 h-5" /> },
  { key: 'notices', label: 'Notices', icon: <Bell className="w-5 h-5" /> },
  { key: 'review-request', label: 'Review Request', icon: <KeyRound className="w-5 h-5" /> },
];

export default function NationalDashboard() {
  const navigate = useNavigate();
  const [section, setSection] = useState('dashboard');

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#181c2a] via-[#232946] to-[#1a223f] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#232946] flex flex-col py-8 px-6 min-h-screen shadow-2xl">
        <div className="flex items-center mb-10">
          <div className="bg-gradient-to-tr from-pink-400 via-yellow-300 to-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mr-3 shadow-lg">A</div>
          <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-yellow-300 to-purple-400 bg-clip-text text-transparent">Admin</span>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
            {SECTIONS.map((s) => (
              <li key={s.key}>
                <button
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition font-semibold text-lg focus:outline-none ${section === s.key ? 'bg-[#313866] text-white' : 'hover:bg-[#393e5c] text-gray-200'}`}
                  onClick={() => setSection(s.key)}
                >
                  {s.icon}{s.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <button className="mt-10 w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-lg transition" onClick={() => navigate('/admin')}><LogOut className="w-5 h-5"/>Exit</button>
      </aside>

      {/* Main Dashboard */}
      <main className="flex-1 p-10 bg-gradient-to-br from-[#181c2a] via-[#232946] to-[#1a223f] min-h-screen overflow-y-auto">
        {section === 'dashboard' && <DashboardSection />}
        {section === 'admin-request' && <AdminRequestSection />}
        {section === 'notices' && <NoticesSection />}
        {section === 'review-request' && <ReviewRequestSection />}
      </main>
    </div>
  );
}
