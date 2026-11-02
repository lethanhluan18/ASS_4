# Assignment 4 - Full-Stack Quiz Application

A complete full-stack quiz web application built with **Node.js, Express, MongoDB, Mongoose** on the backend and **React, Redux Toolkit, React Router, Bootstrap 5** on the frontend.

---

## 📁 Clean Project Structure

```text
ASS_4/
├── backend/
│   ├── bin/
│   │   └── www                     # Express Generator entry point
│   ├── controllers/
│   │   ├── authController.js       # Register, Login, GetMe
│   │   ├── questionController.js   # CRUD questions & answer submission
│   │   ├── quizController.js       # CRUD quizzes
│   │   └── articleController.js    # CRUD articles
│   ├── middleware/
│   │   └── authMiddleware.js       # JWT protect & adminOnly middleware
│   ├── models/
│   │   ├── User.js                 # User schema (John, Mary)
│   │   ├── Question.js             # Question schema (5 sample questions)
│   │   ├── Quiz.js                 # Quiz schema
│   │   └── Article.js              # Article schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── questionRoutes.js
│   │   ├── quizRoutes.js
│   │   └── articleRoutes.js
│   ├── .env                        # PORT=5000, MONGODB_URI
│   ├── app.js                      # Express App initialization
│   ├── package.json                # "start": "node ./bin/www"
│   ├── seed.js                     # Pre-populates database with John, Mary, and the 5 sample questions
│   └── server.js                   # Bridge to bin/www
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js            # Axios client with JWT request interceptor
│   │   ├── components/
│   │   │   ├── HeaderNav.jsx       # Header & Navbar matching role
│   │   │   └── ProtectedRoute.jsx  # Route guards for Auth & Admin roles
│   │   ├── pages/
│   │   │   ├── Login.jsx           # Clean Login page matching assignment mockup
│   │   │   ├── Register.jsx        # Registration page
│   │   │   ├── UserDashboard.jsx   # /dashboard (Welcome, John)
│   │   │   ├── QuizPage.jsx        # /dashboard/quiz (Take quiz & score)
│   │   │   ├── ArticlePage.jsx     # /dashboard/article (View articles)
│   │   │   ├── AdminDashboard.jsx  # /admin (Welcome, Mary)
│   │   │   ├── ManageQuestions.jsx # /admin/questions (CRUD questions)
│   │   │   └── ManageArticles.jsx  # /admin/articles (CRUD articles)
│   │   ├── redux/
│   │   │   ├── store.js            # Redux store configuration
│   │   │   ├── authSlice.js
│   │   │   ├── questionSlice.js
│   │   │   ├── quizSlice.js
│   │   │   └── articleSlice.js
│   │   ├── App.jsx                 # Route declarations
│   │   ├── main.jsx                # React DOM entry point
│   │   └── index.css               # Styling
│   ├── index.html
│   ├── package.json
│   └── vite.config.js              # Runs on Port 3001, proxies /api to Port 5000
│
├── .gitignore                      # Clean Git ignore
└── README.md                       # Project documentation
```

---

## 🔑 Default Accounts & Data

| Account Role | Username | Password | Default Redirect | Permissions |
| :--- | :--- | :--- | :--- | :--- |
| **Regular User** | `John` | `123` | `/dashboard` | Can take quizzes and read articles |
| **Admin** | `Mary` | `123` | `/admin` | Can create, edit, delete questions & articles |

### Pre-Seeded Questions:
1. **Who developed the theory of relativity?** (Albert Einstein, Isaac Newton, Galileo Galilei, Nikola Tesla) - *Answer: Albert Einstein*
2. **What is the symbol for iron on the periodic table?** (Fe, I, Au, Ag) - *Answer: Fe*
3. **What is the capital of France?** (Paris, London, Berlin, Madrid) - *Answer: Paris*
4. **What is the capital of England?** (Paris, London, Berlin, Madrid) - *Answer: London*
5. **What is the capital of Germany?** (Paris, London, Berlin, Madrid) - *Answer: Berlin*

---

## 🚀 How to Run the Application

### 1. Initial Database Seed (Optional - already seeded)
```bash
cd backend
npm run seed
```

### 2. Run Backend (Terminal 1)
```bash
cd backend
npm start
```
> Running on `http://localhost:5000`

### 3. Run Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```
> Running on `http://localhost:3001`
