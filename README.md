# Finance Data Processing API

Project: Building a Backend system for Financial Management & Dashboard with User Role-Based Access Control (RBAC).

## 🚀 Technologies Used
- **Node.js + Express + TypeScript**
- **Prisma ORM + PostgreSQL (Supabase)**
- **Zod** (Data validation)
- **JWT + bcrypt** (Authentication & Password Hashing)

## 📁 Directory Structure (Layered Architecture)
- `src/config/`: Environment configurations, Database client setups.
- `src/controllers/`: Receives HTTP Requests and returns Responses.
- `src/middlewares/`: Global Error Handlers, Auth Guards, Role Guards, and Validation interceptors.
- `src/routes/`: REST API endpoint declarations.
- `src/services/`: Core business logic (Database queries, Auth logic, Dashboard data aggregation).
- `src/validations/`: Pre-defined validation schemas using Zod.

## 🔑 Installation & Execution
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Setup environment variables:**
   Create a `.env` file (or copy from `.env.example`) and provide your PostgreSQL connection URLs.
   ```env
   DATABASE_URL="postgresql://[user]:[password]@[host]:[port]/[database]"
   DIRECT_URL="postgresql://[user]:[password]@[host]:[port]/[database]"
   JWT_SECRET="your-secret-key"
   PORT=3000
   ```
3. **Synchronize Database (Push Schema):**
   ```bash
   npx prisma db push
   ```
4. **Start the Server:**
   ```bash
   npm start
   # Or for development:
   npm run dev
   ```

## 🧪 Testing
The system includes an `api-test.http` file for convenient testing.
If you are using **VS Code**, install the **REST Client** extension (by Huachao Mao).
Open the `api-test.http` file and click the `Send Request` buttons above the definitions to test the entire flow, from Registration -> Token Retrieval -> Testing Authorized API Endpoints.

---
**💡 Automatic Role Assignment design:**
The *first* user to register will automatically be granted the `ADMIN` role for easy onboarding. Any subsequent users will default to the `VIEWER` role. Once logged in as an Admin, you can manually update the roles of other users to `ANALYST` or `ADMIN`.
