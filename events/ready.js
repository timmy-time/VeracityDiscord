const { Client, MessageEmbed } = require("discord.js");
require('moment-duration-format');
const mongoose = require('mongoose');
const dbFuncs = require('../modules/Database/mongoose.js')
// Add MongoDB Schemas
// Config
const { prefix, activityMessage, activity, botversion, dburl } = require('../data/config.js')
require('dotenv').config();

/**
 * @param {Client} client 
 */

module.exports = async (client) => {

    // Client Status
    client.user.setStatus(`${activity}`);
    let activities = [`${activityMessage}`, `Use ${prefix}help`],
        i = 0;
    setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, { type: "WATCHING" }), 15000);

    // Discord Login Message
    console.log(`\x1b[32m//////////////////////////////////////////`)
    console.log(`\x1b[32m/////        VeracityDiscordJS       /////`)
    console.log(`\x1b[32m/////                                /////`)
    console.log(`\x1b[32m/////         Version: ${botversion}         /////`)
    console.log(`\x1b[32m//////////////////////////////////////////`)
    console.log(`\x1b[35m[ API ] \x1b[32mLogged in as ${client.user.tag}`);

    console.log('\x1b[31mDATABASE \x1b[37m// \x1b[32mAttempting Connection To MongoDB!\x1b[0m')
    mongoose.connect(process.env.MONGO_URL, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    client.db = mongoose.connection; 
    client.db.on('error', console.error.bind(console, 'Connection Error:'))
    client.db.once('open', function() {
        console.log('\x1b[31mDATABASE \x1b[37m// \x1b[32mMongoDB Is \x1b[4mConnected!\x1b[0m');
        client.guilds.cache.each((guild) => {
            dbFuncs.addGuildsAtStart(String(guild.id));
        })
    })
    client.dbCommands = dbFuncs.funcs;

    

}




