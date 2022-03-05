const router = require('express').Router();
const userRoutes = require('./user-routes');
const blogRoutes = require('./blog-routes');
const commentRoutes = require('./comment-routes');

// set up api routers to be exported
router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);
router.use('/comments', commentRoutes);

module.exports = router;