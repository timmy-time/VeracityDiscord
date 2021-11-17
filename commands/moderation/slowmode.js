// Declare
const createHTML = require('create-html');
const fs = require('fs');
const { Permissions, Client, Message, MessageEmbed } = require("discord.js");

//> Config
const { colour, footer, botName, moderationLog } = require('../../data/config.js');

//> Code
module.exports = {
    name: 'slowmode',
    desc: 'slowmode',
    usage: 'slowmode <duration>',
    category: 'moderation',
    perms: {
      client: [Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.EMBED_LINKS],
      user: [Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.MANAGE_CHANNELS]
    },
    aliases: [],

    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
    **/
  execute: async (client, message, args) => {
    if(!args[0]) {
        const slowModeFailedEmbed = new MessageEmbed()
            .setTitle('**Slowmode**')
            .setColor(colour)
            .setDescription('**Description:** `Change the slowmode of the current channel!`\n**Usage:** `!slowmode <length in seconds>`\n**Example:** `!slowmode 360`')
            .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
            .setFooter(footer, client.user.displayAvatarURL())
            .setTimestamp();
        return message.channel.send({embeds: [slowModeFailedEmbed] });


    }
    let duration = args[0]
    await message.channel.setRateLimitPerUser(duration)
    const slowModeFailedEmbed = new MessageEmbed()
        .setTitle('**Slowmode**')
        .setColor(colour)
        .setDescription(`Slowmode Interval has been set to ${duration}`)
        .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
        .setFooter(footer, client.user.displayAvatarURL())
        .setTimestamp();
    return message.channel.send({embeds: [slowModeFailedEmbed] });
    }
}

module.exports.help = {
name: 'slowmode',
desc: 'slowmode',
usage: 'slowmode <duration>',
category: 'moderation'
};