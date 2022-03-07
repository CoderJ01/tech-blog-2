const router = require('express').Router();
const { User, Blog, Comment} = require('../../models');

// find all blogs
router.get('/', (req, res) => {
  console.log('===========================');
  Blog.findAll({
    attributes: { exclude: ['password'] }
  })
  .then(dbBlogData => res.json(dbBlogData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// find one blog
router.get('/:id', (req, res) => {
  Blog.findOne({
    attributes: { exclude: ['passwords'] },
    where: {
      id: req.params.id
    },
    include: [
      {
        model: User,
        attributes: ['id', 'username', 'email', 'password']
      }
    ]
  })
  .then(dbBlogData => {
    if (!dbBlogData) {
      res.status(404).json({ message: 'No blog found with this id' });
      return;
    }
    res.json(dbBlogData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

// create a new blog
router.post('/', (req, res) => {
  if (req.session) {
    Blog.create({
      blog_title: req.body.blog_title,
      blog_text: req.body.blog_text,
      user_id: req.body.user_id,
      date: new Date()
    })
    .then(dbBlogData => {
      // if (!dbBlogData) {
      //   console.log('The data is not being retrieved!');
      // }
      res.json(dbBlogData);
      // console.log(dbBlogData)
    })
    .catch(err => {
      console.log(err);
      console.log('ERROR');
      res.status(500).json;
    });
  }
});

// update blog
router.put('/:id', (req, res) => {
  Blog.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
  .then(dbBlogData => {
    if (!dbBlogData) {
      res.status(404).json({ message: 'No blog found with this id' });
      return;
    }
  })
  .catch(err => {
    console.log(err);
    console.log('ERROR');
    res.status(500).json(err);
  });
});

// delete blog
router.delete('/:id', (req, res) => {
  Blog.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbBlogData => {
    if (!dbBlogData) {
      res.status(404).json({ message: 'No blog found with this id' });
      return;
    }
    res.json(dbBlogData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;