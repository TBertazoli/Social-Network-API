const { User, Thought } = require('../models');

const thoughtsController = {
    // add thoughts to user
    addThoughts({ params, body }, res) {
        console.log(body);
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { username:body.username},
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

//     //remove comment
//     removeComment({ params }, res) {
//         Comment.findOneAndDelete({ _id: params.commentId })
//             .then(deletedComment => {
//                 if (!deletedComment) {
//                     return res.status(404).json({ message: 'No comment with this id!' });
//                 }
//                 return Pizza.findOneAndUpdate(
//                     { _id: params.pizzaId },
//                     { $pull: { comments: params.commentId } },
//                     { new: true }
//                 );
//             })
//             .then(dbPizzaData => {
//                 if (!dbPizzaData) {
//                     res.status(404).json({ message: 'No pizza found with this id!' });
//                     return;
//                 }
//                 res.json(dbPizzaData);
//             })
//             .catch(err => res.json(err));
//     },

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