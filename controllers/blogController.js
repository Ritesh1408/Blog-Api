const Blogs = require("../models/blogs");
const base64 = require('base-64');

// Render homepage
const home = async(req, res) => {
    const perPage = 5;
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort || 'title';
    try {
        const blogs = await Blogs.find()
        .sort({ [sort]: 1 }) 
            .skip((perPage * page) - perPage)
            .limit(perPage)
            // .lean();
        const count = await Blogs.countDocuments();
        const totalPages = Math.ceil(count / perPage);
        res.render('home', { message: null, error: null, blogData: blogs, current: page, pages: totalPages, sort });
    } catch (error) {
        res.render('home', {
            message: null,
            error: "Error fetching blogs. Please try again later.",
            blogData: null
        });
    }
    
};

// Show current user's blogs
const myBlogs = async (req, res) => {
    try {
        const userId = req.session.userId;
        const { message } = req.query;

        const blogs = await Blogs.find({ userId }).lean();

        res.render('myblogs', {
            blogData: blogs,
            message: message ? base64.decode(message) : null,
            error: null
        });
    } catch (err) {
        console.error(err);
        res.render('myblogs', {
            blogData: [],
            message: null,
            error: "Error fetching your blogs."
        });
    }
};

// Render Add Blog Page
const addBlog = (req, res) => {
    res.render('addblog', { message: null, error: null });
};

// Render Edit Blog Page
const editBlog = async (req, res) => {
    try {
        const { blogId } = req.query;

        if (!blogId) throw new Error("Blog ID is required");

        const blogData = await Blogs.findById(blogId).lean();

        if (!blogData) throw new Error("Blog not found");

        res.render('editblog', {
            blogData,
            message: null,
            error: null
        });
    } catch (err) {
        console.error(err);
        const errorMsg = base64.encode("Error in editing blog. Please try again.");
        res.redirect(`/myblogs?message=${errorMsg}`);
    }
};

// Handle Create Blog
const createBlog = async (req, res) => {
    try {
        const { title, body } = req.body;
        const userId = req.session.userId;

        if (!title || !body) {
            return res.render('addblog', {
                message: null,
                error: "Title and body are required."
            });
        }

        const newBlog = new Blogs({ title, body, userId });
        await newBlog.save();

        res.redirect('/myblogs');
    } catch (err) {
        console.error(err);
        res.render('addblog', {
            message: null,
            error: 'Error creating blog. Please try again.'
        });
    }
};

// Handle Update Blog
const updateBlog = async (req, res) => {
    try {
        const { blogId } = req.query;
        const { title, body } = req.body;

        if (!blogId || !title || !body) {
            throw new Error("Missing required fields");
        }

        await Blogs.findByIdAndUpdate(blogId, { title, body });

        res.redirect('/myblogs');
    } catch (err) {
        console.error(err);
        const errorMsg = base64.encode("Error updating blog. Please try again.");
        res.redirect(`/editblog?blogId=${req.query.blogId}&message=${errorMsg}`);
    }
};

// Handle Delete Blog
const deleteBlog = async (req, res) => {
    try {
        const { blogId } = req.query;

        if (!blogId) throw new Error("Blog ID is missing");

        await Blogs.findByIdAndDelete(blogId);

        res.redirect('/myblogs');
    } catch (err) {
        console.error(err);
        const errorMsg = base64.encode("Error deleting blog. Please try again.");
        res.redirect(`/myblogs?message=${errorMsg}`);
    }
};

module.exports = {
    home,
    myBlogs,
    addBlog,
    createBlog,
    deleteBlog,
    editBlog,
    updateBlog
};
