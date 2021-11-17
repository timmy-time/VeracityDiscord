//> Dependencies
const mongoose = require('mongoose');
const { Schema } = require('mongoose');


const userSchema = new Schema({
    userID: { type: String, required: true }, 
    guildID: { type: String, required: true },
    warns: { type: Number, default: 0 },
    muted: { type: Boolean, default: false },
    mutedUntil: { type: Date, default: null }
});

const User = mongoose.model('User', userSchema);

module.exports = User;