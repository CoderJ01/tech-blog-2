const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// set up model for Blog
class Blog extends Model {}

// set up fields and columns for Blog
Blog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        blog_title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        blog_text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {model: 'user', key: 'id'}
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'blog',
    }
);

module.exports = Blog;