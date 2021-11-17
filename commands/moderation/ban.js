const { Permissions, Client, Message, MessageEmbed } = require("discord.js");

//> Config
const { colour, footer, botName, kickroleid, moderationLog } = require('../../data/config.js');
const { upvote_id, warning_id, offline_id, pin_id, gift_id, idle_id, success_id, barrow_id, downvote_id, danger_id, online_id, dnd_id, info_id, denied_id, loading_id } = require('../../data/config.js');

module.exports = {
    name: "ban",
    description: "Ban someone permanently from the server if they really misbehave.",
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
                .setTitle('**Kick**')
                .setColor(colour)
                .addField("ERROR", 'You are missing `MANAGE_MESSAGES` permission(s) to run this command.')
                .setFooter(footer, client.user.displayAvatarURL())
                .setTimestamp();
            return message.channel.send({embeds: [managemessagesembed] });
        }

        if (!message.guild.me.permissions.has(["MANAGE_MESSAGES", "ADMINISTRATOR"])) {
            const managerolesembed = new MessageEmbed()
                .setTitle('**Kick**')
                .setColor(colour)
                .addField("ERROR", 'I am missing `MANAGE_ROLES` permission(s) to run this command.')
                .setFooter(footer, client.user.displayAvatarURL())
                .setTimestamp();
            return message.channel.send({embeds: [managerolesembed] });
        }

        // Provide a user to kick.
        let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!banMember) {
            const helpembed = new MessageEmbed()
                .setTitle('**Ban**')
                .setColor(colour)
                .setDescription('**Description:** `ban a user from the guild!`\n**Usage:** `!ban <@user | user-id> [reason]`\n**Example:** `!ban @User#0000 Toxic`')
                .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
                .setFooter(footer, client.user.displayAvatarURL())
                .setTimestamp();
            return message.channel.send({embeds: [helpembed] });
        }
        if (banMember.id === message.author.id) {
            const cantkickyourself = new MessageEmbed()
                .setTitle('**Ban**')
                .setColor(colour)
                .addField("ERROR", `You aren't able to ban yourself.`)
                .setFooter(footer, client.user.displayAvatarURL())
                .setTimestamp();
            return message.channel.send({embeds: [cantkickyourself] });

        }
        if (banMember.roles.highest.position >= message.member.roles.highest.position && message.author.id !== message.guild.ownerId) {
            const rolebeinghigher = new MessageEmbed()
                .setTitle('**Ban**')
                .setColor(colour)
                .addField("ERROR", `**You can\'t ban this member due to your role being lower or equal than that member role.**`)
                .setFooter(footer, client.user.displayAvatarURL())
                .setTimestamp();
            return message.channel.send({embeds: [rolebeinghigher] });
        }
        banMember.send(`Hello, you have been **BANNED** from **${message.guild.name}** for: **${reason}**`);
        banMember.ban(reason);
        let kickembed = new MessageEmbed()
            .setTitle("**USER BANNED**")
            .setColor(colour)
            .setFooter(footer, client.user.displayAvatarURL())
            .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
            .addField("User:", banMember.user.username)
            .addField("Moderator:", message.author.username)
            .addField("Reason", reason)
        message.channel.send({embeds: [kickembed] })

        // Log punishment in logs channel
        let logembed = new MessageEmbed()
            .setTitle("**USER BANNED**")
            .setColor(colour)
            .setFooter(footer, client.user.displayAvatarURL())
            .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
            .addField("User:", banMember.user.username)
            .addField("Moderator:", message.author.username)
            .addField("Reason", reason)

        let logs = message.guild.channels.cache.find(c => c.id === moderationLog)
        logs.send({embeds: [logembed]})

    }
}

module.exports.help = {
    name: 'Ban',
    desc: 'Ban a user from the guild',
    usage: 'Ban <user or ID> <reason>',
    category: 'moderation'
};