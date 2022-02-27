const sequelize = require('../config/connection');
const { Blog } = require('../models');

// seed blog table
const blogData = [
    {
        blog_title: 'Coding Origins: C vs. C++',
        blog_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
        user_id: 7,
        date: new Date()
    },
    {
        blog_title: 'How to Make a Quiz Using JavaScript',
        blog_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
        user_id: 4,
        date: new Date()
    },
    {
        blog_title: 'Client- or Server-side Programming? Which is for you?',
        blog_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
        user_id: 2,
        date: new Date()
    },
    {
        blog_title: 'jQuery: To Use or Not To Use?',
        blog_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
        user_id: 4,
        date: new Date()
    },
    {
        blog_title: 'The History of Computer Programming',
        blog_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
        user_id: 1,
        date: new Date()
    },
];

const seedBlogs = () => Blog.bulkCreate(blogData);

module.exports = seedBlogs;