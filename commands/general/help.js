const { Permissions, Client, Message, MessageEmbed } = require("discord.js");

//> Config
const { colour, footer } = require('../../data/config.js');
module.exports = {
    name: "help",
    description: "To get all the commands you can run.",
    category: "general",
    perms: {
        client: [Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.EMBED_LINKS],
        user: [Permissions.FLAGS.SEND_MESSAGES]
    },
    aliases: [],

    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    execute: async (client, message, args) => {
        var prefix = await client.dbCommands.fetchPrefix(message.guild.id);
        prefix.prefix;
        const helpMenu = new MessageEmbed()
            .setTitle(':globe_with_meridians:  Help Menu')
            .setColor(colour)
            .addField("General", client.commands.filter(fcmd => fcmd.help.category === 'general').map((x) => `\`${prefix.prefix}${x.help.name}\``).join(' ')|| "No Commands")
            .addField("Moderation", client.commands.filter(fcmd => fcmd.help.category === 'moderation').map((x) => `\`${prefix.prefix}${x.help.name}\``).join(' ')|| "No Commands")
            .addField("Admin", client.commands.filter(fcmd => fcmd.help.category === 'owner').map((x) => `\`${prefix.prefix}${x.help.name}\``).join(' ') || "No Commands")
            .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
            .setFooter(footer, client.user.displayAvatarURL())
            .setTimestamp();

        return message.channel.send({ embeds: [helpMenu] });
    }

}

module.exports.help = {
    name: 'help',
    desc: 'Main Help menu',
    usage: 'help',
    category: 'general'
  };