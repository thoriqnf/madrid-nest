# Testing Guide - Todo Demo Training

This guide provides a systematic approach to implementing tests for the Todo Demo application. We follow a 5-step pattern to ensure consistency and robustness across Repositories, Services, and Controllers.

## 1.0 Dependency Injection (Setup)

In NestJS, we use the `Test` utility to create a testing module. This allows us to inject **Mocks** instead of real implementations, isolating the class under test.

**Implementation Steps:**
1. Use `Test.createTestingModule` to define the providers and controllers.
2. Use `{ provide: ClassName, useValue: mockObject }` to swap real dependencies with mocks.
3. Call `.compile()` and use `module.get<T>(ClassName)` to retrieve instance.

> [!TIP]
> Always retrieve both the class under test and its mocked dependencies from the testing module to ensure they are properly wired.

---

## 2.0 Mock Pattern

Mocks are objects that simulate the behavior of real dependencies. We use `jest.fn()` to create trackable mock functions.

**Implementation Steps:**
1. Define a `mockData` object (e.g., `mockUser`, `mockTodo`).
2. Create a `mockService` or `mockRepository` object where each method is a `jest.fn()`.
3. Use `.mockResolvedValue(data)` for success cases and `.mockImplementation()` for dynamic responses.

---

## 3.0 Async/Await

Most backend operations (Database, Auth, Hashing) are asynchronous. Our tests must reflect this by using `async/await`.

**Implementation Steps:**
1. Declare the test callback as `async () => { ... }`.
2. Use `await` when calling service or repository methods.
3. Use `await expect(...).rejects.toThrow()` when testing for errors.

---

## 4.0 Error Handling

Robust applications handle failure gracefully. We test edge cases like "Not Found", "Conflict", or "Unauthorized" exceptions.

**Implementation Steps:**
1. Configure your mock to return a failure state (e.g., `mockResolvedValue(null)`).
2. Use `expect(...).rejects.toThrow(ExceptionClass)` to verify the correct error is raised.

---

## 5.0 Business Logic Implementation

This is where you write the actual test cases to verify that the application logic works as expected.

**Common Assertions:**
- `expect(result).toEqual(expected)`: Check return values.
- `expect(mock.method).toHaveBeenCalledWith(...)`: Ensure dependencies are called with correct params.
- `expect(result).toHaveProperty('key')`: Verify object structure.

---

## Marker Map

Follow the sequence of TODOs from 1.1 to 5.7 across the files:

| Marker | Category | File | Description |
| :--- | :--- | :--- | :--- |
| **1.1 - 1.2** | Dependency Injection | `*.repository.spec.ts` | Setup Repository tests |
| **1.3 - 1.5** | Dependency Injection | `*.service.spec.ts` | Setup Service tests |
| **1.6 - 1.7** | Dependency Injection | `*.controller.spec.ts` | Setup Controller tests |
| **2.1 - 2.8** | Mock Pattern | All Spec Files | Define Mocks and Data |
| **3.1 - 3.7** | Async/Await | All Spec Files | Async test structure |
| **4.1 - 4.2** | Error Handling | `auth.service.spec.ts`, `todos.service.spec.ts` | Exceptions |
| **5.1 - 5.7** | Business Logic | All Spec Files | Implementation of test cases |

---

## Running the Demo

1. **Setup**: `bun install`
2. **Run Tests**: `bun test`
3. **Watch Mode**: `bun test --watch`
4. **Coverage**: `bun test --coverage`
