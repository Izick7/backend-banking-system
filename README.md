# Express Banking System

A beginner-friendly REST API built with Express.js.

## Features

- User registration
- User login with JWT authentication
- View account balance
- Create a 4-digit transaction PIN
- Update transaction PIN
- Transfer money to another registered user
- Basic validation and password/PIN hashing
- JSON file storage for learning purposes

> This is an educational project, not production banking software. Real banking systems require a database, transactions/locking, audit logs, rate limiting, encryption/key management, KYC/AML controls, fraud detection, and much stronger security.

## Requirements

- Node.js 18+
- npm

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

The API runs at:

`http://localhost:3000`

## API endpoints

### Register

`POST /api/auth/register`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

Every new account starts with a balance of `0`.

### Login

`POST /api/auth/login`

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Copy the returned JWT token and send it in:

`Authorization: Bearer YOUR_TOKEN`

### View balance

`GET /api/account/balance`

Requires authentication.

### Create PIN

`POST /api/account/pin`

```json
{
  "pin": "1234"
}
```

### Update PIN

`PATCH /api/account/pin`

```json
{
  "currentPin": "1234",
  "newPin": "5678"
}
```

### Transfer money

`POST /api/transfers`

```json
{
  "recipientEmail": "jane@example.com",
  "amount": 500,
  "pin": "5678"
}
```

The sender must have enough funds and must have a valid PIN.

## Testing with curl

Register two users:

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com","password":"password123"}'
```

Login:

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

Use the returned token:

```bash
curl http://localhost:3000/api/account/balance \
  -H "Authorization: Bearer YOUR_TOKEN"
```

Create a PIN:

```bash
curl -X POST http://localhost:3000/api/account/pin \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"pin":"1234"}'
```

Transfer:

```bash
curl -X POST http://localhost:3000/api/transfers \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"recipientEmail":"jane@example.com","amount":100,"pin":"1234"}'
```

## Project structure

```text
express-banking-system/
├── data/
│   └── db.json
├── src/
│   ├── controllers/
│   │   ├── accountController.js
│   │   ├── authController.js
│   │   └── transferController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── routes/
│   │   ├── accountRoutes.js
│   │   ├── authRoutes.js
│   │   └── transferRoutes.js
│   ├── utils/
│   │   ├── db.js
│   │   └── validation.js
│   └── server.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```
