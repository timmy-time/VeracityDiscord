// Declare
const createHTML = require('create-html');
const fs = require('fs');
const { Permissions, Client, Message, MessageEmbed } = require("discord.js");
const moment = require('moment');
require('moment-duration-format');
function wait(ms){var start = new Date().getTime();var end = start;while(end < start + ms) {end = new Date().getTime()}}

//> Config
const { colour, footer, botName, moderationLog } = require('../../data/config.js');
const { upvote_id, warning_id, offline_id, pin_id, gift_id, idle_id, success_id, barrow_id, downvote_id, danger_id, online_id, dnd_id, info_id, denied_id, loading_id } = require('../../data/config.js');

//> Code
module.exports = {
    name: 'purge',
    desc: 'purges',
    usage: 'purge <amt>',
    category: 'moderation',
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
    let amount = parseInt(message.content.split(' ')[1]);

    if (!message.member.permissions.has(["MANAGE_MESSAGES", "ADMINISTRATOR"])) {
        const noPerm = new MessageEmbed()
            .setTitle('PURGE')
            .setColor(colour)
            .addField("ERROR", 'You are missing `MANAGE_MESSAGES` permission(s) to run this command.')
            .setFooter(footer, client.user.displayAvatarURL())
            .setTimestamp();
        return message.channel.send({embeds: [noPerm]});
    };
    const noAmount = new MessageEmbed()
        .setTitle('PURGE')
        .setColor(colour)
        .addField("ERROR", 'Please specify an ammount of messages to clear')
        .setFooter(footer, client.user.displayAvatarURL())
        .setTimestamp();
    if (!amount) return message.channel.send({embeds: [noAmount]});

    const tooHighAmount = new MessageEmbed()
        .setTitle("PURGE")
        .setColor(colour)
        .addField("ERROR", 'Due to discord limitations you must delete less than 99 messages at a time.')
        .setFooter(footer, client.user.displayAvatarURL())
        .setTimestamp()
    if (!amount > 100) return message.channel.send({embeds: [tooHighAmount]});

    message.channel.bulkDelete(parseInt(amount-1)).then(async (m) => {
        let msgs = m.map(msg=>msg.author.tag + ' --> ' + msg.content) 
        const msgAmtCleared = new MessageEmbed()
            .setTitle("PURGE")
            .setColor(colour)
            .addField("Cleared", `${msgs.length - 1} messages.`)
            .setFooter(footer, client.user.displayAvatarURL())
            .setTimestamp()
        message.channel.send({embeds: [msgAmtCleared]});
        let html = createHTML({
            title: 'Cleared Messages',
            body: '<p>'+ msgs.join('<br>') + '</p>'
        })
        if (moderationLog != "none") {
        await fs.writeFile(`./data/purges/${message.author.tag}.html`, html, function(error) {if (error)console.log(error)})
        await client.channels.cache.get(moderationLog).send({files: [`./data/purges/${message.author.tag}.html`]}) 
        //await fs.unlink(`./data/purges/${message.author.tag}.html`, function(err) {if (err) console.log(err)})  
        }
    })

    let logEmbed = new MessageEmbed()
        .setTitle('PURGE')
        .setColor(colour)
        .addField(`User`, `${message.author.tag} (${message.author.id})`)
        .addField(`Channel`, `${message.channel}`)
        .setTimestamp()
    let logs = message.guild.channels.cache.find(c => c.id === moderationLog)
    logs.send({embeds: [logEmbed]});

    }
}

module.exports.help = {
    name: 'purge',
    desc: 'Purge chat',
    usage: 'Purge <amount>',
    category: 'moderation'
};