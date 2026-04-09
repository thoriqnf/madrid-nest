# Advanced Authentication & Security Guide

This guide explains the extra layers of protection we've added to CourseHub. We focused on making the system more secure by "rotating" tokens, preventing hackers from spamming our login, and hiding sensitive information.

---

## Step-by-Step Implementation

### Step 1: Security Setup & Database
* **Todo Adv Auth: 1.1** - `course-prisma-demo/package.json`: Added security dependencies (`helmet`, `@nestjs/throttler`) to protect against common web attacks and brute-force attempts.
* **Todo Adv Auth: 1.2** - `course-prisma-demo/prisma/schema.prisma`: Added `hashedRefreshToken` to the User model. This acts like a digital "session key" that we store so we can remember who is logged in and invalidate sessions remotely.
* **Todo Adv Auth: 1.3** - **Terminal Commands**: Run `npx prisma db push` to update the database schema and `npx prisma generate` to sync our TypeScript types.

### Step 2: Validation & Hashing
* **Todo Adv Auth: 2.1** - `src/auth/dto/register.dto.ts`: Added validation decorators (`@IsEmail`, `@IsNotEmpty`, `@MinLength`). Now, registration requires a valid email and a password of at least 6 characters.
* **Todo Adv Auth: 2.2** - `src/auth/dto/login.dto.ts`: Added similar validation rules for the login form to ensure no empty or malformed submissions reach our logic.
* **Todo Adv Auth: 2.3** - `src/auth/auth.service.ts`: Implemented password hashing using `bcrypt`. Hashing "scrambles" passwords so they remain secure even if the database is compromised.

### Step 3: Token Rotation implementation
* **Todo Adv Auth: 3.1** - `src/auth/strategies/rt.strategy.ts`: Created a new strategy specifically for handling **Refresh Tokens**, which are long-term keys that keep users logged in safely.
* **Todo Adv Auth: 3.2** - `src/auth/guards/refresh-auth.guard.ts`: Created a dedicated "Security Guard" to protect the refresh process and ensure only valid long-term keys can request new access.
* **Todo Adv Auth: 3.3** - `src/auth/auth.service.ts`: Implemented `getTokens` and `updateRefreshToken` helpers to manage the generation and storage of dual-token pairs (Access & Refresh).
* **Todo Adv Auth: 3.4** - `src/auth/auth.service.ts`: Added the `refreshTokens` logic. This implements **Token Rotation**: every time a user refreshes, they get a *brand new* pair of tokens, and the old ones are invalidated.
* **Todo Adv Auth: 3.5** - `src/auth/auth.controller.ts`: Added the `/auth/refresh` endpoint to handle token swap requests from the frontend.
* **Todo Adv Auth: 3.6** - `src/auth/auth.module.ts`: Registered the `RtStrategy` and `RefreshAuthGuard` so NestJS knows how to use our new security tools.

### Step 4: Secure Logout
* **Todo Adv Auth: 4.1** - `src/auth/auth.service.ts`: Implemented the `logout` method to clear the `hashedRefreshToken` in the database, effectively "forgetting" the user's session.
* **Todo Adv Auth: 4.2** - `src/auth/auth.controller.ts`: Added the `/auth/logout` route so users can securely end their sessions.

### Step 5: Global Protection
* **Todo Adv Auth: 5.1** - `src/app.module.ts`: Configured the `ThrottlerModule`. This acts like a guard who only allows 10 login attempts per minute, stopping "Brute Force" machine attacks.
* **Todo Adv Auth: 5.2** - `src/main.ts`: Enabled **Helmet** for secure HTTP headers and applied the **ValidationPipe** globally to automatically enforce our DTO rules across the entire app.

---

## Your Advanced Security Routes

**Base URL:** `http://localhost:9000/api/v1`

| Endpoint | Method | Security | What does it do? (In plain English) |
| :--- | :--- | :--- | :--- |
| `/auth/login` | POST | Anti-Spam | Checks your password and gives you two keys (Access & Refresh). |
| `/auth/refresh` | POST | Refresh Key | Swaps your old keys for a brand new pair to keep you logged in safely. |
| `/auth/logout` | POST | Access Key | "Forgets" your keys in the database so you are fully logged out. |

---

## How to Test Your Progress (Demo)

### 1. Testing the "Key Swap" (Token Rotation)
1. **Login**: Call `POST /auth/login`. Look at the response - you'll see an `access_token` and a `refresh_token`.
2. **Access your Profile**: Use the `access_token` to call `GET /auth/profile`.
3. **Perform the Swap**: 
    - Go to `POST /auth/refresh`.
    - In Postman, go to the **Auth** tab, choose **Bearer Token**.
    - **Crucial**: Paste the `refresh_token` here (the long-term key).
    - Click Send. You should get a **brand new pair** of tokens.
4. **Confirm Safety**: Try to use that same `refresh_token` again. It should fail (give a `403` error). This is good! It means the old key was successfully replaced.

### 2. Testing Logout
1. **Logout**: Call `POST /auth/logout` using your current `access_token`.
2. **Verify**: Try to call the "Key Swap" (`/auth/refresh`) using your refresh token. It will fail because the server "forgot" that key when you logged out.

### 3. Testing the Anti-Spam Shield (Rate Limiting)
1. **Spam the server**: Rapidly click the "Send" button on the `POST /auth/login` request.
2. **The Result**: After 10 times, the server will say `429 Too Many Requests`. The shield is working!

---

> [!TIP]
> **Why do we have two tokens?**
> Think of the **Access Token** like a **hotel keycard**. It opens doors but expires quickly (15 minutes). 
> The **Refresh Token** is like the **registration paper** you keep in your wallet. It's not a door key, but you can show it to the front desk to get a new keycard whenever yours expires!
