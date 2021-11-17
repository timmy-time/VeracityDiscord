//> Dependencies
const { Permissions, Client, Message, MessageEmbed } = require("discord.js");
const moment = require('moment');
require('moment-duration-format');

//> Config
const { author, colour, footer, botName } = require('../../data/config.js');
const { upvote_id, warning_id, offline_id, pin_id, gift_id, idle_id, success_id, barrow_id, downvote_id, danger_id, online_id, dnd_id, info_id, denied_id, loading_id } = require('../../data/config.js');

//> Code
module.exports = {
    name: 'botstatus',
    desc: 'Shows Bot Status',
    usage: 'botstatus',
    category: 'general',
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

    const loadEmbed = new MessageEmbed()
      .setAuthor(botName, client.user.displayAvatarURL())
      .setTitle(`<a:loading:${loading_id}> Loading!`)
      .setColor(colour)
      .setFooter(footer, client.user.displayAvatarURL())
      .setTimestamp();
    var botInfo = await message.channel.send({embeds: [loadEmbed] })

    var ping = Date.now() - botInfo.createdTimestamp;

    var duration = moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');

    setTimeout(() => {
      const statsEmbed = new MessageEmbed()
        .setAuthor(botName, client.user.displayAvatarURL())
        .setColor(colour)
        .setDescription(`© Copyright 2021, ${botName}. All rights reserved`)
        .addField(`<:info:${info_id}> Bot  Version:`, `\`${botversion}\``, true)
        .addField(`<:info:${info_id}> Uptime:`, `\`${duration}\``, true)
        .addField(`<:info:${info_id}> Author:`, `\`${author}\``, true)
        .addField(`<:info:${info_id}> API Latency:`, `\`${client.ws.ping}ms\``, true)
        .addField(`<:info:${info_id}> Bot Latency:`, `\`${ping}ms\``, true)
        .addField(`<:info:${info_id}> Memory Usage:`, `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\``, true)
        .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
        .setFooter(footer, client.user.displayAvatarURL())
        .setTimestamp();

	    return botInfo.edit({embeds: [statsEmbed] });
    }, 10)
  }
}

module.exports.help = {
    name: 'botstatus',
    desc: 'shows bot status',
    usage: 'botstatus',
    category: 'general'
  };
  