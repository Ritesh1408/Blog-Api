const express = require('express');
const router = express.Router();
const { signup, login, register, loginPage, allUsers, logout } = require('./controllers/userController');
const { requireAuth } = require('./utils/auth');
const { home, myBlogs, addBlog, createBlog, deleteBlog, editBlog, updateBlog } = require('./controllers/blogController');

router.get('/signup', signup);

router.get('/login', loginPage);

router.post('/register', register);

router.post('/login', login);

router.get('/allUsers', requireAuth , allUsers);

router.get('/logout', logout);

router.get('/', home);

router.get('/home', home);

router.get('/myBlogs', requireAuth, myBlogs);

router.get('/addBlog', requireAuth, addBlog);

router.get('/editblog', requireAuth, editBlog);

router.post('/updateBlog', requireAuth, updateBlog);

router.post('/createBlog', requireAuth, createBlog);

router.get('/deleteblog', requireAuth, deleteBlog);

module.exports = router;
