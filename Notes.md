## 📦 MERN Stack Blogging Project Notes
---

### 🛠️ **1. Setting Up the Project**

#### Tools & Packages

| Package      | Purpose                                                         |
| ------------ | --------------------------------------------------------------- |
| **Express**  | Web framework for Node.js to create server-side routes and APIs |
| **Mongoose** | ODM for MongoDB; defines schemas and interacts with MongoDB     |
| **EJS**      | Templating engine to render HTML dynamically with data          |
| **Bcrypt**   | Library to hash and compare passwords securely                  |

#### Example:

```bash
npm init -y
npm install express mongoose ejs bcrypt
```

---

### 🚀 **2. Creating the Express Application**

```js
const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs'); // Set EJS as the view engine

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

#### Use Case:

* EJS renders HTML templates for pages like **signup** and **login**.
* Express handles HTTP requests like GET/POST.

---

### 🌐 **3. Connecting to MongoDB with Mongoose**

```js
const mongoose = require('mongoose');

mongoose.connect('your_mongodb_connection_url')
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));
```

#### Use Case:

* Connect your server to a MongoDB **Atlas Cluster** to store users, posts, and other data.

---

### 👤 **4. Creating the User Model**

```js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
```

#### Use Case:

* Define user structure and ensure password is securely hashed before saving to DB.

---

### 📥 **5. Signup Endpoint**

```js
const express = require('express');
const User = require('./models/User');
const app = express();

app.use(express.urlencoded({ extended: true })); // Parse form data

app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.send('User already exists');
  }

  const user = new User({ name, email, password });
  await user.save();

  res.redirect('/login'); // Redirect user after signup
});
```

#### Use Case:

* When a new user signs up, their data is validated, hashed, saved, and redirected to the login page.

---

### 🧪 **6. Testing with Postman**

* Method: `POST`
* URL: `http://localhost:3000/signup`
* Body (x-www-form-urlencoded):

  * name: Alice
  * email: [alice@example.com](mailto:alice@example.com)
  * password: 123456

#### Use Case:

* Use **Postman** to simulate form submission and test your signup route before integrating frontend.

---

### 📄 **7. Handling Form Data with `express.urlencoded()`**

```js
app.use(express.urlencoded({ extended: true }));
```

#### 🔍 Explanation:

* `extended: true` allows rich form data (e.g. nested objects).
* Enables parsing of `application/x-www-form-urlencoded` (default form content type).

#### Example:

HTML Form:

```html
<form action="/signup" method="POST">
  <input type="text" name="name" />
  <input type="email" name="email" />
  <input type="password" name="password" />
  <button type="submit">Signup</button>
</form>
```

---

### 🔁 **8. Redirecting Users**

```js
res.redirect('/login');
```

#### Use Case:

* After a successful signup or login, redirect the user to the appropriate page (e.g. dashboard, login).

---

## 🔚 Summary

| Feature           | Tool/Method          | Use Case                                    |
| ----------------- | -------------------- | ------------------------------------------- |
| Backend server    | Express              | Handle routing and middleware               |
| DB connection     | Mongoose             | Connect to MongoDB, define schemas          |
| Form rendering    | EJS                  | Render dynamic pages like login and signup  |
| Password security | Bcrypt               | Hash user passwords                         |
| Form parsing      | `express.urlencoded` | Read and use data from form submissions     |
| Navigation        | `res.redirect()`     | Navigate users to other pages after actions |

---

## 🧭 Next Steps (Preview of Part 3)

* Add **login** functionality using Bcrypt password comparison.
* Improve **error handling** and feedback on the frontend.
* Use **sessions** or **JWT** to manage logged-in users.
* Create a **dashboard** for viewing and creating blog posts.

Would you like me to help you build the **login endpoint** or move toward **blog post creation** next?


Here are **detailed notes with examples and use cases** for your **MERN Stack Development: User Registration and Login** session, including the transition to **MVC architecture**:

---

## 🔐 MERN Stack Development: User Registration and Login

---

### 🧾 **Overview**

In this part, we improve the user registration and login functionality by:

* Making frontend responses user-friendly
* Organizing code using **MVC architecture**
* Using **Express Router** for cleaner route management

