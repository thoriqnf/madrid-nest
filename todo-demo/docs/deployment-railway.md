# Railway Deployment Guidance

This document provides step-by-step instructions for deploying the NestJS Todo API to Railway using the CLI.

## 🚀 Prerequisites

1.  **Railway CLI**: Installed on your machine.
    ```bash
    brew install railwayapp/taps/railway
    ```
2.  **Railway Account**: Logged in via the CLI.
    ```bash
    railway login
    ```

---

## 🛠️ Step 1: Configuration

To ensure smooth deployments, we use a `railway.json` file in the root directory. This automates database migrations and sets the correct start command.

### railway.json
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npx prisma migrate deploy && npm run start:prod",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

---

## 🔐 Step 2: Environment Variables

Your app requires specific variables to talk to the database and handle authentication.

| Variable | Description | Source |
| :--- | :--- | :--- |
| `DATABASE_URL` | Internal connection string for PostgreSQL | Railway DB Service |
| `JWT_SECRET` | Secret key for Access Tokens | Local .env or custom |
| `RT_SECRET` | Secret key for Refresh Tokens | Local .env or custom |
| `PORT` | Port number (usually 8000) | Handled by Railway |

### How to set variables via CLI:
```bash
railway variables set JWT_SECRET="your-secret" RT_SECRET="your-refresh-secret"
```

---

## 🚢 Step 3: Deployment Process

1.  **Link the project**:
    Connect your local code to the Railway project.
    ```bash
    railway link
    ```
2.  **Upload and Build**:
    Push your code to Railway.
    ```bash
    railway up
    ```
3.  **Monitor Logs**:
    Check the deployment progress.
    ```bash
    railway logs
    ```

---

## ❌ Troubleshooting Common Failures

### 1. Build Failure (Dependency Conflict)
If you see errors during `bun install`, it might be due to having both `bun.lock` and `package-lock.json`. 
**Fix**: Ensure your lockfile matches your intended package manager. Railway's Railpack builder will prefer one over the other.

### 2. Database Connection Refused
If the app fails to start after building:
-   Check if the `DATABASE_URL` is using the **Internal** URL (ends in `.railway.internal`).
-   Ensure the Database service and App service are in the **same project**.

### 3. Migrations Not Running
If you see "Table not found" errors in logs:
-   Ensure `railway.json` is present in the root.
-   Run manual migrations if needed: `railway run npx prisma migrate deploy`.
