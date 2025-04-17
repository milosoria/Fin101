# Fin101 Backend

A Go backend application for managing user transactions with JWT authentication.

## Features

- User authentication (signup/login)
- JWT-based authentication
- Transaction management
- User email management
- PostgreSQL database integration

## Prerequisites

- Go 1.16 or higher
- PostgreSQL database
- Make sure you have the following environment variables set in your `.env` file:
  ```
  DB_HOST=localhost
  DB_USER=postgres
  DB_PASSWORD=postgres
  DB_NAME=fin101
  DB_PORT=5432
  JWT_SECRET=your-secret-key-here
  ```

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   go mod download
   ```
3. Create a PostgreSQL database named `fin101`
4. Update the `.env` file with your database credentials
5. Run the application:
   ```bash
   go run cmd/api/main.go
   ```

## API Endpoints

### Authentication

- `POST /signup` - Create a new user
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- `POST /login` - Login and get JWT token
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

### Transactions (Protected Routes)

- `POST /api/transactions` - Create a new transaction
  ```json
  {
    "category": "food",
    "type": "egress",
    "amount": 100.50,
    "bank_name": "Banco de Chile"
  }
  ```

- `GET /api/transactions` - Get all transactions for the authenticated user

### User Emails (Protected Routes)

- `POST /api/emails` - Add a new email for the user
  ```json
  {
    "email": "additional@example.com"
  }
  ```

- `GET /api/emails` - Get all emails for the authenticated user

- `DELETE /api/emails/:id` - Delete a specific email for the authenticated user

## Transaction Categories

- food
- transport
- entertainment
- utilities
- salary
- other

## Transaction Types

- egress
- ingress

## Bank Names

- Banco de Chile
- Banco Estado
- Banco Santander
- Banco BCI
- Banco Itaú
- Banco Scotiabank
- Banco BICE
- Banco Security
- Banco Falabella
- Banco Consorcio
- Banco Ripley
- Banco BBVA 