const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');

// find all comments
router.get('/', (req, res) => {
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
  if (req.session) {
    Comment.create({
      comment_text: req.body.comment_text,
      blog_id: req.body.blog_id,
      user_id: req.session.user_id,
      date: new Date()
    })
    .then(dbCommentData => {
      res.json(dbCommentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json;
    });
  }
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