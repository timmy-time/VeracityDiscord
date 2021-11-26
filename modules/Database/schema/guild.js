//> Dependencies
const { mongoose, Schema } = require('mongoose');

const guildSchema = new Schema({
    //> Main Settings
    guildID: { type: String, required: true, unique: true },
    prefix: { type: String, required: true, default: '!' },
    colour: { type: String, required: true, default: '2f3136' },
    footer: { type: String, required: true, default: 'VeracityJS. All rights reserved.' },
    disabledCommands: { type: Array, required: true, default: [] },

    //> Acitivity Settings
    activity: { type: String, required: true, default: 'online' }, // options are 'dnd', 'online', 'idle', 'invisible'
    activityType: { type: String, required: true, default: 'watching' }, // options are 'watching', 'listening', 'playing'
    activityMessage: { type: String, required: true, default: 'VeracityJS' },

    //> Welcome Settings
    welcomeChannelName: { type: String, required: true, default: 'welcome' },
    welcomeChannelId: { type: String, required: true, default: 'welcome' },
    welcomeChannelBoolean: { type: Boolean, required: true, default: true }, // A boolean to determine if the welcome channel should be check by id or name
    welcomeRoleName: { type: String, required: true, default: 'Member' },
    welcomeRoleId: { type: String, required: true, default: 000000000000 },
    welcomeRoleCheckBoolean: { type: Boolean, required: true, default: true }, // A boolean to determine how to find the welcome role by name or id 
    welcomeRoleBoolean: { type: Boolean, required: true, default: true }, // A boolean to determine if the welcome role should be added to the newcomer
    welcomeMessage: { type: String, required: true, default: 'Welcome to the server, {user}!' },
    welcomeMessageCheckBoolean: { type: Boolean, required: true, default: true }, // A boolean to determine if the welcome message should be made for the newcomer

    //> Verification Settings
    verificationChannelName: { type: String, required: true, default: 'verification' },
    verificationRoleName: { type: String, required: true, default: 'Member' },
    verificationMessageID: { type: String, required: true, default: 000000000000000 },
    verificationMessageVerified: { type: String, required: true, default: '{user} has verified.' },
    verificationMessageUnverified: { type: String, required: true, default: '{user} has unverified.' },
    verificationRoleCheckBoolean: { type: Boolean, required: true, default: true }, // A boolean to determine wether to have a verification system or not
    verificationEmojiName: { type: String, required: true, default: 'VeracityJS' },

    //> Ticket Settings
    supportChannelName: { type: String, required: true, default: 'support-ticket' },
    supportChannelId: { type: String, required: true, default: 000000000000000 },
    supportChannelCheckBoolean: { type: String, required: true, default: true }, // A boolean to determine if the support channel should be check by id or name
    supportCategory: { type: String, required: true, default: 'support-tickets' },
    supportCategoryId: { type: String, required: true, default: 000000000000000 },
    supportCategoryCheckBoolean: { type: String, required: true, default: true }, // A boolean to determine if the support category should be check by id or name
    supportTranscripts: { type: String, required: true, default: 'transcripts' },
    supportTranscript: { type: String, required: true, default: 000000000000000 },
    supportTranscriptCheckBoolean: { type: String, required: true, default: true }, // A boolean to determine if the support channel should be check by id or name
    supportTicketCounter: { type: String, required: true, default: 000000000000000 },
    supportTicketCounterCheckBoolean: { type: String, required: true, default: 0 }, // A boolean to determine if the support channel should be check by id or name

    modLogs: { type: String, required: true, default: 'mod-logs' },
});

const Guild = mongoose.model('Guild', guildSchema);

module.exports = Guild;