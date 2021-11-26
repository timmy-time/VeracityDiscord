const Guild = require('./schema/guild.js');
const User = require('./schema/user.js');
const mongoose = require('mongoose');
const createError = require('http-errors');


// Add Guild if not Existing
exports.addGuildsAtStart = async function(guildId) {
    Guild.findOneAndUpdate({ guildID: guildId }, { guildID: guildId }, {upsert: true}, function(err){
        if (err) {
            console.error(err);
            return console.log('error')
        }
    }).exec()
}

// Fetch Prefix
const fetchPrefix = async function(guildId) {
    let prefix = await Guild.findOne({ guildID: guildId }, 'prefix').exec();
    return prefix;
}
// Fetch all guild data from mongo db
const fetchAllGuildData = async function(guildId) {
    let guildData = await Guild.findOne({ guildID: guildId }).exec();
    return guildData;
}

const fetchUser = async function(userId, guildId) {
    let user = await User.findOne({ userID: userId, guildID: guildId }).exec();
    return user;
}




const createUser = async function(userId, guildId) {
    await User.findOneAndUpdate({ userID: userId }, { userID: userId, guildID: guildId }, {upsert: true}, function(err){
        if (err) {
            console.error(err);
            return console.log('error')
        }
    }).exec()
}

// Update User 
const updateUser = async function(userId, guildId, userData) {
    await User.findOneAndUpdate({ userID: userId, guildID: guildId }, { userID: userId, guildID: guildId, ...userData }, {upsert: true}, function(err){
        if (err) {
            console.error(err);
            return console.log('error')
        }
    }).exec()
}

const updatePrefix = async (guildId, prefix) => {
    var doc = await Guild.findOne({ guildID: guildId});
    if(!doc) {
        throw createError.documentNotFound(
            {msg: `The Document you tried to update (guildID: ${guildId}) does not exist`}
        );
    }
    doc.prefix = prefix;
    doc.save()
}

// Update Guild 
const updateGuild = async function(guildId, guildData) {
    await Guild.findOneAndUpdate({ guildID: guildId }, { guildID: guildId, ...guildData }, {upsert: true}, function(err){
        if (err) {
            console.error(err);
            return console.log('error')
        }
    }).exec()
}



exports.funcs = {fetchPrefix: fetchPrefix, fetchAllGuildData: fetchAllGuildData, createUser: createUser, fetchUser: fetchUser, updateUser: updateUser, updateGuild: updateGuild, updatePrefix: updatePrefix};
    