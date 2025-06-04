# Agentic AI

## Backend Setup

### Installation
1. Ensure you have **Node.js 18+** installed.
2. Navigate to the `backend` folder and install dependencies:
   ```bash
   cd backend
   npm install
   ```

### Configuration
1. Copy `.env.example` to `.env` inside the `backend` directory:
   ```bash
   cp .env.example .env
   ```
2. Edit `.env` and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your-openai-key-here
   ```

### Running the Server
In the `backend` folder run:
```bash
node src/index.js
```
The server defaults to **port 3000**.

### Sending Messages from Other Platforms
The backend exposes a `/message` endpoint that accepts a JSON body with a `message` field. To integrate it with services like **WhatsApp** or **Instagram**, configure your webhook to send POST requests to this endpoint and relay the response back to the user. A minimal example using `curl`:
```bash
curl -X POST http://localhost:3000/message \
  -H 'Content-Type: application/json' \
  -d '{"message":"Hola"}'
```
