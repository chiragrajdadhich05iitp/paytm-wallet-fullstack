# Paytm End-to-End Digital Wallet (Fullstack Architecture)

A high-throughput, ACID-compliant peer-to-peer (P2P) payment orchestration engine built on the MERN stack. Designed to handle stateful financial balances, idempotent transactions, and authenticated RESTful services with strict input sanitation.

---

## System Architecture & Highlights

* **Atomic Transaction Integrity:** Implements atomic MongoDB multi-document updates for ledger balancing to eliminate race conditions and double-spending vulnerabilities during concurrent balance transfers.
* **Stateless Session Management:** Employs RFC 7519 JSON Web Tokens (JWT) coupled with cryptographic salting via `bcrypt` (10 rounds) for authentication and access control.
* **Defensive Schema Validation:** Strict compile-time and runtime type inference using `Zod` schemas for all incoming HTTP request vectors (Sign-up, Sign-in, Profile Mutations, Account Filters).
* **Managed Distributed Persistence:** Powered by MongoDB Atlas cloud clusters featuring automated IP whitelisting and dynamic replica-set routing.
* **Component-Driven Client:** Single-Page Application (SPA) structured with React and styled via Tailwind CSS, offering debounced user filtering and persistent state handling.

---

## Tech Stack

* **Runtime:** Node.js (v24.x LTS)
* **Backend Framework:** Express.js
* **Persistence Layer:** MongoDB Atlas via Mongoose ODM
* **Data Validation:** Zod
* **Security & Auth:** JSON Web Tokens (JWT), Bcrypt.js, CORS
* **Frontend:** React.js, Tailwind CSS, Axios

---

## API Design & Endpoints

### 1. User & Identity Subsystem (`/api/v1/users`)
* `POST /signup` — Validates payload against `signUpSchema`, creates user record, assigns a baseline promotional wallet credit, and issues a 7-day bearer token.
* `POST /signin` — Compares cryptographic hashes using `bcrypt.compare` and returns authorization credentials.
* `PUT /update` — Authenticated profile mutation route with custom `authMiddleware`.
* `GET /bulk?filter=` — Debounced case-insensitive regex lookup (`$regex`, `$options: 'i'`) for real-time user discovery.

### 2. Account & Ledger Subsystem (`/api/v1/accounts`)
* `GET /balance` — Extracts account state linked to the verified claims in `req.userId`.
* `POST /transfer` — Executes atomic debit-credit ledger mutations with internal checks for balance exhaustion.

---

## Database Schemas

### `User`
```json
{
  "_id": "ObjectId",
  "username": "String (Unique, Lowercase, Trimmed)",
  "password": "String (Bcrypt Hashed)",
  "firstName": "String (Trimmed)",
  "lastName": "String (Trimmed)"
}

```

### `Account`

```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (Ref: User)",
  "balance": "Number (Integer Precision for Currency Safety)"
}

```

---

## Getting Started Locally

### Prerequisites

* Node.js >= 18.x
* A provisioned MongoDB Atlas Cluster URI

### 1. Clone & Configure Environment

```bash
git clone [https://github.com/chiragrajdadhich05iitp/paytm-wallet-fullstack.git](https://github.com/chiragrajdadhich05iitp/paytm-wallet-fullstack.git)
cd paytm-wallet-fullstack

```

Create a `.env` file in the root of `/backend`:

```env
PORT=3000
MONGO_URI="mongodb+srv://<username>:<password>@<cluster-url>/paytm?retryWrites=true&w=majority"
JWT_SECRET="your_secure_random_hex_string"

```

### 2. Backend Bootstrapping

```bash
cd backend
npm install
node seed.js    # Populates mock users and initial balances
node index.js   # Server starts on port 3000

```

### 3. Frontend Execution

```bash
cd ../frontend
npm install
npm run dev     # Starts Vite development server at http://localhost:5173

```

---

## Engineering Considerations

* **Concurrency Control:** Balances are represented using decimal scaling/integers to bypass JavaScript floating-point arithmetic precision errors (`0.1 + 0.2 !== 0.3`).
* **Fault Isolation:** Route handlers are wrapped in defensive `try/catch` pipelines routing uncaught exceptions to Express unified error-handling middleware.

```

```
