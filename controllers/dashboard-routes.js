const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

router.get('/', (req, res) => {
    Blog.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id
      },
      include: [
        {
          model: User,
        }
      ]
    })
      .then(dbBlogData => {
        // serialize data before passing to template
        const userBlog = dbBlogData.map(blog => blog.get({ plain: true }));
        res.render('dashboard', { 
            userBlog, 
            loggedIn: true 
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;