const { Permissions, Client, Message, MessageEmbed } = require("discord.js");

//> Config
const { colour, footer, botName, moderationLog } = require('../../data/config.js');
const { upvote_id, warning_id, offline_id, pin_id, gift_id, idle_id, success_id, barrow_id, downvote_id, danger_id, online_id, dnd_id, info_id, denied_id, loading_id } = require('../../data/config.js');

module.exports = {
    name: "mute",
    description: "mute a user.",
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
        const embed = new MessageEmbed()
            .setTitle('**MUTE**')
            .setColor(colour)
            .addField("ERROR", 'You are missing `MANAGE_MESSAGES` permission(s) to run this command.')
            .setFooter(footer, client.user.displayAvatarURL())
            .setTimestamp();
        return message.channel.send({embeds: [embed] });
    }

    if (!message.guild.me.permissions.has(["MANAGE_MESSAGES", "ADMINISTRATOR"])) {
        const embed = new MessageEmbed()
            .setTitle('**MUTE**')
            .setColor(colour)
            .addField("ERROR", 'I am missing `MANAGE_ROLES` permission(s) to run this command.')
            .setFooter(footer, client.user.displayAvatarURL())
            .setTimestamp();
        return message.channel.send({embeds: [embed] });
    }

    // Provide a user to mute.
    let muteMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!muteMember) {
        const embed = new MessageEmbed()
            .setTitle('**MUTE**')
            .setColor(colour)
            .setDescription('**Description:** `Mute a user from the guild!`\n**Usage:** `!Mute <@user | user-id> [reason]`\n**Example:** `!Mute @User#0000 Toxic`')
            .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
            .setFooter(footer, client.user.displayAvatarURL())
            .setTimestamp();
        return message.channel.send({embeds: [embed] });
    }
    // Check if reason was given.
    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason given!";

    // Check for mute role, Create Mute Role, Change Mute Role permissions
    let muteRole = message.guild.roles.cache.find(x => x.name === "Muted");
    if (!muteRole) {
        try {
            muteRole = await message.guild.roles.create({
                data: {
                    name: 'Muted',
                    color: "#514f48",
                    permissions: []
                }
            })
            message.guild.channels.cache.forEach(async(channel) => {
                // Making Mute role not able to 
                channel.permissionOverwrites.set([
                    {
                        id: muteRole.id,
                        deny: ['SEND_MESSAGES', 'ADD_REACTIONS', 'SEND_TTS_MESSAGES', 'ATTACH_FILES', 'SPEAK', "CONNECT"],
                    },
                ]);
            });
        } catch (e) {
            console.log(e.stack);
        }
    }

    // Delete command and message user.
    message.delete()

    muteMember.roles.add(muteRole.id).then(() => {
        muteMember.send(`Hello, you have been **MUTED** from **${message.guild.name}** for: **${reason}**`);
        let embed = new MessageEmbed()
            .setTitle("**USER MUTED**")
            .setColor(colour)
            .setFooter(footer, client.user.displayAvatarURL())
            .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
            .addField("User:", muteMember.user.username)
            .addField("Moderator:", message.author.username)
            .addField("Reason", reason)
        message.channel.send({embeds: [embed] })
    })

    // Log punishment in logs channel
    let embed = new MessageEmbed()
        .setTitle("**USER MUTED**")
        .setColor(colour)
        .setFooter(footer, client.user.displayAvatarURL())
        .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
        .addField("User:", muteMember.user.username)
        .addField("Moderator:", message.author.username)
        .addField("Reason", reason)

    let logs = message.guild.channels.cache.find(c => c.id === moderationLog)
    logs.send({embeds: [embed]})

    }
};

module.exports.help = {
    name: 'Mute',
    desc: 'Mute a user from the guild',
    usage: 'Mute <user or ID> <reason>',
    category: 'moderation'
};