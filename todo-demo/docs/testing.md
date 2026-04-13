# Testing Guide - Todo Demo

This project follows a systematic approach to testing across three layers: **Controllers**, **Services**, and **Repositories**.

## Testing Patterns

We use specific markers to identify key testing concepts in our code:

### 1.0 Dependency Injection
Dependency injection in NestJS tests allows us to swap real implementations with mocks. We use `Test.createTestingModule` to set up the testing module.

### 2.0 Mock Pattern
We use `jest.fn()` and `mockResolvedValue` to isolate the component being tested from its dependencies (like Prisma or other services).

### 3.0 Async/Await
Since our operations (database calls, hashing) are asynchronous, we use `async/await` in our tests to ensure they execute correctly.

### 4.0 Error Handling
Testing how our application handles failures (e.g., duplicate users or 404s) is critical for robustness.

### 5.0 Business Logic
The core "rules" of the application, such as ensuring a user can only edit their own todos.

## Running Tests

To run all tests:
```bash
npm run test
```

To check code coverage:
```bash
npm run test:cov
```

Generating coverage reports helps ensure that all parts of the code are tested and identifies areas that might need more attention.
