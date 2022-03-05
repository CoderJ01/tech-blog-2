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
  Blog.create({
    title: req.body.blog_title,
    text: req.body.blog_text,
    user_id: req.body.user_id
  })
  .then(dbBlogData => {
    req.session.save(() => {
      req.session.id = dbBlogData.id,
      req.session.blog_title = dbBlogData.blog_title,
      req.session.blog_text = dbBlogData.blog_text,
      req.session.user_id = dbBlogData.user_id

      res.json(dbBlogData);
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json;
  });
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