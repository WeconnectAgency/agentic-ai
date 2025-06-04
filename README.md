# Agentic AI Backend

This repository contains the backend service for Alma Glamping's conversational agent.

## Environment Variables

Create a `.env` file inside the `backend` directory and define the following variables:

- `OPENAI_API_KEY` – API key used to call the OpenAI service.
- `PORT` – Port number for the Express server.
- `APP_NAME` – Application name shown in server logs.
- `MONGO_URI` – MongoDB connection string used for persistence.

The `.env` file is listed in `.gitignore` to keep secrets out of version control.
