const router = require('express').Router();
const {
    addComment,
    removeComment,
    addReply,
    removeReply
} = require('../../controllers/comment-controller');



// /api/comments/<pizzaId>
router.route('/:pizzaId').post(addComment);

// /api/users
router    
    .route('/users')
    .get()
    .put(addReply)
    .delete(removeComment);

router.route('/:pizzaId/:commentId/:replyId').delete(removeReply);


module.exports = router;