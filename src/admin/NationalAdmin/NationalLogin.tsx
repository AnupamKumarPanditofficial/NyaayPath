import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff, UserPlus, LogIn } from 'lucide-react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

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

export default function NationalLogin() {
  const [tab, setTab] = useState<'login' | 'create'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin/national-dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess(true);
      setTimeout(() => setTab('login'), 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black/90 relative overflow-hidden">
      <AnimatedLoginBackground />
      <div className="relative w-full max-w-md mx-auto rounded-3xl shadow-2xl bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400 p-1 z-10">
        <div className="rounded-[22px] bg-white/80 dark:bg-gray-900/90 backdrop-blur-xl p-8 pt-10 flex flex-col items-center border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 shadow-lg mb-4 -mt-14 border-4 border-white dark:border-gray-900">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold mb-1 text-center text-gray-900 dark:text-white tracking-tight drop-shadow-lg">National Admin</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 text-center">Central Headquarters Access</p>
          {/* Animated Slider Tabs */}
          <div className="flex w-full mb-8 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 shadow-inner">
            <button
              className={`flex-1 py-3 flex items-center justify-center gap-2 font-bold text-lg transition-all duration-200 ${tab === 'login' ? 'bg-gradient-to-r from-blue-500 to-blue-400 text-white shadow-lg scale-105' : 'text-gray-700 dark:text-gray-200'}`}
              onClick={() => { setTab('login'); setError(''); setSuccess(false); }}
            >
              <LogIn className="w-5 h-5" /> Login
            </button>
            <button
              className={`flex-1 py-3 flex items-center justify-center gap-2 font-bold text-lg transition-all duration-200 ${tab === 'create' ? 'bg-gradient-to-r from-pink-500 to-purple-400 text-white shadow-lg scale-105' : 'text-gray-700 dark:text-gray-200'}`}
              onClick={() => { setTab('create'); setError(''); setSuccess(false); }}
            >
              <UserPlus className="w-5 h-5" /> Create Account
            </button>
          </div>
          {/* Forms */}
          {tab === 'login' ? (
            <form onSubmit={handleLogin} className="w-full flex flex-col gap-5 animate-fade-in">
              {error && <div className="text-red-500 mb-2 text-center font-semibold animate-shake">{error}</div>}
              <div className="flex flex-col gap-2">
                <label className="text-gray-700 dark:text-gray-200 font-semibold">Email</label>
                <input
                  type='email'
                  placeholder='Enter your email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className='w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/90 dark:bg-gray-800/80 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none transition-all shadow-sm'
                  required
                />
              </div>
              <div className="flex flex-col gap-2 relative">
                <label className="text-gray-700 dark:text-gray-200 font-semibold">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter your password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className='w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/90 dark:bg-gray-800/80 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none transition-all pr-12 shadow-sm'
                  required
                />
                <button
                  type="button"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-9 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <button
                type='submit'
                className='w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold text-lg shadow-lg hover:from-blue-700 hover:to-blue-500 transition-all duration-200 mt-2'
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleCreate} className="w-full flex flex-col gap-5 animate-fade-in">
              {error && <div className="text-red-500 mb-2 text-center font-semibold animate-shake">{error}</div>}
              {success && <div className="text-green-600 mb-2 text-center font-semibold animate-bounce-in">Account created! You can now log in.</div>}
              <div className="flex flex-col gap-2">
                <label className="text-gray-700 dark:text-gray-200 font-semibold">Email</label>
                <input
                  type='email'
                  placeholder='Enter your email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className='w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/90 dark:bg-gray-800/80 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-400 outline-none transition-all shadow-sm'
                  required
                />
              </div>
              <div className="flex flex-col gap-2 relative">
                <label className="text-gray-700 dark:text-gray-200 font-semibold">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Create a password (min 6 chars)'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className='w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/90 dark:bg-gray-800/80 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-400 outline-none transition-all pr-12 shadow-sm'
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-9 text-gray-500 hover:text-pink-600 dark:hover:text-pink-400 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <button
                type='submit'
                className='w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-400 text-white font-bold text-lg shadow-lg hover:from-pink-600 hover:to-purple-500 transition-all duration-200 mt-2'
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Account'}
              </button>
            </form>
          )}
        </div>
      </div>
      {/* Animations */}
      <style>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: none; } }
        .animate-fade-in { animation: fade-in 0.5s; }
        @keyframes shake { 10%, 90% { transform: translateX(-2px); } 20%, 80% { transform: translateX(4px); } 30%, 50%, 70% { transform: translateX(-8px); } 40%, 60% { transform: translateX(8px); } }
        .animate-shake { animation: shake 0.4s; }
        @keyframes bounce-in { 0% { transform: scale(0.8); opacity: 0; } 60% { transform: scale(1.05); opacity: 1; } 100% { transform: scale(1); } }
        .animate-bounce-in { animation: bounce-in 0.6s; }
      `}</style>
    </div>
  );
}
