const router = require('express').Router();
const { User, Blog, Comment } = require('../models');

router.get('/', (req, res) => {
  // provide route with access to sessions
  const userId = req.session.user_id;

  // render existing blogs onto homepage
    Blog.findAll({
      include: {
        model: User,
      }
    })
    .then(dbBlogData => {
      
      const blog_data = dbBlogData.map(blog => 
        blog.get({ plain: true })
      );

      for (let i = 0; i < blog_data.length; i++) {
        const element = blog_data[i];
        element.current_user_id = userId;
      }

      var onlyName;
      var userName;
      
      if (req.session.username) {
        userName = JSON.stringify(req.session.username);
        onlyName = userName.replace(/["]+/g, '');
      }
      else {
        onlyName = '';
      }

      res.render('homepage', {
        blog_data,
        loggedIn: req.session.loggedIn,
        displayName: onlyName // display logged in user's username 
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/blog/:id', (req, res) => {
  const blogId = req.params.id;
  // render a single blog onto the dashboard when user decides to edit said blog
  Blog.findOne({
    where: {
      id: blogId
    },
    include: [
      {
        model: Comment,
        include: [User]
      },
      {
        model: User,
        attributes: ['username']
      },
    ],
  })
    .then(dbBlogData => {
      if (!dbBlogData) {
        res.status(404).json({ message: 'No blog found with this id' });
        return;
      }

      // serialize the data
      const blog = dbBlogData.get({ plain: true });

      // pass data to template
      res.render('single-post', {
        blog: blog,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// render the login page
router.get('/login', (req, res) => {
  // if user is already logged in, then redirect user to homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// render signup page
router.get('/register', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('register');
});

module.exports = router;