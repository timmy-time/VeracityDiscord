const { Client, MessageEmbed } = require("discord.js");
const { colour, footer, botName, moderationLog } = require('../data/config.js')

/**
 * @param {Client} client 
 * @param {Message} message 
**/

module.exports = async (client, message, oldMessage, newMessage) => {
    client.on("messageUpdate", function(oldMessage, newMessage){
        let embed = new MessageEmbed()
            .setTitle(`MessageUpdate\nOld Message: ${oldMessage}\nNew Message: ${oldMessage}`)
            .setColor(colour)
            .setFooter(footer, client.user.displayAvatarURL())
            .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
            let logs = message.guild.channels.cache.find(c => c.id === moderationLog)
            logs.send({embeds: [embed] })
    });
}