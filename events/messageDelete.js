const { Client, MessageEmbed } = require("discord.js");
const { colour, footer, botName, moderationLog } = require('../data/config.js')

/**
 * @param {Client} client 
 * @param {Message} message 
**/

module.exports = async (client, message) => {
    let embed = new MessageEmbed()
        .setTitle(`Message Deleted\n ${message}`)
        .setColor(colour)
        .setFooter(footer, client.user.displayAvatarURL())
        .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
        let logs = message.guild.channels.cache.find(c => c.id === moderationLog)
        logs.send({embeds: [embed] })
}