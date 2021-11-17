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
    name: 'reload',
    desc: 'reloads the bot',
    usage: 'reload',
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
      command = args[0]

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
            console.log(`\x1b[31mCRITICAL \x1b[37m// \x1b[33m${message.author.username} \x1b[37m[\x1b[33m${message.author.id}\x1b[37m] \x1b[32mtried to use reload command but doesn't have permission!`);
        });

    } else {
        // Send message to user
        const shutdownApproved = new MessageEmbed()
            .setTitle(`<:success:${success_id}!`)
            .setColor(colour)
            .setDescription(`I am reloading the file ${String(command)}!`)
            .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
            .setFooter(footer, client.user.displayAvatarURL())
            .setTimestamp();

        message.channel.send({embeds: [shutdownApproved]}).then(async () => {
            try {
                // Log to console
                commands = Array.from(client.commands)
                commandStuff = commands.find(a => a.includes(command))
                client.commands.delete(command)
                const goodReload = new MessageEmbed()
                    .setTitle(`<:success:${success_id}> Reload!`)
                    .setColor(colour)
                    .setDescription(`<:success:${success_id}> Successfuly reloaded ${command}!`)
                    .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
                    .setFooter(footer, client.user.displayAvatarURL())
                    .setTimestamp();
                message.channel.send({embeds: [goodReload]});
                return console.log(`\x1b[31mCRITICAL \x1b[37m// \x1b[33m${message.author.username} \x1b[37m[\x1b[33m${message.author.id}\x1b[37m] \x1b[32mReloaded file ${command}!`);
            } catch (err) {
                console.log(err)
                const reloadFailed = new MessageEmbed()
                    .setTitle(`<:danger:${danger_id}> Reload Failed!`)
                    .setColor(colour)
                    .setDescription(`<:danger:${danger_id}> Failed to reload command ${command}`)
                    .setFooter(footer, client.user.displayAvatarURL())
                    .setTimestamp();
                message.channel.send({embeds: [reloadFailed]});
                return console.log('ERROR')
            }
        })
    }
  }
}

module.exports.help = {
    name: 'reload',
    desc: 'reloads a command',
    usage: 'reload',
    category: 'owner'
};