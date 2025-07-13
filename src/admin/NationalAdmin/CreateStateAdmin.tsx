import React, { useState } from 'react';
export default function CreateStateAdmin() {
  const [stateName, setStateName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add Firebase create user logic
    setSuccess('State Admin created successfully!');
    setStateName(''); setEmail(''); setPassword('');
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <form onSubmit={handleCreate} className='bg-white shadow-lg rounded-xl p-8 w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Create State Admin</h2>
        {success && <div className='text-green-600 mb-4'>{success}</div>}
        <input type='text' placeholder='State Name' value={stateName} onChange={e => setStateName(e.target.value)} className='w-full mb-4 px-4 py-2 border rounded' required />
        <input type='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} className='w-full mb-4 px-4 py-2 border rounded' required />
        <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} className='w-full mb-6 px-4 py-2 border rounded' required />
        <button type='submit' className='w-full bg-green-600 text-white py-2 rounded font-semibold'>Create</button>
      </form>
    </div>
  );
}
