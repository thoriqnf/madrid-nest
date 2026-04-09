# Advanced Authentication & Security Guide

This guide explains the extra layers of protection we've added to CourseHub. We focused on making the system more secure by "rotating" tokens, preventing hackers from spamming our login, and hiding sensitive information.

---

## Step-by-Step Implementation

### Step 1: Saving Security Keys in the Database
* **Checkpoint 1.1** - We added `hashedRefreshToken` to the User model in `schema.prisma`. This acts like a digital "session key" that we store so we can remember who is logged in and kick them out (logout) if needed.
* **Checkpoint 1.2** - **Terminal Commands**: We ran `prisma db push` to update the database and `prisma generate` to update our code so it recognizes this new "session key" field.

### Step 2: Strengthening Our Forms (Validation)
* **Checkpoint 2.1** - In `register.dto.ts`, we added rules to the registration form. Now, the email cannot be empty, and the password must be at least 6 characters long.
* **Checkpoint 2.2** - In `login.dto.ts`, we made sure the login form also requires an email and password - no empty submissions allowed!
* **Checkpoint 2.3** - In `auth.service.ts`, we added comments to explain **Password Hashing**. Think of hashing as "scrambling" a password so even if someone steals our database, they can't read the real passwords.

### Step 3: Setting Up "Token Rotation" (The key swap)
* **Checkpoint 3.1** - We created a strategy in `rt.strategy.ts` to handle **Refresh Tokens**. These are long-term keys that let users stay logged in without typing their password every 15 minutes.
* **Checkpoint 3.2** - In `refresh-auth.guard.ts`, we created a "Security Guard" specifically for the refresh process.
* **Checkpoint 3.3** - In `auth.service.ts`, we wrote the logic to give users a **brand new pair of keys** (Access and Refresh) every time they refresh. This "rotation" makes it much harder for hackers to reuse old stolen keys.
* **Checkpoint 3.4** - We added a dedicated route (`/auth/refresh`) for this key swap in `auth.controller.ts`.
* **Checkpoint 3.5** - In `auth.module.ts`, we told NestJS to use all these new security tools.

### Step 4: Secure Logout (Cleaning Up)
* **Checkpoint 4.1** - In `auth.service.ts`, we added a way to "forget" the Refresh Token in the database. When a user logs out, their long-term key is destroyed so nobody can use it again.
* **Checkpoint 4.2** - In `auth.controller.ts`, we added the `/auth/logout` route for users to click.

### Step 5: Global Safety Shields
* **Checkpoint 5.1** - In `app.module.ts`, we installed a **Rate Limiter**. This is like a guard at the door who only allows someone to try logging in 10 times per minute. This stops "Brute Force" attacks where a computer tries thousands of passwords.
* **Checkpoint 5.2** - In `main.ts`, we added **Helmet**. This automatically sets up invisible security headers that protect your website from common browser-based attacks.

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
