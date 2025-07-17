# Full Stack E-Commerce Application

## 🚀 Getting Started

### 1. Clone the Repository

git clone <your-repo-url>
cd <project-root>


This is a full-stack mini e-commerce application built using:

- **Backend:** Node.js + Express
- **Frontend:** Next.js
- **Databases:** MySQL (with Sequelize) and MongoDB (with Mongoose)

---

## ✅ Project Setup Steps

### 2. Install Node Modules

You need to install dependencies in both the **backend (root)** and the **frontend** folders.

```bash
# Step 1: Install backend dependencies
npm install

# Step 2: Move to frontend folder
cd frontend

# Step 3: Install frontend dependencies
npm install

project-root/
│
├── models/
│   ├── mysql/       # MySQL models (e.g. User, Order)
│   └── mongodb/     # MongoDB models (e.g. Product)
│
├── controllers/     # Controller logic for each API route
│
├── routes/          # Express route handlers (e.g. user.routes.js)
│
├── middleware/      # Middleware functions (e.g. token authentication)
│
├── config/
│   ├── mysql.js     # MySQL database connection
│   └── mongodb.js   # MongoDB database connection
│
├── frontend/        # Next.js frontend app
│
├── index.js         # Entry point of the backend server
├── package.json     # Backend dependencies and scripts
└── README.md        # Project instructions


