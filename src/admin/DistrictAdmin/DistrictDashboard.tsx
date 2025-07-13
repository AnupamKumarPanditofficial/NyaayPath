import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, LogOut, PlusCircle } from 'lucide-react';
import UserRequestsList from '../../components/UserRequestsList';
import React from 'react';

const SECTIONS = [
  { key: 'dashboard', label: 'Dashboard', icon: <Users className="w-5 h-5" /> },
  { key: 'state-admin-request', label: 'State Admin Request', icon: <Users className="w-5 h-5" /> },
  { key: 'notices', label: 'Notices', icon: <Users className="w-5 h-5" /> },
  { key: 'users-request', label: 'Users Request', icon: <Users className="w-5 h-5" /> },
];

export default function DistrictDashboard() {
  const navigate = useNavigate();
  const [section, setSection] = useState('dashboard');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [showImage, setShowImage] = useState<{ src: string; label: string } | null>(null);
  const [adminMessage, setAdminMessage] = useState('');
  const [verified, setVerified] = useState({
    user: false,
    family: false,
    address: false,
    final: false,
  });

  // Load admin response from localStorage if exists
  React.useEffect(() => {
    if (selectedRequest?.trackingId) {
      const responses = JSON.parse(localStorage.getItem('admin_responses') || '{}');
      setAdminMessage(responses[selectedRequest.trackingId] || '');
    }
  }, [selectedRequest]);

  // Reset verification state when new request is selected
  React.useEffect(() => {
    setVerified({ user: false, family: false, address: false, final: false });
  }, [selectedRequest]);

  // Save admin response
  const handleSendMessage = () => {
    if (!selectedRequest?.trackingId) return;
    const responses = JSON.parse(localStorage.getItem('admin_responses') || '{}');
    responses[selectedRequest.trackingId] = adminMessage;
    localStorage.setItem('admin_responses', JSON.stringify(responses));
    alert('Message sent to user!');
  };

  // Helper to render image preview
  const renderImage = (fileName: string, label: string) => fileName ? (
    <button className="underline text-blue-400 hover:text-blue-600" onClick={() => setShowImage({ src: '', label })}>
      View
    </button>
  ) : <span className="text-gray-400">No file</span>;

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');
    try {
      const { db } = await import('../../firebaseConfig');
      const { collection, addDoc } = await import('firebase/firestore');
      await addDoc(collection(db, 'districtAdminRequests'), {
        email,
        password, // Store hashed in production, for demo only
        district,
        state,
        createdAt: new Date().toISOString(),
        status: 'pending',
      });
      setSuccess('Request sent to State Admin for approval!');
      setEmail('');
      setPassword('');
      setDistrict('');
      setState('');
      setShowCreateForm(false);
    } catch (err: unknown) {
      setError((err as any).message || 'Failed to send request');
    } finally {
      setLoading(false);
    }
  };

  function DashboardSection() {
    // Get district name from localStorage (fallback to 'Dashboard' if not found)
    const districtName = typeof window !== 'undefined' ? localStorage.getItem('districtAdminDistrict') || 'Dashboard' : 'Dashboard';
    return (
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <span className="text-3xl font-bold bg-gradient-to-r from-pink-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent drop-shadow">District Admin <span className="text-yellow-400">- {districtName}</span></span>
          <span className="ml-2"><svg width="32" height="32" fill="none"><circle cx="16" cy="16" r="16" fill="#232946"/><path d="M22 12l-6 8-4-4" stroke="#ff6ac1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
        </div>
        <p className="text-lg text-gray-300">Welcome! Here you can manage district admin accounts and view district-level metrics.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {/* Example metric cards, can be replaced with real data */}
          <div className="bg-[#232946] rounded-2xl p-6 shadow-lg border border-[#393e5c] flex flex-col gap-2">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-7 h-7 text-pink-400" />
              <span className="text-2xl font-bold">1,200</span>
            </div>
            <span className="text-gray-300 font-semibold">Total Requests</span>
          </div>
          <div className="bg-[#232946] rounded-2xl p-6 shadow-lg border border-[#393e5c] flex flex-col gap-2">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-7 h-7 text-yellow-400" />
              <span className="text-2xl font-bold">350</span>
            </div>
            <span className="text-gray-300 font-semibold">Active Users</span>
          </div>
          <div className="bg-[#232946] rounded-2xl p-6 shadow-lg border border-[#393e5c] flex flex-col gap-2">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-7 h-7 text-green-400" />
              <span className="text-2xl font-bold">98</span>
            </div>
            <span className="text-gray-300 font-semibold">Resolved Today</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#181c2a] via-[#232946] to-[#1a223f] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#232946] flex flex-col py-8 px-6 min-h-screen shadow-2xl">
        <div className="flex items-center mb-10">
          <div className="bg-gradient-to-tr from-pink-400 via-yellow-300 to-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mr-3 shadow-lg">D</div>
          <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-yellow-300 to-purple-400 bg-clip-text text-transparent">District</span>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
            {SECTIONS.map((s) => (
              <li key={s.key}>
                <button
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition font-semibold text-lg focus:outline-none ${section === s.key ? 'bg-[#313866] text-white' : 'hover:bg-[#393e5c] text-gray-200'}`}
                  onClick={() => {
                    setSection(s.key);
                    setShowCreateForm(false);
                  }}
                >
                  {s.icon}{s.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <button className="mt-10 w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-lg transition" onClick={() => navigate('/admin')}><LogOut className="w-5 h-5"/>Logout</button>
      </aside>

      {/* Main Dashboard */}
      <main className="flex-1 flex flex-col items-center justify-start bg-gradient-to-br from-[#181c2a] via-[#232946] to-[#1a223f] min-h-screen w-full overflow-y-auto px-[5px]">
        {section === 'dashboard' && <DashboardSection />}
        {section === 'users-request' && (
          <div className="flex flex-col items-center w-full h-full">
            <div className="w-full max-w-3xl mx-[5px]">
              <UserRequestsList onSelect={setSelectedRequest} />
            </div>
            {selectedRequest && (
              <div className="w-full max-w-3xl p-6 bg-[#181c2a] rounded-2xl shadow-lg border-2 border-pink-400 mt-8 flex flex-col max-h-[80vh] overflow-y-auto box-border mx-[5px]" style={{ boxSizing: 'border-box' }}>
                {/* PROGRESS/COMPLETION BOX */}
                <div className="flex items-center justify-between mb-4 p-3 rounded-xl bg-[#232946] border border-pink-400">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-pink-200">Verification Progress:</span>
                    <span className="text-yellow-300 font-semibold">{Object.values(verified).filter(Boolean).length - (verified.final ? 1 : 0)}/3 Verified</span>
                  </div>
                  {verified.final ? (
                    <span className="px-4 py-1 rounded-full bg-green-600 text-white font-bold text-lg shadow flex items-center gap-2">✔ Final Verified</span>
                  ) : (
                    <span className="px-4 py-1 rounded-full bg-yellow-500 text-white font-bold text-lg shadow flex items-center gap-2">In Progress</span>
                  )}
                </div>
                {/* 1. SCHEME & USER INFO SECTION */}
                <div className="mb-4 p-4 rounded-xl bg-[#232946] border border-pink-300">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="bg-gradient-to-tr from-pink-400 via-yellow-300 to-purple-400 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg text-white">
                      {selectedRequest.name?.[0] || 'U'}
                    </div>
                    <div>
                      <div className="text-xl font-bold text-pink-200">{selectedRequest.name}</div>
                      <div className="text-sm text-yellow-300 font-semibold">Tracking ID: {selectedRequest.trackingId}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
                    <div><b>Scheme:</b> {selectedRequest.schemeType}</div>
                    <div><b>Mobile:</b> {selectedRequest.mobileNo}</div>
                    <div><b>Occupation:</b> {selectedRequest.occupation}</div>
                    <div><b>Land Owner:</b> {selectedRequest.landOwner}</div>
                    <div><b>Marital Status:</b> {selectedRequest.maritalStatus}</div>
                    <div><b>Applied:</b> {selectedRequest.createdAt && new Date(selectedRequest.createdAt).toLocaleString()}</div>
                  </div>
                  <button className={`mt-2 px-4 py-2 rounded font-bold ${verified.user ? 'bg-green-500 text-white' : 'bg-pink-500 hover:bg-pink-600 text-white'}`} onClick={() => setVerified(v => ({ ...v, user: true }))} disabled={verified.user}>
                    {verified.user ? 'Verified' : 'Verify User Info'}
                  </button>
                </div>
                {/* 2. FAMILY DETAILS SECTION */}
                <div className="mb-4 p-4 rounded-xl bg-[#232946] border border-pink-300">
                  <div className="font-bold text-pink-300 mb-2">Family Details</div>
                  {selectedRequest.familyMembers && selectedRequest.familyMembers.length > 0 ? (
                    <div className="overflow-x-auto mb-2">
                      <table className="min-w-full text-sm text-left">
                        <thead>
                          <tr className="text-gray-300">
                            <th>Name</th><th>Age</th><th>Occupation</th><th>Aadhaar No</th><th>PAN No</th><th>Marital</th><th>ID Proofs</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedRequest.familyMembers.map((m: any, i: number) => (
                            <tr key={i} className="border-b border-gray-700">
                              <td>{m.name}</td>
                              <td>{m.age}</td>
                              <td>{m.occupation}</td>
                              <td>{m.aadharNo}</td>
                              <td>{m.panNo}</td>
                              <td>{m.maritalStatus}</td>
                              <td>
                                Aadhaar: {renderImage(m.aadharImage, 'Aadhaar Image')}, PAN: {renderImage(m.panImage, 'PAN Image')}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : <div className="text-gray-400">No family details</div>}
                  <button className={`mt-2 px-4 py-2 rounded font-bold ${verified.family ? 'bg-green-500 text-white' : 'bg-pink-500 hover:bg-pink-600 text-white'}`} onClick={() => setVerified(v => ({ ...v, family: true }))} disabled={verified.family}>
                    {verified.family ? 'Verified' : 'Verify Family'}
                  </button>
                </div>
                {/* 3. ADDRESS SECTION */}
                <div className="mb-4 p-4 rounded-xl bg-[#232946] border border-pink-300">
                  <div className="font-bold text-pink-300 mb-2">Complete Address</div>
                  <div><b>State:</b> {selectedRequest.state}</div>
                  <div><b>District:</b> {selectedRequest.district}</div>
                  <div><b>Village:</b> {selectedRequest.address}</div>
                  <div><b>Ward No:</b> {selectedRequest.wardNo}</div>
                  <div><b>Pin Code:</b> {selectedRequest.pinCode}</div>
                  <div className="flex gap-2 mt-2">
                    <button className={`px-4 py-2 rounded font-bold ${verified.address ? 'bg-green-500 text-white' : 'bg-pink-500 hover:bg-pink-600 text-white'}`} onClick={() => setVerified(v => ({ ...v, address: true }))} disabled={verified.address}>
                      {verified.address ? 'Verified' : 'Verify Address'}
                    </button>
                    <button className="px-4 py-2 rounded font-bold bg-blue-500 hover:bg-blue-600 text-white" onClick={() => alert('AI Address Verification (demo)')}>AI Verify</button>
                  </div>
                </div>
                {/* 4. FINAL COMPLETION BOX */}
                <div className="mb-4 p-4 rounded-xl bg-[#232946] border border-pink-300 flex items-center gap-4">
                  <span className="font-bold text-pink-200 text-lg">Final Verification:</span>
                  <button className={`px-6 py-2 rounded font-bold text-lg ${verified.user && verified.family && verified.address && !verified.final ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-400 text-white'}`} onClick={() => setVerified(v => ({ ...v, final: true }))} disabled={!(verified.user && verified.family && verified.address) || verified.final}>
                    {verified.final ? 'Completed' : 'Verify & Complete'}
                  </button>
                  {verified.final && <span className="ml-2 text-green-400 text-2xl">✔</span>}
                </div>
                {/* GOVT IDs SECTION (for main applicant) */}
                <div className="mb-4 p-4 rounded-xl bg-[#232946] border border-pink-300">
                  <div className="font-bold text-pink-300 mb-1">Main Applicant Government IDs</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div><b>Aadhaar No:</b> {selectedRequest.aadharNo} {renderImage(selectedRequest.aadharImage, 'Aadhaar Image')}</div>
                    <div><b>PAN No:</b> {selectedRequest.panNo} {renderImage(selectedRequest.panImage, 'PAN Image')}</div>
                    <div><b>Income Certificate:</b> {renderImage(selectedRequest.incomeCertificate, 'Income Certificate')}</div>
                    <div><b>Residential Certificate:</b> {renderImage(selectedRequest.residentialCertificate, 'Residential Certificate')}</div>
                    <div><b>Family Photo:</b> {renderImage(selectedRequest.familyPhoto, 'Family Photo')}</div>
                  </div>
                </div>
                {/* MESSAGE BAR */}
                <div className="mt-2 p-3 bg-[#232946] rounded-xl flex flex-col gap-2">
                  <div className="font-bold text-pink-300 mb-1">Send Message to User</div>
                  <textarea className="w-full p-2 rounded bg-[#181c2a] border border-pink-400 text-white" rows={2} value={adminMessage} onChange={e => setAdminMessage(e.target.value)} placeholder="Type your message..." />
                  <button onClick={handleSendMessage} className="self-end px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded font-bold">Send</button>
                </div>
                {/* IMAGE PREVIEW MODAL */}
                {showImage && (
                  <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full flex flex-col items-center">
                      <div className="font-bold mb-2">{showImage.label}</div>
                      <div className="mb-4 text-gray-500">(Image preview not available in demo)</div>
                      <button onClick={() => setShowImage(null)} className="mt-2 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded font-bold">Close</button>
                    </div>
                  </div>
                )}
                <button onClick={() => setSelectedRequest(null)} className="mt-2 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded font-bold self-end">Close</button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
