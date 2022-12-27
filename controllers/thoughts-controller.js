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

        // get a thought by id
        getThoughtsById({ params }, res) {
        Thought.findOne({ _id: params.id })
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

        // update thought by id
        updateThoughts({ params, body }, res) {
            Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
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
    deleteThoughts({ params }, res) {        
        Thought.findOneAndDelete({ _id: params.id })
            .then(deletedthought => {                
                if (!deletedthought) {
                    return res.status(404).json({ message: 'No thought with this id!' });
                }
                return User.findOneAndUpdate(
                    { username: deletedthought.username },
                    { $pull: { thoughts: params.id } },
                    { new: true }
                );
            })
            .then(dbData => {
                if (!dbData) {
                    res.status(404).json({ message: 'No thought found with this id!2' });
                    return;
                }
                res.json(dbData);
            })
            .catch(err => res.json(err));
    },
}

module.exports = thoughtsController;