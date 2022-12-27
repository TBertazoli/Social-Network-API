const { User } = require('../models');
const {friends} = require('mongoose-friends')

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            // .populate({
            //     path: 'thoughts',
            //     select: '-__v'
            // })
            // .select('-__v')
            // .sort({ _id: -1 })
            .then(dbData => res.json(dbData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // get an user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbData => res.json(dbData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // create User
    createUser({ body }, res) {
        User.create(body)
            .then(dbData => res.json(dbData))
            .catch(err => res.json(err));
    },

    // update user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbData => {
                if (!dbData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbData);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete User
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbData => res.json(dbData))
            .catch(err => res.json(err));
    },

    // Add friend
    // addFriend({ body }, res) {
    //     User.findByIdAndUpdate({}, body, { new: true, runValidators: true })
            
    //     .then(dbData => {
    //         if (!dbData) {
    //             res.status(404).json({ message: 'No user found with this id!' });
    //             return;
    //         }
    //         res.json(dbData);
    //     })
    //     .catch(err => res.status(400).json(err));
    // },
};




module.exports = userController;