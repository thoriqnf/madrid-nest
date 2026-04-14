# Advanced Testing Guide - Todo Demo Training

This guide covers sophisticated NestJS testing patterns. Follow the `// TODO ADV Testing:` markers sequentially.

---

## 5.0 Custom Decorator Testing

Custom decorators are pure functions but they rely on the `ExecutionContext` to access request data.

### 5.1 - 5.2 GetCurrentUser Decorator
- **File**: `get-current-user.decorator.spec.ts`
- **Goal**: Mock the HTTP request and verify data extraction.
- **Instruction**:
    - **5.1**: Mock `switchToHttp().getRequest()` to return a user object and verify the decorator extracts it.
    - **5.2**: Test field-specific extraction (e.g., extracting just the `sub` ID).

---

## 6.0 Passport Strategy Testing

Strategies are providers that can be tested in isolation to verify token validation logic.

### 6.1 - 6.2 Strategy Validation
- **Files**: `at.strategy.spec.ts`, `rt.strategy.spec.ts`
- **Goal**: Ensure the `validate` method returns what the application expects.
- **Instruction**: 
    - **6.1**: Test that `AtStrategy` returns the JWT payload correctly.
    - **6.2**: Test that `RtStrategy` extracts the refresh token from the request header correctly.

---

## 7.0 Resource Ownership (Security Boundary)

Testing that users cannot modify each other's data is a critical security test.

### 7.1 - 7.2 Todo Ownership Checks
- **File**: `todos.service.spec.ts`
- **Goal**: Verify logical access control.
- **Instruction**:
    - **7.1**: Force a repository mock to return a Todo belonging to User A, then call the service as User B and expect a `ForbiddenException`.
    - **7.2**: Verify that `update` and `delete` methods also trigger this ownership check.

---

## 8.0 Advanced Repository Resilience

Testing how repositories handle database failures or missing records using Prisma error codes.

### 8.1 Prisma Error Simulation
- **File**: `todos.repository.spec.ts`
- **Goal**: Test resilience against missing records.
- **Instruction**: 
    - **8.1**: Mock `prisma.todo.delete` to throw a `PrismaClientKnownRequestError` with code `P2025` (Record not found) and verify the repository's behavior.

---

## Expanded Marker Checklist (Advanced)

| Step | Marker | File | What to do? |
| :--- | :--- | :--- | :--- |
| 1-10 | **1.x - 4.x** | Various | (Core Advanced Testing - Auth/DTO/Guard/Repo) |
| 11 | **5.1** | `get-current-user.decorator.spec.ts` | Test full user extraction |
| 12 | **5.2** | `get-current-user.decorator.spec.ts` | Test field-specific extraction |
| 13 | **6.1** | `at.strategy.spec.ts` | Test AtStrategy validation |
| 14 | **6.2** | `rt.strategy.spec.ts` | Test RtStrategy RT extraction |
| 15 | **7.1** | `todos.service.spec.ts` | ForbiddenException on wrong owner |
| 16 | **7.2** | `todos.service.spec.ts` | Ownership check on updates |
| 17 | **8.1** | `todos.repository.spec.ts` | Simulate Prisma Record Not Found error |
