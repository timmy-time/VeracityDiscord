const { Permissions, Client, Message , MessageEmbed} = require("discord.js");
const request = require("requests");

//> Config
const { colour, footer, botName } = require('../../data/config.js');
module.exports = {
   name: "serverinfo",
   desc: "Displays sever information.",
   category: "general",
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
    if (message.guild.explicitContentFilter === 'DISABLED') {
        guild_security_level = 'None';
    } else if (message.guild.explicitContentFilter === 'MEMBERS_WITHOUT_ROLES') {
        guild_security_level = 'Low';
    } else {
        guild_security_level = 'High';
    }

    const members = await message.guild.members.fetch();
    const boosters = members.filter(m => m.premiumSinceTimestamp);
    created_at = message.guild.createdAt;
    created_at = new Date(created_at);
    created_at = created_at.getDate() + '/' + (created_at.getMonth() + 1 ) + '/' + created_at.getFullYear();
    const serverInfo = new MessageEmbed()
        .setAuthor(botName, client.user.displayAvatarURL())
        .setColor(colour)
        .addField(`**Guild**`, `<:barrow:871711954203463722> Guild ID: ${message.guild.id}\n<:barrow:871711954203463722> Guild Security: ${guild_security_level}\n<:barrow:871711954203463722> Created on: ${created_at} `, true)
        .addField(`**Statistics**`, `Members: ${message.guild.memberCount}\n Roles: ${message.guild.roles.cache.size}\n Emoji Count: ${message.guild.emojis.cache.size}\n Boosts: ${boosters.size}`, true)
        .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
        .setFooter(footer)
        .setTimestamp()
    return message.channel.send({embeds: [serverInfo]});
    }
}

module.exports.help = {
    name: 'serverinfo',
    desc: 'Server Infomation',
    usage: 'serverinfo',
    category: 'general'
  };