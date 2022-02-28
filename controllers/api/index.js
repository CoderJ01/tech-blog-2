const router = require('express').Router();
const userRoutes = require('./user-routes');

// set up api routers to be exported
router.use('/users', userRoutes);

module.exports = router;