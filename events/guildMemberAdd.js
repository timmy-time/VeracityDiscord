const { Client, Interaction, MessageEmbed } = require("discord.js");


//> Config
const { colour, footer, botName, welcomeChannelID } = require('../data/config.js');
/**
 * @param {Client} client
 * @param {Member} member
 */

module.exports = async (client, member) => {
    let welcomeembed = new MessageEmbed()
        .setColor(colour)   
        .setDescription(`Welcome <@${member.user.id}> to **VeracityJS**!\n\n<:pin:854958190269956147> **INFORMATION**\n\n**Website** » https://veracityjs.net/\n**Github** » https://github.com/VeracityJS`)
        .setFooter(footer, client.user.displayAvatarURL())
        .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
        .setTimestamp();
    member.guild.channels.cache.get(welcomeChannelID).send({embeds: [welcomeembed]})

        .catch((err) => console.log(err));
}