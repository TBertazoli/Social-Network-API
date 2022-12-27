const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtsById,
    addThoughts,
    updateThoughts,
    deleteThoughts,
    createReaction,
    removeReaction
} = require('../../controllers/thoughts-controller');


// /api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(addThoughts);

// /api/thoughts/:id
router
    .route('/:id')
    .get(getThoughtsById)
    .put(updateThoughts)
    .delete(deleteThoughts);

// /api/thoughts/:thoughtId/reactions
router
    .route('/:id/reactions')
    .post(createReaction)

router
    .route('/:id/reactions/:reactionId')
    .delete(removeReaction);


module.exports = router;