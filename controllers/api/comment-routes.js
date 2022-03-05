const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');

// find all comments
router.get('/', (req, res) => {
  console.log('===========================');
  Comment.findAll({
    attributes: { exclude: ['password'] }
  })
  .then(dbCommentData => res.json(dbCommentData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// find one comment
router.get('/:id', (req, res) => {
  Comment.findOne({
    attributes: { exclude: ['passwords'] },
    where: {
      id: req.params.id
    },
    include: [
      {
        model: User,
        attributes: ['id', 'username', 'email', 'password']
      },
      {
        model: Blog,
        attributes: ['id', 'title', 'text']
      }
    ]
  })
  .then(dbCommentData => {
    if (!dbCommentData) {
      res.status(404).json({ message: 'No comment found with this id' });
      return;
    }
    res.json(dbCommentData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

// create a new comment
router.post('/', (req, res) => {
  Comment.create({
    text: req.body.comment_text,
    user_id: req.body.user_id,
    blog_id: req.body.blog_id
  })
  .then(dbCommentData => {
    req.session.save(() => {
      req.session.id = dbCommentData.id,
      req.session.comment_text = dbCommentData.comment_text,
      req.session.user_id = dbCommentData.user_id,
      req.session.blog_id - dbCommentData.blog_id

      res.json(dbCommentData);
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json;
  });
});

// update comment
router.put('/:id', (req, res) => {
  Comment.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
  .then(dbCommentData => {
    if (!dbCommentData) {
      res.status(404).json({ message: 'No comment found with this id' });
      return;
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// delete commment
router.delete('/:id', (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbCommentData => {
    if (!dbCommentData) {
      res.status(404).json({ message: 'No comment found with this id' });
      return;
    }
    res.json(dbCommentData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;