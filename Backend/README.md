# Backend Environment Setup

## Required Environment Variables
Create a `.env` file in the `backend/` directory with the following variables:

```
MONGODB_URI=your_mongodb_connection_string
FIREBASE_CREDENTIALS=./nambapath-16c7b-firebase-adminsdk-fbsvc-9cea930e37.json
AI_API_KEY=your_ai_api_key_here
```

- `MONGODB_URI`: MongoDB  connection string
- `FIREBASE_CREDENTIALS`: Path to your Firebase Admin SDK JSON file
- `AI_API_KEY`: API key for Gemini, OpenAI, or other AI model

Install dependencies:
```
npm install
```

Run the backend server:
```
npm start
```

## Requirements
- Node.js (v16+ recommended)
- Firebase Admin SDK credentials (service account)
- (Optional) MongoDB URI for database

## Setup Steps
1. Copy `.env.example` to `.env` and fill in your Firebase and (optional) MongoDB credentials.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node index.js
   ```

## Environment Variables
- `FIREBASE_PROJECT_ID`: Your Firebase project ID
- `FIREBASE_CLIENT_EMAIL`: Firebase Admin SDK client email
- `FIREBASE_PRIVATE_KEY`: Firebase Admin SDK private key (use `\n` for newlines)
- `MONGODB_URI`: (Optional) MongoDB connection string
- `PORT`: Port for the backend server (default: 5000)

## Firebase Admin SDK
- Download your service account JSON from Firebase Console > Project Settings > Service Accounts.
- Copy the values into your `.env` file as shown in `.env.example`.

## MongoDB (Optional)
- You can add MongoDB integration later by filling in `MONGODB_URI` and uncommenting the code in `index.js`. 