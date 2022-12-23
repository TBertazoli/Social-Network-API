const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtsById,
    createThoughts,
    updateThoughts,
    deleteThoughts
} = require('../../controllers/thoughts-controller');


// /api/thoughts
router
    .route('/thoughts')
    .get(getAllThoughts)
    .post(createThoughts);

// /api/thoughts/:id
router
    .route('/thoughts/:id')
    .get(getThoughtsById)
    .put(updateThoughts)
    .delete(deleteThoughts);

// /api/thoughts/:thoughtId/reactions
router
    .route('/thoughts/:thoughtId/reactions')
    .post(createReaction)
    .delete(deleteReaction);


module.exports = router;