// Declare
const createHTML = require('create-html');
const fs = require('fs');
const { Permissions, Client, Message, MessageEmbed } = require("discord.js");
const moment = require('moment');
require('moment-duration-format');
function wait(ms){var start = new Date().getTime();var end = start;while(end < start + ms) {end = new Date().getTime()}}

//> Config
const { prefix, colour, footer, botName, botOwners} = require('../../data/config');
const { upvote_id, warning_id, offline_id, pin_id, gift_id, idle_id, success_id, barrow_id, downvote_id, danger_id, online_id, dnd_id, info_id, denied_id, loading_id } = require('../../data/config.js');

//> Code
module.exports = {
    name: 'eval',
    desc: 'eval the bot',
    usage: 'eval',
    category: 'owner',
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
    if (message.author.id !== '860013795191947300') return message.channel.send("You do not have permission to use this command!");
        const embed = new MessageEmbed()
            .setTitle('Evaluating...')
        const msg = await message.channel.send({embeds: [embed]});
        try {
            const data = eval(args.join(' ').replace(/```/g, ''));
            const embed = new MessageEmbed()
                .setTitle('output:')
                .setDescription(`${args}`)
            .setColor('GREEN')
            await msg.edit({embeds: [embed]})
            await msg.react('✅')
            await msg.react('❌')
            const filter = (reaction, user) => (reaction.emoji.name === '❌' || reaction.emoji.name === '✅') && (user.id === message.author.id);
            msg.awaitReactions(filter, { max: 1 })
                .then((collected) => {
                    collected.map((emoji) => {
                        switch (emoji._emoji.name) {
                            case '✅':
                                msg.reactions.removeAll();
                                break;
                            case '❌':
                                msg.delete()
                                break;
                        }
                    })
                })
        } catch (e) {
            const embed = new MessageEmbed()
                .setTitle('error')
                .setDescription(`Error: ${String(e)}`)
                .setColor("#FF0000")
            return await msg.edit({embeds: [embed]});
        }
  }
}

module.exports.help = {
    name: 'eval',
    desc: 'eval a command',
    usage: 'eval',
    category: 'owner'
};