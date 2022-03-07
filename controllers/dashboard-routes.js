const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');

// retrieve all of a user's blog post to be retrieved in handlebars
router.get('/', withAuth, (req, res) => {
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
        // console.log(userBlog)
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

// allow user to edit blog posts
router.get('/edit/:id', withAuth, (req, res) => {
  const editBlogID = req.params.id;
  Blog.findOne({
    where: {
      id: editBlogID
    },
    include: [
      {
        model: Comment
      },
      {
        model: User
      }
    ]
  })
    .then(dbBlogData => {
      if (dbBlogData) {
        const editBlog = dbBlogData.get({ plain: true });
        console.log(editBlog);
        
      res.render('edit-post', {
          editBlog,
          loggedIn: true,
        });
      } 
      else {
        console.log('404');
        res.status(404).end();
      }
    })
    .catch(err => {
      console.log('500');
      res.status(500).json(err);
    });
});
  

module.exports = router;