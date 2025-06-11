# Agentic AI

This project contains a Node.js backend.

## Running Tests

Install dependencies and run the test suite from the `backend` folder:

```bash
cd backend
npm test
```

## Environment Variables

1. Copy the example environment file:

```bash
cp backend/.env.example backend/.env
```

2. Edit `backend/.env` and replace the placeholder values with your real credentials.

The backend expects at least the following variables:

- `OPENAI_API_KEY`
- `PORT`
- `APP_NAME`
- `MONGO_URI`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `GOOGLE_SHEET_ID`
- `GOOGLE_CLIENT_EMAIL`
- `GOOGLE_PRIVATE_KEY`


## License

This project is licensed under the [MIT License](LICENSE).

