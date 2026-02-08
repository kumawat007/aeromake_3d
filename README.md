
# AeroMake Marketplace

A full-stack, production-ready marketplace application for drone enthusiasts, featuring 3D printing services and custom parts.

## 🚀 Key Features

*   **Production-Ready Backend**: Built with Express.js and TypeScript, featuring robust error handling and security headers (Helmet).
*   **PostgreSQL Database**: Persistent data storage using Drizzle ORM and `node-postgres` (via `@neondatabase/serverless`).
*   **Secure Authentication**: Complete auth system with Passport.js (local strategy), session management (`express-session` + `connect-pg-simple`), and scrypt password hashing.
*   **Modern Frontend**: React + Vite application with beautiful UI components (Shadcn UI + Tailwind CSS) and Framer Motion animations.
*   **Responsive Design**: Fully responsive layout optimized for all devices.
*   **State Management**: Uses React Query for server state and Zustand for local cart management.

## 🛠️ Tech Stack

*   **Frontend**: React, TypeScript, Vite, Tailwind CSS, Framer Motion, Wouter (Routing), React Query.
*   **Backend**: Node.js, Express, Drizzle ORM.
*   **Database**: PostgreSQL (Neon/Standard Postgres).
*   **Authentication**: Passport.js, Express Session.

## 📦 Project Structure

```
├── client/             # Frontend React Application
│   ├── src/
│   │   ├── components/ # Reusable UI components & Feature components
│   │   ├── hooks/      # Custom React hooks (useAuth, useToast)
│   │   ├── lib/        # Utilities (queryClient, cartStore)
│   │   ├── pages/      # Page components (Landing, Auth, NotFound)
│   │   └── App.tsx     # Main App component with Routing & Providers
│
├── server/             # Backend Express Application
│   ├── auth.ts         # Authentication configuration (Passport)
│   ├── db.ts           # Database connection setup
│   ├── index.ts        # Server entry point & middleware config
│   ├── routes.ts       # API Routes definition
│   └── storage.ts      # Data access layer (Drizzle implementation)
│
├── shared/             # Shared Types & Schema
│   └── schema.ts       # Drizzle schema & Zod types
```

## ⚡ Getting Started

### 🌟 Showcase Mode (No Database Required)

This project is configured to run instantly without setting up a database.
- **Run Immediately**: Just `npm run dev`.
- **In-Memory Data**: It uses a temporary in-memory database with sample data (Biplane, Drone, etc.).
- **Ideal for Demos**: Perfect for portfolios or quick testing.

### Prerequisites (For Production/Persistence)

*   Node.js (v18+)
*   PostgreSQL Database URL (Optional - only for persistent data)

### Installation

1.  **Clone the repository**
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Environment Setup**:
    Create a `.env` file (or set variables in your environment):
    ```env
    DATABASE_URL=postgresql://user:password@host:port/dbname
    SESSION_SECRET=your_super_secret_session_key
    ```
4.  **Database Migration**:
    Push the schema to your database:
    ```bash
    npm run db:push
    ```
5.  **Run Development Server**:
    ```bash
    npm run dev
    ```

## 🏗️ Build for Production

1.  **Build the application**:
    ```bash
    npm run build
    ```
    This compiles the frontend to `dist/public` and prepares the server.
2.  **Start Production Server**:
    ```bash
    npm start
    ```

## 🔒 Security Features

*   **Helmet**: Sets secure HTTP headers.
*   **Compression**: Gzip compression for faster load times.
*   **Session Security**: HttpOnly cookies, secure session storage in DB.
*   **Input Validation**: Zod schema validation for all API inputs.
