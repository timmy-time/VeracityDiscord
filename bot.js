//> Dependencies
const { Client } = require('discord.js');
const logger = require("discordjs-logger");
const mongoose = require('mongoose');
require('dotenv').config();

//> Check for Vulnerabilities & Node Version
if (process.platform !== "win32") require("child_process").exec("npm install n && lts").console.log(("Installing win32 patches & vulnerabilities!"));
if (+process.version.slice(1).split('.')[0] < 14) {
    console.log("Your Node.js is out of date, Please go to https://nodejs.org/en/ then download and install the LTS version.")
    process.exit()
};

const client = new Client({
    intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_EMOJIS_AND_STICKERS", "GUILD_INTEGRATIONS", "GUILD_WEBHOOKS", "GUILD_INVITES", "GUILD_VOICE_STATES", "GUILD_PRESENCES", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGE_TYPING", "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS", "DIRECT_MESSAGE_TYPING"],
    allowedMentions: {
        parse: ["everyone", "roles", "users"],
        repliedUser: true
    },
    partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"]

});

//> Handlers
require("./handlers/client")(client);
require("./handlers/commands")(client);
require("./handlers/slash_commands")(client);
require("./handlers/events")(client);

client.db = require("./modules/Database/mongoose.js");

client.login(process.env.TOKEN).catch(error => {
    console.log("\x1b[31mYour bot token is incorrect! Shutting Down.....\x1b[39m");
    process.exit()
});
