const router = require('express').Router();
const { User, Blog } = require('../models');

router.get('/', (req, res) => {
  console.log('===========================');
    Blog.findAll({
      attributes: { exclude: ['password'] },
      include: {
        model: User,
        attributes: ['username']
      }
    })
    .then(dbBlogData => {
      
      const blog_data = dbBlogData.map(blog => 
        blog.get({ plain: true })
      );

      console.log(blog_data);

      res.render('homepage', {
        blog_data,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;