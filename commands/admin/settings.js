const { Permissions, Client, Message , MessageEmbed, CommandInteractionOptionResolver} = require("discord.js");
const request = require("requests");

//> Config
const {colour, footer, botName } = require('../../data/config.js');
const { upvote_id, warning_id, offline_id, pin_id, gift_id, idle_id, success_id, barrow_id, downvote_id, danger_id, online_id, dnd_id, info_id, denied_id, loading_id } = require('../../data/config.js');
module.exports = {
   name: "settings",
   desc: "gets guilds settings",
   category: "admin",
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
        let permissions = ["MANAGE_GUILD" || "ADMINISTRATOR"]
        let permissionList = ["MANAGE_GUILD", "ADMINISTRATOR"]

        //> Check Users Permissions
        if (!message.member.permissions.has(permissions)) {
            const panelPermission = new MessageEmbed()
                .setAuthor(botName, client.user.displayAvatarURL())
                .setDescription(`<:danger:${danger_id}> You're missing \`${permissionList}\` permission(s) to run this command.`)
                .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
                .setColor(colour)
                .setFooter(footer)
            return message.channel.send({embeds: [panelPermission]})
        }

        let guildInfo = await client.dbCommands.fetchAllGuildData(message.guild.id);

        const serverInfo = new MessageEmbed()
            .setAuthor(botName, client.user.displayAvatarURL())
            .setColor(colour)
            .setDescription(`<:barrow:${barrow_id}> **Prefix:** \`${guildInfo.prefix}\``)
            .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
            .setFooter(footer)
            .setTimestamp()
        return message.channel.send({embeds: [serverInfo]});

    }
}
module.exports.help = {
    name: 'settings',
    desc: 'gets guilds settings',
    usage: 'settings',
    category: 'admin'
  };