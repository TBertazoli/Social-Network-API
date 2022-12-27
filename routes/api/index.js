const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtsRoutes = require('./thoughts-routes');

router.use('/users', userRoutes);
router.use('/users/:id', thoughtsRoutes);

module.exports = router;