# PlagGuard Frontend — React SPA

PlagGuard Frontend is a React-based single-page application for plagiarism detection. Users search for reference articles, submit their text for analysis, and optionally paraphrase flagged content after signing in.

## Tech Stack

| Component   | Technology             |
|-------------|------------------------|
| Framework   | React 18               |
| Routing     | React Router 6         |
| Styling     | Tailwind CSS           |
| HTTP Client | Axios                  |
| Runtime     | Node.js 18.x – 22.x    |
| Package Mgr | npm 9.x or higher      |

## Requirements

| Tool   | Version              |
|--------|----------------------|
| Node.js| **18.x – 22.x** (LTS recommended) |
| npm    | **9.x or higher**    |

## Project Structure

```
plagiarism-frontend/
├── public/
│   ├── index.html
│   ├── manifest.json
│   ├── robots.txt
│   └── images/        # Static images including logo
├── src/
│   ├── App.js         # Main app component
│   ├── index.js       # React entry point
│   ├── index.css      # Global styles
│   ├── api/
│   │   └── client.js  # Axios HTTP client
│   ├── config/
│   │   └── constants.js# API endpoints and constants
│   ├── context/
│   │   └── AuthContext.jsx  # Authentication provider
│   ├── css/           # Additional stylesheets
│   └── components/
│       ├── auth/
│       │   ├── SignIn.jsx
│       │   └── SignUp.jsx
│       ├── layout/
│       │   ├── Header.jsx
│       │   └── Footer.jsx
│       ├── pages/
│       │   ├── AboutUs.jsx
│       │   ├── Contact.jsx
│       │   ├── PrivacyPolicy.jsx
│       │   └── TermsOfService.jsx
│       └── plagiarism/
│           ├── Articles.jsx
│           ├── MainPage.jsx
│           ├── PlagiarismForm.jsx
│           ├── PlagiarismDetection.jsx
│           ├── ParaphrasingTool.jsx
│           ├── Result.jsx
│           ├── Plagresult.jsx
│           └── HighlightedMatch.jsx
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── .env.example
```

## Getting Started

### 1. Install dependencies

```bash
cd plagiarism-frontend
npm install
```

### 2. Configure environment variables

Copy the example file:

```bash
cp .env.example .env
```

| Variable             | Description                                              |
|----------------------|----------------------------------------------------------|
| `REACT_APP_API_URL`  | Backend API URL. Leave empty in development (uses CRA proxy at `http://localhost:5000`). Set to your deployed API URL in production. |

### 3. Start the development server

```bash
npm start
```

App opens automatically at [http://localhost:3000](http://localhost:3000).

## Scripts

| Script  | Command                    | Description           |
|---------|----------------------------|-----------------------|
| `start` | `react-scripts start`      | Development server    |
| `build` | `react-scripts build`      | Production build      |
| `test`  | `react-scripts test`       | Run test suite        |

## Environment Variables Reference

```env
# Leave empty to use CRA dev proxy (localhost:5000)
# Set to your API URL in production
REACT_APP_API_URL=
```

## Development

### API Client Setup

The app uses a centralized Axios client in `src/api/client.js`:
- Automatically includes JSON headers
- Uses `REACT_APP_API_URL` if set, otherwise falls back to CRA proxy
- All API calls should use this client

### Authentication Context

User authentication state is managed in `src/context/AuthContext.jsx`:
- Stores JWT token and user info
- Provides login/logout functionality
- Wraps the entire app

### Production Build

```bash
npm run build
```

Outputs optimized files to `build/` folder. Deploy this to any static host (Netlify, Vercel, GitHub Pages, AWS S3, etc.) and set `REACT_APP_API_URL` before building.

## Troubleshooting

### `npm install` fails on Windows / OneDrive

If you see `EPERM` or `UNKNOWN` rename errors during `npm install`, OneDrive file syncing may be locking `node_modules`. Either:

- Pause OneDrive sync temporarily, or
- Move the project to a local folder outside OneDrive (e.g. `C:\Projects\`)

Then delete `node_modules` and run `npm install` again.

### CORS errors in the browser

The backend must have `CLIENT_URL` set to match your frontend URL (default: `http://localhost:3000`). Check your backend `.env` file.

### API calls fail or 404 errors

- Ensure the backend is running on `http://localhost:5000`
- If running on a different port, set `REACT_APP_API_URL` in `.env`
- Reload the page after changing `.env`

### Port 3000 already in use

```bash
# Set a different port before starting
$env:PORT=3001; npm start

# Or on macOS/Linux:
PORT=3001 npm start
```

### Old package-lock registry errors

If `npm install` fails with authentication errors, delete `package-lock.json` and run `npm install` again.

## License

ISC
