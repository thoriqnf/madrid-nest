# Garage CRUD API Documentation (v1)

This project uses a standard NestJS structure with `/api/v1` as the global prefix. All database interactions are done using **raw SQL**.

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

## 2. Transactions API
Endpoints for creating repair jobs with multiple services.

### List All Transactions
`GET /api/v1/transactions`
```bash
curl http://localhost:3000/api/v1/transactions
```

### Create Transaction (with details)
`POST /api/v1/transactions`
```json
{
  "customer_id": 1,
  "outlet_id": 1,
  "details": [
    { "service_id": 1, "subtotal": 50.0 },
    { "service_id": 2, "subtotal": 30.0 }
  ]
}
```

> [!TIP]
> Each transaction creation uses a **SQL Transaction Block** (`BEGIN/COMMIT`). If any part fails (e.g., service ID doesn't exist), the entire transaction is rolled back automatically.
