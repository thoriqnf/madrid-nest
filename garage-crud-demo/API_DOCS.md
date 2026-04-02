# Garage CRUD API Documentation (v1)

This project uses a standard NestJS structure with `/api/v1` as the global prefix. All database interactions are done using **raw SQL**.

## 🛠 Database Management (No ORM)
Instead of using an ORM like Prisma or TypeORM, we manage the database using manual SQL scripts.

### 1. Reset Database (Optional)
**Warning: This drops all tables.** Use this to start fresh.
```bash
npm run reset
```

### 2. Run Migrations
Creates the tables defined in `scripts/migrations/`.
```bash
npm run migrate
```

### 3. Seed Data
Populates the tables with sample data from `scripts/seeds/`.
```bash
npm run seed
```

---

## 1. Services API
Endpoints for managing car services (Oil Change, Tire Rotation, etc.)

### List All Services
`GET /api/v1/services`
```bash
curl http://localhost:3000/api/v1/services
```

### Get Single Service
`GET /api/v1/services/:id`
```bash
curl http://localhost:3000/api/v1/services/1
```

### Create Service
`POST /api/v1/services`
```json
{
  "service_name": "Wash & Wax",
  "base_price": 25.0
}
```

### Update Service
`PATCH /api/v1/services/:id`
```json
{
  "base_price": 30.0
}
```

### Delete Service
`DELETE /api/v1/services/:id`
```bash
curl -X DELETE http://localhost:3000/api/v1/services/1
```

---

## 2. Transactions API (Simplified CRUD)
Endpoints for creating repair jobs (headers only).

### List All Transactions
`GET /api/v1/transactions`
```bash
curl http://localhost:3000/api/v1/transactions
```

### Create Transaction
`POST /api/v1/transactions`
```json
{
  "customer_id": 1,
  "outlet_id": 1
}
```

> [!NOTE]
> This version uses simplified CRUD for beginners. Nested transaction details are not included in the current API version.
