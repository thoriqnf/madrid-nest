# Testing Guide - Todo Demo Training

This guide provides a granular, step-by-step implementation for the Todo Demo application. Follow the markers in the code sequentially to complete the testing suite.

---

## 1.0 Dependency Injection (Setup)

We use `Test.createTestingModule` to set up a sandboxed environment for our classes.

### 1.1 - 1.2 Repository Setup
- **Files**: `users.repository.spec.ts`, `todos.repository.spec.ts`
- **Goal**: Inject the repository and a mocked `PrismaService`.
- **Instruction**: Use the `providers` array to register the Repository and use `{ provide: PrismaService, useValue: mockPrismaService }`.

### 1.3 - 1.5 Service Setup
- **Files**: `users.service.spec.ts`, `auth.service.spec.ts`, `todos.service.spec.ts`
- **Goal**: Inject the Service and its dependencies (Repository, JwtService, etc.).
- **Instruction**: Ensure all dependencies are provided as mocks to prevent side effects.

### 1.6 - 1.7 Controller Setup
- **Files**: `auth.controller.spec.ts`, `todos.controller.spec.ts`
- **Goal**: Inject the Controller and its corresponding Service mock.
- **Instruction**: Controllers use the `controllers` array in the testing module.

---

## 2.0 Mock Pattern

Mocks define the data and behavior returned by dependencies during tests.

### 2.1 - 2.3 Repository Mocks
- **Action**: Define `mockUser` or `mockTodo` objects and a `mockPrismaService` that returns them via `jest.fn().mockResolvedValue()`.

### 2.4 - 2.6 Service Mocks
- **Action**: Define mock objects for the underlying repositories. Ensure all methods used in the service (e.g., `findUnique`, `create`) are mocked.

### 2.7 - 2.8 Controller Mocks
- **Action**: Define mock objects for the Services. For example, `mockAuthService` should simulate `signup` and `signin` returning tokens.

---

## 3.0 Async/Await

All database and auth logic in this app is asynchronous.

### 3.1 - 3.7 Async Implementation
- **Goal**: Ensure the test runner waits for the result.
- **Action**: Add the `async` keyword to the `it` or `describe` callback and use `await` before calling any method.

---

## 4.0 Error Handling

We must test that our code fails correctly when given bad data.

### 4.1 Collision Test (Auth)
- **File**: `auth.service.spec.ts`
- **Action**: Force the `findByEmail` mock to return an existing user, then verify that `signup` throws a `ConflictException`.

### 4.2 Not Found Test (Todos)
- **File**: `todos.service.spec.ts`
- **Action**: Force the `findUnique` mock to return `null`, then verify that `findOne` throws a `NotFoundException`.

---

## 5.0 Business Logic Implementation

The final verification of the "Happy Path".

### 5.1 - 5.2 Repository Logic
- **Action**: Call the repository method and `expect` that the underlying Prisma call was made with the correct parameters.

### 5.3 - 5.5 Service Logic
- **Action**: Verify that the service correctly interacts with the repository and returns the expected result.

### 5.6 - 5.7 Controller Logic
- **Action**: Verify that the controller returns the correct status code and data (e.g., tokens or todo objects) to the client.

---

## Marker Checklist

| Step | Marker | File | What to do? |
| :--- | :--- | :--- | :--- |
| 1 | **1.1** | `users.repository.spec.ts` | Setup `UsersRepository` DI |
| 2 | **1.2** | `todos.repository.spec.ts` | Setup `TodosRepository` DI |
| 3 | **1.3** | `users.service.spec.ts` | Setup `UsersService` DI |
| 4 | **1.4** | `auth.service.spec.ts` | Setup `AuthService` DI |
| 5 | **1.5** | `todos.service.spec.ts` | Setup `TodosService` DI |
| 6 | **1.6** | `auth.controller.spec.ts` | Setup `AuthController` DI |
| 7 | **1.7** | `todos.controller.spec.ts` | Setup `TodosController` DI |
| 8 | **2.1** | `users.repository.spec.ts` | Create `mockUser` & `mockPrismaService` |
| 9 | **2.2** | `todos.repository.spec.ts` | Create `mockTodo` |
| 10 | **2.3** | `todos.repository.spec.ts` | Create `mockPrismaService` for Todos |
| 11 | **2.4** | `users.service.spec.ts` | Create `mockRepository` |
| 12 | **2.5** | `auth.service.spec.ts` | Create multiple Service mocks |
| 13 | **2.6** | `todos.service.spec.ts` | Create `mockRepository` for Todos |
| 14 | **2.7** | `auth.controller.spec.ts` | Create `mockAuthService` |
| 15 | **2.8** | `todos.controller.spec.ts` | Create `mockTodosService` |
| 16 | **3.x** | All Files | Wrap tests in `async/await` |
| 17 | **4.1** | `auth.service.spec.ts` | Throw `ConflictException` if user exists |
| 18 | **4.2** | `todos.service.spec.ts` | Throw `NotFoundException` if no todo |
| 19 | **5.1** | `users.repository.spec.ts` | Assert `findUnique` logic |
| 20 | **5.2** | `todos.repository.spec.ts` | Assert `create` logic |
| 21 | **5.3** | `users.service.spec.ts` | Assert `findByEmail` logic |
| 22 | **5.4** | `auth.service.spec.ts` | Assert `signup` logic |
| 23 | **5.5** | `todos.service.spec.ts` | Assert `create` logic |
| 24 | **5.6** | `auth.controller.spec.ts` | Assert `signup` returns tokens |
| 25 | **5.7** | `todos.controller.spec.ts` | Assert `create` returns todo |
