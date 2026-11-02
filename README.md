# Assignment 4 - Full-Stack Quiz Application

A complete full-stack quiz web application built with **Node.js, Express, MongoDB, Mongoose** on the backend and **React, Redux Toolkit, React Router, Bootstrap 5** on the frontend.

---

## 🌟 Features Overview

- **Authentication & Authorization**:
  - User signup and login with secure password hashing (`bcryptjs`) and JWT token authentication.
  - Role-based access control:
    - **Admin (`Mary`)**: Full CRUD permissions to create, read, update, and delete quiz questions and articles.
    - **User (`John`)**: Can take interactive quizzes, view scoring results, and read articles.
- **Redux Architecture**:
  - State management powered by modern **Redux Toolkit** (`@reduxjs/toolkit` and `react-redux`).
  - Slices for `auth`, `quiz`, `questions`, and `articles`.
  - Global state persists login authentication via `localStorage`.
- **Client-Side Routing (`react-router-dom` v6)**:
  - Protected routes redirect unauthenticated users to `/login`.
  - Role guards prevent regular users from accessing `/admin` routes.
- **Interactive Quiz Experience**:
  - Dynamic single-question display with radio button selection matching the assignment mockups.
  - Instant score tracking and summary screen with **Restart Quiz** functionality.
- **Clean Bootstrap 5 UI**:
  - Matches the exact design, typography, button colors, and layout shown in the assignment screenshots.

---

## 📁 Project Structure

```
ASS_4/
├── backend/
│   ├── bin/
│   │   └── www                     # Express Generator entry point script
│   ├── controllers/
│   │   ├── authController.js       # Register, Login, GetMe
│   │   ├── questionController.js   # CRUD questions & answer submission
│   │   ├── quizController.js       # CRUD quizzes
│   │   └── articleController.js    # CRUD articles
│   ├── middleware/
│   │   └── authMiddleware.js       # JWT protect & adminOnly middleware
│   ├── models/
│   │   ├── User.js                 # User schema (username, password, role)
│   │   ├── Question.js             # Question schema (questionText, options, correctAnswerIndex)
│   │   ├── Quiz.js                 # Quiz schema (title, description, questions)
│   │   └── Article.js              # Article schema (title, content, author)
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── questionRoutes.js
│   │   ├── quizRoutes.js
│   │   └── articleRoutes.js
│   ├── .env                        # PORT, MONGODB_URI, JWT_SECRET
│   ├── app.js                      # Express App initialization & middleware
│   ├── package.json                # "start": "node ./bin/www"
│   ├── seed.js                     # Pre-populates database with John, Mary, and the 5 sample questions
│   └── server.js                   # Bridge to bin/www
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js            # Axios client with JWT request interceptor
│   │   ├── components/
│   │   │   ├── HeaderNav.jsx       # Top title, welcome greeting & navigation bar
│   │   │   └── ProtectedRoute.jsx  # Route guards for Auth & Admin roles
│   │   ├── pages/
│   │   │   ├── Login.jsx           # Login page (/login)
│   │   │   ├── Register.jsx        # Registration page (/register)
│   │   │   ├── UserDashboard.jsx   # User Home (/dashboard)
│   │   │   ├── QuizPage.jsx        # Take Quiz (/dashboard/quiz)
│   │   │   ├── ArticlePage.jsx     # View Articles (/dashboard/article)
│   │   │   ├── AdminDashboard.jsx  # Admin Home (/admin)
│   │   │   ├── ManageQuestions.jsx # Admin CRUD Questions (/admin/questions)
│   │   │   └── ManageArticles.jsx  # Admin CRUD Articles (/admin/articles)
│   │   ├── redux/
│   │   │   ├── store.js            # Redux store configuration
│   │   │   ├── authSlice.js        # Auth state & thunks
│   │   │   ├── questionSlice.js    # Question CRUD state & thunks
│   │   │   ├── quizSlice.js        # Quiz-taking state & thunks
│   │   │   └── articleSlice.js     # Article state & thunks
│   │   ├── App.jsx                 # Route declarations
│   │   ├── main.jsx                # React DOM entry point
│   │   └── index.css               # Styling
│   ├── index.html
│   ├── package.json
│   └── vite.config.js              # Vite config (runs on Port 3001 with /api proxy)
│
├── package.json                    # Root package.json with concurrent dev runner
└── README.md
```

---

## 🔑 Default Accounts & Data

| Account Role | Username | Password | Default Redirect | Permissions |
| :--- | :--- | :--- | :--- | :--- |
| **Regular User** | `John` | `123` | `/dashboard` | Can take quizzes and read articles |
| **Admin** | `Mary` | `123` | `/admin` | Can create, edit, delete questions & articles |

### Pre-Seeded Questions (from Assignment Screenshot):
1. **Who developed the theory of relativity?** (Albert Einstein, Isaac Newton, Galileo Galilei, Nikola Tesla) - *Answer: Albert Einstein*
2. **What is the symbol for iron on the periodic table?** (Fe, I, Au, Ag) - *Answer: Fe*
3. **What is the capital of France?** (Paris, London, Berlin, Madrid) - *Answer: Paris*
4. **What is the capital of England?** (Paris, London, Berlin, Madrid) - *Answer: London*
5. **What is the capital of Germany?** (Paris, London, Berlin, Madrid) - *Answer: Berlin*

---

## 🚀 How to Run the Application

### 1. Prerequisites
- **Node.js**: v18+ (tested on Node v22)
- **MongoDB**: Running locally on `mongodb://127.0.0.1:27017`

### 2. Seeding Data (Initial setup)
```bash
npm run seed
```

### 3. Running Both Backend & Frontend Simultaneously
From the project root (`ASS_4/`):
```bash
npm run dev
```
- **Backend API**: `http://localhost:5000`
- **Frontend App**: `http://localhost:3001` (matches assignment screenshot URL)
