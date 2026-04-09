# Advanced Authentication & Security Guide

This guide explains the extra layers of protection we've added to CourseHub. Each step below is marked in the code with a searchable tag like `TODO ADV AUTH: X.Y`.

---

## Step-by-Step Implementation

### Step 1: Security Setup & Database
* **Todo Adv Auth: 1.1** - `package.json`: We added security dependencies (`helmet`, `@nestjs/throttler`) to protect against common web attacks and brute-force attempts.
* **Todo Adv Auth: 1.2** - `prisma/schema.prisma`: Added `hashedRefreshToken` to the User model. Search for the tag in this file to see the field definition.
* **Todo Adv Auth: 1.3** - **Terminal Commands**: Run `npx prisma db push` to update the database schema and `npx prisma generate` to sync our TypeScript types.

### Step 2: Validation & Hashing
* **Todo Adv Auth: 2.1** - `src/auth/dto/register.dto.ts`: Added validation decorators (`@IsEmail`, `@IsNotEmpty`, `@MinLength`). 
* **Todo Adv Auth: 2.2** - `src/auth/dto/login.dto.ts`: Added similar validation rules for the login form.
* **Todo Adv Auth: 2.3** - `src/auth/auth.service.ts`: Implemented password hashing using `bcrypt` in the registration flow.

### Step 3: Token Rotation Implementation
* **Todo Adv Auth: 3.1** - `src/auth/strategies/rt.strategy.ts`: Created the **Refresh Token Strategy** to handle long-term session keys.
* **Todo Adv Auth: 3.2** - `src/auth/guards/refresh-auth.guard.ts`: Created a dedicated "Security Guard" to protect the refresh cycle.
* **Todo Adv Auth: 3.3** - `src/auth/auth.service.ts`: Added the `getTokens` helper to generate dual-token pairs.
* **Todo Adv Auth: 3.4** - `src/auth/auth.service.ts`: Implemented the `refreshTokens` logic for **Token Rotation**.
* **Todo Adv Auth: 3.5** - `src/auth/auth.controller.ts`: Added the `POST /auth/refresh` endpoint.
* **Todo Adv Auth: 3.6** - `src/auth/auth.module.ts`: Registered the `RtStrategy` in the providers list.

### Step 4: Secure Logout
* **Todo Adv Auth: 4.1** - `src/auth/auth.service.ts`: Implemented the `logout` method to clear session keys from the database.
* **Todo Adv Auth: 4.2** - `src/auth/auth.controller.ts`: Added the `POST /auth/logout` route.

### Step 5: Global Protection
* **Todo Adv Auth: 5.1** - `src/app.module.ts`: Configured the `ThrottlerModule` for rate limiting (10 attempts per minute).
* **Todo Adv Auth: 5.2** - `src/main.ts`: Enabled **Helmet** and the **Global ValidationPipe**.

---

## Your Advanced Security Routes

**Base URL:** `http://localhost:9000/api/v1`

| Endpoint | Method | Security | What does it do? |
| :--- | :--- | :--- | :--- |
| `/auth/login` | POST | Rate Limited | Validates credentials & issues Access/Refresh pair. |
| `/auth/refresh` | POST | Refresh Key | Swaps old keys for a new pair (Rotation). |
| `/auth/logout` | POST | Access Key | Clears session from DB. |

---

## How to Test Your Progress (Demo)

### 1. Testing Token Rotation (Key Swap)
1. **Login**: Call `POST /auth/login`. Copy the `refresh_token`.
2. **Refresh**: 
    - Go to `POST /auth/refresh`.
    - Set **Auth** -> **Bearer Token** to your `refresh_token`.
    - Click Send. You should receive a **new pair**.
3. **Rotation Check**: Try refreshing again with the *same* old token. It should fail (403 Forbidden).

### 2. Testing Logout
1. **Logout**: Call `POST /auth/logout` with your current `access_token`.
2. **Verify**: Attempting `POST /auth/refresh` should now fail because the session was cleared.

### 3. Testing Rate Limiting
1. **Spam**: Click Send repeatedly on `POST /auth/login`.
2. **Result**: After 10 rapid clicks, you will receive `429 Too Many Requests`.

---

> [!TIP]
> **Pro Tip:** You can search the entire project for `TODO ADV AUTH` to see all the security changes at once!
