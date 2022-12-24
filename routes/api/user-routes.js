const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    // addNewFriend,
    // removeNewFriend
} = require('../../controllers/user-controller')

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


// /api/users/:userId/friends/:friendId
// router
//     .route('/users/:userId/friends/:friendId')
//     .post(addNewFriend)
//     .delete(removeNewFriend)





module.exports = router;