---

## 🧱 MVC Architecture in MERN

### 💡 What is MVC?

| Layer          | Description                                                               |
| -------------- | ------------------------------------------------------------------------- |
| **Model**      | Represents data, interacts with the database                              |
| **View**       | Frontend templates (EJS) for rendering UI                                 |
| **Controller** | Logic between model and view. Handles user input and updates models/views |

---

## 🛠 Refactoring to MVC

### 📁 Project Structure

```
project/
│
├── models/
│   └── User.js             ← Mongoose User model
│
├── views/
│   └── login.ejs           ← Login page
│   └── signup.ejs          ← Signup page
│
├── controllers/
│   └── userController.js   ← Handles registration/login logic
│
├── routes/
│   └── userRoutes.js       ← Route definitions using Express Router
│
├── index.js                ← Main server file (app setup and route usage)
```

---

## 📄 Example Files

### 1️⃣ **Model (models/User.js)**

```js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
```

---

### 2️⃣ **View (views/signup.ejs)**

```html
<h2>Signup</h2>
<form action="/signup" method="POST">
  <input name="name" placeholder="Name" required />
  <input name="email" type="email" placeholder="Email" required />
  <input name="password" type="password" placeholder="Password" required />
  <button type="submit">Register</button>
</form>
```

---

### 3️⃣ **Controller (controllers/userController.js)**

```js
const User = require('../models/User');

const handleSignup = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.send('User already exists!');
  }

  const user = new User({ name, email, password });
  await user.save();
  res.redirect('/login');
};

const renderSignupPage = (req, res) => {
  res.render('signup');
};

const renderLoginPage = (req, res) => {
  res.render('login');
};

module.exports = {
  handleSignup,
  renderSignupPage,
  renderLoginPage
};
```

---

### 4️⃣ **Routes (routes/userRoutes.js)**

```js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/signup', userController.renderSignupPage);
router.post('/signup', userController.handleSignup);
router.get('/login', userController.renderLoginPage);

module.exports = router;
```

---

### 5️⃣ **Entry Point (index.js)**

```js
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('your_mongo_uri')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Use routes
app.use('/', userRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

---

## 📌 Use Cases

| Feature                    | Use Case                                                      |
| -------------------------- | ------------------------------------------------------------- |
| MVC Structure              | Separate logic, UI, and database concerns for maintainability |
| Controllers for logic      | Easier testing and debugging of business logic                |
| Express Router             | Modular, reusable routing system                              |
| User redirect after signup | Improved user experience by navigating to login page          |
| Secure password storage    | Uses bcrypt to hash passwords before saving to MongoDB        |

---

## ✅ Benefits of Refactoring to MVC

* **Maintainability**: Code is better organized and scalable.
* **Reusability**: Logic in controllers can be reused elsewhere (e.g. APIs, admin).
* **Separation of concerns**: Views, logic, and data are cleanly separated.

---

## 🔜 Coming Up Next

* Implement **login logic** with password verification using Bcrypt.
* Add **sessions** or **JWT** for persistent authentication.
* Use **middleware** to protect routes for authenticated users.
* Improve **frontend styling** with CSS or Bootstrap.

---

Would you like to continue with implementing the **login logic with Bcrypt and sessions**, or move on to **protecting routes**?



## 🔐 MERN Stack: Session-Based Authentication

---

### 📌 What is Session-Based Authentication?

**Session-based authentication** is a mechanism where the server creates a unique session for each logged-in user and stores it in memory (or a store). The session ID is then sent to the client as a cookie, which is used in future requests to identify and authenticate the user.

---

## 🧠 Key Concepts

| Term                | Description                                                             |
| ------------------- | ----------------------------------------------------------------------- |
| **Session**         | A server-side storage of user data that persists during a user session  |
| **Cookie**          | A small piece of data stored in the browser and sent with every request |
| **express-session** | Middleware to manage sessions in Express                                |

---

## ⚙️ Setting Up Session Authentication

### 📦 Install express-session

```bash
npm install express-session
```

### 🛠 Configure Session in `index.js`

```js
const session = require('express-session');

