const { Permissions, Client, Message, MessageEmbed } = require("discord.js");

//> Config
const { colour, footer, botName, moderationLog } = require('../../data/config.js');
const { upvote_id, warning_id, offline_id, pin_id, gift_id, idle_id, success_id, barrow_id, downvote_id, danger_id, online_id, dnd_id, info_id, denied_id, loading_id } = require('../../data/config.js');

module.exports = {
    name: "unban",
    description: "Unban someone that had ",
    category: "moderation",
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

        // Check user & Bot permissions
        if (!message.member.permissions.has(["MANAGE_MESSAGES", "ADMINISTRATOR"])) {
            const managemessagesembed = new MessageEmbed()
                .setTitle('**UNBAN**')
                .setColor(colour)
                .addField("ERROR", 'You are missing `MANAGE_MESSAGES` permission(s) to run this command.')
                .setFooter(footer, client.user.displayAvatarURL())
                .setTimestamp();
            return message.channel.send({embeds: [managemessagesembed] });
        }

        if (!message.guild.me.permissions.has(["MANAGE_MESSAGES", "ADMINISTRATOR"])) {
            const managerolesembed = new MessageEmbed()
                .setTitle('**UNBAN**')
                .setColor(colour)
                .addField("ERROR", 'I am missing `MANAGE_ROLES` permission(s) to run this command.')
                .setFooter(footer, client.user.displayAvatarURL())
                .setTimestamp();
            return message.channel.send({embeds: [managerolesembed] });
        }

        // Provide a user to kick.
        let unbanMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!unbanMember) {
            const helpembed = new MessageEmbed()
                .setTitle('**UNBAN**')
                .setColor(colour)
                .setDescription('**Description:** `Unban a user from the guild!`\n**Usage:** `!unban <@user | user-id> [reason]`\n**Example:** `!unban @User#0000 Appealed`')
                .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
                .setFooter(footer, client.user.displayAvatarURL())
                .setTimestamp();
            return message.channel.send({embeds: [helpembed] });
        }
        if (unbanMember.id === message.author.id) {
            const cantkickyourself = new MessageEmbed()
                .setTitle('**UNBAN**')
                .setColor(colour)
                .addField("ERROR", `You aren't able to unban yourself.`)
                .setFooter(footer, client.user.displayAvatarURL())
                .setTimestamp();
            return message.channel.send({embeds: [cantkickyourself] });

        }
        unbanMember.send(`Hello, you have been **UNBAN** from **${message.guild.name}** for: **${reason}**`);
        message.guild.members.unban(unbanMember.id, reason);
        let kickembed = new MessageEmbed()
            .setTitle("**USER UNBAN**")
            .setColor(colour)
            .setFooter(footer, client.user.displayAvatarURL())
            .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
            .addField("User:", unbanMember.user.username)
            .addField("Moderator:", message.author.username)
            .addField("Reason", reason)
        message.channel.send({embeds: [kickembed] })

        // Log punishment in logs channel
        let logembed = new MessageEmbed()
            .setTitle("**USER UNBAN**")
            .setColor(colour)
            .setFooter(footer, client.user.displayAvatarURL())
            .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
            .addField("User:", unbanMember.user.username)
            .addField("Moderator:", message.author.username)
            .addField("Reason", reason)

        let logs = message.guild.channels.cache.find(c => c.id === moderationLog)
        logs.send({embeds: [logembed]})

    }
}

module.exports.help = {
    name: 'Unban',
    desc: 'Unban a user from the guild',
    usage: 'Ban <user or ID> <reason>',
    category: 'moderation'
};