const { Permissions, Client, Message, MessageEmbed } = require("discord.js");

//> Config
const { colour, footer, botName, muteroleid, moderationLog } = require('../../data/config.js');
const { upvote_id, warning_id, offline_id, pin_id, gift_id, idle_id, success_id, barrow_id, downvote_id, danger_id, online_id, dnd_id, info_id, denied_id, loading_id } = require('../../data/config.js');

module.exports = {
    name: "unmute",
    description: "unmute a user.",
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
        if (!message.member.permissions.has(["MANAGE_MESSAGES", "ADMINISTRATOR"])) {
            const embed = new MessageEmbed()
                .setTitle('**UNMUTE**')
                .setColor(colour)
                .addField("ERROR", 'You are missing `MANAGE_MESSAGES` permission(s) to run this command.')
                .setFooter(footer, client.user.displayAvatarURL())
                .setTimestamp();
        return message.channel.send({embeds: [embed] });
        }

        if (!message.guild.me.permissions.has(["MANAGE_MESSAGES", "ADMINISTRATOR"])) {
            const embed = new MessageEmbed()
                .setTitle('**UNMUTE**')
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
                .setTitle('**UNMUTE**')
                .setColor(colour)
                .setDescription('**Description:** `Unmute a user from the guild!`\n**Usage:** `!Unmute <@user | user-id> [reason]`\n**Example:** `!Unmute @User#0000`')
                .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
                .setFooter(footer, client.user.displayAvatarURL())
                .setTimestamp();
            return message.channel.send({embeds: [embed] });
        }
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
                    channel.overwritePermissions([
                        ...channel.permissionOverwrites.array(),
                        {
                            id: muteRole.id,
                            deny: ['SEND_MESSAGES', 'ADD_REACTIONS', 'SEND_TTS_MESSAGES', 'ATTACH_FILES', 'SPEAK', "CONNECT"],
                        },
                    ], 'Needed to change permissions');
                });
            } catch (e) {
                console.log(e.stack);
            }
        }

        // Delete command and message user.
        message.delete()
    
        muteMember.roles.add(muteRole.id).then(() => {
            muteMember.send(`Hello, you have been **UNMUTED** from **${message.guild.name}**`);
            let embed = new MessageEmbed()
                .setTitle("**USER UNMUTED**")
                .setColor(colour)
                .setFooter(footer, client.user.displayAvatarURL())
                .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
                .addField("User:", muteMember.user.username)
                .addField("Moderator:", message.author.username)
            message.channel.send({embeds: [embed] })
            muteMember.roles.remove(muteRole)
        })

        // Log punishment in logs channel
        let embed = new MessageEmbed()
            .setTitle("**USER UNMUTED**")
            .setColor(colour)
            .setFooter(footer, client.user.displayAvatarURL())
            .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
            .addField("User:", muteMember.user.username)
            .addField("Moderator:", message.author.username)
        let logs = message.guild.channels.cache.find(c => c.id === moderationLog)
        logs.send({embeds: [embed] })
    
        }
    };
module.exports.help = {
    name: 'Unmute',
    desc: 'Unmute a user from the guild',
    usage: 'Unmute <user or ID>',
    category: 'moderation'
};
