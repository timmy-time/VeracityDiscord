// Declare
const createHTML = require('create-html');
const fs = require('fs');
const { Permissions, Client, Message, MessageEmbed } = require("discord.js");
const moment = require('moment');
require('moment-duration-format');
function wait(ms){var start = new Date().getTime();var end = start;while(end < start + ms) {end = new Date().getTime()}}

//> Config
const { prefix, colour, footer, botName, botOwners} = require('../../data/config');
const { upvote_id, warning_id, offline_id, pin_id, gift_id, idle_id, success_id, barrow_id, downvote_id, danger_id, online_id, dnd_id, info_id, denied_id, loading_id } = require('../../data/config.js');

//> Code
module.exports = {
    name: 'restart',
    desc: 'Restarts the bot',
    usage: 'restart',
    category: 'owner',
    perms: {
      client: [Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.EMBED_LINKS],
      user: [Permissions.FLAGS.SEND_MESSAGES]
    },
    aliases: [],

    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
  execute: async (client, message, args) => {
    // if message.author.id is not in botOwners
    if (!botOwners.includes(message.author.id)) {
        // Send message to user
        const restartPermission = new MessageEmbed()
            .setAuthor(botName, client.user.displayAvatarURL())
            .setDescription(`<:danger:${danger_id}> You're missing permission(s) to run this command!`)
            .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
            .setColor(colour)
            .setFooter(footer)
            .setTimestamp();
        return message.channel.send({embeds: [restartPermission]}).then(async => {

            // Log to console
            console.log(`\x1b[31mCRITICAL \x1b[37m// \x1b[33m${message.author.username} \x1b[37m[\x1b[33m${message.author.id}\x1b[37m] \x1b[32mtried to use restart command but doesn't have permission!`);
        });

    }
    // If message.author.id is in botOwners
    else {
        // Send message to user
        const shutdownApproved = new MessageEmbed()
            .setTitle(`<:success:${success_id}> Restart!`)
            .setColor(colour)
            .setDescription(`I am restarting!`)
            .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
            .setFooter(footer, client.user.displayAvatarURL())
            .setTimestamp();

        return message.channel.send({embeds: [shutdownApproved]}).then(async => {
            // Log to console
            console.log(`\x1b[31mCRITICAL \x1b[37m// \x1b[33m${message.author.username} \x1b[37m[\x1b[33m${message.author.id}\x1b[37m] \x1b[32mrestarted the bot!`);
            // Restart the bot
            process.exit(2);
        });
    }
    }   
}

module.exports.help = {
    name: 'restart',
    desc: 'restarts the bot',
    usage: 'restart',
    category: 'owner'
};