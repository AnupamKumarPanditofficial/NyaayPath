require('dotenv').config();
// Remove all Firebase Admin SDK and env usage, and refactor to a simple Express server:
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Ensure user_requests.json exists
const REQUESTS_FILE = path.join(__dirname, 'user_requests.json');
if (!fs.existsSync(REQUESTS_FILE)) {
  fs.writeFileSync(REQUESTS_FILE, '[]');
}

// File upload setup
const upload = multer({ dest: uploadsDir });

// Helper to read all requests
function readRequests() {
  try {
    const data = fs.readFileSync(REQUESTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading requests file:', err);
    return [];
  }
}

// Helper to write all requests
function writeRequests(requests) {
  try {
    fs.writeFileSync(REQUESTS_FILE, JSON.stringify(requests, null, 2));
  } catch (err) {
    console.error('Error writing requests file:', err);
    throw err;
  }
}

// Serve uploaded files statically
app.use('/uploads', express.static(uploadsDir));

// User form submit
app.post('/submit-application', upload.fields([
  { name: 'aadharImage' },
  { name: 'panImage' },
  { name: 'incomeCertificate' },
  { name: 'residentialCertificate' },
  { name: 'familyPhoto' }
]), (req, res) => {
  try {
    // Tracking ID logic
    const namePart = (req.body.name || 'XXXX').replace(/[^A-Z]/g, '').padEnd(4, 'X').slice(0, 4);
    const aadhaarDigits = (req.body.aadharNo || '').replace(/\D/g, '');
    const aadhaarPart = aadhaarDigits.slice(-4).padStart(4, '0');
    const panPart = (req.body.panNo || 'XXXX').replace(/[^A-Z0-9]/g, '').padEnd(4, 'X').slice(0, 4);
    const trackingId = `${namePart} ${aadhaarPart} ${panPart}`;

    // File URLs (local path for now)
    const getFileUrl = (field) => req.files[field]?.[0]?.path || '';

    const newRequest = {
      ...req.body,
      trackingId,
      aadharImageUrl: getFileUrl('aadharImage'),
      panImageUrl: getFileUrl('panImage'),
      incomeCertificateUrl: getFileUrl('incomeCertificate'),
      residentialCertificateUrl: getFileUrl('residentialCertificate'),
      familyPhotoUrl: getFileUrl('familyPhoto'),
      createdAt: new Date().toISOString()
    };

    // Save to local JSON file
    const requests = readRequests();
    requests.unshift(newRequest);
    writeRequests(requests);

    res.json({ message: 'Application received!', trackingId });
  } catch (err) {
    console.error('Failed to save request:', err);
    res.status(500).json({ error: 'Failed to save request', details: err.message });
  }
});

// Admin: Get all requests
app.get('/requests', (req, res) => {
  try {
    const requests = readRequests();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
});

app.get('/user', (req, res) => {
  res.send('User route: Welcome user!');
});

app.get('/admin', (req, res) => {
  res.send('Admin route: Welcome admin!');
});

app.get('/', (req, res) => {
  res.send('NyaayPath Backend is running!');
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

let admin;
try {
  const firebaseCredentialsPath = process.env.FIREBASE_CREDENTIALS;
  if (firebaseCredentialsPath && fs.existsSync(firebaseCredentialsPath)) {
    admin = require('firebase-admin');
    admin.initializeApp({
      credential: admin.credential.cert(require(firebaseCredentialsPath)),
    });
    console.log('Firebase Admin initialized');
  } else {
    console.warn('Firebase credentials file not found. Skipping Firebase Admin initialization.');
  }
} catch (err) {
  console.error('Error initializing Firebase Admin:', err);
}

app.post('/ai-verify-address', async (req, res) => {
  try {
    const { address } = req.body;
    if (!address) {
      return res.status(400).json({ error: 'Address is required' });
    }
    // Prepare prompt for AI model
    const prompt = `Verify if the following address is real and valid (not fake or random):\n${JSON.stringify(address, null, 2)}`;
    // Call Gemini/OpenAI API (placeholder)
    const apiKey = process.env.AI_API_KEY;
    // Example for OpenAI (replace with Gemini if needed)
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are an address verification assistant.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 100,
      }),
    });
    const data = await response.json();
    const aiResult = data.choices?.[0]?.message?.content || 'No response from AI.';
    res.json({ result: aiResult });
  } catch (err) {
    console.error('AI verify error:', err);
    res.status(500).json({ error: 'AI verification failed', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 