app.use(session({
  secret: 'yourSecretKey',     // Secret used to sign the session ID cookie
  resave: true,                // Force save session for every request
  saveUninitialized: true      // Save new sessions that are uninitialized
}));
```

---

## 🔐 Creating Middleware for Route Protection

### ✅ `requireAuth` Middleware

```js
function requireAuth(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/login'); // Redirect if not logged in
  }
  next(); // Proceed if authenticated
}
```

#### 📌 Use Case:

* Protect routes such as dashboard, post creation, etc.

```js
app.get('/users', requireAuth, async (req, res) => {
  const users = await User.find();
  res.send(users);
});
```

---

## 👨‍💼 Login Controller (Setting the Session)

### 📄 `loginUser` Controller in `userController.js`

```js
const bcrypt = require('bcrypt');
const User = require('../models/User');

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    return res.send('Invalid email or password');
  }

  const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.send('Invalid email or password');
  }

  // Set session
  req.session.userId = existingUser._id;
  res.redirect('/dashboard');
};

module.exports = {
  loginUser
};
```

---

## 🔐 Session Flow Summary

1. **User logs in** with correct credentials.
2. A **session is created** and stored in memory.
3. A **session ID is sent to the browser as a cookie**.
4. On subsequent requests, the **cookie is sent** with the request.
5. The server **validates the session** using the cookie and grants/denies access.

---

## 🧪 Testing Authentication

### ✅ Test Route

```js
app.get('/users', requireAuth, async (req, res) => {
  const users = await User.find();
  res.json(users);
});
```

### ❌ Access without Login

* Redirects to `/login`.

### ✅ Access after Login

* Returns user data.

---

## 🍪 View Sessions in Browser

* Chrome DevTools → Application → Cookies → `localhost`
* You’ll see a `connect.sid` cookie (session ID).

---

## 🧹 Logging Out

```js
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.send('Error logging out');
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
});
```

---

## 📌 Use Cases

| Feature                      | Use Case                                                   |
| ---------------------------- | ---------------------------------------------------------- |
| Session storage              | Securely identify users across multiple requests           |
| Middleware protection        | Prevent unauthorized access to sensitive routes            |
| Auto logout after timeout    | You can configure session expiration for security          |
| Cookie-based client tracking | Users stay logged in until session is destroyed or expired |

---

## ✅ Benefits of Session-Based Auth

* Server controls session and can invalidate it anytime
* No need to store tokens on the client
* Simple to implement for traditional web apps

---

## 🔜 Coming Up Next

* Build a **homepage** that shows after login
* Add a **top navigation bar** with a **Logout button**
* Protect more routes with `requireAuth`

---

Would you like help building the **logout button and homepage view next**, or would you prefer to set **session expiration and security settings** (e.g., cookie options, session store)?

Here are detailed **notes with examples and use cases** for your session on **MERN Stack Development: Building a Homepage**, including the use of **session-based authentication**, **EJS**, and **Mongoose models**.

---

## 🏠 MERN Stack Development: Building a Homepage

---

### 📌 Key Topics Covered

1. Session-based authentication (continued)
2. Creating a reusable top bar with navigation
3. Conditional rendering with EJS
4. Blog model using Mongoose
5. Setting up routes and controllers

---

## 🔐 Session-Based Authentication Recap

* A user’s session is tracked using cookies (`connect.sid`)
* Sessions persist login across different routes
* Sessions help determine what a user can view/access

```js
if (req.session.userId) {
  // user is authenticated
}
```

---

## 🧭 Creating a Top Bar with EJS

### ✅ Why Top Bar?

The top bar (navbar) is a shared UI component for all pages — used for navigation and account actions.

### 🛠 `views/partials/topbar.ejs`

```ejs
<div class="topbar">
  <a href="/">Home</a>
  <% if (userId) { %>
    <a href="/myblogs">My Blogs</a>
    <a href="/addblog">Add Blog</a>
    <a href="/logout">Logout</a>
  <% } else { %>
    <a href="/login">Login</a>
    <a href="/signup">Signup</a>
  <% } %>
</div>
```

### 🧩 Include in `homepage.ejs`

```ejs
<%- include('partials/topbar', { userId: userId }) %>

