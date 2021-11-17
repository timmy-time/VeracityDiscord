const { Permissions, Client, Message, MessageEmbed } = require("discord.js");

//> Config
const { colour, footer, botName } = require('../../data/config.js');
const { upvote_id, warning_id, offline_id, pin_id, gift_id, idle_id, success_id, barrow_id, downvote_id, danger_id, online_id, dnd_id, info_id, denied_id, loading_id } = require('../../data/config.js');
module.exports = {
    name: "warn",
    description: "Warn a user.",
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
        let warnPermErr = new MessageEmbed()
        .setTitle("**User Permission Error!**")
        .setDescription("**Sorry, you don't have permissions to use this! ❌**")
        if(!message.channel.permissionsFor(message.member).has(['MANAGE_MESSAGES'])) return message.channel.send(warnPermErr);

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) {
            const embed = new MessageEmbed()
                .setTitle('**Warn**')
                .setColor(colour)
                .setDescription('**Description:** `Warn a user from the guild!`\n**Usage:** `!Warn <@user | user-id> [reason]`\n**Example:** `!Warn @User#0000 Toxic`')
                .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
                .setFooter(footer, client.user.displayAvatarURL())
                .setTimestamp();
            return message.channel.send({embeds: [embed] });
        }
        let reason = args.slice(1).join(' ');
        if(!reason) reason = "(No Reason Provided)";
        
        member.send(`You have been warned by ${message.author.username} for this reason: ${reason}`)
        .catch(error => message.channel.send(`Sorry ${message.author} I couldn't not warn because of : ${error}`));
        let warnEmbed = new MessageEmbed()
        .setTitle("**__Warn Report__**")
        .setDescription(`**<@${member.user.id}> has been warned by<@${message.author.id}>**`)
        .addField(`**Action:**`, `\`Warn\``)
        .addField(`**Moderator:**`, `${message.author}`)
        .addField(`**Reason:**`, `\`${reason}\``)

        message.channel.send({embeds: [warnEmbed]})
    }

}

module.exports.help = {
    name: 'warn',
    desc: 'Warn Members',
    usage: 'warn <user> [reason]',
    category: 'moderation'
  };