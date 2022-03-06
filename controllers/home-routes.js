const router = require('express').Router();
const { User, Blog, Comment } = require('../models');

router.get('/', (req, res) => {
  // provide route with access to sessions
  console.log(req.session);
  const userId = req.session.user_id;

  console.log('===========================');
  // render existing blogs onto homepage
    Blog.findAll({
      include: {
        model: User,
      }
    })
    .then(dbBlogData => {
      
      // console.log(JSON.stringify(dbBlogData));
      // console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
      const blog_data = dbBlogData.map(blog => 
        blog.get({ plain: true })
      );

      for (let i = 0; i < blog_data.length; i++) {
        const element = blog_data[i];
        element.current_user_id = userId;
      }

      // console.log(blog_data);

      res.render('homepage', {
        blog_data,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/blog/:id', (req, res) => {
  const blogId = req.params.id;
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
      // console.log(blog);

      // pass data to template
      res.render('single-post', {
        blog: blog
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  console.log(req.session.loggedIn);

  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;