const { Schema, model } = require('mongoose');
const { default: isEmail } = require('validator/lib/isEmail');
const dateFormat = require('../utils/dateFormat');

const Thought = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            //Must be between 1 and 280 characters

        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [
            {
                // Array of nested documents created with the reactionSchema

            }
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);


// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.

module.exports = Thought;