const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VoteSchema = Schema({
    os: {
        type: String,
        required: true,
        useNewUrlParser: true
    },
    points: {
        type: String,
        required: true,
        useNewUrlParser: true
    }
});


const Vote = mongoose.model("vote", VoteSchema)

module.exports = Vote;