const sequelize = require('../config/connection');
const { Comment } = require('../models');

// seed comment table
const commentData = [
    {
        comment_text: 'Huh! So C is a procedual language, while C++ is an object-oreinted language. Interesting.',
        user_id: 2,
        blog_id: 1, 
        date: new Date()
    },
    {
        comment_text: 'omg thank you I needed this so much. the youtube videos were confusing',
        user_id: 3,
        blog_id: 2,
        date: new Date()
    },
    {
        comment_text: 'okay so like you can use jQuery but its not popular now? looooooooool',
        user_id: 3,
        blog_id: 4,
        date: new Date()
    },
    {
        comment_text: 'It makes sense that computer programming involved rudimentry machines back in the year 60 A.D.',
        user_id: 5,
        blog_id: 5,
        date: new Date()
    },
    {
        comment_text: 'This blog contains vital information for individuals considering a career in coding.',
        user_id: 9,
        blog_id: 3, 
        date: new Date()
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;