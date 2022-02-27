const Blog = require('./Blog');
const User = require('./User');

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

module.exports = {
    Blog,
    User
};