<h1>Welcome to the Blogging Platform</h1>
```

---

## 🧠 Conditional Rendering in EJS

EJS allows embedding JavaScript into HTML templates.

### 📌 Use Case:

Show or hide UI components based on authentication status.

```ejs
<% if (userId) { %>
  <p>You are logged in!</p>
<% } else { %>
  <p>Please log in to continue.</p>
<% } %>
```

---

## 📝 Creating the Blog Model

### 📦 `models/Blog.js`

```js
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  body: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Blog', blogSchema);
```

### 📌 Use Case:

Store blog posts in MongoDB and link them to the users who wrote them.

---

## 🚏 Creating Blog Routes

### 📂 `routes/blogRoutes.js`

```js
const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const requireAuth = require('../middleware/requireAuth');

router.get('/myblogs', requireAuth, blogController.getMyBlogs);
router.get('/addblog', requireAuth, blogController.addBlogForm);
router.post('/addblog', requireAuth, blogController.addBlog);

module.exports = router;
```

### 📄 In `index.js`

```js
const blogRoutes = require('./routes/blogRoutes');
app.use('/', blogRoutes);
```

---

## 🎮 Blog Controller Example

### 📂 `controllers/blogController.js`

```js
const Blog = require('../models/Blog');

const getMyBlogs = async (req, res) => {
  const blogs = await Blog.find({ userId: req.session.userId });
  res.render('myblogs', { blogs });
};

const addBlogForm = (req, res) => {
  res.render('addblog');
};

const addBlog = async (req, res) => {
  const { title, body } = req.body;
  await Blog.create({ title, body, userId: req.session.userId });
  res.redirect('/myblogs');
};

module.exports = { getMyBlogs, addBlogForm, addBlog };
```

---

## 🧪 Use Cases

| Feature         | Use Case Example                                        |
| --------------- | ------------------------------------------------------- |
| Top bar         | Reusable navigation across all pages                    |
| Conditional EJS | Show "Login" or "Logout" based on session auth          |
| Blog model      | Structure blog data and associate with specific users   |
| Blog routes     | Secure blog creation and listing via session middleware |

---

## 📚 References

* [MERN Stack Documentation](https://www.mongodb.com/mern-stack)
* [EJS Documentation](https://ejs.co/)
* [Mongoose Documentation](https://mongoosejs.com/)
* [Express.js Docs](https://expressjs.com/)
* [AccioJob](https://acciojob.com)

---

## 🔜 Next Steps

In the upcoming session:

* Enable blog creation via a form
* Improve blog UI with **CSS**
* Allow blog deletion or editing
* Render list of all blogs on the homepage (public + private filtering)

Would you like help with the **blog creation form and UI next**, or a quick walkthrough of **EJS form submission and validation**?

Here are **detailed notes with examples and use cases** for your session on **MERN Stack Development: Node.js Course**, focusing on **blogging features**, **user authentication**, **routing**, and **UI enhancements** in a Node.js (Express) environment.

---

## 🚀 MERN Stack Development: Node.js Course Notes

---

### 🔧 Application Features Overview

| Feature              | Description                                                  |
| -------------------- | ------------------------------------------------------------ |
| **User Auth**        | Top bar visible only when the user is logged in.             |
| **My Blogs**         | Page where users can see blogs they've authored.             |
| **Add Blog Page**    | Form interface for creating and submitting new blog posts.   |
| **Blog Model**       | Mongoose model for structuring and saving blog post data.    |
| **CSS Enhancements** | UI updated for improved experience (forms, buttons, layout). |
| **API Integration**  | API for fetching user-specific blogs.                        |

---

## 🧩 User Authentication + Top Bar

### ✅ Use Case

Show navigation options **only when the user is logged in** using session-based authentication.

### 🛠 Example: `partials/topbar.ejs`

```ejs
<nav class="navbar">
  <a href="/">Home</a>
  <% if (userId) { %>
    <a href="/myblogs">My Blogs</a>
    <a href="/addblog">Add Blog</a>
    <a href="/logout">Logout</a>
  <% } else { %>
    <a href="/login">Login</a>
    <a href="/signup">Signup</a>
  <% } %>
