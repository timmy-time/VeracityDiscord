// Declare
const { Permissions, Client, Message, MessageEmbed } = require("discord.js");

//> Config
const { colour, footer, botName, moderationLog } = require('../../data/config.js');

//> Code
module.exports = {
    name: 'lock',
    desc: 'lock',
    usage: 'lock',
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
        if (!message.member.permissions.has(["MANAGE_MESSAGES", "ADMINISTRATOR"])) {
            const managemessagesembed = new MessageEmbed()
                .setTitle('**LOCK**')
                .setColor(colour)
                .addField("ERROR", 'You are missing `MANAGE_MESSAGES` permission(s) to run this command.')
                .setFooter(footer, client.user.displayAvatarURL())
                .setTimestamp();
            return message.channel.send({embeds: [managemessagesembed] });
        }
        const role = message.guild.roles.cache.find(role => role.name === 'Member') 
        message.channel.permissionOverwrites.edit(role, { 'SEND_MESSAGES': false}) 
        let embed = new MessageEmbed()
        .setTitle(`**LOCKDOWN HAS STARTED**\n Started by ${message.author.tag}`)
        .setColor(colour)
        .setFooter(footer, client.user.displayAvatarURL())
        .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
        message.channel.send({embeds: [embed]})
        // Log punishment in logs channel
        let logs = message.guild.channels.cache.find(c => c.id === moderationLog)
        logs.send({embeds: [embed] })
    }
}

module.exports.help = {
name: 'lock',
desc: 'lock',
usage: 'lock',
category: 'moderation'
};