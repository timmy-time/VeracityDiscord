// Declare
const { Discord, MessageEmbed } = require('discord.js');
const fs = require("fs");
const fetchAll = require('discord-fetch-all');

// Config
const { colour, botName, footer, verifyMessageID, memberRoleID, verifyEmojiName, ticketMessageID, ticketEmojiName, ticketCategoryID, ticketLimit, ticketSupportRoleID } = require('../data/config');

module.exports = async(client, reaction, user) => {

    //> Check user reacting isn't bot.
    if (user.id === client.user.id) return;

    //> Check for partial messages.
    if (reaction.message.partial) await reaction.message.fetch();

    let message = reaction.message;

    if (message.channel.type === 'dm') return;

    const deleteMessage = (msg) => {
        if (deleteMessages) msg.delete({timeout: 5000})
    };
    let deleteMessages = true;



    ///////////////////////////////////////////////////////////////
    ///                   VERIFICATION SYSTEM                   ///
    ///////////////////////////////////////////////////////////////

    if (message.id === verifyMessageID) {
        if (reaction.emoji.name == verifyEmojiName) {

            const member = message.guild.members.cache.get(user.id);

            reaction.users.remove(user);

            let role = message.guild.roles.cache.get(memberRoleID);
            if (member.roles.cache.has(memberRoleID)) {
                message.guild.members.cache.get(user.id).roles.remove(role);

                const unVerifiedEmbed = new MessageEmbed()
                    .setAuthor(`${botName}`, client.user.displayAvatarURL())
                    .setDescription(`You have unverified yourself!`)
                    .setColor(colour)
                    .setFooter(footer)
                    .setTimestamp()
                message.channel.send({embeds: [unVerifiedEmbed]}).then(deleteMessage);
            } else {

                message.guild.members.cache.get(user.id).roles.add(role);

                const verifiedEmbed = new MessageEmbed()
                    .setAuthor(`${botName}`, client.user.displayAvatarURL())
                    .setDescription('Thank you for **Verifying**!')
                    .setColor(colour)
                    .setFooter(footer)
                    .setTimestamp()
                message.channel.send({embeds: [verifiedEmbed]}).then(deleteMessage);
            }

        }

    }
}