</nav>
```

### 📄 Include in Homepage

```ejs
<%- include("partials/topbar", { userId: userId }) %>
```

---

## 🧠 Blog Model (Mongoose)

### 📦 `models/Blog.js`

```js
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  body: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Blog', blogSchema);
```

### ✅ Use Case

Store each blog with a reference to the user who created it. Enables filtering per user.

---

## 📝 Add Blog Page

### 📂 `views/addblog.ejs`

```ejs
<form action="/addblog" method="POST">
  <input type="text" name="title" placeholder="Blog Title" required />
  <textarea name="body" placeholder="Write your blog here..." required></textarea>
  <button type="submit">Add Blog</button>
</form>
```

---

## 🛤️ Routing & Controllers

### 📂 `routes/blogRoutes.js`

```js
const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const requireAuth = require('../middleware/requireAuth');

router.get('/myblogs', requireAuth, blogController.getMyBlogs);
router.get('/addblog', requireAuth, blogController.addBlogForm);
router.post('/addblog', requireAuth, blogController.addBlog);

module.exports = router;
```

### 📄 `controllers/blogController.js`

```js
const Blog = require('../models/Blog');

exports.addBlogForm = (req, res) => {
  res.render('addblog', { userId: req.session.userId });
};

exports.addBlog = async (req, res) => {
  const { title, body } = req.body;
  await Blog.create({ title, body, userId: req.session.userId });
  res.redirect('/myblogs');
};

exports.getMyBlogs = async (req, res) => {
  const blogs = await Blog.find({ userId: req.session.userId });
  res.render('myblogs', { blogs, userId: req.session.userId });
};
```

---

## 🎨 CSS Enhancements (Example)

### 📁 `public/styles.css`

```css
body {
  font-family: 'Segoe UI', sans-serif;
  background-color: #f8f9fa;
  margin: 0;
  padding: 0;
}

form {
  margin: 2rem auto;
  padding: 1.5rem;
  max-width: 600px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

input, textarea {
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.75rem;
  border: 1px solid #ccc;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
}
```

---

## 🔐 Access Restriction Middleware

### 📄 `middleware/requireAuth.js`

```js
module.exports = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  next();
};
```

### ✅ Use Case

Protect sensitive routes like `/myblogs` or `/addblog`.

---

## 🔗 API Integration: Fetching User Blogs

* Enables users to **view only their blogs**
* Can be used for AJAX or SSR rendering

```js
// GET /myblogs
exports.getMyBlogs = async (req, res) => {
  const blogs = await Blog.find({ userId: req.session.userId });
  res.render('myblogs', { blogs });
};
```

---

## 🔑 Key Concepts Summary

| Concept      | Description                                            |
| ------------ | ------------------------------------------------------ |
| **Node.js**  | JavaScript runtime for backend/server-side programming |
| **MERN**     | MongoDB, Express, React, Node.js full-stack combo      |
| **EJS**      | Embedded JavaScript for rendering views                |
| **Mongoose** | ODM tool for MongoDB                                   |
| **API**      | Interface for frontend-backend communication           |
| **CSS**      | Stylesheet language for designing UI                   |

---

## 🧪 Use Cases Table

| Feature         | Use Case Example                                           |
| --------------- | ---------------------------------------------------------- |
| Top Bar         | Navigation shows Logout & My Blogs for authenticated users |
| Blog Model      | Store user blogs with `title`, `body`, and `userId`        |
| Add Blog Page   | Allows users to post new content to the database           |
| Middleware      | Restrict unauthenticated access to create/view blogs       |
| Fetch Blogs API | Show personal blogs on the 'My Blogs' page                 |

---

## 📚 References

* [Node.js Official Docs](https://nodejs.org/)
* [MERN Stack Guide](https://www.mongodb.com/mern-stack)
* [CSS Tutorial (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [REST APIs Explained](https://restfulapi.net/)
* [AccioJob Courses](https://acciojob.com)

---

Would you like help with:

* Implementing blog **edit/delete** functionality next?
* Connecting this to a **React frontend** in later phases?

Let me know!
Here are your **comprehensive notes with examples and use cases** on the **MERN Stack: Blog Editing and Deletion** lecture, focusing on implementing blog update and delete features in a Node.js + MongoDB (Express) environment using EJS for server-side rendering.

---

## 🛠 MERN Stack: Blog Editing and Deletion — Notes

---

### 🔄 1. Deleting a Blog

---

#### 📌 Use Case

Allow users to **delete their own blogs** from the *"My Blogs"* page.

#### 📁 Route: `routes/blogRoutes.js`

```js
router.get('/deleteblog/:id', requireAuth, blogController.deleteBlog);
```

#### 📂 Controller: `controllers/blogController.js`

```js
exports.deleteBlog = async (req, res) => {
  const blogId = req.params.id;
  try {
    await Blog.findOneAndDelete({ _id: blogId, userId: req.session.userId });
    res.redirect('/myblogs');
  } catch (error) {
    console.error(error);
    res.redirect('/myblogs?error=Could not delete blog');
  }
};
```

#### 📄 View Button (EJS)

```ejs
<a href="/deleteblog/<%= blog._id %>" onclick="return confirm('Are you sure you want to delete this blog?')">Delete</a>
```

---

### 📝 2. Editing a Blog

---

#### 📌 Use Case

Allow users to **edit existing blog posts** they have authored.

---

### 🔃 Steps Involved

#### 📁 Route for Edit Form

```js
router.get('/editblog/:id', requireAuth, blogController.editBlogForm);
```

#### 📁 Route to Submit Edits

```js
router.post('/editblog/:id', requireAuth, blogController.editBlogSubmit);
```

---

#### 📂 Controller Methods

```js
// Show edit form
exports.editBlogForm = async (req, res) => {
  const blogId = req.params.id;
  try {
    const blog = await Blog.findOne({ _id: blogId, userId: req.session.userId });
    if (!blog) return res.redirect('/myblogs');
    res.render('editBlog', { blog, userId: req.session.userId });
  } catch (error) {
    console.error(error);
    res.redirect('/myblogs?error=Error loading blog');
  }
};

