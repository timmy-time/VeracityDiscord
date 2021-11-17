const { Permissions, Client, Message , MessageEmbed} = require("discord.js");
const request = require("requests");

//> Config
const { colour, footer, botName } = require('../../data/config.js');
const { warning_id, success_id, danger_id } = require('../../data/config.js');
module.exports = {
    name: "setprefix",
    description: "Set a prefix for the guild",
    category: "admin",
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

        let permissions = ["MANAGE_GUILD" || "ADMINISTRATOR"]
        let permissionList = ["MANAGE_GUILD", "ADMINISTRATOR"]

        //> Check Users Permissions
        if (!message.member.permissions.has(permissions)) {
            const cmdPermission = new MessageEmbed()
                .setAuthor(botName, client.user.displayAvatarURL())
                .setDescription(`<:danger:${danger_id}> You're missing \`${permissionList}\` permission(s) to run this command.`)
                .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
                .setColor(colour)
                .setFooter(footer)
                .setTimestamp()
            return message.channel.send({embeds: [cmdPermission]})
        }

        let nPrefix = args[0];
        if (!nPrefix) {
            const prefixMissing = new MessageEmbed() 
                .setAuthor(botName, client.user.displayAvatarURL())
                .setDescription(`<:warning1:${warning_id}> Please provide a prefix to set!`)
                .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
                .setColor(colour)
                .setFooter(footer)
                .setTimestamp();
            return message.channel.send({embeds: [nPrefix]})
        }


        // ADD TO DB
        await client.dbCommands.updatePrefix(message.guild.id, nPrefix)

        const setPrefix = new MessageEmbed()
            .setAuthor(botName, client.user.displayAvatarURL())
            .setDescription(`<:success:${success_id}> The Prefix \`${nPrefix}\` has been set for this guild!`)
            .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
            .setColor(colour)
            .setFooter(footer)
            .setTimestamp();
        await message.channel.send({embeds: [setPrefix]});
        
        console.log(`\x1b[31mDATABASE \x1b[37m// [\x1b[33m${nPrefix}\x1b[37m]\x1b[32m has been saved for Guild \x1b[37m(\x1b[33m${message.guild.id}\x1b[37m)`)
    }
}


module.exports.help = {
    name: 'setprefix',
    desc: 'Set a prefix for the guild',
    usage: 'setprefix',
    category: 'admin'
};