import { useNavigate } from 'react-router-dom';
import { Shield, Building2, Users } from 'lucide-react';
import React from 'react';

// Helper for generating random positions and delays for particles
const particles = Array.from({ length: 40 }).map((_, i) => ({
  left: Math.random() * 100,
  top: Math.random() * 100,
  size: 2 + Math.random() * 2,
  duration: 6 + Math.random() * 6,
  delay: Math.random() * 6,
  key: i,
}));

export default function AdminAuthOptions() {
  const navigate = useNavigate();

  const roles = [
    {
      label: 'Main Admin',
      desc: 'Central Headquarters\nFull system access and control',
      color: 'bg-red-500',
      icon: <Shield className="w-7 h-7" />,
      route: '/admin/national-login',
    },
    {
      label: 'Sub Main Admin',
      desc: 'State Level\nState-wide administration',
      color: 'bg-blue-600',
      icon: <Building2 className="w-7 h-7" />,
      route: '/admin/state-login',
    },
    {
      label: 'Sub Admin',
      desc: 'District Level\nDistrict-level management',
      color: 'bg-green-600',
      icon: <Users className="w-7 h-7" />,
      route: '/admin/district-login',
    },
  ];

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden" style={{ background: '#000' }}>
      {/* Galaxy Particles */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {particles.map(p => (
          <div
            key={p.key}
            className="absolute rounded-full bg-white opacity-80 animate-galaxy"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>
      {/* Lightning Starburst SVG */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-5 pointer-events-none select-none">
        <svg width="420" height="420" viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-spin-slow opacity-40">
          <g filter="url(#glow)">
            {[...Array(12)].map((_, i) => (
              <line
                key={i}
                x1="210" y1="40" x2="210" y2="100"
                stroke="#fffbe6"
                strokeWidth="3"
                strokeLinecap="round"
                transform={`rotate(${i * 30} 210 210)`}
                opacity={i % 2 === 0 ? 0.7 : 0.4}
              />
            ))}
            {[...Array(12)].map((_, i) => (
              <line
                key={i+12}
                x1="210" y1="120" x2="210" y2="170"
                stroke="#ffe066"
                strokeWidth="2"
                strokeLinecap="round"
                transform={`rotate(${i * 30 + 15} 210 210)`}
                opacity={i % 2 === 0 ? 0.5 : 0.2}
              />
            ))}
          </g>
          <defs>
            <filter id="glow" x="0" y="0" width="420" height="420" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>
      </div>
      {/* Glassmorphic Login Box */}
      <div className="relative w-full max-w-md mx-auto rounded-3xl shadow-2xl bg-white/60 dark:bg-gray-900/70 backdrop-blur-xl p-8 pt-12 flex flex-col items-center border border-gray-200 dark:border-gray-800 z-10">
        {/* Close Button (optional) */}
        {/* <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-bold">&times;</button> */}
        <h2 className="text-2xl font-bold mb-1 text-gray-900 dark:text-white tracking-tight">NyaayPath Admin Center</h2>
        <p className="text-sm font-semibold text-yellow-100 drop-shadow-lg mb-6" style={{textShadow:'0 0 8px #fffbe6, 0 0 2px #ffe066'}}>Secure Administrative Access Portal</p>
        <h3 className="text-lg font-semibold mb-6 text-gray-800 dark:text-gray-200">Select Admin Level</h3>
        <div className="flex flex-col gap-5 w-full">
          {roles.map((role, idx) => (
            <button
              key={role.label}
              onClick={() => navigate(role.route)}
              className={`
                flex items-center gap-4 w-full px-6 py-5 rounded-2xl shadow-lg
                ${role.color} bg-opacity-90 text-white font-bold text-lg
                transition-all duration-200 hover:scale-105 hover:shadow-2xl hover:bg-opacity-100
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${role.color.split('-')[1]}-400
              `}
              style={{
                boxShadow: '0 8px 32px 0 rgba(31,38,135,0.15)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <span className="flex-shrink-0">{role.icon}</span>
              <span className="flex flex-col items-start">
                <span>{role.label}</span>
                <span className="text-xs font-normal text-white/80 whitespace-pre-line">{role.desc}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* Galaxy Animation Keyframes */}
      <style>{`
        @keyframes galaxy {
          0% { transform: translateY(0) scale(1); opacity: 0.7; }
          50% { opacity: 1; }
          100% { transform: translateY(-60vh) scale(1.2); opacity: 0.2; }
        }
        .animate-galaxy {
          animation-name: galaxy;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .animate-spin-slow {
          animation: spin 18s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
