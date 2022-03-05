const router = require('express').Router();
const { User, Blog } = require('../models');

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

router.get('/login', (req, res) => {
  console.log(req.session.loggedIn);
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;