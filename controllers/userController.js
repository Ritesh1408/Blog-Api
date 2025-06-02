const bcrypt = require('bcrypt');
const base64 = require('base-64');
const Users = require('../models/users');

const signup = (req, res) => {
    res.render('signup', { message: null, error: null });
};

const loginPage = (req, res) => {
    res.render('login', { message: null, error: null });
};

const register = async (req, res) => {
    try {
        // Debug log
        // console.log('Request Body:', req.body); 
        const {name, email, password} = req.body;
        const existingUser = await Users.findOne({email});
        if (existingUser) {
            return res.render('signup', {
                error: 'User already exists. Please try logging in.',
                message: null
            });
            // return res.status(400).json({message: 'User already exists. Please try logging in.'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Users({
            name,
            email,
            password: hashedPassword
        });
        await newUser.save();
        return res.render('login', {
            message: 'User registered successfully! Please log in.', error: null});

        // return res.status(201).json({message: 'User registered successfully!'});
        // newUser.save()
        // .then(() => {
        //     res.render('login', {
        //         message: 'User registered successfully! Please log in.',
        //         error: null
        //     });
        //     // return res.status(201).json({message: 'User registered successfully!'});
        // }).catch((error) => {
        //     res.render('signup', {
        //         error: 'Internal server error. Please try again later.',
        //         message: null
        //     });
        //     // console.log(error);
        //     // return res.status(500).json({message: 'Internal server error. Please try again later.'});
        // });
        
    } catch (error) {
        res.render('signup', {
            error: 'Internal server error. Please try again later.',
            message: null
        });
        // console.log(error);
        // return res.status(500).json({message: 'Internal server error. Please try again later.'});
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Users.findOne({ email });
        if (!user) {
            return res.render('login', { error: 'User not found. Please sign up.', message: null });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render('login', { error: 'Invalid password.', message: null });
        }
        
        req.session.userId = user._id;
        
        // redirect/session logic
        return res.redirect('/'); 
    } catch (err) {
        console.error(err);
        return res.render('login', { error: 'Something went wrong. Please try again.', message: null });
    }
};

const allUsers = (req, res) => {
    Users.find().
    then((users) => {
        res.json(users);
    })
    .catch((error) => {
        console.error(error);
        res.json({ message: 'Internal server error' });
    });
}

const logout = (req, res) => {
    req.session.destroy(() => {
        return res.redirect('/');
        // res.clearCookie('connect.sid');
        // res.redirect('/login');
    });
};

module.exports = {
    signup,
    loginPage,
    register,
    login,
    allUsers,
    logout
};

