const router = require('express').Router();
// const {
//     addComment,
//     removeComment,
//     addReply,
//     removeReply
// } = require('../../controllers/comment-controller');

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require ('../../controllers/user-controller')

// /api/comments/<pizzaId>
// router.route('/:pizzaId').post(addComment);

// /api/users
router    
    .route('/users')
    .get(getAllUsers)    
    .post(createUser);
    
// /api/users/:id
    router
    .route('/users/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// router.route('/:pizzaId/:commentId/:replyId').delete(removeReply);


module.exports = router;