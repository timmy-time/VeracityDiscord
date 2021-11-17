const { Permissions, Client, Message , MessageEmbed} = require("discord.js");
const request = require("requests");

//> Config
const { colour, footer, botName } = require('../../data/config.js');
const { upvote_id, warning_id, offline_id, pin_id, gift_id, idle_id, success_id, barrow_id, downvote_id, danger_id, online_id, dnd_id, info_id, denied_id, loading_id } = require('../../data/config.js');
module.exports = {
   name: "discord",
   desc: "Displays information about github.",
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
      let embed = new MessageEmbed()
         .setColor(colour)
         .setThumbnail(client.user.displayAvatarURL({ size: 2048 }))
         .setFooter(footer, client.user.displayAvatarURL())

      var url = 'https://srhpyqt94yxb.statuspage.io/api/v2/status.json';
      // for each url, make a request
      request(url, function (error, response, body) {
         if (error) {
            // if there's an error, log it and notify user
            console.log(error);
            embed.setTitle('Error')
               .setDescription(error)
               .setTimestamp()
            message.channel.send({embeds: [embed] });

         } else if (!error && response.statusCode == 200) {
            // parse the body as JSON
            var status = JSON.parse(body);
            // set the title
            embed.setTitle("Discord Status");
            // add field if status indicator is "none" than set it to "green"
            if (status.status.description == "All Systems Operational") {
               embed.addField("Status", `<:online:${online_id}>`, true);
            } else {
               embed.addField("Status", `<:offline:${offline_id}>`, true);
            }
            // set the url
            embed.setURL(status.page.url);
            // set the timestamp
            embed.setTimestamp(new Date());
            // send the embed
            message.channel.send({embeds: [embed] });
         }
      });
   }
};


module.exports.help = {
   name: 'discord',
   desc: 'Displays information about Discord and shit.',
   usage: 'discord',
   category: 'general'
};

