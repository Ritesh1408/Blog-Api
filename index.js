const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');

const dotenv = require('dotenv');
const session = require('express-session');
const { checkAuth } = require('./utils/auth');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.log(err);
});

app.use(session({
    secret: process.env.SECRET_KEY_SESSION,
    resave: true,
    saveUninitialized: true,
    cookie: {
        // 1 day in milliseconds
        maxAge: 1000 * 60 * 60 * 24 
    }
}))

app.set('view engine', 'ejs');

app.use(checkAuth);

app.use(router);

app.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000');
})


