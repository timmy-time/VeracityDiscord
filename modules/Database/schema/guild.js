//> Dependencies
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const guildSchema = new Schema({
    guildID: {  type: String, required: true, unique: true },
    prefix: {   type: String, required: true, default: '!' },
    welcomeChannel: { type: String, required: true, default: 'welcome' },
    supportChannel: { type: String, required: true, default: 'support-ticket' },
    supportCategory: { type: String, required: true, default: 'support-tickets' },
    supportTranscripts: { type: String, required: true, default: 'transcripts' },
    modLogs: { type: String, required: true, default: 'mod-logs' },
});

const Guild = mongoose.model('Guild', guildSchema);

module.exports = Guild;