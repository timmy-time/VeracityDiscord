//> Dependencies
const { Permissions, Client, Message, MessageEmbed } = require("discord.js");

//> Config
const { colour, footer, botName } = require(`../../data/config.js`);
const { success_id, info_id, loading_id } = require('../../data/config.js');

module.exports = {
    name: "ping",
    description: "To get the latency of the bot.",
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
    const pingEmbed = new MessageEmbed()
      .setColor(colour)
      .setTitle(`<a:loading:${loading_id}> Ping!`)
      .addField(`<:info:${info_id}> Bot Latency`, `\`Pinging...\``, true)
      .addField(`<:info:${info_id}> API Latency`, `\`${Math.round(client.ws.ping)}ms\``, true)
    var pingMessage = await message.channel.send({embeds: [pingEmbed] });

    var ping = Date.now() - pingMessage.createdTimestamp;

    const pongEmbed = new MessageEmbed()
      .setColor(colour)
      .setTitle(`<:success:${success_id}> Pong!`)
      .addField(`<:info:${info_id}> Bot Latency`, `\`${ping}ms\``, true)
      .addField(`<:info:${info_id}> API Latency`, `\`${Math.round(client.ws.ping)}ms\``, true)
      .setFooter(footer, client.user.displayAvatarURL())
      .setTimestamp();
    return pingMessage.edit({embeds: [pongEmbed] });
  }
}

module.exports.help = {
  name: `ping`,
  desc: `Outputs the average of the last 5 websocket pings sent to the Discord API.`,
  usage: `ping`,
  category: `general`
};
