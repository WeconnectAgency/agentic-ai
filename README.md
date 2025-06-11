# Agentic AI

This repository contains the Node.js backend that powers the conversational agent for **Alma Glamping**. The service exposes a chat API that interacts with OpenAI and stores conversation data in MongoDB.

## Setup

1. Install Node.js 18 or later.
2. Copy the example environment file and edit it with your own values:

   ```bash
   cp backend/.env.example backend/.env
   ```

   The backend expects at least the following variables:
   - `OPENAI_API_KEY`
   - `PORT`
   - `APP_NAME`
   - `MONGO_URI`

3. Install dependencies:

   ```bash
   cd backend
   npm install
   ```

## Development

Run the application in development mode with:

```bash
npm run dev
```

The server starts on the port defined in `backend/.env` and is ready to receive chat requests.



