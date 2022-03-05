const Blog = require('./Blog');
const User = require('./User');
const Comment = require('./Comment');

// create asssociations between tables

// link User and Blog (one-to-many relationship)
User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Blog.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

// link User and Comment (one-to-many)
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

// link Blog and Comment (one-to-many)
Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
    onDelete: 'SET NULL'
});

Comment.belongsTo(Blog, {
    foreignKey: 'blog_id',
    onDelete: 'SET NULL'
});

module.exports = {
    Blog,
    User,
    Comment
};