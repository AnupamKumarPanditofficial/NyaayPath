import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Eye, EyeOff } from 'lucide-react';

// Animated background component
function AnimatedLoginBackground() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
      <div className="animated-gradient-bg" />
      <style>{`
        .animated-gradient-bg {
          position: absolute;
          inset: 0;
          width: 100vw;
          height: 100vh;
          z-index: 0;
          opacity: 0.7;
          background: linear-gradient(120deg, #3b82f6 0%, #a78bfa 40%, #f472b6 70%, #34d399 100%);
          background-size: 200% 200%;
          animation: gradientShift 8s ease-in-out infinite;
          filter: blur(32px) saturate(120%);
        }
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
            filter: hue-rotate(0deg) blur(32px) saturate(120%);
          }
          25% {
            background-position: 50% 100%;
            filter: hue-rotate(60deg) blur(32px) saturate(120%);
          }
          50% {
            background-position: 100% 50%;
            filter: hue-rotate(120deg) blur(32px) saturate(120%);
          }
          75% {
            background-position: 50% 0%;
            filter: hue-rotate(240deg) blur(32px) saturate(120%);
          }
          100% {
            background-position: 0% 50%;
            filter: hue-rotate(360deg) blur(32px) saturate(120%);
          }
        }
      `}</style>
    </div>
  );
}

export default function StateLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerState, setRegisterState] = useState('');
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState('');
  const [registerError, setRegisterError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { getAuth, signInWithEmailAndPassword } = await import('firebase/auth');
      const { db } = await import('../../firebaseConfig');
      const { doc, getDoc } = await import('firebase/firestore');
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Fetch state name from Firestore
      const stateDoc = await getDoc(doc(db, 'stateAdmins', userCredential.user.uid));
      if (!stateDoc.exists()) {
        setError('No state admin record found.');
        setLoading(false);
        return;
      }
      const stateName = stateDoc.data().state;
      localStorage.setItem('stateAdminState', stateName);
      navigate('/admin/state-dashboard');
    } catch (err: unknown) {
      setError((err as any).message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterLoading(true);
    setRegisterSuccess('');
    setRegisterError('');
    try {
      const { db } = await import('../../firebaseConfig');
      const { collection, addDoc } = await import('firebase/firestore');
      await addDoc(collection(db, 'stateAdminRequests'), {
        email: registerEmail,
        password: registerPassword, // Store hashed in production, for demo only
        state: registerState,
        createdAt: new Date().toISOString(),
        status: 'pending',
      });
      setRegisterSuccess('Request sent! Wait for Approval from upper admin.');
      setRegisterEmail('');
      setRegisterPassword('');
      setRegisterState('');
    } catch (err: unknown) {
      const msg = (err as any).message || 'Failed to send request';
      setRegisterError(msg);
      console.error('Firestore registration error:', err);
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black/90 relative overflow-hidden">
      <AnimatedLoginBackground />
      {/* Glassmorphic Card */}
      <div className="relative w-full max-w-md mx-auto rounded-3xl shadow-2xl bg-white/60 dark:bg-gray-900/80 backdrop-blur-xl p-8 pt-10 flex flex-col items-center border border-gray-200 dark:border-gray-800 z-10">
        {/* Avatar/Icon */}
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-700 shadow-lg mb-4 -mt-14 border-4 border-white dark:border-gray-900">
          <Building2 className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-900 dark:text-white tracking-tight">State Admin {showRegister ? 'Registration' : 'Login'}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 text-center">State Headquarters Access</p>
        {!showRegister ? (
          <>
            <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
              {error && <div className="text-red-500 mb-2 text-center font-semibold">{error}</div>}
              <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                className='w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-400 outline-none transition-all'
                required
              />
              <div className="relative w-full">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className='w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-400 outline-none transition-all pr-12'
                  required
                />
                <button
                  type="button"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600 dark:hover:text-green-400 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <button
                type='submit'
                className='w-full py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-400 text-white font-bold text-lg shadow-lg hover:from-green-700 hover:to-green-500 transition-all duration-200 mt-2'
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
            <button
              className="mt-4 text-green-700 font-semibold underline hover:text-green-900"
              onClick={() => setShowRegister(true)}
            >
              Create Account
            </button>
          </>
        ) : (
          <>
            <form onSubmit={handleRegister} className="w-full flex flex-col gap-4">
              {registerSuccess && <div className="text-green-600 mb-2 text-center font-semibold">{registerSuccess}</div>}
              {registerError && <div className="text-red-500 mb-2 text-center font-semibold">{registerError}</div>}
              <input
                type='email'
                placeholder='Email'
                value={registerEmail}
                onChange={e => setRegisterEmail(e.target.value)}
                className='w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-400 outline-none transition-all'
                required
              />
              <input
                type='password'
                placeholder='Password'
                value={registerPassword}
                onChange={e => setRegisterPassword(e.target.value)}
                className='w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-400 outline-none transition-all'
                required
                minLength={6}
              />
              <input
                type='text'
                placeholder='State Name'
                value={registerState}
                onChange={e => setRegisterState(e.target.value)}
                className='w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-400 outline-none transition-all'
                required
              />
              <button
                type='submit'
                className='w-full py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-400 text-white font-bold text-lg shadow-lg hover:from-green-700 hover:to-green-500 transition-all duration-200 mt-2'
                disabled={registerLoading}
              >
                {registerLoading ? 'Submitting...' : 'Send Request'}
              </button>
            </form>
            <button
              className="mt-4 text-green-700 font-semibold underline hover:text-green-900"
              onClick={() => setShowRegister(false)}
            >
              Back to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}
