const { Permissions, Client, Message , MessageEmbed} = require("discord.js");
const request = require("requests");
const moment = require("moment");

//> Config
const { prefix, colour, footer, botName} = require(`../../data/config`);
const { upvote_id, warning_id, offline_id, pin_id, gift_id, idle_id, success_id, barrow_id, downvote_id, danger_id, online_id, dnd_id, info_id, denied_id, loading_id } = require('../../data/config.js');

//> Code
module.exports = {
    name: "userinfo",
    description: "invite the bot to your guild!",
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
        let mentionedUser = message.mentions.users.first() | message.author;
        mentionedUser = (mentionedUser === undefined) ? await message.guild.members.fetch(args[0]): mentionedUser;
        mentionedUser = await message.guild.members.fetch(mentionedUser.id)
        var created_at = message.author.createdTimestamp;
        created_at = moment(created_at);
        created_at = created_at.format(`DD/MM/YYYY, HH:mm:ss A zz`);
        var joined_at = message.member.joinedTimestamp;
        joined_at = moment(joined_at);
        joined_at = joined_at.format(`DD/MM/YYYY, HH:mm:ss A zz`);
        var status = null
        // if message.member.presence.status is online set variable to `<:online:${online_id}> Online`
        if (message.member.presence.status === `online`) {
            status = `<:online:${online_id}> Online`;
        }
        // else if message.member.presence.status is offline set variable to `<:offline:${offline_id}> Offline`
        else if (message.member.presence.status === `offline`) {
            status = `<:offline:${offline_id}> Offline`;
        }
        // else if message.member.presence.status is idle set variable to `<:idle:${idle_id}> Idle`
        else if (message.member.presence.status === `idle`) {
            status = `<:idle:${idle_id}> Idle`;
        }
        // else if message.member.presence.status is dnd set variable to `<:dnd:${dnd_id}> Do Not Disturb`
        else if (message.member.presence.status === `dnd`) {
            status = `<:dnd:${dnd_id}> DND`;
        }
        

        const userinfoMenu = new MessageEmbed()
        .setTitle("User Info")
        .setColor(colour)
        .setDescription(`User: <@${message.author.id}> [${message.author.username}#${message.author.discriminator}]\nID: ${message.author.id}\nCreated: ${created_at}`)
        .addField(`Presence`, `${status}`, false)
        .addField(`Guild`, `Joined: ${joined_at}`, false)
        await message.channel.send({embeds: [userinfoMenu]});

        }
}
module.exports.help = {
    name: `userinfo`,
    desc: `invite the bot to your guild!`,
    usage: `userinfo`,
    category: `general`
  };