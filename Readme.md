
# 📝 Thinkflare – MERN Stack Blogging Platform

**Thinkflare** is a full-featured blogging platform built using the **MERN Stack** (MongoDB, Express, React, Node.js). Initially developed with EJS server-side rendering, the application is transitioning to a modern React-based frontend, supporting user authentication, blog creation, editing, deletion, and pagination with secure backend APIs.

---

## 📚 Features

- 🔐 **User Authentication**
  - Secure signup/login system
  - Session-based (original) or JWT (recommended for React)
- 🧠 **Blog Management**
  - Create, read, update, and delete blogs
  - View only personal blogs via "My Blogs"
- 🧭 **Navigation**
  - Dynamic top bar (visible only when logged in)
  - Conditional rendering for authenticated views
- 🎨 **Responsive UI**
  - EJS (initial)
  - React-based SPA (in progress)
- 📖 **Pagination & Sorting**
  - Fetch blogs page by page
  - Sort blogs by date or title
- 🛡️ **Access Control**
  - Restricted routes for logged-in users
- 🌐 **Environment Config**
  - Secure environment variables using `dotenv`

---

## 🛠️ Tech Stack

### Backend:
- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **express-session** (Session Auth) / **jsonwebtoken** (JWT Auth)
- **dotenv** for environment management

### Frontend:
- **React.js** (with Vite for fast development)
- **React Router DOM** for routing
- **Axios** for API calls
- **CSS/Tailwind** for styling

---

## 🗃️ Folder Structure

```

Thinkflare/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── views/ (for EJS)
│   ├── middleware/
│   ├── .env
│   └── index.js (Express app)
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/ (if using Redux)
│   │   └── App.jsx
│   └── vite.config.js

```

---

## 🔐 Environment Variables

Create a `.env` file in `backend/`:

```

PORT=5000
MONGO\_URI=your\_mongodb\_connection\_string
SESSION\_SECRET=your\_secret\_key
JWT\_SECRET=your\_jwt\_secret\_key

````

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/thinkflare.git
cd thinkflare

# Backend setup
cd backend
npm install

# Frontend setup (React)
cd ../client
npm install
````

---

## 🚀 Running the Application

```bash
# Run backend (port 5000)
cd backend
npm run dev

# Run frontend (port 3000 or 5173 with Vite)
cd ../client
npm run dev
```

---

## 🔄 Migration Plan: EJS to React

| Feature      | EJS View              | React Component           |
| ------------ | --------------------- | ------------------------- |
| Home Page    | `home.ejs`            | `Home.jsx`                |
| Login/Signup | `login.ejs`           | `Login.jsx`, `Signup.jsx` |
| Add Blog     | `addBlog.ejs`         | `AddBlog.jsx`             |
| Edit Blog    | `editBlog.ejs`        | `EditBlog.jsx`            |
| My Blogs     | `myBlogs.ejs`         | `MyBlogs.jsx`             |
| Top Bar      | `partials/topbar.ejs` | `Topbar.jsx`              |

---

## ✅ API Endpoints

| Method | Route           | Description                | Auth |
| ------ | --------------- | -------------------------- | ---- |
| POST   | /api/signup     | Register new user          | ❌    |
| POST   | /api/login      | Login user                 | ❌    |
| GET    | /api/blogs      | Get all blogs (paginated)  | ❌    |
| GET    | /api/my-blogs   | Get logged-in user's blogs | ✅    |
| POST   | /api/blogs      | Add a new blog             | ✅    |
| PUT    | /api/blogs/\:id | Edit a blog                | ✅    |
| DELETE | /api/blogs/\:id | Delete a blog              | ✅    |

---

## 🔐 Authentication Options

* **Session-Based Auth**: Used in the EJS version with `express-session`.
* **JWT-Based Auth (Recommended)**:

  * Sign token during login
  * Store in HttpOnly cookie or localStorage
  * Middleware to verify token

---

## 🧪 Testing & Validation

* Use Postman for backend API testing
* Use DevTools to check session or JWT cookie
* Protect routes with `requireAuth` middleware

---

## 📌 Future Enhancements

* ✨ Rich text editor for blogs
* 🖼️ Image upload feature with AWS S3
* 🌍 Deployment on Render/Vercel + MongoDB Atlas
* 🔒 Refresh token and token expiry handling
* 🔎 Full-text search and filtering

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---