// Submit edited blog
exports.editBlogSubmit = async (req, res) => {
  const blogId = req.params.id;
  const { title, body } = req.body;
  try {
    await Blog.findOneAndUpdate(
      { _id: blogId, userId: req.session.userId },
      { title, body },
      { new: true }
    );
    res.redirect('/myblogs');
  } catch (error) {
    console.error(error);
    res.redirect('/myblogs?error=Error updating blog');
  }
};
```

---

#### 📄 View: `views/editBlog.ejs`

```ejs
<form action="/editblog/<%= blog._id %>" method="POST">
  <input type="text" name="title" value="<%= blog.title %>" required />
  <textarea name="body" required><%= blog.body %></textarea>
  <button type="submit">Update Blog</button>
</form>
```

---

### 🧪 Use Case Summary

| Feature        | Description                                                       |
| -------------- | ----------------------------------------------------------------- |
| Delete Blog    | Authenticated users can delete their blogs via a link/button      |
| Edit Blog      | Edit form pre-filled with existing data for seamless user updates |
| Authorization  | Only blog **owner** can update or delete                          |
| Error Handling | All critical operations wrapped in try-catch with fallbacks       |

---

### 📌 Key Concepts

| Concept              | Description                                                              |
| -------------------- | ------------------------------------------------------------------------ |
| `findOneAndDelete()` | MongoDB method to find and delete a document                             |
| `findOneAndUpdate()` | MongoDB method to find and update a document with new data               |
| Error Handling       | Redirect with query param (`?error=msg`) or flash message if using a lib |
| Session Auth         | Only allow users with a valid session to modify/delete data              |
| EJS Templates        | Used to dynamically render edit forms with blog content                  |

---

### ✅ Example Flow: Editing a Blog

1. User clicks **Edit** → `/editblog/:id`
2. Server fetches blog, checks user session, renders form.
3. User updates fields and submits.
4. Server processes update and redirects to `/myblogs`.

---

### 🔐 Security Tips

* Always **check `userId` in session** before modifying or deleting a blog.
* Prevent CSRF attacks using tokens (optional at this stage).
* Always validate input (title, body) before updating.

---

### 📚 References

* [Mongoose: findOneAndDelete](https://mongoosejs.com/docs/api/model.html#Model.findOneAndDelete)
* [Mongoose: findOneAndUpdate](https://mongoosejs.com/docs/api/model.html#Model.findOneAndUpdate)
* [Express Docs](https://expressjs.com/)
* [MongoDB Docs](https://www.mongodb.com/docs/)
* [AccioJob MERN Courses](https://acciojob.com)

---

Would you like code samples for **React-based editing and deletion (MERN full-stack)** next? Or should we add **pagination or filtering for blogs**?

Here are your **comprehensive lecture notes** on:

---

# ✅ MERN Stack: Building a Blogging Application – Part 1 & Part 2

**Topics Covered**:

* Pagination and Sorting in MongoDB
* Best practices: `res.redirect` vs. `res.render`
* Using Environment Variables with `dotenv`
* Securing credentials and session secrets

---

## 📦 Part 1: Pagination, Sorting, and Best Practices

---

### 🔄 Pagination

**📌 Use Case**: To efficiently display blog posts when there are many entries.

**🧠 Logic**:

* Limit the number of blogs shown per page.
* Show page navigation (e.g., Page 1, 2, 3...).

**🌐 URL Example**:

```
GET /blogs?page=2&limit=5
```

**🔧 Backend Example (Controller):**

```js
exports.getAllBlogs = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  try {
    const blogs = await Blog.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // newest first
    const totalBlogs = await Blog.countDocuments();

    res.render('homepage', {
      blogs,
      currentPage: page,
      totalPages: Math.ceil(totalBlogs / limit)
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching blogs');
  }
};
```

**📄 View Snippet (EJS):**

```ejs
<% for (let i = 1; i <= totalPages; i++) { %>
  <a href="/blogs?page=<%= i %>"><%= i %></a>
<% } %>
```

---

### 🔤 Sorting Blogs

**📌 Use Case**: Enable users to sort blogs by title or date.

**🌐 URL Example**:

```
GET /blogs?sort=title
```

**🔧 Controller Update:**

```js
const sortOption = req.query.sort || 'createdAt';
const sortOrder = sortOption === 'title' ? 1 : -1; // A-Z or latest

const blogs = await Blog.find()
  .sort({ [sortOption]: sortOrder })
  .skip(skip)
  .limit(limit);
```

---

### ✅ Best Practices

* Use `res.redirect()` instead of `res.render()` after POST requests for better **SEO and clean URLs**.
* Separate concerns: Controllers for logic, Routes for routing, Views for rendering.

---

## 🔐 Part 2: Managing Sensitive Data with Environment Variables

---

### 📌 Why Use Environment Variables?

**Use Case**: Hide sensitive information like DB credentials, API keys, session secrets.

---

### 📁 .env File Example

```env
PORT=5000
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/myblog
SESSION_SECRET=supersecret123
```

---

### 🔧 Setup Using `dotenv`

1. **Install dotenv**:

```bash
npm install dotenv
```

2. **Import in `index.js`**:

```js
require('dotenv').config();
```

3. **Use in your code**:

```js
mongoose.connect(process.env.MONGO_URI);

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}));
```

---

### ✅ Best Practices for `.env`

* **NEVER** push `.env` to GitHub.
* Add `.env` to `.gitignore`:

```
.env
```

---

## 🔁 Use Cases Summary

| Feature             | Description                                                            |
| ------------------- | ---------------------------------------------------------------------- |
| Pagination          | Load blogs in chunks for performance                                   |
| Sorting             | Sort by title/date for better UX                                       |
| Redirect vs. Render | Use `res.redirect` after actions to prevent resubmission & support SEO |
| dotenv + .env       | Secure sensitive information like credentials & secrets                |

---

## 📚 References

* [MongoDB Pagination](https://www.mongodb.com/docs/manual/tutorial/limit-results/)
* [dotenv GitHub](https://github.com/motdotla/dotenv)
* [MERN Stack Guide](https://www.mongodb.com/mern-stack)
* [Node.js Environment Variables](https://nodejs.dev/en/learn/environment-variables/)

---

Would you like a **React frontend implementation for paginated blogs** or **secure deployment tips (Heroku/Vercel + MongoDB Atlas)** next?
