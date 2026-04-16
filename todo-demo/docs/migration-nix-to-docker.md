# 🚀 Migration: From Nixpacks to Docker (Railway)

This document guides you through the transition from using **Nixpacks** (Week 3 Day 3) to a **Containerized (Docker)** deployment (Week 3 Day 4).

## 🧐 Why Migrate?

While Nixpacks is a fantastic "zero-config" builder, moving to a `Dockerfile` provides several critical advantages for professional production environments:

1.  **Full Environment Control**: We precisely control the Node.js version, OS (Alpine), and system dependencies.
2.  **Prisma Compatibility**: Prisma requires specific system libraries (like `openssl` and `libstdc++`) that can sometimes vary in automatic environments. Docker ensures they are always there.
3.  **Predictable Builds**: "It works on my machine" becomes "It works in the container." The build environment is identical to the runtime environment.
4.  **Automated Orchestration**: Using an `entrypoint.sh` allows us to run database migrations *before* the application starts, ensuring the schema is always up to date.

---

## 🏗️ The New Architecture

### 1. Multi-Stage Dockerfile
We use a **multi-stage build** to keep our final image lightweight (only ~200MB vs ~1GB).

- **Stage 1 (Builder)**: Installs all dependencies (including devDependencies), generates the Prisma client, and compiles TypeScript into JavaScript.
    - Uses `node:22-alpine` for a lightweight base.
    - Installs `python3`, `make`, and `g++` which are necessary for compiling many Node.js native modules (like `bcrypt`).
    - Uses `npm ci` (Clean Install) instead of `npm install` for reliable, reproducible builds from the lockfile.
- **Stage 2 (Runtime)**: Only copies the compiled code (`dist`), production dependencies, and the generated Prisma client. It uses a clean Alpine image for security and speed.
    - Installs `openssl` & `libstdc++`: Critical for Prisma's query engine and C++ binary compatibility on Linux.
    - **`EXPOSE 8000`**: Tells Docker which port the container listens on at runtime.
    - **`CMD ["./entrypoint.sh"]`**: The heart of the container's startup logic.

### 2. The Entrypoint Script (`entrypoint.sh`)
Previously, we might have manually run migrations. Now, `entrypoint.sh` handles it:
1.  Checks for the compiled build.
2.  Runs `npx prisma migrate deploy`.
3.  Starts the application only if migrations succeed.

### 3. Prisma 7 Configuration (`prisma.config.ts`)
We've moved from relying solely on environment variables in the schema to a dedicated configuration file. This provides:
- **Type Safety**: Better validation for database URLs.
- **Runtime Flexibility**: Easier handling of database connections in different environments (Docker vs Local).
- **Graceful Failures**: Better error messages if the `DATABASE_URL` is missing during migration.

### 4. Simplified `railway.json`
With a `Dockerfile` present, Railway automatically detects it. Our `railway.json` is now focused on deployment behavior rather than build instructions.

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "deploy": {
    "startCommand": "./entrypoint.sh",
    "healthcheckPath": "/",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

---

## 🔄 What Changed?

| Feature | Day 3 (Nixpacks) | Day 4 (Docker) |
| :--- | :--- | :--- |
| **Builder** | Railway Nixpacks | Docker Engine |
| **Configuration** | `railway.json` (build section) | `Dockerfile` |
| **Migrations** | Manual or in `startCommand` | Automated in `entrypoint.sh` |
| **Size** | Larger, dynamic | Smaller, optimized |
| **System Libs** | Automatic (sometimes missing) | Explicitly defined in Dockerfile |

---

## 🚀 How to Deploy Now

The command remains the same, but the process under the hood is better:

1.  **Ensure your Dockerfile and entrypoint.sh are in the root.**
2.  **Check permissions**: Ensure `entrypoint.sh` is executable (locally run `chmod +x entrypoint.sh`).
3.  **Run Deployment**:
    ```bash
    railway up
    ```

Railway will now see the `Dockerfile`, build the image, and use `./entrypoint.sh` to boot up your API.

---

## 🛠️ Troubleshooting

### "Permission Denied" for entrypoint.sh
If Railway fails to run the script:
-   **Fix**: Ensure the file has execution permissions before committing to Git.
    `git update-index --chmod=+x entrypoint.sh`

### Prisma Engine Errors
If you see errors about missing `libquery_engine`:
-   **Fix**: Check the `Runtime stage` in your `Dockerfile`. Ensure `openssl` is installed via `apk add`.
