const { User, Thought } = require('../models');

const thoughtsController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})       
            .then(dbData => res.json(dbData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // add thoughts to user
    addThoughts({ body }, res) {
        console.log(body);
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { username: body.username },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbData => {
                if (!dbData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbData);
            })
            .catch(err => res.status(400).json(err));
    },

    //delete thoughts
    // deleteThoughts({ params, body }, res) {
        
    //     Thought.findOneAndDelete({ params })
    //         .then(deletedthought => {                
    //             if (!deletedthought) {
    //                 return res.status(404).json({ message: 'No thought with this id!' });
    //             }
    //             return User.findOneAndUpdate(
    //                 { username: body.username },
    //                 { $pull: { thoughts: __id } },
    //                 { new: true }
    //             );
    //         })
    //         .then(dbData => {
    //             if (!dbData) {
    //                 res.status(404).json({ message: 'No thought found with this id!2' });
    //                 return;
    //             }
    //             res.json(dbData);
    //         })
    //         .catch(err => res.json(err));
    // },

    //     //add reply
    //     addReply({ params, body }, res) {
    //         Comment.findOneAndUpdate(
    //             { _id: params.commentId },
    //             { $push: { replies: body } },
    //             { new: true }
    //         )
    //             .then(dbPizzaData => {
    //                 if (!dbPizzaData) {
    //                     res.status(404).json({ message: 'No pizza found with this id!' });
    //                     return;
    //                 }
    //                 res.json(dbPizzaData);
    //             })
    //             .catch(err => res.json(err));
    //     },

    //     // remove reply
    //     removeReply({ params }, res) {
    //         Comment.findOneAndUpdate(
    //             { _id: params.commentId },
    //             { $pull: { replies: { replyId: params.replyId } } },
    //             { new: true }
    //         )
    //             .then(dbPizzaData => res.json(dbPizzaData))
    //             .catch(err => res.json(err));
    //     }

}

module.exports = thoughtsController;