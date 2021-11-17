const { Permissions, Client, Message, MessageEmbed } = require("discord.js");

//> Config
const { colour, footer, botName, moderationLog } = require('../../data/config.js');
const { upvote_id, warning_id, offline_id, pin_id, gift_id, idle_id, success_id, barrow_id, downvote_id, danger_id, online_id, dnd_id, info_id, denied_id, loading_id } = require('../../data/config.js');

module.exports = {
    name: "softban",
    description: "softban someone that had ",
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

        let reason = args.slice(1).join(' ');
        if(!reason) reason = "(No Reason Provided)";
        // Check user & Bot permissions
        if (!message.member.permissions.has(["MANAGE_MESSAGES", "ADMINISTRATOR"])) {
            const managemessagesembed = new MessageEmbed()
                .setTitle('**SOFTBAN**')
                .setColor(colour)
                .addField("ERROR", 'You are missing `MANAGE_MESSAGES` permission(s) to run this command.')
                .setFooter(footer, client.user.displayAvatarURL())
                .setTimestamp();
            return message.channel.send({embeds: [managemessagesembed] });
        }

        if (!message.guild.me.permissions.has(["MANAGE_MESSAGES", "ADMINISTRATOR"])) {
            const managerolesembed = new MessageEmbed()
                .setTitle('**SOFTBAN**')
                .setColor(colour)
                .addField("ERROR", 'I am missing `MANAGE_ROLES` permission(s) to run this command.')
                .setFooter(footer, client.user.displayAvatarURL())
                .setTimestamp();
            return message.channel.send({embeds: [managerolesembed] });
        }

        // Provide a user to kick.
        let softbanMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!softbanMember) {
            const helpembed = new MessageEmbed()
                .setTitle('**SOFTBAN**')
                .setColor(colour)
                .setDescription('**Description:** `softban a user from the guild!`\n**Usage:** `!softban <@user | user-id> [reason]`\n**Example:** `!softban @User#0000 Appealed`')
                .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
                .setFooter(footer, client.user.displayAvatarURL())
                .setTimestamp();
            return message.channel.send({embeds: [helpembed] });
        }
        if (softbanMember.id === message.author.id) {
            const cantkickyourself = new MessageEmbed()
                .setTitle('**SOFTBAN**')
                .setColor(colour)
                .addField("ERROR", `You aren't able to softban yourself.`)
                .setFooter(footer, client.user.displayAvatarURL())
                .setTimestamp();
            return message.channel.send({embeds: [cantkickyourself] });

        }
        softbanMember.send(`Hello, you have been **softban** from **${message.guild.name}** for: **${reason}**`);
        softbanMember.ban();
        message.guild.members.unban(reason);
        let kickembed = new MessageEmbed()
            .setTitle("**USER SOFTBAN**")
            .setColor(colour)
            .setFooter(footer, client.user.displayAvatarURL())
            .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
            .addField("User:", softbanMember.user.username)
            .addField("Moderator:", message.author.username)
            .addField("Reason", reason)
        message.channel.send({embeds: [kickembed] })

        // Log punishment in logs channel
        let logembed = new MessageEmbed()
            .setTitle("**USER SOFTBAN**")
            .setColor(colour)
            .setFooter(footer, client.user.displayAvatarURL())
            .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
            .addField("User:", softbanMember.user.username)
            .addField("Moderator:", message.author.username)
            .addField("Reason", reason)

        let logs = message.guild.channels.cache.find(c => c.id === moderationLog)
        logs.send({embeds: [logembed]})

    }
}

module.exports.help = {
    name: 'softban',
    desc: 'softban a user from the guild',
    usage: 'Ban <user or ID> <reason>',
    category: 'moderation'
};